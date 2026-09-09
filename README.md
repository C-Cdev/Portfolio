# Portfólio Caio Melo

Portfólio pessoal de Caio Melo, acadêmico de Engenharia de Software na Universidade Federal do Amazonas. A página apresenta sua base acadêmica, interesses, stack estudada, projeto real em desenvolvimento e focos atuais de estudo.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Express 5 para o endpoint de contato

## Instalação e execução local

Na raiz do workspace:

```bash
pnpm install
pnpm --filter @workspace/caio-melo-portfolio run dev
```

O servidor do portfólio recebe `PORT` e `BASE_PATH` pelo workflow. Para o formulário, o endpoint da aplicação é `/api/contact`.

Para executar a API separadamente:

```bash
pnpm --filter @workspace/api-server run dev
```

## Estrutura

```text
artifacts/caio-melo-portfolio/
├── public/
│   ├── assets/             # hero-caio.jpg, algoritmos-c.jpg e ui-ux.jpg
│   └── favicon.svg
└── src/
    ├── components/         # seções e navegação da página
    ├── data/               # conteúdo editável do portfólio
    ├── lib/                # integrações pequenas da interface
    ├── App.tsx
    └── index.css           # tokens e estilos globais
```

## Environment variables

Copie os exemplos antes de configurar o projeto:

```bash
cp .env.example .env
cp artifacts/caio-melo-portfolio/.env.example artifacts/caio-melo-portfolio/.env
```

O frontend usa `VITE_CONTACT_ENDPOINT=/api/contact` por padrão. A API usa:

- `CONTACT_EMAIL`: caixa de entrada que receberá os contatos;
- `CONTACT_PROVIDER`: identificador do provider escolhido posteriormente;
- `CONTACT_DRY_RUN=true`: aceita a mensagem sem enviar e-mail, útil apenas para validar o fluxo local.

O adaptador do provider fica isolado no servidor para que o formulário React não dependa do SDK de um serviço específico. Nenhuma credencial real deve ser versionada.

## Substituir imagens

Adicione os arquivos abaixo em `artifacts/caio-melo-portfolio/public/assets/`:

- `hero-caio.jpg`
- `algoritmos-c.jpg`
- `ui-ux.jpg`

Os componentes detectam a ausência dos arquivos e exibem placeholders discretos. Não há imagens fictícias ou stock photos no projeto.

## Adicionar projetos

Edite `artifacts/caio-melo-portfolio/src/data/portfolio.ts` e adicione os dados do novo projeto ao objeto de conteúdo. Só publique URLs, métricas e tecnologias que sejam reais e estejam confirmadas.

## Configurar o formulário

O formulário envia JSON para `POST /api/contact` com `name`, `email`, `message` e o campo honeypot `website`. O servidor valida o payload, aplica rate limiting básico e mantém o envio separado do componente React. Para ativar entregas reais, implemente o provider escolhido dentro do adaptador de contato e configure as variáveis de ambiente sem expor segredos no código.

## Build de produção

```bash
pnpm --filter @workspace/caio-melo-portfolio run typecheck
pnpm --filter @workspace/caio-melo-portfolio run build
pnpm --filter @workspace/api-server run typecheck
```