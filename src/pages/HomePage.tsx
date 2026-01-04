import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stackItems = [
  "React + TypeScript com Vite",
  "Supabase para Auth, DB e Storage",
  "Tailwind CSS + shadcn/ui",
  "Evolution API preparada via client",
];

const features = [
  {
    title: "Auth estruturada",
    description: "Login e cadastro com Supabase, prontos para expandir.",
  },
  {
    title: "Dashboard protegido",
    description: "Rotas protegidas com redirecionamento para /login.",
  },
  {
    title: "Evolution API pronta",
    description: "Client genérico para integrar quando fizer sentido.",
  },
];

export function HomePage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold tracking-wide">Starter Template</div>
            <div className="mt-1 text-sm text-muted-foreground">React + Supabase + Tailwind</div>
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <a className="text-muted-foreground hover:text-foreground" href="#stack">
              Stack
            </a>
            <a className="text-muted-foreground hover:text-foreground" href="#features">
              Features
            </a>
            <a className="text-muted-foreground hover:text-foreground" href="#como-usar">
              Como usar
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
              Template base para novos projetos
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
                Comece qualquer produto digital com uma base clara, moderna e pronta para crescer.
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Um boilerplate simples e genérico, pensado para boa DX, organização de arquitetura e evolução sem
                over-engineering.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/app">Ir para /app</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Ir para /login</Link>
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              Esta página é uma landing neutra do template e pode ser ajustada livremente em novos projetos.
            </div>
          </div>

          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Stack do template</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {stackItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="stack" className="mt-16 scroll-mt-24 space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Stack</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Este template já nasce com uma estrutura organizada para você começar simples e escalar com segurança.
            Rotas, providers globais, componentes reutilizáveis e integração com Supabase ficam prontos desde o início.
          </p>
        </section>

        <section id="features" className="mt-16 scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Features</h2>
            <p className="text-sm text-muted-foreground">Blocos prontos para acelerar o desenvolvimento.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title}>
                <CardHeader>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{f.description}</CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="como-usar" className="mt-16 scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Como usar</h2>
            <p className="text-sm text-muted-foreground">Passos rápidos para começar um projeto novo.</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-border bg-muted text-xs text-foreground">
                    1
                  </span>
                  <span>Clone o repositório e instale as dependências.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-border bg-muted text-xs text-foreground">
                    2
                  </span>
                  <span>Copie o arquivo .env.example para .env e preencha as variáveis.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-border bg-muted text-xs text-foreground">
                    3
                  </span>
                  <span>Configure o Supabase (Auth/DB/Storage) e teste login/cadastro.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-md border border-border bg-muted text-xs text-foreground">
                    4
                  </span>
                  <span>Crie novas features dentro de src/features e mantenha o código modular.</span>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>

        <footer className="mt-16 border-t border-border pt-8">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div>Starter Template • Boilerplate genérico</div>
            <div className="text-muted-foreground/80">Feito para começar rápido e evoluir com clareza.</div>
          </div>
        </footer>
      </main>
    </div>
  );
}

