# Dropping UnoCSS

The request was to move the site's styling from UnoCSS and the design's own CSS to StyleX. That was ruled out and UnoCSS was removed instead. This file records why and what changed.

## Why not StyleX

- StyleX's compiler only transforms `.ts`/`.tsx` files. It cannot see `.astro` components or their `<style is:global>` blocks, which hold about 750 lines of the design.
- StyleX has no element or descendant selectors by design. The prose stylesheet targets the elements Astro's MDX renderer, Shiki and astro-tweet emit (`p`, `h2`, `a`, `li`, `blockquote`, `table`, `code`, `.astro-code span`, `[class*='tweet']`). Roughly a quarter of `src/styles/global.css` is those rules, and StyleX cannot express them without a rehype plugin stamping compiled class names onto every rendered node.
- The theme sweep lives on `::view-transition-new(root)` and friends, and the design also uses `::selection`, `::marker` and `::first-letter`. None of these are covered by StyleX.
- The theme is toggled by a pre-paint script that sets `.light`/`.dark` on `<html>`. StyleX themes are compiled class names, so the inline script would have to learn them, for no gain over the custom properties already in place.

The custom CSS is the design. StyleX exists to do for React apps what the design's stylesheet already does here.

## What UnoCSS was doing

- Emitting the Tailwind v4 preflight the design's CSS is written against, inside cascade layers so the unlayered design rules outrank it.
- `dark:hidden` / `light:hidden` on the paired logo images in the git-wt post.
- Six utility classes inside the YouTube embed.
- Emitting utilities for every word in the content its extractor happened to match, none of which were used.

## What changed

- `src/styles/reset.css` holds the preflight, the base layer of the Tailwind v4 preflight trimmed of the form controls the site never renders, wrapped in `@layer reset`. The layout imports it just before `global.css`. The layer is what keeps the old guarantee: every unlayered design rule outranks it whatever the specificity either side.
- `.zj-only-light` / `.zj-only-dark` replace `dark:hidden` / `light:hidden`. The rule lives beside the prose image rules in `global.css`. The Markdown representation of a post drops the `zj-only-dark` image, as it dropped the `light:hidden` one.
- `.zj-youtube` replaces the utility classes in the YouTube embed. The inline 16:9 padding stays where it was.
- `@unocss/astro`, `unocss`, `uno.config.ts` and the `UnoCSS()` integration are gone.
- `CLAUDE.md`, `DESIGNS.md` and `README.md` describe the reset instead of UnoCSS.

The built stylesheet carries no `--un-*` properties and no UnoCSS layers. Tests, lint, format, type check and build pass.
