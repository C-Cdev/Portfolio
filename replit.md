# Portfólio Caio Melo

Portfólio pessoal em PT-BR para apresentar a formação, interesses, stack estudada, projeto real e focos atuais de Caio Melo.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Frontend: React + Vite + TypeScript + Tailwind CSS + Framer Motion

## Where things live

- `artifacts/caio-melo-portfolio/src/data/portfolio.ts` — conteúdo editável do portfólio
- `artifacts/caio-melo-portfolio/src/components/` — seções, navegação e formulário
- `artifacts/api-server/src/routes/contact.ts` — validação e endpoint `POST /api/contact`
- `lib/api-spec/openapi.yaml` — contrato da API e fonte do codegen

## Architecture decisions

- O conteúdo pessoal e os links ficam centralizados no data layer; links ainda não fornecidos permanecem indisponíveis na interface.
- O formulário usa o endpoint compartilhado e um adaptador de entrega no servidor, sem acoplar o React a um provedor de e-mail.
- A imagem do hero e as ilustrações de estudo são slots locais substituíveis, com placeholders quando os arquivos ainda não existem.

## Product

Página única responsiva com navegação desktop/mobile, Progress Pill baseada no scroll, apresentação acadêmica, stack estudada, projeto real, focos atuais, relógio de Manaus e formulário de contato preparado para envio transacional.

## User preferences

- Manter PT-BR como idioma inicial e não inventar URLs, métricas, experiências, projetos ou informações pessoais.

## Gotchas

- Após mudanças em `lib/api-spec/openapi.yaml`, executar o codegen antes de usar os tipos/hooks atualizados.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
