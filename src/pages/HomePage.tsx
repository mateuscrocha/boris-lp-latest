import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const whatsappCtaHref = "https://wa.me/0000000000000";

const navItems = [
  { label: "Problemas", href: "#problemas" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Painel", href: "#painel" },
  { label: "Começar", href: "#cta" },
];

const organizeCards = [
  {
    title: "Organiza sem interromper",
    description: "Placeholder: o grupo continua no WhatsApp, com mais clareza e menos ruído.",
  },
  {
    title: "Resume o que realmente importa",
    description: "Placeholder: decisões, tarefas e destaques viram um resumo que dá para confiar.",
  },
  {
    title: "Mostra o valor da comunidade",
    description: "Placeholder: sinais simples de participação para líderes e administradores.",
  },
];

const metricTiles = [
  { label: "Participação", value: "—%", helper: "Placeholder" },
  { label: "Mensagens-chave", value: "—", helper: "Placeholder" },
  { label: "Picos de conversa", value: "—", helper: "Placeholder" },
  { label: "Resumo semanal", value: "—", helper: "Placeholder" },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-card"
        aria-hidden
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2c3 3 5 6 5 9a5 5 0 0 1-10 0c0-2.5 1.2-4.8 5-9Z"
            className="fill-brand"
          />
          <path
            d="M8.5 13.5c.6 3.4 2.6 5.5 5.5 8.5 2.3-2 3.8-3.6 4.3-5.8"
            className="stroke-brand"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="text-sm font-semibold tracking-tight">Bóris</span>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="w-full max-w-4xl">
      <div
        className="overflow-hidden rounded-3xl bg-background shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
        style={{ aspectRatio: "16 / 9" }}
      >
        <img
          src="/images/hero-boris.png"
          alt="Ilustração do Bóris organizando conversas no WhatsApp"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </div>
    </div>
  );
}

