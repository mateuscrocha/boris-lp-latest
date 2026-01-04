const evolutionApiUrl = import.meta.env.VITE_EVOLUTION_API_URL as string | undefined;
const evolutionApiKey = import.meta.env.VITE_EVOLUTION_API_KEY as string | undefined;
const evolutionInstanceId = import.meta.env.VITE_EVOLUTION_INSTANCE_ID as string | undefined;

type EvolutionRequestOptions = RequestInit & {
  json?: unknown;
};

export async function evolutionRequest(path: string, options: EvolutionRequestOptions = {}) {
  if (!evolutionApiUrl || !evolutionApiKey || !evolutionInstanceId) {
    throw new Error(
      "Variáveis da Evolution API ausentes. Defina VITE_EVOLUTION_API_URL, VITE_EVOLUTION_API_KEY e VITE_EVOLUTION_INSTANCE_ID no .env."
    );
  }

  const normalizedPath = path.replace(/^\/+/, "");
  const url = `${evolutionApiUrl.replace(/\/+$/, "")}/instance/${evolutionInstanceId}/${normalizedPath}`;

  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${evolutionApiKey}`);

  const hasBody = typeof options.json !== "undefined" || typeof options.body !== "undefined";
  if (hasBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body: typeof options.json !== "undefined" ? JSON.stringify(options.json) : options.body,
  });

  if (!response.ok) {
    let details: unknown = undefined;
    try {
      details = await response.json();
    } catch {
      details = await response.text();
    }

    const message =
      typeof details === "string"
        ? details
        : details
          ? JSON.stringify(details)
          : "Resposta sem detalhes";

    throw new Error(`Evolution API: ${response.status} ${response.statusText} - ${message}`);
  }

  if (response.status === 204) return null;

  return response.json();
}

