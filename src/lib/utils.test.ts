import { describe, expect, it } from "vitest";

import { joinUrl, resolveAdminProductionUrl } from "./utils";

describe("resolveAdminProductionUrl", () => {
  it("normaliza URL vinda do env e remove barra final", () => {
    expect(resolveAdminProductionUrl({ envValue: "https://central.euboris.com.br/" })).toBe(
      "https://central.euboris.com.br"
    );
  });

  it("cai para origin quando env não está definido", () => {
    expect(resolveAdminProductionUrl({ envValue: undefined, origin: "http://localhost:5173" })).toBe(
      "http://localhost:5173"
    );
  });

  it("retorna string vazia quando não consegue resolver", () => {
    expect(resolveAdminProductionUrl({ envValue: "not-a-url", origin: "" })).toBe("");
  });
});

describe("joinUrl", () => {
  it("monta caminho relativo corretamente", () => {
    expect(joinUrl("https://central.euboris.com.br", "/onboarding")).toBe("https://central.euboris.com.br/onboarding");
  });

  it("retorna string vazia quando base é vazia", () => {
    expect(joinUrl("", "onboarding")).toBe("");
  });
});
