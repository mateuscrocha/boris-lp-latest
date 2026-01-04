import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const whatsappCtaHref = "https://wa.me/0000000000000";

const navItems = [
  { label: "Problemas", href: "#problemas" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Painel", href: "#painel" },
  { label: "Começar", href: "#cta" },
];

const problemCards = [
  {
    title: "Conversas importantes se perdem",
    description: "Placeholder: mensagens, decisões e links se misturam no fluxo e somem rápido.",
  },
  {
    title: "Resumo vira trabalho manual",
    description: "Placeholder: alguém precisa parar tudo para organizar e repassar os pontos.",
  },
  {
    title: "Engajamento fica no escuro",
    description: "Placeholder: difícil provar valor, entender participação e ajustar a comunidade.",
  },
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

function MascotPanelMock() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          <div>
            <div className="text-sm font-medium leading-none tracking-tight">Resumo do grupo</div>
            <div className="mt-1 text-xs text-muted-foreground">Placeholder: últimos 7 dias</div>
          </div>
        </div>
        <div className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
          Em andamento
        </div>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Conversas</div>
          <div className="space-y-2">
            {[
              { title: "Decisão", subtitle: "Placeholder: consenso e próximos passos" },
              { title: "Destaque", subtitle: "Placeholder: link importante compartilhado" },
              { title: "Perguntas", subtitle: "Placeholder: pontos que ficaram abertos" },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 rounded-xl border border-border bg-background px-3 py-3"
              >
                <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{item.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-medium text-muted-foreground">Engajamento</div>
          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Placeholder</div>
                <div className="mt-1 text-2xl font-semibold tracking-tight">—</div>
              </div>
              <div className="text-xs text-muted-foreground">semana</div>
            </div>
            <svg
              className="mt-4 h-20 w-full"
              viewBox="0 0 240 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M8 60 C40 50, 60 28, 92 36 C122 44, 138 22, 168 26 C194 30, 206 42, 232 18"
                className="stroke-primary"
                strokeWidth="2.25"
                strokeLinecap="round"
              />
              <path
                d="M8 60 C40 50, 60 28, 92 36 C122 44, 138 22, 168 26 C194 30, 206 42, 232 18 L232 80 L8 80 Z"
                className="fill-primary/10"
              />
            </svg>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Mensagens", value: "—" },
                { label: "Reações", value: "—" },
                { label: "Novos", value: "—" },
              ].map((item) => (
                <div key={item.label} className="rounded-lg border border-border bg-card px-3 py-2">
                  <div className="text-[11px] text-muted-foreground">{item.label}</div>
                  <div className="mt-1 text-sm font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium tracking-tight">O que mudou</div>
              <div className="text-xs text-muted-foreground">Placeholder</div>
            </div>
            <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Placeholder: dois ou três tópicos curtos aparecem aqui como resumo da semana.
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-brand/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
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
        <section className="grid gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />
              Placeholder: assistente para grupos de WhatsApp
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">
              Um grupo junta pessoas.
              <span className="block text-brand">O Bóris transforma isso em comunidade.</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Placeholder: o Bóris organiza conversas, resume pontos importantes e mostra sinais de engajamento — sem
              tirar ninguém do WhatsApp.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="rounded-full">
                <a href={whatsappCtaHref} target="_blank" rel="noreferrer">
                  Placeholder: falar com o Bóris
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="#como-funciona">Ver como funciona</a>
              </Button>
            </div>

            <div className="mt-6 text-xs text-muted-foreground">
              Placeholder: leve, humano e claro. Sem promessas exageradas.
            </div>
          </div>

          <div className="lg:pt-2">
            <MascotPanelMock />
          </div>
        </section>

        <section id="problemas" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Quando tudo acontece no WhatsApp</h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                Placeholder: o fluxo é rápido, humano e útil — mas pode virar bagunça quando o grupo cresce.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {problemCards.map((card) => (
                <div key={card.title} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    <div>
                      <div className="text-sm font-semibold tracking-tight">{card.title}</div>
                      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
