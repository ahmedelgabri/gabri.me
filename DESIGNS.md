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
- **Mamluk Cairo geometric ornament** for the star-and-cross girih system in the
  page furniture. It derives from one construction in
  `src/designs/zellij/geometry.ts`: the khatam, the eight-point star that is the
  union of two squares rotated 45° against each other, plus the cross tile that
  fills the gaps when khatams are laid on a square lattice.
- **Alhambra-lineage Andalusian rosettes** for the background lattice and the
  marginal shamsa — the breath-of-the-compass figure, described below.
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
| `--zj-gild`       | `#A97C14` bronze gold    | `#D9B44A` gold            | gilding only — hairlines and ornament   |
| `--zj-glaze`      | `#2A7268` glaze teal     | `#6FB3A8` light glaze     | post tags                               |
| `--zj-geo`        | `#1D3A6E` lapis          | `#C8BCA0` oxidised silver | SVG geometry strokes                    |

Bronze and gold are gilding: they never carry body text in either theme. Every
body-text pair clears WCAG AA — parchment on indigo is 12.1:1, gold on indigo
7.8:1, muted parchment on indigo 5.8:1.

The light theme's gilding was reviewed as "sometimes hard to distinguish" and
deepened. Ratios against the `#F5EEDF` ivory ground:

| Gilded layer                     | Was                           | Now                           |
| -------------------------------- | ----------------------------- | ----------------------------- |
| `--zj-gild`                      | `#C29228`, 2.44:1             | `#A97C14`, 3.26:1             |
| `--zj-hairline`                  | `rgba(194,146,40,.42)` 1.42:1 | `rgba(169,124,20,.72)` 2.26:1 |
| `--zj-selection`                 | `rgba(194,146,40,.3)` 1.28:1  | `rgba(169,124,20,.32)` 1.40:1 |
| `.zj-frieze-square` (light only) | gild at 0.6, 1.67:1           | gild at 0.8, 2.50:1           |

The new gild is the same hue as the old saffron (42° against 41°) and more
saturated, so it stays gold rather than drifting brown. Every other consumer —
the carpet frame's double rule, the corner khatams, the star dividers, the entry
star markers and title underlines, the arch imposts, the blockquote bar, the
theme toggle, the prose link hover — reads `--zj-gild` or `--zj-hairline` and
picks the change up without its own rule.

One consumer deliberately does not follow the page: the design switcher sits on
its own dark ink chip in both themes, so it wears the Blue Quran gold, where the
selected label holds 8.0:1 (the deepened bronze would put it at 4.2:1). Dark
mode was already legible and its values are untouched.

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

### The background lattice

The tile behind the carpet page is a computed Andalusian rosette pattern, 240px
square and seamless, inlined per theme as a `--zj-screen` data URI (identical
geometry, kohl stroke in light, gold in dark). It is not a girih star-and-cross
tile; it is the Alhambra's own figure.

**Lattice.** Rosette centres sit on a centred square lattice — `(0,0)` and
`(120,120)` repeating on 240 — so each rosette has four nearest neighbours on
the diagonals at `120√2 = 169.71`. The rosette radius is `120/√2 = 84.85`,
exactly half that, so diagonal neighbours are tangent and kiss at `(60,60)`. The
lattice's deep holes — `(120,0)` and `(0,120)` and their translates — lie 120
from four centres, leaving a diamond of free radius `120 − 84.85 = 35.15`.

**Rosette.** The breath-of-the-compass construction. Sixteen points are stepped
round a circle of radius R and joined as the `{16/6}` star polygon; the figure
that falls out is drawn in two weights:

- the ring of sixteen petals, tips at R and valleys at
  `R·cos(6π/16)/cos(5π/16) = 0.68881 R`, at structure weight;
- the nested ring that interlocks with it, tips on those valleys and valleys on
  the polygon that the `{16/6}`'s own innermost intersections describe,
  `R·cos(6π/16)/cos(π/16) = 0.39018 R`, at infill weight;
- that inner circle, at infill weight;
- a khatam inscribed in it, at structure weight.

Each layer is defined by the previous layer's intersections rather than chosen
by eye.

**Strapwork.** Every hole carries an eight-point khatam of radius 35.15. Its
four axial tips land exactly on four rosette tips; its four diagonal tips launch
straps onto the tangency points, where each strap meets two rosette petal tips
and the strap from the neighbouring hole. Nothing is left loose. The straps are
lozenges rather than lines: a straight strap would be collinear with the next
hole's and the pair would chain into an unbroken diagonal across the whole
plane, which reads as a wireframe grid laid over the pattern rather than as
strapwork.

