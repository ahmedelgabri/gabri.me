# Zellij — the site design

Zellij is gabri.me. It began as one of five full-site design explorations
(Raster, Phosphor, Monograph and Cairo Deco were the others); it is the one that
was kept, and it is now the site itself — the home page (about, social,
projects, blog index, talks & interviews), every blog post, and the 404.

## The design

Zellij is grounded in Cairo's Islamic architectural history rather than in
generic museum-Islamic decoration, and in Ahmed's Egyptian heritage and his
RTL-on-the-web writing. Three specific references do the work:

- **Ibn Tulun's mosque** for the two-centred pointed arch that crowns post
  titles — computed, not traced: each half is a circular arc whose centre is
  offset from the axis so the two arcs meet in a true point. It heads a
  portfolio of six arches, one of them struck over each post; see
  [The arches](#the-arches).
- **Mamluk Cairo geometric ornament** for the star-and-cross girih system in the
  page furniture. It derives from one construction in `src/lib/geometry.ts`: the
  khatam, the eight-point star that is the union of two squares rotated 45°
  against each other, plus the cross tile that fills the gaps when khatams are
  laid on a square lattice.
- **Alhambra-lineage Andalusian rosettes** for the background lattice — the breath-of-the-compass figure, described below.
- **The Blue Quran** (9th–10th century, gold Kufic on indigo-dyed vellum) for
  dark mode. Dark mode is not an inverted light theme; it is a different
  manuscript.

No literal iconography in the ornament — no domes, minarets, lanterns or
hieroglyphs. The one pictorial thing on the page is the corner control's moon,
and it is a computed one.

### Palette

Light is a qishani ivory manuscript page. Dark is the Blue Quran. Both are
expressed as the same set of semantic custom properties on the `.light` /
`.dark` class the theme script keeps on `<html>`, so every rule and every SVG
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
corner control, the prose link hover — reads `--zj-gild` or `--zj-hairline` and
picks the change up without its own rule. Dark mode was already legible and its
values are untouched.

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
arches over post titles.

### The arches

The arch over a post title is one of six, chosen at random on every page load
and named in a tiny caption revealed on hover. Each is a construction in
`src/lib/arches.ts` rather than a traced silhouette, and all six share one
720×210 band: the same crown height, the springing line below the visible area
wherever the form allows it, a double rule whose inner line is a true parallel
of the outer at 12 units, and impost hairlines running from the frame edges to
the point where the outer line leaves it.

- **Two-centred drop arch** — the
  [Mosque of Ibn Tulun](https://en.wikipedia.org/wiki/Mosque_of_Ibn_Tulun),
  Cairo, 876–879. Two arcs whose centres sit on the springing line, each offset
  from the axis toward the far side so the pair meets in a true point.
- **Rounded [horseshoe](https://en.wikipedia.org/wiki/Horseshoe_arch)** — the
  [Great Mosque of Córdoba](https://en.wikipedia.org/wiki/Mosque%E2%80%93Cathedral_of_C%C3%B3rdoba),
  from 785. One circle, stilted a third of its radius above the springing line,
  so the arc passes its widest point — the full diameter — before it turns back
  in to the imposts: the span at the springing is only √8/3 = 0.943 of it.
- **[Four-centred arch](https://en.wikipedia.org/wiki/Four-centred_arch)** —
  Persia and the Timurid east. Haunches struck from the quarter points of the
  span, crown arcs struck from centres below the springing line and across the
  axis, internally tangent to the haunches with their centres R − r apart. The
  rise is 0.70 of the half-span and the tangent at the apex tilts 6°, which is
  the arch's point.
- **[Ogee](https://en.wikipedia.org/wiki/Ogee)** — Mamluk Cairo and beyond. A
  convex haunch and a concave crown, tangent externally at the inflection with
  their centres r + R apart; the crown's radius is whatever makes the arc reach
  the apex.
- **Keel arch** — the
  [al-Aqmar Mosque](https://en.wikipedia.org/wiki/Aqmar_Mosque), Cairo, 1125.
  Curved haunches continued by straight runs into the point, each straight the
  tangent drawn to its haunch circle from the apex, so the join has no kink.
- **[Seven-lobed multifoil](https://en.wikipedia.org/wiki/Multifoil_arch)** —
  the [Aljafería](https://en.wikipedia.org/wiki/Aljafer%C3%ADa), Zaragoza, 11th
  century. Lobes riding a supporting semicircle of the family's own half-span,
  overlapping just enough that each neighbouring pair of circles crosses at 130°
  — that crossing is the cusp — with the outer pair of lobes halved by the
  springing, so the flanks meet the imposts vertically. Its inner line is the
  real parallel rather than a smaller multifoil: lobe arcs 12 smaller, filleted
  around every cusp on a 12 radius, because a line held 12 clear of a spike has
  to turn around its point.

A script inside the component runs before the six are parsed, marks the wrapper
with the chosen id, and CSS shows that one and hides the rest. The arch that is
drawn is the only one that ever paints — no swap, no restarted draw-in, no
reflow, and all six fill the same box. Without JavaScript the drop arch stands.
A tiny caption under the arch names the type and its provenance and carries one
of the verified links above (the keel's caption links its building, since
Wikipedia files the keel under the four-centred arch). It shows only while the
arch is hovered or its link focused — its line stays reserved so nothing shifts
— and stays visible on touch screens, where there is no hover.

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

## Feedback-driven changes (v2)

The first pass was reviewed and reworked:

- **"Why Aga Khan and not mosque/Islamic history?"** — the design is now
  anchored in named Cairo references (above) instead of a contemporary museum
  register, and dark mode became the Blue Quran.
- **"The background seems empty and dull on large screens."** — from 1200px up, a faint Andalusian rosette lattice tiles the page ground outside the carpet frame like a mashrabiya screen (240px tile, kohl at 6% in light, gold at 8% in dark), masked so it fades out before the 120ch carpet frame and drifting one tile every 360s. The construction is described under [The background lattice](#the-background-lattice).
- **"Add subtle animations, and don't respect reduce-motion."** — every
  `prefers-reduced-motion` gate was removed from the design on purpose; the
  animations always run. See the inventory below.
- **Weekly links are hidden**: no index section and no `/weekly-links/` routes.
  The collection is still in `src/_content/` and still queryable through
  `src/lib/content.ts`; nothing renders it.
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
- **Dark mode is switchable** from the corner of the carpet page. What began as
  a two-glyph toggle is now the observatory: the control carries tonight's real
  moon by night and the page's own rosette by day, and opens a plate that
  explains the figure and ends with the hour changing. See
  [The observatory](#the-observatory).

### Animation inventory

| What               | How                                                                                         |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Girih frieze       | stroke-dashoffset draw-in, 1.2s, once on load                                               |
| Post-page arch     | stroke-dashoffset draw-in, 0.9s; imposts land at 0.6s                                       |
| Home sections      | opacity + 10px rise, 500ms ease-out, 70ms stagger capped at 420ms                           |
| Entry hover        | star marker rotates 22.5° (its own symmetry angle) and the title underline slides in, 200ms |
| Prose links        | gilded underline grows from the left, 180ms                                                 |
| Theme change       | 1.1s diagonal view-transition sweep from the observatory, else a 300ms crossfade            |
| Background lattice | drifts sub-pixel-smooth only on frames the pencil already paints; still when parked         |

No scroll-triggered libraries, no layout shift; the only parallax is the night
sky’s subtle pointer drift.

### Theme resolution

An inline pre-render script in the layout's `<head>` reads the `theme`
localStorage key (`system` | `light` | `dark`), defaulting to `system`, resolves
it against `prefers-color-scheme`, and sets `light`/`dark` on `<html>`. It keeps
listening for system changes while the setting is `system`. The observatory's
switch writes the key and flips the class inside a view transition; the
control's accessible name follows the resolved theme.

## Typography

Four Latin pairings were compared on real pages — **Qalam** (Amiri display,
Spectral body), **Andalus** (Cormorant Garamond, EB Garamond), **Scriptorium**
(Amiri, Cardo) and **Matbaa** (Amiri, Literata). Qalam was chosen.

Amiri carries the display line and the Arabic masthead: its Latin was drawn
beside its naskh, so one hand sets both scripts. Spectral carries the body text,
keeping a long column even and quiet underneath. Code is set in the mono stack,
which starts with PragmataPro Mono Liga.

The three families are the whole webfont payload: every page loads Amiri
400/700, Spectral 400/600 with italics and IBM Plex Mono 400/600 from a single
Google Fonts request.

## three.js on the page

Four layers, none of them a widget: the sky the dark theme is read under, the
compass work beneath the light theme's lattice, the almanac in the corner of the
carpet page, and the instrument in the footer. Three of them actually load
three.js — the almanac's moon and rosette are computed SVG that only borrows the
shared frame scheduler. They were chosen from a nine-candidate comparison built
as live demos and judged on the grounds they belong to; the losers and the page
that held them are gone.

All four share `src/lib/frames.ts`: `createLayerLifecycle()`, which runs a
layer's loop only while the tab is visible and the layer still wants frames. The
three that draw share `src/lib/webgl.ts` as well: `hasWebGL()`, which probes and
immediately releases a context before anything is downloaded, so a machine that
cannot draw fetches nothing, and remembers the answer; `loadThree()`, a
single-flight dynamic import, so two layers waking in the same frame share one
module evaluation; `createPixelStage()` and `fitPixels()`, the renderer, scene
and camera in CSS pixels with y down the page and the fit that keeps them there;
`createThemeFade()`, the ink cross-fade every layer runs on a theme change; and
`gateLayer()`, the media-and-capability gate two of them start behind. The
palette all three ink themselves from is `src/lib/ink.ts`, which restates
Layout's `--zj-*` colours as data for the renderers that cannot read a custom
property. Each layer is its own component, so Vite code-splits it out of the
page bundle, every canvas is `aria-hidden`, and a refused chunk or a lost
context always leaves the page it enhanced standing.

### The night sky

Dark mode is the Blue Quran, so the three.js work belongs to its world rather
than to an ornament in the masthead. Every page carries a fixed, full-viewport,
pointer-events-none canvas in the same negative-z layer as the mashrabiya screen
— over the lattice, under the carpet page — holding a hundred gold stars across
three depth layers of 42, 34 and 24, drawn at 1.2–3.4px.

Every star carries its own tint (a hair either side of `--zj-gild`), its own
4–9s twinkle and its own phase, so nothing pulses in step; one oscillation
drives both brightness and size, and the points are rounded off in the fragment
shader so they never read as square pixels. The pointer drifts the three layers
2, 5 and 9px against each other. Stars are the whole sky now: the eight khatam
line-loops that once marked the brightest were competing with the rosette
lattice they hung over, so they went, and the field grew from 76 points to 100
to take the sky back.

Because the carpet page's ground is opaque, the sky is only ever seen down the
two margins beside it. Stars are seated in those bands — a side, a fraction
across the band and a fraction down the viewport — with the band measured off
the page's own box, so none is spent behind the reading column and a resize
reseats every star exactly.

The joy is a shooting star. The first falls 8–20s in, so a short visit still has
a chance at one, and then every 30–75s: a hairline gold streak falling out from
behind the page and down a margin, 200–340px at 50–75° below the horizontal,
over 0.8–1.2s, its tail pinned at the launch point until the head outruns it and
fading to nothing along its length. Roughly one fall in six brings a twin half a
second to a second and a half behind it, entering from the opposite margin while
the first is still in the eye, the way a real shower arrives. Frequent enough to
reward sitting with the page, rare enough to still be luck.

It runs in dark mode only. The module waits for `window.__zjTheme` to be `dark`
before importing three.js at all, so a light-mode, small-screen or WebGL-less
visitor downloads none of it — the gates are a 1024px viewport, the WebGL probe
and the theme. From then on it listens for `zj:theme` and fades the whole sky in
or out over 0.6s, stopping the render loop entirely once it has faded off a
light page.

### The draftsman's pencil

From 1200px up — the width the CSS lattice appears at — and on fine pointers
only, `Pencil.astro` takes the mashrabiya screen over and redraws it in WebGL.
It does not join the CSS lattice, it replaces it: once the canvas is up and
painted it sets `zj-pencil` on `<html>`, which takes `body::before` to zero
opacity, and a lost context hands the work straight back. The CSS lattice stays
the fallback for no JS, no WebGL, a coarse pointer or a narrow window.

Alignment is the whole difficulty, because for one 400ms cross-fade the reader
sees both. The canvas draws the same 240px tile from the same construction the
data URI was generated from, wears the same margin mask, and takes the same
per-theme ink and opacity. Its drift is delta-accumulated and rides only the
frames the lens or a theme fade already earned, so it is always sub-pixel
smooth, never the reason a frame is painted, and never jumps when a blurred
window is refocused. The CSS fallback lattice is static.

Under the pattern lies its construction: the generating circle, the sixteen
compass marks stepped round it, the radii, the `{16/6}` chords, and the three
circles the figure derives from itself — the petal valleys, the innermost
crossings, and the one every chord is tangent to. None of it is visible except
inside a soft 120px lens that lerps after the pointer, where the pattern's own
lines also lift by half a weight so the two layers agree. Everything is a
distance test in the fragment shader, so nothing is rebuilt as the lens moves.
With no pointer in the window the lens wanders the margins on a slow lissajous,
crossing from one to the other every forty seconds or so, so the layer breathes
on its own. The ink cross-fades kohl to gold over 0.3s on `zj:theme`.

### The observatory

The corner of the carpet page keeps an almanac. The theme control is no longer a
toggle with two glyphs; it is the entrance to a plate that explains what it is
showing and ends with the hour changing.

**The glyph is alive.** By night it is a 24px moon at tonight's true phase,
computed in `src/lib/moon.ts` — correct terminator and correct limb, so it
changes through the month because it is worked, not drawn. By day it is the
sixteen-petal rosette the page is tiled with, simplified to the petals and the
ring they close on, which is all that survives legibly at 24px. A tab left open
across a night re-computes on `visibilitychange`.

**The moon is real.** `moon.ts` takes the sun–moon elongation ψ from the
longitude terms rather than from an epoch and a synodic month, which is the
difference between a phase that is right and one that is close. The lit fraction
is (1 − cos ψ) ⁄ 2; the lit region is two half-ellipses sharing their poles —
the limb, always a semicircle of the disc's radius, and the terminator, the same
curve squashed by cos ψ — so crescent and gibbous differ by one SVG arc flag and
nothing else. `nextPhase` walks the elongation in half-day steps and bisects the
crossing to find the next new or full moon. The module touches no DOM, so the
corner glyph and the large disc on the plate are one figure at two sizes.

**Hover and focus give a caption.** A manuscript tooltip beside the control:
`هلال` and tonight's phase name and illumination by night, `شمسة` and "the
sixteen-petal rosette — how it is drawn" by day. It is wired with
`aria-describedby`, shows on `:hover` and `:focus-visible`, and is left to fine
pointers — a touch goes straight to the plate.

**Click opens the plate**, a native `<dialog>` shown modally, so the focus trap
and Esc are the browser's; a click that both begins and ends on the backdrop
closes it, and focus returns to the control. It is dressed as an illumination
plate: ivory or indigo ground, khatam corner marks, carpet-frame hairlines,
Amiri headings.

- **By night, the moon.** The disc at 180px at tonight's phase, the phase name,
  illumination and date, a ±15-day scrubber that re-cuts the terminator as it
  moves, the next new and full moon dates, and a passage on the hilal, on why
  the first sighting is argued over, and on the astronomers who measured the
  moon closely enough to predict it.
- **By day, the rosette.** The construction drawn stage by stage on a loop with
  its own captions, a "Hold the compass" button to stop it where it stands, and
  a passage on how the figure measures itself and on the tradition it belongs
  to.

**Both plates end with the hour.** A single handsome action — "Dawn — switch to
the light theme" by night, "Dusk — switch to the dark theme" by day — closes the
plate and performs the switch with the sweep.

**Dusk and dawn.** The theme class is flipped inside
`document.startViewTransition`, and the two snapshots are held still while the
incoming one is uncovered along the 135° diagonal over 1.1s: night comes down
from the top-left corner, day back up from the bottom-right. The mask is 2.2
times the page in each direction and its head sits at that same fraction, so the
run begins with the page wholly past the front and ends with it wholly inside —
no dead travel at either end, and one pair of stops that works for any window
shape. Only the plate's own switch sets `data-zj-sweep`; a change that came from
the system preference, or a browser without view transitions, keeps the 300ms
cross-fade the page already had. Theme changes made from the plate are announced
on an `aria-live` region; system-preference changes are not.

The control is gated on `zj-js`, the class the pre-paint theme script sets, so a
reader without JavaScript is never shown a dead button. `window.__zjSetTheme`
still does the work; the sweep only wraps it.

### The astrolabe

The footer keeps an instrument: a planispheric astrolabe, drawn out of its own
projection rather than traced, sitting above the copyright line on every page at
every width — 420px where the reading column has the room for it, and sized to
that column where it does not.

The projection is the real one — the sphere seen from the south pole and dropped
onto the plane of the equator, so declination becomes a radius and every circle
in the sky stays a circle on the brass. The plate carries the limb and its
degree ring, the equator, the tropic of Cancer, the meridian, the zenith of the
latitude it is cut for and the almucantars of 0°, 20°, 40° and 60°, each clipped
where it runs off the plate as it would be on brass. Over it turns the rete: the
ecliptic band with its twelve signs spaced as the projection really spaces them,
ten star pointers tapering from the band to the star each names, and the sun's
place today. The rule swings after the sun mark. One plate serves one latitude
and one only; this one is cut for 52.4°N, which is Amsterdam.

It creeps at 360× the sky's own rate — one turn in four minutes rather than one
in a day — and it can be taken hold of. A drag turns the rete with a hair of lag
behind the pointer, and the release carries the rete's own speed rather than the
pointer's, so a flicked cursor cannot throw the brass faster than it was
actually turning; the spin then decays back into the sidereal creep. Touch
pointers are ignored so a finger can always scroll past.

The ink changes with the page and cross-fades over 0.3s on `zj:theme`. By night
it is brass: both weights in `--zj-gild` on the indigo ground, structure at 0.82
and the engraved circles at 0.30. By day it is a plate printed in a manuscript,
and the single gold is split in two — the figure itself in kohl, the way an
engraving carries its main line, and the circles derived from it in lapis, the
second colour a diagram keeps for its secondary work.

The two are struck to the same weight on the page rather than to the same
number. Kohl at 0.70 holds 5.5:1 on the ivory where the night's gold holds 5.7:1
on the indigo — a hair under, because dark ink on a light ground reads heavier
than light ink on a dark one. The lapis gets a little more than the gold it
answers to, 2.1:1 against 1.9:1, because a cool hairline is the first thing
ivory swallows.

Unlike the other layers this one can scroll away, so it keeps an
IntersectionObserver: nothing is fetched until the footer is reached, and the
loop parks when it leaves. Its space is reserved by CSS on `zj-js`, before the
first paint, so the copyright line never jumps; if the WebGL probe fails or the
chunk never arrives, `zj-astrolabe-off` folds the figure away rather than leave
a caption describing an instrument that is not there.

### What the plates teach

The instruments are not only ornaments. Each carries a short passage in the
design's own voice on the history it comes out of, with links out to Wikipedia
carrying the design's external-link mark. Any Arabic is a real word, set in
Amiri with `lang="ar" dir="rtl"`: `هلال`, the crescent, and `شمسة`, the rosette.

- **The moon plate** links
  [the Hijri calendar](https://en.wikipedia.org/wiki/Islamic_calendar),
  [what counts as sighting the crescent](https://en.wikipedia.org/wiki/Moon_sighting_in_Islam),
  [astronomy in the medieval Islamic world](https://en.wikipedia.org/wiki/Astronomy_in_the_medieval_Islamic_world),
  [Al-Battani](https://en.wikipedia.org/wiki/Al-Battani) and
  [lunar phase](https://en.wikipedia.org/wiki/Lunar_phase).
- **The rosette plate** links [girih](https://en.wikipedia.org/wiki/Girih),
  [Islamic geometric patterns](https://en.wikipedia.org/wiki/Islamic_geometric_patterns),
  [zellij](https://en.wikipedia.org/wiki/Zellij),
  [the Topkapı Scroll](https://en.wikipedia.org/wiki/Topkap%C4%B1_Scroll) and
  [the Rub el Hizb](https://en.wikipedia.org/wiki/Rub_el_Hizb).
- **The astrolabe's label** links
  [the astrolabe](https://en.wikipedia.org/wiki/Astrolabe),
  [astronomy in the medieval Islamic world](https://en.wikipedia.org/wiki/Astronomy_in_the_medieval_Islamic_world),
  [al-Zarqālī](https://en.wikipedia.org/wiki/Al-Zarqali) and
  [al-ʻIjliyyah](https://en.wikipedia.org/wiki/Al-%CA%BBIjliyyah).

Every one of those was checked against the Wikipedia REST summary before it
shipped, on the article's canonical title rather than on a 200 alone. One was
corrected in the process: `Mariam_al-Asturlabi` is a redirect, and the article
it lands on is `Al-ʻIjliyyah` — the tenth-century astrolabe maker of Aleppo — so
the canonical title is what is linked and what she is called.

The astrolabe's label also stays honest about the model. Its star places are
rounded to the arcminute, its plate is cut for one latitude, and it says so, as
it says that the creep is 360× and that the rete can be turned.

## Routes

| Route          | Page                      |
| -------------- | ------------------------- |
| `/`            | home                      |
| `/blog/[slug]` | every published blog post |
| `/404`         | page not found            |

The endpoints beside them — `/feed.xml`, `/sitemap.xml`, `/robots.txt`,
`/llms.txt`, `/card` and the `/og/[slug].png` cards — are data, not pages, and
the design does not touch them.

## Where it lives

- `src/layouts/Layout.astro` — the site's only layout. It carries the whole
  `<head>` (title, description, canonical, OpenGraph and Twitter cards,
  authorship and `rel="me"` links, the RSS alternate, the two media-scoped
  `theme-color` metas, the Google Fonts request, the pre-paint theme script and
  the GA4 snippet) and the carpet-page frame with its masthead, frieze, footer
  and astrolabe.
- `src/styles/global.css` — the design's base stylesheet, imported by the
  layout. It is unlayered, which is what lets it outrank the reset whatever the
  specificity either side.
- `src/styles/reset.css` — the preflight the design is written against, the
  base layer of the Tailwind v4 preflight trimmed of the form controls the site
  never renders. It is the only stylesheet inside a cascade layer.
- `src/components/` holds the partials: `Arch`, `Star`, `StarDivider`,
  `GirihFrieze`, `Astrolabe`, `Observatory`, `NightSky`, `Pencil` and
  `ProseLink`. Each one keeps its own rules in its own `<style is:global>`
  block, beside the markup they dress. The `geometry`, `arches`, `moon`, `ink`,
  `frames`, `webgl` and `rosette` modules behind them are in `src/lib/`.
- `src/pages/index.astro`, `src/pages/blog/[slug].astro` and
  `src/pages/404.astro` are thin route files over that layout.
- `src/lib/content.ts` — `getBlogStaticPaths()` and friends, used by the route
  files.

The design carries 100% of its own styling, including MDX prose and Shiki code
blocks. Paired light/dark images in post bodies carry `zj-only-light` /
`zj-only-dark`, and the YouTube embed is dressed by `.zj-youtube`. Shiki
runs dual-theme: light mode keeps the inline light colours, dark mode flips to
`var(--shiki-dark)` and lifts the comment grey, which would otherwise sit at
1.8:1 on the indigo panel.
