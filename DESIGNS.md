# Zellij — design exploration

One full-site design exploration: a complete alternative take on gabri.me with
its own visual identity, rendering the home page (about, social, projects, blog
index, talks & interviews) and all blog posts. Four other explorations (Raster,
Phosphor, Monograph, Cairo Deco) were reviewed and removed; Zellij is the one
that stayed.

## The design

Zellij is grounded in Cairo's Islamic architectural history rather than in
generic museum-Islamic decoration, and in Ahmed's Egyptian heritage and his
RTL-on-the-web writing. Three specific references do the work:

- **Ibn Tulun's mosque** for the two-centred pointed arch that crowns post
  titles — computed, not traced: each half is a circular arc whose centre is
  offset from the axis so the two arcs meet in a true point.
- **Mamluk Cairo geometric ornament** for the star-and-cross girih system.
  Everything derives from one construction in `src/designs/zellij/geometry.ts`:
  the khatam, the eight-point star that is the union of two squares rotated 45°
  against each other, plus the cross tile that fills the gaps when khatams are
  laid on a square lattice.
- **The Blue Quran** (9th–10th century, gold Kufic on indigo-dyed vellum) for
  dark mode. Dark mode is not an inverted light theme; it is a different
  manuscript.

No literal iconography in the ornament — no domes, minarets, lanterns or
hieroglyphs. The one pictorial pair is the theme toggle’s star and crescent.

### Palette

Light is a qishani ivory manuscript page. Dark is the Blue Quran. Both are
expressed as the same set of semantic custom properties on
`.design-zellij.light` / `.design-zellij.dark`, so every rule and every SVG
stroke re-themes without a second code path.

| Token             | Light (ivory)            | Dark (Blue Quran)         | Used for                                |
| ----------------- | ------------------------ | ------------------------- | --------------------------------------- |
| `--zj-ground`     | `#F5EEDF` qishani ivory  | `#132347` deep indigo     | page and carpet-frame ground            |
| `--zj-panel`      | `#ECE3CC` deep parchment | `#1A2C55` panel indigo    | code blocks, code titles, inline code   |
| `--zj-text`       | `#26221A` kohl           | `#EDE3CB` parchment       | body text                               |
| `--zj-text-muted` | `#5A5142`                | `#A99E85`                 | dates, captions, metadata               |
| `--zj-accent`     | `#1D3A6E` lapis          | `#D9B44A` gold            | links, the Arabic masthead, focus rings |
| `--zj-gild`       | `#C29228` saffron        | `#D9B44A` gold            | gilding only — hairlines and ornament   |
| `--zj-glaze`      | `#2A7268` glaze teal     | `#6FB3A8` light glaze     | post tags                               |
| `--zj-geo`        | `#1D3A6E` lapis          | `#C8BCA0` oxidised silver | SVG geometry strokes                    |

Saffron and gold are gilding: they never carry body text in either theme. Every
body-text pair clears WCAG AA — parchment on indigo is 12.1:1, gold on indigo
7.8:1, muted parchment on indigo 5.8:1, and the light theme is unchanged from
the version the palette was checked against.

### Type

- `--z-font-display` — Amiri, the display face, for the masthead, section titles
  and post titles.
- `--z-font-body` — Spectral for running text.
- `--z-font-arabic` — Amiri for the bilingual masthead.
- `--z-font-mono` — PragmataPro first (installed locally), then Iosevka, with
  IBM Plex Mono as the loaded webfont fallback.

### Signature

The khatam as a working system, not a decorative sticker: a mathematically exact
star-and-cross girih frieze under the masthead that draws itself in on load,
star-and-cross section dividers, star list markers that rotate onto themselves
on hover, khatam corner marks on the manuscript carpet-page frame, and the
two-centred arch over post titles.

## Feedback-driven changes (v2)

The first pass was reviewed and reworked:

- **"Why Aga Khan and not mosque/Islamic history?"** — the design is now
  anchored in named Cairo references (above) instead of a contemporary museum
  register, and dark mode became the Blue Quran.
- **"The background seems empty and dull on large screens."** — from 1200px up,
  a faint khatam star-and-cross lattice tiles the page ground outside the carpet
  frame like a mashrabiya screen (120px tile, kohl at 5% in light, gold at 7% in
  dark), masked so it fades out well before the reading column and drifting one
  tile every 180s. From 1536px up, a single shamsa outline sits in the left
  margin at 3.5–5%, right where the lattice has already faded.
- **"Add subtle animations, and don't respect reduce-motion."** — every
  `prefers-reduced-motion` gate was removed from the design on purpose; the
  animations always run. See the inventory below.
- **Weekly links are hidden**, matching the real site: no index section and no
  `/1/weekly-links/` routes.
