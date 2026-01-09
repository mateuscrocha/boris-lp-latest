type PlausibleEventOptions = {
  props?: Record<string, string | number | boolean | null>;
  meta?: unknown;
  callback?: () => void;
};

declare global {
  interface Window {
    plausible?: (eventName: string, options?: PlausibleEventOptions) => void;
    __plausibleTrackingInitialized?: boolean;
  }
}

function safeJsonParse(value: string) {
  try {
    return JSON.parse(value) as unknown;
  } catch {
    return null;
  }
}

function track(eventName: string, options?: PlausibleEventOptions) {
  const plausible = window.plausible;
  if (!plausible) return;
  plausible(eventName, options);
}

function isAnchor(element: Element): element is HTMLAnchorElement {
  return element instanceof HTMLAnchorElement;
}

function getClosestTrackableElement(target: EventTarget | null) {
  if (!(target instanceof Element)) return null;
  return target.closest<HTMLElement>("[data-plausible-event],a,button,[role='button']");
}

function normalizeHref(href: string | null | undefined) {
  if (!href) return null;
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function extractSocialNetwork(url: URL) {
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  if (host === "x.com" || host === "twitter.com") return "x";
  if (host === "facebook.com") return "facebook";
  if (host === "linkedin.com") return "linkedin";
  if (host === "wa.me" || host === "whatsapp.com") return "whatsapp";
  if (host === "t.me" || host === "telegram.me" || host === "telegram.org") return "telegram";
  if (host === "instagram.com") return "instagram";
  return null;
}

function isDownloadLink(url: URL, anchor: HTMLAnchorElement) {
  if (anchor.hasAttribute("download")) return true;
  const pathname = url.pathname.toLowerCase();
  return /\.(pdf|zip|rar|7z|csv|xlsx|xls|doc|docx|ppt|pptx|mp3|mp4)$/i.test(pathname);
}

function getScrollPercent() {
  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = doc.scrollHeight || document.body.scrollHeight || 0;
  const clientHeight = doc.clientHeight || window.innerHeight || 0;
  const max = Math.max(1, scrollHeight - clientHeight);
  return Math.min(100, Math.max(0, (scrollTop / max) * 100));
}

export function initPlausibleTracking() {
  if (window.__plausibleTrackingInitialized) return;
  window.__plausibleTrackingInitialized = true;

  const scrollThresholds = [25, 50, 75, 100];
  const timeThresholdsSeconds = [30, 60, 120];
  const importantPaths = new Set<string>(["/", "/manifesto", "/contato", "/produtos", "/servicos", "/blog"]);

  let currentPath = window.location.pathname;
  let scrollFired = new Set<number>();
  let exitFired = false;
  let rafPending = false;
  let timeouts: number[] = [];

  const resetPageState = () => {
    currentPath = window.location.pathname;
    scrollFired = new Set<number>();
    exitFired = false;
    for (const handle of timeouts) window.clearTimeout(handle);
    timeouts = [];

    if (importantPaths.has(currentPath)) {
      for (const seconds of timeThresholdsSeconds) {
        const handle = window.setTimeout(() => {
          if (window.location.pathname !== currentPath) return;
          if (document.visibilityState !== "visible") return;
          track(`Tempo ${seconds}s`, { props: { caminho: currentPath } });
        }, seconds * 1000);
        timeouts.push(handle);
      }
    }
  };

  const onRouteChange = () => {
    if (window.location.pathname === currentPath) return;
    resetPageState();
  };

  const historyApi = window.history;
  const originalPushState = historyApi.pushState;
  if (originalPushState) {
    historyApi.pushState = function (...args) {
      originalPushState.apply(this, args as unknown as Parameters<History["pushState"]>);
      onRouteChange();
    };
  }

  window.addEventListener("popstate", onRouteChange);

  const onClickCapture = (event: MouseEvent) => {
    const element = getClosestTrackableElement(event.target);
    if (!element) return;

    const explicitEventName = element.dataset.plausibleEvent;
    if (explicitEventName) {
      const rawProps = element.dataset.plausibleProps;
      const props = typeof rawProps === "string" ? safeJsonParse(rawProps) : null;
      track(explicitEventName, props && typeof props === "object" ? { props: props as Record<string, string> } : undefined);
      return;
    }

    const anchor = element.closest("a[href]");
    if (!anchor || !isAnchor(anchor)) return;

    const url = normalizeHref(anchor.getAttribute("href"));
    if (!url) return;
    if (url.protocol === "mailto:" || url.protocol === "tel:") return;

    const network = extractSocialNetwork(url);
    if (network) {
      track("Compartilhamento Social", { props: { rede: network, destino: url.href } });
      return;
    }

    if (isDownloadLink(url, anchor)) {
      track("Download", { props: { arquivo: url.pathname, destino: url.href } });
      return;
    }
  };

  const onSubmitCapture = (event: SubmitEvent) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const name = form.dataset.plausibleForm;
    if (!name) return;
    track("Formulário Enviado", { props: { formulario: name, caminho: window.location.pathname } });
  };

  const onFormSuccess = (event: Event) => {
    if (!(event instanceof CustomEvent)) return;
    const detail = event.detail as unknown;
    if (!detail || typeof detail !== "object") return;

    const record = detail as Record<string, unknown>;
    const name = record.formulario ?? record.name;
    if (typeof name !== "string" || name.length === 0) return;

    const path = typeof record.caminho === "string" && record.caminho.length > 0 ? record.caminho : window.location.pathname;
    track("Formulário Sucesso", { props: { formulario: name, caminho: path } });
  };

  const onPlayCapture = (event: Event) => {
    const video = event.target;
    if (!(video instanceof HTMLVideoElement)) return;
    const src = video.currentSrc || video.src;
    const label = video.getAttribute("aria-label") || video.getAttribute("title") || video.id || src || "video";
    track("Vídeo Play", { props: { video: label, caminho: window.location.pathname } });
  };

  const checkScrollDepth = () => {
    rafPending = false;
    const percent = getScrollPercent();
    for (const threshold of scrollThresholds) {
      if (percent < threshold) continue;
      if (scrollFired.has(threshold)) continue;
      scrollFired.add(threshold);
      track(`Scroll ${threshold}%`, { props: { caminho: window.location.pathname } });
    }
  };

  const onScroll = () => {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(checkScrollDepth);
  };

  const fireExitIfNeeded = () => {
    if (exitFired) return;
    const path = window.location.pathname;
    if (!importantPaths.has(path)) return;
    exitFired = true;
    track("Saída Página Chave", {
      props: {
        caminho: path,
        maxScroll: Math.floor(getScrollPercent()),
      },
    });
  };

  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") fireExitIfNeeded();
  };

  const onPageHide = () => {
    fireExitIfNeeded();
  };

  document.addEventListener("click", onClickCapture, true);
  document.addEventListener("submit", onSubmitCapture, true);
  document.addEventListener("plausible:form-success", onFormSuccess);
  document.addEventListener("play", onPlayCapture, true);
  window.addEventListener("scroll", onScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.addEventListener("pagehide", onPageHide);

  resetPageState();
}

export function trackPlausibleEvent(eventName: string, options?: PlausibleEventOptions) {
  track(eventName, options);
}

export function trackFormSuccess(formName: string) {
  if (!formName) return;
  track("Formulário Sucesso", { props: { formulario: formName, caminho: window.location.pathname } });
}
