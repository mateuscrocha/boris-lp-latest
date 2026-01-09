# Starter Template

Boilerplate genérico (sem regras de negócio) para iniciar qualquer produto digital com boa DX, arquitetura clara e base moderna.

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (componentes base)
- React Router (SPA)
- Supabase (Auth, DB, Storage)
- Client preparado para Evolution API

## Rodar localmente

```bash
npm install
cp .env.example .env
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Arquitetura de pastas

- `src/app`: ponto de entrada, rotas, providers e layout raiz
- `src/components`: componentes reutilizáveis
  - `src/components/ui`: componentes do shadcn/ui
  - `src/components/layout`: layout (AppShell, header, etc.)
- `src/features`: módulos isolados por domínio
  - `src/features/auth`: auth (login, cadastro)
  - `src/features/example`: exemplo (dashboard)
- `src/hooks`: hooks globais (ex.: `useAuth`)
- `src/lib`: clients e helpers (Supabase e Evolution API)
- `src/pages`: páginas genéricas/ponte (ex.: Home)

## Variáveis de ambiente

Preencha no `.env`:

- `ADMIN_PRODUCTION_URL`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_EVOLUTION_API_URL`
- `VITE_EVOLUTION_API_KEY`
- `VITE_EVOLUTION_INSTANCE_ID`
- `VITE_EVOLUTION_WEBHOOK_SECRET`

`ADMIN_PRODUCTION_URL` define a base URL do painel/admin em produção (usado para gerar links e embeds, como onboarding e links de auth).

Você pode definir essa variável por ambiente usando os arquivos do Vite:

- `.env` (local)
- `.env.development` (dev)
- `.env.staging` (staging, com `vite --mode staging`)
- `.env.production` (produção)

## Supabase

1. Crie um projeto no Supabase.
2. Em Project Settings → API, copie a URL e a Anon Key.
3. Em Authentication → Providers, habilite Email/Password.
4. No arquivo `.env`, preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.

Se o Supabase não estiver configurado, a Home continua funcionando, e as telas de auth exibem um aviso.

As páginas `Login` e `Register` usam `@supabase/supabase-js` via `src/lib/supabaseClient.ts`.

## Evolution API

O client base fica em `src/lib/evolutionClient.ts`.
Ele monta URLs no formato:

`EVOLUTION_API_URL/instance/INSTANCE_ID/<path>`

e usa `Authorization: Bearer <API_KEY>`.

## Onde criar features

- Coloque módulos em `src/features/<feature>`
- Reaproveite componentes em `src/components`
- Componentes do shadcn/ui ficam em `src/components/ui`

## Rotas

- `/` Home pública (landing do template)
- `/login` Login
- `/register` Cadastro
- `/app` Dashboard protegido

## Criando uma nova feature (exemplo)

1. Crie uma pasta em `src/features/minha-feature`.
2. Adicione páginas/componentes dentro da feature.
3. Registre a rota em `src/app/routes.tsx`.
4. Reaproveite UI em `src/components` e clients em `src/lib`.
# boris-lp-latest