- **Talks & interviews moved to the end** of the home page.
- **External links are marked.** Every `target="_blank"` link gets a small
  raised `↗` through `::after` — muted ink on ivory, muted parchment on indigo —
  in the site chrome and in rendered post bodies alike. Internal links never get
  one.
- **Dark mode is switchable** from a button in the masthead corner whose glyph
  names the theme it switches to: a crescent by day, a five-pointed star by
  night, crossfading on toggle.

### Animation inventory

| What               | How                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Girih frieze       | stroke-dashoffset draw-in, 1.2s, once on load                                               |
| Post-page arch     | stroke-dashoffset draw-in, 0.9s; imposts land at 0.6s                                       |
| Home sections      | opacity + 10px rise, 500ms ease-out, 70ms stagger capped at 420ms                           |
| Entry hover        | star marker rotates 22.5° (its own symmetry angle) and the title underline slides in, 200ms |
| Prose links        | gilded underline grows from the left, 180ms                                                 |
| Theme toggle       | 300ms colour/background crossfade on the major surfaces                                     |
| Background lattice | 180s linear background-position drift                                                       |

No parallax, no scroll-triggered libraries, no layout shift.

### Theme resolution

An inline pre-render script in the layout's `<head>` reads the same `theme`
localStorage key as the main site (`system` | `light` | `dark`), defaulting to
`system`, resolves it against `prefers-color-scheme`, and sets `light`/`dark` on
`<html>`. It keeps listening for system changes while the setting is `system`.
The toggle writes the key and flips the class; its accessible name follows the
resolved theme.

## Typography

Four Latin pairings were compared on real pages — **Qalam** (Amiri display,
Spectral body), **Andalus** (Cormorant Garamond, EB Garamond), **Scriptorium**
(Amiri, Cardo) and **Matbaa** (Amiri, Literata). Qalam was chosen.

Amiri carries the display line and the Arabic masthead: its Latin was drawn
beside its naskh, so one hand sets both scripts. Spectral carries the body text,
keeping a long column even and quiet underneath. Code is set in the mono stack,
which starts with PragmataPro Mono Liga.

The three families are the whole webfont payload: the zellij pages load Amiri
400/700, Spectral 400/600 with italics and IBM Plex Mono 400/600 from a single
Google Fonts request.

## three.js shamsa

The home masthead carries a hero shamsa medallion built as a 3D gold line
construction — the khatam's two interpenetrating squares plus the derived
octagram — rendered with three.js on a transparent canvas, rotating once a
minute with a small lerped pointer tilt. It is progressive enhancement: the
static SVG star renders by default and the canvas only takes over when JS runs,
WebGL is available and the viewport is at least 1024px. The render loop pauses
when the tab is hidden or the medallion scrolls out of view. All of it lives in
`src/designs/zellij/Shamsa.astro` so Vite code-splits it onto the home page
only.

## Routes

| Route            | Page                      |
| ---------------- | ------------------------- |
| `/1`             | home                      |
| `/1/blog/[slug]` | every published blog post |

All design pages carry `noindex, nofollow` and are excluded from the sitemap.

## Shared infrastructure

- `src/lib/designs.ts` — the design registry plus pure path-mapping functions
  (`activeDesignId`, `designPath`, `mainSitePath`), unit-tested in
  `src/lib/__tests__/designs.test.ts`. Blog posts are the only sub-path a design
  and the main site share; anything else maps back to `/`.
- `src/components/DesignSwitcher.astro` — the fixed switcher bar shown on every
  page including the main site. Neutral glass by default; the design rethemes it
  through CSS custom properties (`--ds-bg`, `--ds-accent`, …), with a separate
  set under `.design-zellij.dark`.
- `src/components/DesignHead.astro` — shared meta partial (charset, viewport,
  noindex, favicon, theme-color, Google Fonts link).
- `src/lib/content.ts` — `getBlogStaticPaths()` and friends, used by the
  design's route files.
- `src/designs/zellij/` owns the layout and partials; `src/pages/1/` holds thin
  route files. The main site's `style.css` is not loaded on design pages — the
  design carries 100% of its own styling, including MDX prose and Shiki code
  blocks. Shiki runs dual-theme: light mode keeps the inline light colours, dark
  mode flips to `var(--shiki-dark)` and lifts the comment grey, which would
  otherwise sit at 1.8:1 on the indigo panel.

## Adopting or removing

The design is self-contained: deleting `src/pages/1/` and `src/designs/zellij/`
removes it completely. To adopt it as the real site, its layout and pages
replace `BaseLayout.astro` and the root pages, and the switcher, `DesignHead`'s
noindex and the registry entry all go away.
