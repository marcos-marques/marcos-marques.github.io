# Plano: Página de Perfil Profissional — marcos-marques.github.io (MVP)

## Contexto

Repositório vazio. Objetivo: single-page portfolio estático publicado no GitHub Pages,
com as seções Hero/Bio, Experiência, Skills, Projetos e Contato.
Blog fica fora do escopo (tarefa futura).

---

## Stack — versões

| Pacote | Versão | Nota |
|---|---|---|
| astro | 7.4.2 | |
| @astrojs/check | 0.9.12 | Necessário para `astro check` |
| typescript | 6.0.3 | 7.0.2 incompatível com @astrojs/check (desvio aprovado) |
| tailwindcss | 4.3.3 | v4: CSS-first, sem `tailwind.config.mjs` |
| @tailwindcss/vite | 4.3.3 | Plugin Vite (não usar `@astrojs/tailwind`) |
| vitest | 5.0.5 | |
| @playwright/test | 1.64.1 | |
| @axe-core/playwright | 4.14.0 | API `AxeBuilder` |
| linkinator | 8.1.0 | API programática (`LinkChecker`) |
| @types/node | ^26.6.5 | Necessário para `process.env.CI` (desvio) |
| pnpm | 12.15.0 | Fixado em `packageManager` |
| Node | 24 (LTS) | Fixado em `.nvmrc` |

---

## Estrutura de pastas

```
marcos-marques.github.io/
├── .github/workflows/deploy.yml
├── src/
│   ├── components/
│   │   ├── Hero.astro          # Avatar, nome, título, CTAs
│   │   ├── Experience.astro    # Timeline de cargos
│   │   ├── Skills.astro        # Grid por categoria
│   │   ├── Projects.astro      # Cards de projetos
│   │   └── Contact.astro       # LinkedIn + e-mail ofuscado
│   ├── layouts/BaseLayout.astro  # HTML base, meta/OG, nav, footer
│   ├── pages/index.astro         # Importa todas as seções
│   ├── data/
│   │   ├── experience.ts       # { title, company, start, end: string | null }
│   │   ├── projects.ts         # { name, url, description, tags }
│   │   └── skills.ts           # Record<string, string[]>
│   └── styles/global.css
├── public/
│   ├── favicon.svg
│   └── images/avatar.svg       # Placeholder SVG (sem foto real)
├── tests/
│   ├── unit/experience.test.ts
│   └── e2e/
│       ├── home.spec.ts
│       └── links.spec.ts
├── astro.config.mjs
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── CLAUDE.md
├── PLAN.md
├── .nvmrc
├── package.json
└── .gitignore
```

Cada seção tem `id` correspondente: `#hero`, `#experience`, `#skills`, `#projects`, `#contact`.

---

## Dados de exemplo

- Todo o conteúdo em `src/data/` é **fictício**; cada arquivo começa com `// TODO: substituir por dados reais`.
- URLs externas em `https://example.com/...`, exceto LinkedIn (`https://www.linkedin.com/in/exemplo`).
- E-mail de exemplo: `contato@example.com`.
- Avatar: SVG placeholder com iniciais.
- `experience.ts`: ≥ 3 cargos, um com `end: null`, em ordem decrescente de `start`.

---

## Contato

- LinkedIn: link direto.
- E-mail: montado no cliente via `<script>` inline; `aria-label` idêntico ao texto visível (WCAG 2.5.3).
- Sem formulário no MVP.

---

## Configuração

### astro.config.mjs

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://marcos-marques.github.io",
  output: "static",
  vite: { plugins: [tailwindcss()] },
});
```

### src/styles/global.css

```css
@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);   /* oklch(60%) falhou axe; 50% dá ~5.9:1 com branco */
  --font-sans: "Inter", system-ui, sans-serif;
}
```

---

## Testes

### Unitário — tests/unit/experience.test.ts

- Array em ordem decrescente de `start`.
- Cargos ativos (`end: null`) aparecem primeiro.

### E2E — playwright.config.ts

```ts
webServer: {
  command: "pnpm preview --port 4321",
  url: "http://localhost:4321",
  reuseExistingServer: !process.env.CI,
},
use: { baseURL: "http://localhost:4321" },
```

Pré-condição: `pnpm build` antes de `pnpm test:e2e`. Apenas Chromium.

### tests/e2e/home.spec.ts

- As 5 seções existem e estão visíveis.
- Acessibilidade obrigatória (sem `disableRules`, sem `skip`):
  ```ts
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
  ```

### tests/e2e/links.spec.ts

- `LinkChecker` contra `http://localhost:4321`, `recurse: true`.
- Verifica apenas links internos via `linksToSkip: async (url) => !url.startsWith("http://localhost:4321")`.
- Falha se algum link estiver `BROKEN`, listando os links na mensagem de erro.

---

## Pipeline — .github/workflows/deploy.yml

```yaml
name: CI & Deploy

on:
  pull_request:
  push:
    branches: [main]

permissions:
  contents: read

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .nvmrc
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm check
      - run: pnpm test
      - run: pnpm build
      - run: pnpm exec playwright install --with-deps chromium
      - run: pnpm test:e2e
      - if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/configure-pages@v5
      - if: github.event_name == 'push' && github.ref == 'refs/heads/main'
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: ci
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    concurrency:
      group: github-pages
      cancel-in-progress: false
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Pré-requisito: Settings → Pages → Source: **GitHub Actions**.

---

## Desvios em relação ao plano original

| # | Desvio | Motivo |
|---|---|---|
| 1 | TypeScript 6.0.3 em vez de 7.0.2 | `@astrojs/check@0.9.12` exige `^5 \|\| ^6` |
| 2 | `@types/node ^26.6.5` adicionado | Necessário para `process.env.CI` em `playwright.config.ts` |
| 3 | `tsconfig.json` ganhou `"types": ["node"]` | Consequência do item 2 |
| 4 | `linksToSkip` como `async (url) => boolean` | linkinator 8.x exige `Promise<boolean>`, não aceita `RegExp[]` |
| 5 | `--color-primary` em `oklch(50% ...)` em vez de `oklch(60% ...)` | 60% falhou WCAG AA (ratio 3.88); 50% entrega ~5.9:1 |

---

## Critérios de aceite (definição de pronto)

```bash
pnpm check && pnpm test && pnpm build && pnpm test:e2e
```

Todos os quatro devem passar. Ver também `CLAUDE.md`.
