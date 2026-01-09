import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AdminUrlResolutionInput = {
  envValue?: string;
  origin?: string;
};

function normalizeExternalBaseUrl(value: string) {
  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    const normalized = url.toString().replace(/\/+$/, "");
    return normalized;
  } catch {
    return null;
  }
}

export function resolveAdminProductionUrl(input: AdminUrlResolutionInput = {}) {
  const fromEnv = typeof input.envValue === "string" ? normalizeExternalBaseUrl(input.envValue) : null;
  if (fromEnv) return fromEnv;

  const origin = input.origin;
  if (typeof origin === "string") {
    const normalizedOrigin = normalizeExternalBaseUrl(origin);
    if (normalizedOrigin) return normalizedOrigin;
  }

  return "";
}

export function getAdminProductionUrl() {
  const origin = typeof window !== "undefined" ? window.location.origin : undefined;
  return resolveAdminProductionUrl({ envValue: import.meta.env.ADMIN_PRODUCTION_URL, origin });
}

export function joinUrl(baseUrl: string, path: string) {
  const normalizedBase = baseUrl.replace(/\/+$/, "");
  if (!normalizedBase) return "";
  const normalizedPath = path.replace(/^\/+/, "");
  try {
    const url = new URL(normalizedPath, `${normalizedBase}/`);
    return url.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}
