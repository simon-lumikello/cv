# Summary

This repo contains my up-to-date CV, just in case you want to peek at my code style and project structure.

The CV is built using [Astro](https://docs.astro.build). I come from a [React](https://react.dev) background, and this is my first time using Astro.

## Type checking

`bun run check` type-checks the project, and `bun run build` runs it before building.

TypeScript is pinned to 6.x because `astro check` doesn't support TypeScript 7. Once TypeScript 7.1 is released, the replacement is [`@astrojs/ts-content-mapper`](https://github.com/withastro/astro/tree/main/packages/language-tools/ts-content-mapper#usage) with plain `tsc`.
