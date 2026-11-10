---
name: steal-a-design
description: Use when the user wants a landing page that looks like one to three named reference sites ("make it like railway.com", "clone this design", "steal this look", "premium page based on these examples"), or when the page must reuse the palette, type and components of real sites instead of inventing them. Runs a fixed pipeline: intake of 1-3 reference URLs plus a palette, real browser screenshots and CSS token extraction, template sourcing for complex visuals, honest placeholders where nothing suitable exists, and one static landing page, plus a working console page when the product UI is part of the ask, as the test deliverable.
---

# Steal a design

Do not design from imagination. Capture the references, copy their system, source the hard parts from real templates, and mark what you refused to fake. The output is one landing page, plus the console behind it when the product UI is part of the ask. Not a site.

## What this produces

```
<outdir>/
  index.html          the deliverable: one file, inline CSS, no build step
  dashboard.html      only when the product UI was requested: same tokens, working state
  design.md           every stolen value with its source, plus open assets
  assets/             images you actually own or downloaded
  refs/<slug>/        screenshots, page.html, tokens.json per reference
```

Test scope. One landing page, no routing, no CMS, no framework. One console page behind the hero is not a second page and is covered in Stage 5. If the user asks for a second marketing page, say it is out of scope for this pipeline.

A finished run to read before you start: `examples/longstone/` holds the design.md and the two HTML files from a pharma cold chain page built against railway.com and cursor.com. It shows what a filled provenance table, a resolved asset list and a worked console look like.

## Non-negotiables

| Rule | Why |
|---|---|
| Ask for 1-3 reference URLs before anything else, and wait | the references are the whole point |
| Screenshot every reference before describing it | model memory of a website is wrong about spacing, light and density |
| Every color comes from the user palette or `refs/<slug>/tokens.json` | an invented palette is exactly what the user is avoiding |
| Every complex visual carries a source URL | hand-rolled glow, WebGL, bento and 3D look cheap, templates do not |
| No source and too complex means a placeholder, or a built console page when the user asked for the product UI | inventing a visual is worse than an honest gap |
| Never reuse a reference site's headline, claim or name | the copy has to be a different company |

## Stage 0: intake, then stop

One message, four questions, no work before the answers:

1. Reference sites: 1-3 URLs. This is the visual base and the only mandatory item.
2. Palette: pasted hex list, an image or file path, or the words "from the references".
3. Brand: name, one line on what it does, audience, and any real numbers, customers or certifications. Or "invent one".
4. Output folder name. Default `steal-<brand-slug>` inside `~/Documents/GitHub`.

Then resolve the gaps yourself and say which defaults you took, in one line:

- References missing: keep asking. Offer to search for references in the user's category if they have none.
- Palette missing: copy it from the references in Stage 2, and tell the user that is what happens.
- Brand missing: enterprise fallback in Stage 3.

No second round of questions mid-build. Decide, record it in `design.md`, continue.

## Stage 1: capture the truth

```sh
node scripts/capture.mjs <url> <outdir>
```

Writes `refs/<slug>/desktop.png` (1440 full page), `hero.png`, `tablet.png` (768), `mobile.png` (390), `page.html` and `tokens.json`.

Then open the images and actually look: hero composition, section rhythm, how borders and light are used, where the accent appears, how much empty space each section holds.

If a capture fails (403, bot wall, paywall, JS-only shell): with a human in the loop, ask for screenshots; running unattended, drop that reference, say so, and continue with the others. If every capture fails, stop rather than build from memory.

Consent banners, chat widgets and lazy media land in the shots too. Read past the overlay. An empty grey box or blank band is a lazy video or image, which tells you the reference leans on media you do not own: note it, and ask for the asset when it carries the layout.

## Stage 2: steal the system

Fill this table into `design.md`, one row per role, no row without a source:

| role | value | source |
|---|---|---|
| background, surface, raised, border, text, muted, accent | hex or hsl | user palette, or `tokens.json` `colors` / `cssVariables` |

- User palette given: keep their hues, keep the reference's usage ratios (how often the accent appears, how many surface levels exist). Body text needs 4.5:1, large text 3:1.
- Type: two families at most, from `tokens.json` `fonts`, plus the system mono stack when both references use mono for labels and eyebrows. Licensed reference font means substitute the closest Google Font and name the substitution in the row.
- Radii, shadows, container width: from the same file, not from taste.
- One line called "signature move": what makes the reference look expensive. Glow, grain, hairline grid rules, oversized type, mono labels, dense product shots. Copy that one thing properly instead of copying everything halfway.

Values you derive (an accent hover, a tint) get the label `derived from <value>`.

`examples/longstone/design.md` is a filled version of this file: provenance table, the reasoning
for each rejected value, and the resolved asset list. Read it once before writing your own, then
match its structure.

