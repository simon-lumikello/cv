# Summary

This repo contains my up-to-date CV, just in case you want to peek at my code style and project structure.

The CV is built using [Astro](https://docs.astro.build). I come from a [React](https://react.dev) background, and this is my first time using Astro.

## Project screenshots

Each pet project card shows a screenshot of the project, kept in `src/assets/projects/<slug>.png` (the slug comes from the project name, e.g. `Jaksa! Jaksa!` → `jaksa-jaksa.png`). A project without one gets a plain card.

The screenshots are taken by [Playwright](https://playwright.dev) and committed, so the build doesn't need a browser:

```bash
bun run screenshots              # all projects
bun run screenshots atlas map    # only projects whose name or url contains one of the words
```

Every site is shot the same way (1280×800, dark color scheme, Helsinki time zone), so the cards look alike. Per-project tweaks go into the project's `screenshot` field in `src/assets/MyProjects.ts`:

| Option        | Use                                                                                 |
| ------------- | ----------------------------------------------------------------------------------- |
| `url`         | Page to shoot instead of `href`; an image URL is shown on a plain page             |
| `clicks`      | Buttons or options to click first, e.g. `["Got it"]` to close a welcome dialog     |
| `delayMs`     | Wait before the shot, after loading and clicking (1500 ms by default)              |
| `colorScheme` | `"light"` for a site that should not be shown dark                                 |
| `time`        | Fake clock, e.g. `"15:00"`, for clocks and timelines                               |
| `phoneScreens` | Show the page as a mobile app: one phone per screen, each optionally after `taps` (for canvas apps like Flutter web) |
| `manual`      | The image is maintained by hand; the script skips the project                      |

The options are documented in `src/types/PetProject.ts`, the script is `scripts/screenshots.ts`.

`bun run dev` serves images with a long cache lifetime under the same URL, so hard-reload the page after retaking screenshots.

## Type checking

`bun run check` type-checks the project, and `bun run build` runs it before building.

TypeScript is pinned to 6.x because `astro check` doesn't support TypeScript 7. Once TypeScript 7.1 is released, the replacement is [`@astrojs/ts-content-mapper`](https://github.com/withastro/astro/tree/main/packages/language-tools/ts-content-mapper#usage) with plain `tsc`.
