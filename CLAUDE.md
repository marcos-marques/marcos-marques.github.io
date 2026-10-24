# marcos-marques.github.io

Astro 7 + Tailwind CSS 4 — portfolio estático publicado no GitHub Pages.

## Comandos

```bash
pnpm check      # type-check (astro check)
pnpm test       # testes unitários (vitest)
pnpm build      # build estático → ./dist
pnpm test:e2e   # testes E2E (playwright, requer build prévio)
```

## Regras

- **Dados apenas em `src/data/`** — nunca hardcode de conteúdo em componentes.
- **axe sem exceções** — `pnpm test:e2e` inclui verificação de acessibilidade; não use `disableRules` nem `skip`.
- **Nunca fazer push direto na `main`** — toda mudança em branch + PR, sem exceção.

## Definição de pronto

```bash
pnpm check && pnpm test && pnpm build && pnpm test:e2e
```

Todos os quatro comandos devem passar antes de abrir PR.