## Stage 3: copy

With user data: use it. Invent no number, customer, logo or certification. A missing specific becomes `[[? ... ]]` and goes into the report.

Without user data: invent one enterprise company, and follow these:

- Check `~/Documents/GitHub` for earlier `steal-*` folders, pick a name that is not in any of them.
- Pick a vertical the references do not already occupy.
- Voice: calm and specific. No superlatives, no exclamation marks, no "revolutionary", no stacked adjectives.
- Three to six claims, each naming a mechanism instead of an adjective.

Reference copy is off limits: not the headline, not a claim, not the tagline, not a paraphrase of them.

## Stage 4: source the complex visuals

In this order:

1. Local skills first. `~/.config/opencode/skills/struq/blocks/CATALOG.md` and the `premium-saas-web` recipes carry admitted blocks and real CSS values. Take the markup and CSS, leave the build system.
2. Web component libraries: [references/sources.md](references/sources.md) lists them with the query pattern per element type.
3. Download the shortest working implementation, drop it into the page, rewire it to the stolen tokens, and leave a comment above it: `<!-- source: <url> -->`.
4. Nothing found and it needs more than roughly 30 lines of fiddly code: Stage 5 instead.

Log every sourced element in `design.md`: element, URL, what you changed.

## Stage 5: the placeholder

```html
<!-- NEEDS: 3D product render, no licensed asset yet -->
<figure class="needs-asset">
  <span>Product render</span>
  <small>Drop the studio render here when it lands</small>
</figure>
```

```css
.needs-asset{border:1px dashed var(--border);border-radius:var(--radius);padding:2rem;display:grid;gap:.35rem;place-items:center;text-align:center;color:var(--muted);font:500 14px/1.4 ui-monospace,SFMono-Regular,monospace}
```

Use it for a 3D scene, a photo nobody owns, a chart with no data. A product UI the user actually
asks for is not this case, see below. Every placeholder goes under "Open assets" in `design.md` and
again in the final report. Never ship a placeholder that looks like a finished element. If the
largest one sits above the fold, say so in the report, because the first screen will read as a
wireframe until the real asset lands.

### When the user asks for the product UI

A dashboard is not a placeholder case. Build `dashboard.html` beside `index.html`, with the same tokens and type, and make it work: a list of records, a selection that updates a detail pane, one action that changes state and appends a line to a log, a filter, and an empty state. Two panes are enough. Then link the landing page into it from the hero panel and the nav, and put the real thing in the hero instead of a made up screenshot.

This is the one extra file the pipeline allows. It still has no build step, no framework and no router.

## Stage 6: build

- `index.html`, inline `<style>`, tokens as custom properties at `:root`.
- Sections: nav, hero, proof strip when you have real proof, three to five feature sections, closing CTA, footer. Never invent customer logos: use the numbers the brand actually has, or `[[? ...]]` markers, or drop the strip and put one line of proof under the hero.
- Plain CSS. No Tailwind CDN, no animation library unless a stolen component needs it.
- Fonts: Google Fonts with `preconnect` and `display=swap`, or the system stack.
- Correct at 390, 768 and 1440.
- Motion: CSS transitions plus one IntersectionObserver reveal that fails open. Content is visible in the base rule and the observer only adds a class; never `opacity:0` on the resting state, or the page is blank without JS and blank in every screenshot. `prefers-reduced-motion: reduce` turns the transitions off.
- Alt text on every image, labels on every input, focus visible.

## Stage 7: verify before reporting

```sh
node scripts/capture.mjs file:///absolute/path/index.html <outdir> local
```

Open the three screenshots and fix what is wrong. Then confirm:

- 390 has no horizontal scroll.
- Every placeholder is visible and listed in `design.md`.
- Every hex in the CSS appears in the palette table of `design.md`.
- No section renders as a blank band in the screenshots. A blank band means the reveal hid content instead of enhancing it.
- No console error, no missing font, no broken image.
- Nothing in the copy appears on a reference site.

If `dashboard.html` exists, capture it at the same three widths, click the one action, and confirm the detail pane, the log line and the empty state all respond. Each hand written chart label needs a real value from the data, not a placeholder number.

## Report

Four lines, no summary of your own process:

1. What was stolen, and from which URL.
2. Open assets: the placeholder list, and what the user has to send.
3. What was skipped for complexity, and why.
4. The absolute path of `index.html`, and of `dashboard.html` when it exists.

## Red flags

- Writing a hero visualisation from scratch: stop, Stage 4.
- Picking a color outside the user palette or `tokens.json`: stop.
- Describing what a reference "probably looks like": stop, Stage 1.
- Reusing a reference headline or writing lorem ipsum: stop.
- Placing a dashboard the user asked for: stop, Stage 5.
- Adding a marketing page beyond the landing page, or a build step: out of scope.
