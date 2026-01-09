import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const whatsappBaseHref = "https://wa.me/5561981569893";
const onboardingHref = "https://central.euboris.com.br/onboarding";

function buildWhatsappHref(message: string) {
  return `${whatsappBaseHref}?text=${encodeURIComponent(message)}`;
}

const navItems = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Painel", href: "#painel" },
  { label: "Manifesto Bóris", href: "/manifesto" },
  { label: "Começar", href: "#cta" },
];

const realProblemsMessages = [
  {
    sender: "Admin do Grupo",
    title: "Tudo vira bagunça 🔄",
    body: "As mesmas perguntas aparecem sempre. 🔁\nVocê responde.\nE no dia seguinte… volta tudo de novo.",
  },
  {
    sender: "Mentora do Grupo",
    title: "Quem não acompanha some 🧭",
    body: "Algumas pessoas se perdem no meio das mensagens. 🧩\nQuando você percebe… já saíram.",
  },
  {
    sender: "Líder da Comunidade",
    title: "Como eu provo que isso importa? 📊",
    body: "Você sabe que o grupo gera valor.\nMas sem dados… explicar isso fica difícil. 📈",
  },
];

const organizeCards = [
  {
    title: "Organiza sem interromper",
    description:
      "O grupo segue conversando do jeito que já conversa. O Bóris só coloca ordem no que está solto — com discrição.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M5 9.5c1.5-2 3.5-3 6-3 2.2 0 3.9.7 5.2 2.1"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7 14.5c1.1 1.8 3 3 5.6 3 2.5 0 4.6-1.2 6.4-3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Resume o que realmente importa",
    description:
      "Decisões, tarefas, links e próximos passos viram um resumo curto — fácil de repassar e bom de confiar.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M7 7h10M7 12h6M7 17h10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M17.5 12.5 19 14l3-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Mostra o valor da comunidade",
    description:
      "Sinais claros de participação e temas fortes do grupo ajudam você a enxergar impacto — e mostrar valor com segurança.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M8.5 10.5a3 3 0 1 1 6 0c0 1.6-1 2.7-2.1 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M5.5 19c1.3-2.4 3.7-4 6.5-4s5.2 1.6 6.5 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const communitySignals = [
  {
    title: "Participação da comunidade",
    description: "O quanto as pessoas estão presentes e ativas nas conversas.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M7.5 10.5c0-2.2 1.9-4 4.3-4h.4c2.4 0 4.3 1.8 4.3 4 0 1.2-.5 2.2-1.4 3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6 19c1.3-2.5 3.8-4 6.2-4s4.9 1.5 5.8 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Temas mais comentados",
    description: "Os assuntos que mais mobilizaram o grupo no período.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M7 7h10M7 12h10M7 17h6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16.5 17a3 3 0 0 0 3-3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Momentos de pico",
    description: "Quando as conversas mais acontecem no grupo.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
];

const borisHelpsCards = [
  {
    title: "Eu envio resumos do que importa",
    description:
      "Todo dia, eu preparo um resumo com os principais temas do grupo. Assim, mesmo quem não acompanhou tudo continua por dentro — sem estresse.",
    benefits: ["menos ansiedade", "mais pertencimento"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M8 7h8M8 11h8M8 15h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7.5 3.8h9A2.7 2.7 0 0 1 19.2 6.5v11A2.7 2.7 0 0 1 16.5 20.2h-9A2.7 2.7 0 0 1 4.8 17.5v-11A2.7 2.7 0 0 1 7.5 3.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Eu transformo o grupo em dados claros",
    description:
      "Eu mostro quantas pessoas estão ativas, o ritmo de conversa, picos de engajamento e quem mais contribui.",
    benefits: ["decisões melhores", "argumentos para o board", "prova de valor"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M6 18V10"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M12 18V6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 18v-7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M5 18h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Eu recebo quem chega no grupo",
    description:
      "Quando alguém entra, eu dou boas-vindas marcando a pessoa. Simples, humano e acolhedor.",
    benefits: ["pertencimento desde o primeiro minuto"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M16 11.5a3.2 3.2 0 1 0-6.4 0c0 1.5.9 2.6 2 3.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.5 19c1.4-2.6 4-4 6.7-4 2.5 0 5 1.2 6.3 3.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M17.5 7.5h3M19 6v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Eu ajudo você a reconhecer quem faz a diferença",
    description:
      "Eu mostro quem mais contribui na comunidade — abrindo espaço para reconhecimento e gamificação saudável.",
    benefits: ["cultura positiva", "engajamento orgânico"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M12 3.8l2.3 4.7 5.2.8-3.8 3.7.9 5.1-4.6-2.4-4.6 2.4.9-5.1-3.8-3.7 5.2-.8L12 3.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const memberBenefits = [
  "não precisa acompanhar tudo",
  "entende o que está acontecendo",
  "se sente bem-vinda desde o início",
];

const howItWorksSteps = [
  {
    title: "Você conecta o grupo",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M8.5 12a3.5 3.5 0 0 1 7 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M6.5 18a6.5 6.5 0 0 1 11 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M18 7.5h3M19.5 6v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Eu começo a entender o comportamento",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M6.5 15.5c1.3-1.9 3.2-3 5.6-3 2.2 0 4 .8 5.4 2.3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7.5 9.5c1.1-1.4 2.7-2.2 4.8-2.2 1.7 0 3.1.5 4.2 1.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M5 19h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Eu entrego métricas e insights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M7 17v-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 17V7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M17 17v-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 17h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Eu preparo resumos automáticos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M7.5 3.8h9A2.7 2.7 0 0 1 19.2 6.5v11A2.7 2.7 0 0 1 16.5 20.2h-9A2.7 2.7 0 0 1 4.8 17.5v-11A2.7 2.7 0 0 1 7.5 3.8Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    ),
  },
  {
    title: "Sua comunidade flui melhor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M5.5 13c1.5-2 3.7-3 6.5-3 2.5 0 4.6.7 6.5 2.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M7 16.5c1.2 1.8 3.1 3 5.6 3 2.7 0 4.8-1.1 6.4-3.4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const socialProofBlocks = [
  {
    logoSrc: "/images/remax.png",
    name: "RE/MAX Brasil",
    context: "Rede nacional com times e franqueados em múltiplas regiões.",
    helps: "Organizo recados importantes, decisões e links do dia a dia para o grupo ficar leve e rastreável.",
    testimonial:
      "Antes a informação se perdia rápido. Com os resumos, o time se entende melhor e eu parei de responder a mesma coisa toda semana.",
  },
  {
    logoSrc: "/images/octadesk.png",
    name: "Octadesk",
    context: "Startup com comunicação intensa entre áreas e times de suporte.",
    helps: "Transformo conversas corridas em clareza: próximos passos, dúvidas recorrentes e alinhamentos viram resumo.",
    testimonial:
      "A sensação foi de silêncio bom: menos ruído, mais objetivo. Quem chega depois consegue se situar sem pedir contexto do zero.",
  },
  {
    logoSrc: "/images/b2mamy.png",
    name: "B2Mamy",
    context: "Comunidade grande com pessoas em diferentes momentos de carreira.",
    helps: "Ajudo a manter acolhimento sem sobrecarga, deixando claro o que é essencial para acompanhar.",
    testimonial:
      "O grupo ficou mais humano. A gente continua conversando, só que agora dá para respirar e entender o que está acontecendo.",
  },
  {
    logoSrc: "/images/oliviasensata.png",
    name: "Olivia Sensata",
    context: "Criadora com comunidade ativa e conversas sensíveis no dia a dia.",
    helps: "Organizo sem engessar: separo o que foi importante, sem tirar o tom e a proximidade do grupo.",
    testimonial:
      "O resumo tem um tom que parece gente. Não vira relatório. Ajuda a acolher quem não conseguiu acompanhar sem culpa.",
  },
  {
    logoSrc: "/images/rodrigovinhas.png",
    name: "Rodrigo Vinhas",
    context: "Líder e criador com grupos que misturam networking e troca prática.",
    helps: "Dou visão e cadência: tópicos fortes, tarefas e decisões ficam fáceis de achar e repassar.",
    testimonial:
      "O que mais mudou foi o pós-conversa. Antes era tudo 'sumiu no chat'. Agora eu consigo transformar debate em ação.",
  },
  {
    logoSrc: "/images/leandroferrari.png",
    name: "SCALE (Leandro Ferrari)",
    context: "Comunidade com alta frequência de mensagens e muita troca entre membros.",
    helps: "Reduzo repetição e deixo o essencial claro, para o grupo crescer sem virar exaustão.",
    testimonial:
      "Não é mágica — só organização bem feita. O grupo segue vivo, mas com mais clareza. Isso muda o ritmo e a qualidade.",
  },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center", className)}>
      <img src="/images/logo.png" alt="Bóris" className="h-8 w-auto" loading="eager" />
    </div>
  );
}

function HeroImage() {
  return (
    <div className="w-full">
      <div
        className="relative overflow-hidden rounded-3xl bg-transparent"
        style={{ aspectRatio: "4 / 3" }}
      >
        <img
          src="/images/q1.png"
          alt="Bóris em um ambiente calmo, com um painel leve de métricas ao lado"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </div>
  );
}

const adminCarouselSlides = [
  {
    src: "/images/h1.png",
    alt: "Imagem do painel do Bóris (1)",
  },
  {
    src: "/images/h2.png",
    alt: "Imagem do painel do Bóris (2)",
  },
  {
    src: "/images/h3.png",
    alt: "Imagem do painel do Bóris (3)",
  },
  {
    src: "/images/h4.png",
    alt: "Imagem do painel do Bóris (4)",
  },
  {
    src: "/images/h5.png",
    alt: "Imagem do painel do Bóris (5)",
  },
] as const;

function OnboardingModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const titleId = useId();
  const descriptionId = useId();
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocusedElementRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!active || active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    const fallbackTimer = window.setTimeout(() => {
      setShowFallback(true);
    }, 2500);

    window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(fallbackTimer);
      previouslyFocusedElementRef.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const shouldShowFallback = showFallback && !iframeLoaded;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onMouseDown={onClose} />
      <div
        ref={dialogRef}
        className="relative flex h-dvh w-dvw flex-col bg-background md:h-[90vh] md:w-[min(1100px,calc(100vw-3rem))] md:overflow-hidden md:rounded-2xl md:border md:border-border md:shadow-[0_20px_60px_rgba(0,0,0,0.10)]"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <h2 id={titleId} className="sr-only">
          Cadastro do Bóris
        </h2>
        <p id={descriptionId} className="sr-only">
          Formulário de cadastro carregado dentro de uma janela. Pressione Esc para fechar.
        </p>
        <div className="relative flex-1 overflow-hidden">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/80 text-muted-foreground backdrop-blur hover:bg-accent/50 hover:text-foreground"
            aria-label="Fechar"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
              <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            </svg>
          </button>

          <iframe
            title="Cadastro do Bóris"
            src={onboardingHref}
            className="h-full w-full"
            onLoad={() => {
              setIframeLoaded(true);
              setShowFallback(false);
            }}
            referrerPolicy="no-referrer"
            allow="clipboard-read; clipboard-write"
          />

          {shouldShowFallback ? (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 px-6 text-center backdrop-blur-[2px]">
              <div>
                <div className="max-w-md text-sm leading-relaxed text-muted-foreground">
                  Não foi possível carregar o cadastro aqui dentro.
                </div>
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="h-11 rounded-full border-border/60 bg-transparent px-6 text-muted-foreground hover:bg-accent/40 hover:text-foreground"
                  >
                    <a href={onboardingHref} target="_blank" rel="noreferrer">
                      Abrir cadastro do Bóris em nova aba
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const mobileNavCloseButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavPreviouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileNavOpen) return;

    mobileNavPreviouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
      if (event.key !== "Tab") return;

      const dialog = mobileNavRef.current;
      if (!dialog) return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (!active || active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (!active || active === last || !dialog.contains(active)) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    window.setTimeout(() => {
      mobileNavCloseButtonRef.current?.focus();
    }, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      mobileNavPreviouslyFocusedRef.current?.focus?.();
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ui-section][data-reveal='true']")
    );

    if (sections.length === 0) return;

    const revealAll = () => {
      for (const section of sections) {
        section.dataset.revealed = "true";
      }
    };

    if (reduceMotionQuery.matches) {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.12,
      }
    );

    for (const section of sections) observer.observe(section);

    const onReduceMotionChange = () => {
      if (!reduceMotionQuery.matches) return;
      observer.disconnect();
      revealAll();
    };

    if (typeof reduceMotionQuery.addEventListener === "function") {
      reduceMotionQuery.addEventListener("change", onReduceMotionChange);
    } else {
      reduceMotionQuery.addListener(onReduceMotionChange);
    }

    return () => {
      observer.disconnect();
      if (typeof reduceMotionQuery.removeEventListener === "function") {
        reduceMotionQuery.removeEventListener("change", onReduceMotionChange);
      } else {
        reduceMotionQuery.removeListener(onReduceMotionChange);
      }
    };
  }, []);

  return (
    <div id="top" className="min-h-dvh bg-background text-foreground">
      {onboardingOpen ? <OnboardingModal open onClose={() => setOnboardingOpen(false)} /> : null}
      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onMouseDown={() => setMobileNavOpen(false)} />
          <div
            ref={mobileNavRef}
            className="absolute left-4 right-4 top-4 overflow-hidden rounded-2xl border border-border bg-background shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
            onMouseDown={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
              <div className="text-sm font-medium tracking-tight text-foreground">Menu</div>
              <button
                ref={mobileNavCloseButtonRef}
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                aria-label="Fechar"
              >
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
                  <path d="M6 6l12 12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  <path d="M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="p-2">
              {navItems.map((item) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileNavOpen(false)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      ) : null}
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground"
          >
            Pular para o conteúdo
          </a>
          <a href="#top" className="shrink-0">
            <LogoMark />
          </a>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) =>
              item.href.startsWith("/") ? (
                <Link
                  key={item.href}
                  to={item.href}
                  className="rounded-md px-2 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="h-10 w-10 rounded-full p-0 md:hidden"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={mobileNavOpen}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="h-5 w-5">
                <path d="M4 7h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M4 12h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M4 17h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
              </svg>
            </Button>
            <Button asChild size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90">
              <a href="#cta">
                <span className="hidden sm:inline">Colocar o Bóris no meu grupo</span>
                <span className="sm:hidden">Ativar Bóris</span>
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-6xl px-6">
        <section data-ui-section data-reveal="true" className="relative flex min-h-[70vh] items-center py-16 lg:min-h-[74vh] lg:py-24">
          <div className="pointer-events-none absolute -top-10 left-1/2 h-72 w-[min(980px,100%)] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />

          <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="order-first lg:order-none">
              <HeroImage />
            </div>

            <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
              <h1 className="text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
                <span className="block">Um grupo de WhatsApp junta pessoas.</span>
                <span className="block">
                  O <span className="text-brand">Bóris</span> cuida para que isso vire comunidade.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Eu organizo, resumo, meço engajamento e ajudo você a mostrar o valor real da sua comunidade — sem tirar ninguém
                do WhatsApp. Eu não substituo o gestor. Eu apoio.
              </p>

              <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
                <Button asChild size="default" className="h-11 rounded-lg bg-brand px-6 text-brand-foreground hover:bg-brand/90">
                  <a
                    href={buildWhatsappHref("Oi! Vim pela landing do Bóris e quero falar com o criador.")}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Falar com o criador do Bóris
                  </a>
                </Button>

                <Button asChild size="default" variant="outline" className="h-11 rounded-lg px-6">
                  <a href="#como-funciona">Quero entender melhor primeiro</a>
                </Button>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">Atendimento direto no WhatsApp. Sem robô, sem fila.</div>
            </div>
          </div>
        </section>

        <section
          id="problemas"
          data-ui-section
          data-reveal="true"
          data-tone="alt"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-balance text-center text-xl font-semibold tracking-tight md:text-2xl">
              Conversas em grupos de WhatsApp geralmente têm esses desafios…
            </h2>

            <div className="mt-12">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-muted/20 px-6 py-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] md:px-10 md:py-10">
                <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />

                <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
                  <div className="flex flex-col gap-5 md:gap-6">
                    {realProblemsMessages.map((message) => (
                      <div key={message.title} className="flex">
                        <div className="max-w-[92%] rounded-[18px] bg-[#dcf8c6] px-4 py-3 text-[#111b21] shadow-[0_1px_1px_rgba(0,0,0,0.14),0_8px_18px_rgba(0,0,0,0.06)] ring-1 ring-black/5 md:max-w-[78%] md:px-5 md:py-4">
                          <div className="text-[11px] font-medium tracking-tight text-[#54656f] md:text-xs">
                            {message.sender}
                          </div>
                          <div className="mt-1 text-[13px] font-semibold tracking-tight md:text-sm">{message.title}</div>
                          <div className="mt-2 text-[13px] leading-[1.55] text-[#111b21]/90 whitespace-pre-line md:text-sm md:leading-[1.65]">
                            {message.body}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <figure className="relative overflow-hidden rounded-2xl bg-transparent">
                    <img
                      src="/images/v2.png"
                      alt="Prévia de conversas em grupo mostrando desafios comuns no WhatsApp"
                      className="h-auto w-full"
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                </div>
              </div>

              <div className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
                Essas são dores reais de líderes de comunidade que já usam o Bóris.
              </div>
            </div>
          </div>
        </section>

        <section
          id="como-funciona"
          data-ui-section
          data-reveal="true"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">Como funciona</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
              Organização <span className="text-brand">sem tirar ninguém do lugar</span>
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-[1.75] text-muted-foreground">
              O Bóris acompanha a conversa com calma e, nos momentos certos, transforma volume em clareza. Sem forçar formato,
              sem mudar o comportamento das pessoas — e sem tirar ninguém do WhatsApp.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {organizeCards.map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition hover:bg-card/80 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15"
                      aria-hidden
                    >
                      <span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{card.icon}</span>
                    </span>

                    <div>
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{card.title}</h3>
                      <div className="mt-3 text-sm leading-[1.75] text-muted-foreground">{card.description}</div>
                    </div>
                  </div>
                  <span
                    className="pointer-events-none absolute -left-14 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl transition group-hover:bg-brand/15"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="painel"
          data-ui-section
          data-reveal="true"
          data-tone="alt"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                Métricas simples, <span className="text-brand">sem cara de planilha</span>
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Sinais claros para entender participação, momentos fortes e valor gerado.
              </p>

              <div className="mt-8 grid gap-3">
                {communitySignals.map((signal) => (
                  <div
                    key={signal.title}
                    className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 px-5 py-5 transition hover:bg-card/80 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15"
                        aria-hidden
                      >
                        <span className="h-4 w-4 text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">{signal.icon}</span>
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold tracking-tight text-foreground">{signal.title}</h3>
                        <div className="mt-2 text-sm leading-[1.75] text-muted-foreground">{signal.description}</div>
                      </div>
                    </div>
                    <span
                      className="pointer-events-none absolute -left-14 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-brand/10 blur-3xl transition group-hover:bg-brand/15"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-3xl bg-transparent">
              <Carousel
                slides={[...adminCarouselSlides]}
                title="Painel"
                ariaLabel="Imagens do painel do Bóris"
                loop
                transitionDuration={500}
              />
            </figure>
          </div>
        </section>

        <section
          id="como-ajuda"
          data-ui-section
          data-reveal="true"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Como o Bóris <span className="text-brand">ajuda</span> a sua comunidade
            </h2>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {borisHelpsCards.map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:bg-card/80 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15"
                      aria-hidden
                    >
                      <span className="h-4 w-4 text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">{card.icon}</span>
                    </span>

                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold tracking-tight text-foreground">{card.title}</h3>
                      <div className="mt-3 text-sm leading-[1.75] text-muted-foreground">{card.description}</div>

                      <ul className="mt-5 space-y-2 text-xs leading-relaxed text-muted-foreground">
                        {card.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2">
                            <span
                              className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/15"
                              aria-hidden
                            >
                              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5">
                                <path
                                  d="M20 6 9 17l-5-5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <span
                    className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl transition group-hover:bg-brand/15"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="beneficios"
          data-ui-section
          data-reveal="true"
          data-tone="alt"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <h2 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
                Para quem participa, <span className="text-brand">tudo fica mais leve</span>
              </h2>
              <p className="mt-4 text-sm leading-[1.75] text-muted-foreground">Com o Bóris, os membros do grupo:</p>

              <ul className="mt-7 space-y-4 text-sm">
                {memberBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-5 py-4 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  >
                    <span
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand ring-1 ring-brand/15"
                      aria-hidden
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
                        <path
                          d="M20 6 9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm font-medium text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-9 text-sm font-semibold text-foreground">
                Mais <span className="text-brand">pertencimento.</span> Menos cansaço.
              </p>
            </div>

            <figure className="relative overflow-hidden rounded-3xl bg-transparent" style={{ aspectRatio: "4 / 3" }}>
              <img
                src="/images/h7.png"
                alt="Captura de tela do Bóris mostrando participação e interações no grupo"
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section
          id="passo-a-passo"
          data-ui-section
          data-reveal="true"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-balance text-center text-xl font-semibold tracking-tight md:text-2xl">
              Simples. <span className="text-brand">Sem atrito.</span>
            </h2>

            <div className="relative mt-12">
              <div className="pointer-events-none absolute left-5 top-5 bottom-5 w-[1.5px] rounded-full bg-border/80 md:left-10 md:right-10 md:top-5 md:bottom-auto md:h-[1.5px] md:w-auto" />

              <ol className="grid gap-5 md:grid-cols-5 md:gap-6">
                {howItWorksSteps.map((step, index) => (
                  <li key={step.title} className="relative flex gap-4 md:flex-col md:items-center md:gap-5">
                    <div className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 bg-background/50 text-sm font-semibold tracking-tight text-muted-foreground ring-1 ring-border/40">
                      {index + 1}
                    </div>

                    <div
                      data-borderless="true"
                      className="w-full rounded-2xl border border-border bg-card/70 px-5 py-5 transition-colors hover:bg-card/80 md:text-center"
                    >
                      <div className="flex items-center gap-3 md:flex-col md:gap-3">
                        <span
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/15"
                          aria-hidden
                        >
                          <span className="h-5 w-5 text-brand/80 [&>svg]:h-5 [&>svg]:w-5">{step.icon}</span>
                        </span>
                        <h3 className="text-sm font-semibold tracking-tight text-foreground">{step.title}</h3>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section data-ui-section data-reveal="true" data-tone="alt" className="border-t border-border/60 py-16 lg:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-balance text-2xl font-medium leading-[1.25] tracking-tight md:text-4xl">
              O Bóris organiza, resume e mede o que acontece no seu grupo — sem tirar ninguém do WhatsApp.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Eu não substituo o gestor. Eu apoio.
            </p>

            <div className="mt-10">
              <Button asChild size="lg" className="h-12 rounded-full bg-brand px-8 text-brand-foreground hover:bg-brand/90">
                <a
                  href={buildWhatsappHref(
                    "Oi! Quero falar sobre meu grupo no WhatsApp e entender se o Bóris é pra mim."
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Quero falar sobre meu grupo
                </a>
              </Button>
            </div>
          </div>
        </section>

        <section data-ui-section data-reveal="true" className="border-t border-border/60 py-14 lg:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                Sobre comunidade
              </div>
              <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight md:text-3xl">
                Comunidade boa é viva, humana — e dá trabalho.
              </h2>

              <div className="mt-6 max-w-xl space-y-10 text-sm leading-[1.9] text-muted-foreground md:text-base">
                <div>
                  <p>Se você cuida de um grupo no WhatsApp, você já viu como é:</p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                      <span className="text-foreground/90">as conversas acontecem ali</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                      <span className="text-foreground/90">as conexões nascem ali</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-brand/70" aria-hidden />
                      <span className="text-foreground/90">as oportunidades surgem ali</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p>E, quando tudo fica espalhado no chat, sem clareza e dados, acaba ficando difícil:</p>
                  <ul className="mt-5 space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
                      <span className="text-foreground/90">mostrar valor</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
                      <span className="text-foreground/90">tomar boas decisões</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
                      <span className="text-foreground/90">reduzir churn</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-[0.6rem] h-2.5 w-2.5 shrink-0 rounded-full bg-foreground/20" aria-hidden />
                      <span className="text-foreground/90">cuidar bem das pessoas</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <p className="text-base font-medium leading-relaxed text-foreground">É aí que eu entro.</p>
                  <p className="border-l-2 border-brand/25 pl-5 font-medium leading-[1.9] text-foreground/85">
                    Eu estou aqui para te dar visão, organização e tranquilidade — sem complicar nada.
                  </p>
                  <p className="text-foreground/75">Para você respirar — e para o grupo continuar vivo.</p>
                </div>
              </div>
            </div>

            <figure className="relative overflow-hidden rounded-3xl bg-transparent" style={{ aspectRatio: "4 / 3" }}>
              <img
                src="/images/h8.png"
                alt="Gestor de comunidade com celular em um ambiente calmo, com conversas acontecendo ao fundo"
                className="h-full w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </section>

        <section
          id="clientes"
          data-ui-section
          data-reveal="true"
          data-tone="alt"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="text-balance text-center text-xl font-semibold tracking-tight md:text-2xl">
              Eu já ajudo <span className="text-brand">grandes comunidades</span> no Brasil
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-[1.75] text-muted-foreground">
              De startups a grandes redes, o Bóris organiza conversas e transforma comunidades em espaços mais saudáveis.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {socialProofBlocks.map((item) => (
                <div
                  key={item.name}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:bg-card/80 hover:shadow-[0_12px_36px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex items-start gap-5">
                    <div className="inline-flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-background/70">
                      <img
                        src={item.logoSrc}
                        alt={item.name}
                        className="h-full w-full rounded-full object-contain p-3"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold tracking-tight text-foreground">{item.name}</h3>
                      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.context}</div>

                      <div className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                        Como o Bóris ajuda
                      </div>
                      <div className="mt-2 text-sm leading-[1.75] text-muted-foreground">{item.helps}</div>

                      <div className="mt-5 border-l border-border pl-4 text-sm leading-[1.75] text-foreground/80">
                        “{item.testimonial}”
                      </div>
                    </div>
                  </div>

                  <span
                    className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/10 blur-3xl transition group-hover:bg-brand/15"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="cta"
          data-ui-section
          data-reveal="true"
          className="scroll-mt-24 border-t border-border/60 py-14 lg:py-20"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 md:px-10">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">Plano e preço</div>
                <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight md:text-2xl">
                  Um único plano. <span className="text-brand">Claro e transparente.</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-[1.75] text-muted-foreground">
                  E você ainda fala direto comigo para configurar o início. Se a sua realidade envolve muitos grupos, a gente
                  conversa e ajusta juntos.
                </p>

                <div className="mt-7 max-w-2xl">
                  <div className="text-xs font-medium tracking-[0.14em] text-muted-foreground/80">Nada escondido:</div>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-xs leading-relaxed text-muted-foreground/80 marker:text-foreground/25">
                    <li>sem contrato</li>
                    <li>sem taxa de setup</li>
                    <li>você pode cancelar a qualquer momento</li>
                    <li>suporte humano, direto com o criador do Bóris</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col gap-5 md:items-end">
                <div className="w-full rounded-2xl bg-background/60 p-6 text-left md:max-w-sm md:text-right">
                  <div className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">R$ 247</div>
                  <div className="mt-1 text-sm text-muted-foreground">por mês, por grupo</div>
                </div>
                <Button
                  size="lg"
                  className="h-12 rounded-full bg-brand px-8 text-brand-foreground hover:bg-brand/90"
                  onClick={() => setOnboardingOpen(true)}
                >
                  Ativar o Bóris no meu grupo
                </Button>
                <div className="text-xs text-muted-foreground md:text-right">Sem contrato. Cancelamento simples.</div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-brand/10 blur-3xl" />
          </div>
        </section>

        <section
          data-ui-section
          data-reveal="true"
          data-tone="alt"
          className="border-t border-border/60 py-16 lg:py-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 w-full max-w-[clamp(220px,52vw,520px)] md:mb-8">
              <img
                src="/images/h9.png"
                alt="Bóris cuidando da comunidade"
                className="mx-auto h-auto w-full object-contain max-h-[clamp(160px,26vh,320px)]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h2 className="text-balance text-2xl font-medium leading-[1.25] tracking-tight md:text-4xl">
              O Bóris cuida da sua comunidade. <span className="block text-brand">Você cuida das pessoas.</span>
            </h2>

            <div className="mt-10">
              <Button asChild size="lg" className="h-12 rounded-full bg-brand px-8 text-brand-foreground hover:bg-brand/90">
                <a
                  href={buildWhatsappHref("Oi! Quero ver como o Bóris pode ajudar minha comunidade.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar com o criador do Bóris
                </a>
              </Button>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">Atendimento direto com o criador do Bóris.</div>
          </div>
        </section>

        <footer className="border-t border-border py-10">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <LogoMark className="scale-[0.98]" />
              <span>•</span>
              <span>Assistente para comunidades no WhatsApp</span>
            </div>
            <div className="text-muted-foreground/80">© {new Date().getFullYear()} Bóris</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
