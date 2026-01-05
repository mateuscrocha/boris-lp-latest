import { Button } from "@/components/ui/button";

const whatsappBaseHref = "https://wa.me/5561981569893";

function buildWhatsappHref(message: string) {
  return `${whatsappBaseHref}?text=${encodeURIComponent(message)}`;
}

const manifestoText = `Comunidade não é ferramenta.  
Não é automação.  
Não é métrica.

Comunidade é gente.

Gente que conversa.  
Gente que aprende.  
Gente que precisa de um lugar seguro para trocar.

E, hoje, esse lugar — na maioria das vezes — é o WhatsApp.

É simples.  
É humano.  
É direto.

Mas, quando a comunidade cresce, o que era leve vira sobrecarga.  

Mensagens se acumulam.  
Assuntos se perdem.  
Pessoas ficam invisíveis.  
E quem lidera começa a carregar um peso que ninguém vê.  

Organizar.  
Responder.  
Apoiar.  
Cuidar de todo mundo.

Tudo isso sem perder o ritmo, o carinho, a intenção.

Ser gestor de comunidade dá trabalho.  
E não é porque você faz errado.  
É porque você se importa.

O Bóris nasceu daqui.

Não para substituir o humano.  
Não para padronizar conversa.  
Não para transformar relação em processo.

Mas para cuidar do fluxo.  
Para transformar bagunça em clareza.  
Para dar visibilidade ao que importa.  
Para devolver leveza para quem lidera — e pertencimento para quem participa.

Eu não acredito em remover pessoas do WhatsApp para “organizar melhor”.  
Eu acredito em respeitar o lugar onde elas já estão.

Eu vejo comunidade como:

um espaço vivo  
feito de histórias  
construído em confiança

E confio que números e dados podem ajudar —  
mas só quando estão a serviço do humano.

Por isso, o Bóris organiza.  
Resume.  
Mede.  
Acompanha.

Mas nunca toma o seu lugar.  
Nunca decide por você.  
Nunca substitui a relação.

Eu apoio.  
Eu somo.

Porque comunidade é sobre gente.  
E gente merece ser bem cuidada.`;

function LogoMark() {
  return <img src="/images/logo.png" alt="Bóris" className="h-8 w-auto" loading="eager" />;
}

export function ManifestoPage() {
  return (
    <div id="top" className="min-h-dvh bg-background text-foreground">
      <header className="bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5">
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground"
          >
            Pular para o conteúdo
          </a>
          <a href="/" className="shrink-0">
            <LogoMark />
          </a>

          <nav className="flex items-center gap-5 text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground">
              Início
            </a>
          </nav>
        </div>
      </header>

      <main id="conteudo" className="mx-auto w-full max-w-2xl px-6 pb-20 pt-14 md:pb-28 md:pt-20">
        <h1 className="text-3xl font-medium tracking-tight md:text-4xl">Manifesto Bóris</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          Sobre comunidade, conexão e cuidado.
        </p>

        <div className="mt-12 whitespace-pre-wrap text-[15px] leading-[1.95] text-foreground/90 md:text-base">
          {manifestoText}
        </div>

        <div className="mt-14">
          <div className="text-sm font-medium tracking-tight md:text-base">Bóris</div>
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
            Eu não substituo o gestor. Eu apoio.
          </div>
        </div>

        <div className="mt-10">
          <Button
            asChild
            variant="ghost"
            className="h-auto rounded-none px-0 py-0 text-muted-foreground underline underline-offset-4 decoration-border hover:bg-transparent hover:text-foreground"
          >
            <a
              href={buildWhatsappHref("Oi! Li o Manifesto Bóris e queria falar com o criador.")}
              target="_blank"
              rel="noreferrer"
            >
              Falar com o criador do Bóris
            </a>
          </Button>
        </div>
      </main>
    </div>
  );
}