export function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a href="#top" className="shrink-0">
            <LogoMark />
          </a>

          <nav className="hidden items-center gap-5 text-sm md:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-full">
              <a href={whatsappCtaHref} target="_blank" rel="noreferrer">
                Abrir no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main id="top" className="mx-auto w-full max-w-6xl px-6">
        <section className="flex min-h-[70vh] items-center py-16 lg:min-h-[74vh] lg:py-24">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
            <HeroImage />

            <h1 className="mt-8 text-4xl font-medium leading-[1.1] tracking-tight md:text-6xl">
              Um grupo de WhatsApp junta pessoas.
              <span className="block text-brand">O Bóris transforma isso em comunidade.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Eu organizo as conversas, resumo o que importa, meço o engajamento e ajudo você a mostrar o valor real da sua
              comunidade, sem tirar ninguém do WhatsApp.
            </p>

            <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <Button asChild size="default" className="h-11 rounded-lg px-6">
                <a href={whatsappCtaHref} target="_blank" rel="noreferrer">
                  Falar com o criador do Bóris
                </a>
              </Button>

              <a
                href="#como-funciona"
                className="w-fit text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Entender melhor primeiro
              </a>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">Atendimento direto pelo WhatsApp. Sem robô, sem fila.</div>
          </div>
        </section>

        <section id="problemas" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                O Problema do Gestor de Comunidade
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">
                Ser gestor de comunidade dá trabalho. Muito trabalho.
              </h2>

              <div className="mt-5 max-w-xl">
                <div className="space-y-3 rounded-2xl bg-muted/30 px-5 py-4 text-sm leading-relaxed text-muted-foreground ring-1 ring-border/25 md:px-6 md:py-5 md:text-base">
                  <p>Conversas o dia inteiro.</p>
                  <p>Mensagens acumulando.</p>
                  <p>Gente esperando resposta.</p>
                  <p>E a sensação constante de que algo importante pode ter passado despercebido.</p>
                </div>

                <div className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
                  Na prática, você segura tudo isso ao mesmo tempo
                </div>

                <ul className="mt-4 grid gap-3 text-sm leading-relaxed">
                  {[
                    "acompanhar tudo o que acontece",
                    "responder quando precisam de você",
                    "organizar decisões e informações",
                    "provar o valor da comunidade para parceiros e liderança",
                  ].map((item) => (
                    <li
                      key={item}
                      className="group relative overflow-hidden rounded-2xl bg-background/70 px-4 py-4 text-foreground/90 ring-1 ring-border/25 transition hover:bg-background/85 hover:ring-border/40 hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15"
                          aria-hidden
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                        </span>
                        <span className="font-medium tracking-tight">{item}</span>
                      </div>
                      <span
                        className="pointer-events-none absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/15"
                        aria-hidden
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <figure
              className="relative overflow-hidden rounded-3xl bg-card/40 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <img
                src="/images/boris-problems.png"
                alt="Gestor de comunidade acompanhando mensagens e decisões enquanto trabalha"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-background/10 to-transparent" />
              <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-14 -right-10 h-44 w-44 rounded-full bg-muted/70 blur-3xl" />
              <div className="pointer-events-none absolute right-10 top-10 h-12 w-20 rounded-2xl bg-primary/10 blur-xl" />
              <div className="pointer-events-none absolute right-24 top-24 h-10 w-16 rounded-2xl bg-muted/60 blur-xl" />
            </figure>
          </div>
        </section>

        <section id="como-funciona" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Organização sem tirar ninguém do lugar</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Placeholder: o Bóris é um guia gentil. Ele organiza, resume e traz clareza — com calma e sem ruído.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                {organizeCards.map((card) => (
                  <div key={card.title} className="rounded-2xl border border-border bg-card p-5">
                    <div className="text-sm font-semibold tracking-tight">{card.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-sm font-semibold tracking-tight">Placeholder: como aparece no grupo</div>
              <div className="mt-4 space-y-3">
                {[
                  {
                    label: "Resumo",
                    text: "Placeholder: um resumo curto que dá contexto sem cansar.",
                  },
                  {
                    label: "Pontos-chave",
                    text: "Placeholder: decisões, tarefas e links em blocos bem separados.",
                  },
                  {
                    label: "Ritmo",
                    text: "Placeholder: o Bóris aparece quando faz sentido, não o tempo todo.",
                  },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-border bg-background px-4 py-3">
                    <div className="text-xs font-medium text-muted-foreground">{item.label}</div>
                    <div className="mt-1 text-sm leading-relaxed">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="painel" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Métricas simples, sem cara de planilha</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Placeholder: sinais claros para líderes entenderem participação, momentos fortes e valor gerado.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {metricTiles.map((tile) => (
                  <div key={tile.label} className="rounded-2xl border border-border bg-card p-5">
                    <div className="text-xs font-medium text-muted-foreground">{tile.label}</div>
                    <div className="mt-2 text-2xl font-semibold tracking-tight">{tile.value}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{tile.helper}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold tracking-tight">Placeholder: painel</div>
                  <div className="mt-1 text-xs text-muted-foreground">Resumo, organização e engajamento</div>
                </div>
                <div className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                  Atualizado agora
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-medium text-muted-foreground">Top temas</div>
                  <div className="mt-3 space-y-2">
                    {[
                      { label: "Placeholder", pct: "—" },
                      { label: "Placeholder", pct: "—" },
                      { label: "Placeholder", pct: "—" },
                    ].map((item, idx) => (
                      <div key={`${item.label}-${idx}`} className="flex items-center justify-between gap-3">
                        <div className="text-sm">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.pct}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="text-xs font-medium text-muted-foreground">Resumo da semana</div>
                  <div className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Placeholder: um parágrafo curto com os principais pontos e próximos passos.
                  </div>
                  <div className="mt-4 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                    Placeholder: 3 itens em lista
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground">Atividade</div>
                  <div className="text-xs text-muted-foreground">Placeholder</div>
                </div>
                <svg
                  className="mt-4 h-20 w-full"
                  viewBox="0 0 240 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                >
                  <path
                    d="M8 52 C30 46, 54 58, 80 44 C108 30, 130 60, 156 40 C184 18, 202 30, 232 22"
                    className="stroke-brand"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 md:px-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Placeholder: pronto para dar clareza ao grupo?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Placeholder: fale com o Bóris no WhatsApp e veja como a organização aparece sem pesar no dia a dia.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <Button asChild size="lg" className="rounded-full">
                  <a href={whatsappCtaHref} target="_blank" rel="noreferrer">
                    Placeholder: abrir conversa
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full">
                  <a href="#top">Voltar ao topo</a>
                </Button>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </section>

        <footer className="border-t border-border py-10">
          <div className="flex flex-col gap-3 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <LogoMark className="scale-[0.98]" />
              <span>•</span>
              <span>Placeholder: assistente para comunidades no WhatsApp</span>
            </div>
            <div className="text-muted-foreground/80">Placeholder: política, contato, etc.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}
