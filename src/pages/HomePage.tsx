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
  {
    title: "Resumo da semana",
    description: "Um resumo curto com os principais pontos e próximos passos.",
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
                src="/images/boris-atarefado.jpg"
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
          <div className="mx-auto max-w-5xl">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">Como funciona</div>
            <h2 className="mt-3 text-xl font-semibold tracking-tight md:text-2xl">Organização sem tirar ninguém do lugar</h2>
            <p className="mt-3 max-w-3xl text-sm leading-[1.75] text-muted-foreground">
              O Bóris acompanha a conversa com calma e, nos momentos certos, transforma volume em clareza. Sem forçar formato,
              sem mudar o comportamento das pessoas — e sem tirar ninguém do WhatsApp.
            </p>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {organizeCards.map((card) => (
                <div
                  key={card.title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary/70 ring-1 ring-primary/15"
                      aria-hidden
                    >
                      <span className="h-4 w-4 [&>svg]:h-4 [&>svg]:w-4">{card.icon}</span>
                    </span>

                    <div>
                      <div className="text-sm font-semibold tracking-tight text-foreground">{card.title}</div>
                      <div className="mt-3 text-sm leading-[1.75] text-muted-foreground">{card.description}</div>
                    </div>
                  </div>
                  <span
                    className="pointer-events-none absolute -left-14 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/15"
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="painel" className="scroll-mt-24 border-t border-border py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="text-xl font-semibold tracking-tight md:text-2xl">Métricas simples, sem cara de planilha</h2>
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
                        className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary/70 ring-1 ring-primary/15"
                        aria-hidden
                      >
                        <span className="h-4 w-4 text-foreground/80 [&>svg]:h-4 [&>svg]:w-4">{signal.icon}</span>
                      </span>
                      <div>
                        <div className="text-sm font-semibold tracking-tight text-foreground">{signal.title}</div>
                        <div className="mt-2 text-sm leading-[1.75] text-muted-foreground">{signal.description}</div>
                      </div>
                    </div>
                    <span
                      className="pointer-events-none absolute -left-14 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl transition group-hover:bg-primary/15"
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>

            <figure
              className="relative overflow-hidden rounded-3xl border border-border bg-card/40 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
              style={{ aspectRatio: "4 / 3" }}
            >
              <img
                src="/images/boris-organization.png"
                alt="Ilustração do painel do Bóris mostrando sinais claros da comunidade"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-background/10 to-transparent" />
              <div className="pointer-events-none absolute -left-12 -top-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-muted/70 blur-3xl" />
            </figure>
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
