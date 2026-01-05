import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { Carousel } from "./carousel";

const slides = [
  { src: "/a.png", alt: "Slide A" },
  { src: "/b.png", alt: "Slide B" },
  { src: "/c.png", alt: "Slide C" },
];

describe("Carousel", () => {
  it("não renderiza nada quando slides está vazio", () => {
    const { container } = render(<Carousel slides={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza indicadores e muda slide ao clicar", () => {
    render(<Carousel slides={slides} title="Teste" />);

    const dot1 = screen.getByRole("button", { name: "Ir para item 1" });
    const dot2 = screen.getByRole("button", { name: "Ir para item 2" });

    expect(dot1).toHaveAttribute("aria-current", "true");
    expect(dot2).toHaveAttribute("aria-current", "false");

    fireEvent.click(dot2);

    expect(dot2).toHaveAttribute("aria-current", "true");
    expect(dot1).toHaveAttribute("aria-current", "false");
  });

  it("desabilita botões nas bordas quando loop é falso", () => {
    render(<Carousel slides={slides} title="Teste" loop={false} />);

    const prev = screen.getByRole("button", { name: "Ver item anterior" });
    const next = screen.getByRole("button", { name: "Ver próximo item" });

    expect(prev).toBeDisabled();
    expect(next).not.toBeDisabled();

    fireEvent.click(next);
    fireEvent.click(next);

    expect(next).toBeDisabled();
  });

  it("faz loop do último para o primeiro", () => {
    render(<Carousel slides={slides} title="Teste" loop />);

    const next = screen.getByRole("button", { name: "Ver próximo item" });

    fireEvent.click(next);
    fireEvent.click(next);

    expect(screen.getByRole("button", { name: "Ir para item 3" })).toHaveAttribute("aria-current", "true");

    fireEvent.click(next);
    expect(screen.getByRole("button", { name: "Ir para item 1" })).toHaveAttribute("aria-current", "true");
  });

  it("avança automaticamente quando autoplay está ativo", () => {
    vi.useFakeTimers();
    render(<Carousel slides={slides} title="Teste" autoplay autoplayInterval={1200} loop />);

    expect(screen.getByRole("button", { name: "Ir para item 1" })).toHaveAttribute("aria-current", "true");

    act(() => {
      vi.advanceTimersByTime(1300);
    });

    expect(screen.getByRole("button", { name: "Ir para item 2" })).toHaveAttribute("aria-current", "true");
    vi.useRealTimers();
  });
});