**Weights.** Structure strokes are 1, infill 0.55 — enough separation that the
rosette silhouettes read first and the inner construction sits behind them.

**Seams.** Every rosette and interstitial whose content can reach the tile is
drawn, including the copies centred outside it, and the SVG clips at the viewBox
— so a stroke cut at one edge is completed by its neighbour. Verified by
rendering the shipped data URI as a 3×3 tiling with the tile boundaries drawn
in, at full strength and at working opacity.

The marginal shamsa (`--zj-medallion`) is the same rosette at R = 96, rimmed by
two circles and a ring of sixteen cells.

## Feedback-driven changes (v2)

The first pass was reviewed and reworked:

- **"Why Aga Khan and not mosque/Islamic history?"** — the design is now
  anchored in named Cairo references (above) instead of a contemporary museum
  register, and dark mode became the Blue Quran.
- **"The background seems empty and dull on large screens."** — from 1200px up,
  a faint Andalusian rosette lattice tiles the page ground outside the carpet
  frame like a mashrabiya screen (240px tile, kohl at 6% in light, gold at 8% in
  dark), masked so it fades out well before the reading column and drifting one
  tile every 360s. From 1536px up, a single shamsa in the same language sits in
  the left margin at 3.5–5%, right where the lattice has already faded. The
  construction is described under
  [The background lattice](#the-background-lattice).
- **"Add subtle animations, and don't respect reduce-motion."** — every
  `prefers-reduced-motion` gate was removed from the design on purpose; the
  animations always run. See the inventory below.
- **Weekly links are hidden**, matching the real site: no index section and no
  `/1/weekly-links/` routes.
- **Talks & interviews moved to the end** of the home page.
- **External links are marked.** Every `target="_blank"` link gets a small
  raised mark through `::after`: an arrow pointing north-east whose head is a
  four-point diamond star — the khatam's four-fold cousin — on a thin shaft
  running back along the same diagonal. The star's outer points sit on the
  diagonals with the north-east one stretched so it leads the arrow, its inner
  points on the axes; the SVG's viewBox is the mark's exact bounding box so the
  glyph fills its 0.6em box instead of floating inside padding. It is applied as
  a `mask-image` over `background-color: var(--zj-text-muted)`, so one shape
  serves both themes — muted ink on ivory, muted parchment on indigo — in the
  site chrome and in rendered post bodies alike. Internal links never get one,
  and the mark is suppressed on image-only links and inside embedded tweets.
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
| Background lattice | 360s linear background-position drift — exactly one 240px tile, so the loop never shows     |

No scroll-triggered libraries, no layout shift; the only parallax is the night
sky’s subtle pointer drift.

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

## three.js night sky

Dark mode is the Blue Quran, so the three.js work belongs to its world rather
than to an ornament in the masthead. Every zellij page carries a fixed,
full-viewport, pointer-events-none canvas in the same negative-z layer as the
mashrabiya screen — over the lattice, under the carpet page — holding a sky of
84 gold stars: 76 points across three depth layers, plus 8 khatams for the
brightest, each drawn as a hairline octagram at 3–5.5px.

Every star carries its own tint (a hair either side of `--zj-gild`), its own
4–9s twinkle and its own phase, so nothing pulses in step; one oscillation
drives both brightness and size, and the points are rounded off in the fragment
shader so they never read as square pixels. The pointer drifts the three layers
2, 5 and 9px against each other, lerped at the same rate the medallion used.

Because the carpet page's ground is opaque, the sky is only ever seen down the
two margins beside it. Stars are seated in those bands — a side, a fraction
across the band and a fraction down the viewport — with the band measured off
the page's own box, so none is spent behind the reading column and a resize
reseats every star exactly.

The joy is a shooting star. Once every 60–120s (the first sooner, so a short
visit still has a chance at one) a hairline gold streak falls out from behind
the page and down a margin: 200–340px at 50–75° below the horizontal, over
0.8–1.2s, its tail pinned at the launch point until the head outruns it and
fading to nothing along its length. Rare enough to be something you catch rather
than something on show.

It runs in dark mode only. The module waits for `window.__zjTheme` to be `dark`
before importing three.js at all, so a light-mode, small-screen or WebGL-less
visitor downloads none of it — the gates are a 1024px viewport, a WebGL probe
and the theme, and a refused chunk simply leaves the plain indigo ground. From
then on it listens for `zj:theme` and fades the whole sky in or out over 0.6s,
stopping the render loop entirely once it has faded off a light page. The loop
also stops while the tab is hidden, and the device pixel ratio is capped at 2.
All of it lives in `src/designs/zellij/NightSky.astro` so Vite code-splits it
out of the page bundle.

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
