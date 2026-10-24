# marcos-marques.github.io

Astro 7 + Tailwind CSS 4 (CSS-first, sem tailwind.config) — portfolio estático no GitHub Pages.

## Comandos

```bash
pnpm check      # type-check (astro check)
pnpm test       # testes unitários (vitest)
pnpm build      # build estático → ./dist
pnpm test:e2e   # testes E2E + axe (playwright, requer build prévio)
```

## Regras

- **Conteúdo em `src/data/`**: dados pessoais e profissionais (cargos, projetos, skills, links) nunca ficam nos componentes. Textos de interface (rótulos, conectivos, "Voltar ao topo") podem ficar nos componentes.
- **Dados de exemplo**: o conteúdo atual é fictício. URLs externas só em `example.com` (exceto LinkedIn), sem dados pessoais reais, e todo arquivo em `src/data/` começa com `// TODO: substituir por dados reais`.
- **axe sem exceções**: não use `disableRules` nem `skip`.

## Git

- Antes de criar uma branch: `git switch main && git pull`.
- Branches: `feat/...`, `fix/...`, `chore/...`.
- Nunca fazer push na `main`. Toda mudança vai por branch + PR.
- Pergunte antes de commitar ou abrir PR.

## Definição de pronto

1. `pnpm check && pnpm test && pnpm build && pnpm test:e2e` passando, mostrando as últimas linhas da saída de cada comando (não apenas um resumo).
2. Se a mudança afeta a UI: screenshots em 1280px e 390px, conferidos antes de declarar pronto.

## Armadilhas conhecidas

- O Astro remove o espaço em quebras de linha entre expressões `{...}`. Use `{" "}` quando precisar de espaço.