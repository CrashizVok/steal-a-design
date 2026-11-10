# steal-smoketest

Snapshot of `~/Documents/GitHub/steal-smoketest` on 2026-11-10, kept here as the worked example.

Status: done, 2026-11-10. Landing page and lane console built, verified at 390, 768 and 1440.

Built from two references. Railway supplies the dark instrument band, the panel radius and the
section rhythm. Cursor supplies the warm paper ground, the hairline borders and the accent.

## Intake, as answered

| question | answer | default taken |
|---|---|---|
| references | https://railway.com, https://cursor.com | none, two were given |
| palette | "from the references" | copied from both `tokens.json`, table below |
| brand | none | enterprise fallback, Stage 3 |
| output | `/home/rronyecz/Documents/GitHub/steal-smoketest` | none |

## Stage 1, what the captures showed

Both pages captured clean: `refs/railway-com/` and `refs/cursor-com/` each hold `desktop.png`,
`hero.png`, `mobile.png`, `page.html`, `tokens.json`. Nothing was blocked.

Railway, 1440 and 390. A full-bleed illustration hero with a centered serif headline, two pills,
and a dark product panel that overlaps the illustration's lower edge. Below it a carrier logo
strip, then four alternating two column sections, each with a monospace eyebrow, a serif headline
with one word tinted, a product panel inside a 20px rounded bordered card. Two of the sections
switch the whole page ground to a tinted band (dark teal, then plum), which resets the eye. The
proof section is three large bordered stat cards. Density is high: 32 to 48px of section padding,
panels nearly edge to edge.

Cursor, 1440 and 390. Warm off-white ground, left aligned hero, two pills (black filled, hairline
outline), then a bordered product card sitting on a painted landscape. Sections alternate image
left and right at roughly 55/45. Every card is a hairline rectangle with a 2 to 12px radius, no
shadow anywhere. Accent green appears only on links and one word in a paragraph, maybe four times
per screen. A 2x3 bordered text grid does the "features" work with no icons at all. Mobile keeps
the ground and stacks everything, and the painted artwork goes full width.

Signature move, borrowed and used once, properly: oversized serif display type on a warm paper
field, held in place by hairlines and wide-tracked small caps labels. No shadows, no glass.

## Stage 2, the system

| role | value | source |
|---|---|---|
| background | `#f7f7f4` | cursor `tokens.json` cssVariables `--color-theme-bg` |
| surface | `#f2f1ed` | cursor `--color-theme-card-hex` |
| raised | `#ebeae5` | cursor `--color-theme-card-02-hex` |
| border | `rgb(38 37 30 / .1)` | cursor `--color-theme-border-02` = `#26251e1a`, same alpha kept as rgb |
| text | `#26251e` | cursor `--color-theme-fg` |
| muted | `#65645e` | derived from cursor `--color-theme-text-sec` `#26251e99`; at 60% alpha it measures 4.06:1 on the ground, so it is darkened to 70% for 5.53:1 |
| accent | `#34785c` | cursor `--color-theme-accent` |
| dark band ground | `#13111c` | railway `--background` = `hsl(250 24% 9%)`, converted |
| dark band raised | `#181622` | railway `--secondaryBg` = `hsl(250 21% 11%)` |
| dark band border | `#33323e` | railway `--gray-200` = `hsl(246 11% 22%)` |
| dark band muted | `#a1a0ab` | railway `--gray-600` = `hsl(246 6% 65%)` |
| dark band text | `#ffffff` | railway `--foreground` = `hsl(0 0% 100%)` |
| primary button hover | `#3b3a33` | cursor `--color-theme-fg-02`, the reference's own one-step hover |
| snippet text | `#454545` | railway `tokens.json` `colors`, third by frequency (#454545, 23 hits) |

Ratios measured: text on ground 14.33:1, accent on ground 4.91:1, accent on surface 4.66:1,
white on the dark band 18.67:1, dark band muted 7.18:1. All body text clears 4.5:1.

Rejected: railway `--pink-600` `#a667e4`, the purple button accent. The page carries one accent
and the warm ground owns it; a purple button on cream reads as a second brand.

Type, two families, cap respected:

| role | value | source |
|---|---|---|
| display | EB Garamond 400, `letter-spacing:-.015em`, `line-height:1.02` | cursor `fonts` = `EB Garamond`, Google Fonts |
| body | Inter 400/500, `letter-spacing:0` | railway `--font-inter`, Google Fonts |

Substitution: none needed, both are open faces on Google Fonts. Dropped: railway
`--font-jetbrains-mono` and its monospace eyebrow, and cursor `--font-mono`. Both references run a
mono label as part of the look, and the two family cap in Stage 2 excludes it. Labels here are
Inter, 11px, uppercase, `.09em` tracking, tabular figures, which carries the same job.

| token | value | source |
|---|---|---|
| radius small | `4px` | railway `radii` `.25rem` |
| radius medium | `8px` | railway `radii` `.5rem` |
| radius panel | `20px` | railway `radii` `20px` |
| shadow | none | cursor ships hairlines and no shadow; `.cell` and nav use no box-shadow |
| container | `1200px` + 32px gutters | railway `containers` `1280px` minus gutters |
| section padding | `88px` desktop, `56px` mobile | measured from railway section rhythm |
| label size | `11px / .09em / uppercase` | derived from railway's monospace eyebrow, restyled to Inter |

## Stage 3, copy

Vertical: pharmaceutical cold chain records. Neither reference is in it (Railway is deployment
infrastructure, Cursor is an editor).

Company: Longstone. Temperature and custody records for pharmaceutical shipments. Audience is
quality assurance and logistics leads at pharma distributors. No customer, number, logo or
certification is claimed anywhere, because the brief gave none and inventing one is a lie the
page would have to carry.

Claims, mechanism over adjective: hashed handoff signatures, per-SKU stability envelope, hold
placed against the lot number, PDF/A-3 export with the raw payload, carrier API instead of a
driver portal.

Reference copy reused: none. Checked the headlines and claims of both pages; the h1, every h2 and
the subhead are written for this company.

## Stage 4, sourced visuals

| element | source | changed |
|---|---|---|
| `.display` tracking and the half-dimmed headline span | `~/.config/opencode/skills/premium-saas-web/shared/typography.md` | tracking loosened from `-.05em` to `-.015em` because EB Garamond at `-.05em` closes its counters; dim tone set to `rgb(38 37 30 / .45)` from the stolen ink |
| hairline frame rules, carried through the dark band | `~/.config/opencode/skills/premium-saas-web/shared/light.md`, "Hairline grid and column guides" | `--line` swapped for the Cursor border alpha, max width 1200px, band rules recoloured to `#33323e` |

Nothing in the page needs a WebGL context, a canvas engine or an animation library, so nothing
was pulled from aceternity, magicui or the Codrops set.

The three product visuals were built instead of placed. `dashboard.html` is a working lane console
in the same tokens, and the landing page embeds three views of it: the lane overview in the hero,
the excursion trace in section 02, the hold queue in section 03. The charts are generated SVG from
the same deterministic series the console uses, so the peak of 9.2 °C in the hero is the same
reading the console reports for PX-8842. Every label carries a value from that data.

The Stage 5 snippet was copied as written, with one swap: it sets `var(--font-mono)` and this page
carries two families, so the placeholder uses `--body` at 500 weight. The dash, radius and padding
are unchanged.


## Resolved assets

The three Stage 5 placeholders were replaced by a built product UI, not by a stock screenshot:

| was | now | file |
|---|---|---|
| lane overview in the hero panel | a two pane console embed: five lanes with state dots, one selected, inline trace, envelope stats, link to the full console | `index.html`, `.mini` |
| excursion trace in section 02 | the same 24 h series with the band, min 5.3, max 9.2, one reading outside | `index.html`, `.tracecard` |
| hold queue in section 03 | two open holds with reason, time and lot, both buttons routing into the console | `index.html`, `.holdcard` |

`dashboard.html` carries the state the landing page summarises: five lots, filter chips, search,
a 6/24/72 h range switch, custody events, an envelope card, a hold queue with a reason gated
release, and an append only audit log that takes a new line when a hold is signed off. Nothing on
the page is a screenshot, so nothing here goes stale.

Two decisions taken while building it:

- **Mono allowed.** The system mono stack is kept for lot ids, temperatures and timestamps, because
  both references use a mono label and the numbers need tabular figures. Display is EB Garamond,
  body is Inter. This is the "two families plus a mono label" reading of the Stage 2 cap, now
  written into the skill.
- **Monochrome status.** State is carried by a dot's fill, not by colour: filled accent for ok,
  filled ink for an excursion, hollow ring for a hold, plus the word where the state is the point.
  One accent, no red or amber, because the stolen palette has none and a status colour outside the
  palette is the invention Stage 2 forbids.

Not placed: customer logos. The proof strip carries interoperability standards (GS1 EPCIS 2.0,
PDF/A-3, MQTT 5, REST, SFTP) as text instead of a logo row, since a logo row without real
customers is exactly the invented-credential problem Stage 3 forbids. Send logos and the strip
becomes a logo strip.

Also noted from the captures: railway.com leans on a hand-drawn illustrated hero and cursor.com on
a painted landscape, neither of which is ours. The hero panel here is a flat raised tone from the
palette, no artwork, and no placeholder was needed for it.

## Stage 7, verification

`node scripts/capture.mjs file:///.../index.html .` wrote `refs/local/` with 1440 full page, 1440
hero, 768 and 390. The same Playwright browser checked the page under a script at
`/tmp/opencode/check-landing.cjs`, which also reports overflow elements and hidden reveals.

Measured in the browser:

| page | width | scrollWidth / clientWidth | console errors | broken images |
|---|---|---|---|---|
| index.html | 390 | 390 / 390 | none | none |
| index.html | 768 | 768 / 768 | none | none |
| index.html | 1440 | 1440 / 1440 | none | none |
| dashboard.html | 390 | 390 / 390 | none | none |

Fonts loaded: EB Garamond 400 and 500, Inter 400 and 500. No image tags, so no broken images.

Fixed during verification:

1. The dark band carried a negative inline margin left over from an earlier full-bleed attempt,
   which put 48px of scroll on every width. Removed.
2. `.feature.flip .grid` outranks the 900px rule on specificity, so the flipped section stayed
   two column at 390 and blew the layout out by 17px. Both selectors are now in the media query.
3. Single column grids were `1fr`, whose min-content floor is the sample record table. Now
   `minmax(0,1fr)`, with tighter table padding under 560px.
4. Hero was one column at 1440 with a large empty right half. Now a 1.12/.88 grid, copy left,
   body and buttons right against a hairline.
5. The console embed broke at 390: lane ids wrapped to two lines, the route column truncated to
   `Ro...`, and the chart labels rendered at 4px. Under 900 the console goes full width with the
   five lanes in one row and no route text; under 720 the lanes are a two column grid, and under
   560 the svg labels are dropped because the foot row already carries the numbers.
6. At 768 the split column made the trace 130px tall and left a dead panel under it. The stacked
   layout from point 5 covers that width too.
7. Chart labels inherited a default font because `var()` does not resolve inside an SVG
   `font-family` attribute. Now a class sets it in CSS.

Checks that pass:

- No horizontal scroll at any of the three widths.
- No placeholder left in either file. The three that existed are now the console panels above.
- 13 hex values in the CSS, all 13 present in the palette table. Alphas run through
  `rgb(var(--ink-rgb) / x)` so no stray hex enters.
- Copy: six headlines and section headings were string matched against both captured
  `page.html` files. No overlap.
- Focus rings visible on every link and button (`:focus-visible`, accent outline). No inputs on
  the landing page; the console's search and reason select carry labels.
- `prefers-reduced-motion: reduce` drops the reveal rule entirely, so content is visible without
  JS and without motion; with IO missing, the script marks everything visible. Scrolling the full
  page in the checker left no reveal below opacity 0.9.
- Console action tested end to end: releasing a hold is disabled until a reason is chosen, then
  removes the hold, zeroes the open count, drops the alert pill, flips the lane to ok and appends
  an audit line with a digest. Filter, search, range switch and the empty state all respond.

## Skill notes, from running it

Five gaps found on the first run. All five are now fixed in `steal-a-design/SKILL.md`, so this list
is the record of why each rule exists, not a to do:

1. Stage 7 asked for a 390, 768 and 1440 capture while `capture.mjs` wrote no 768 shot. The script
   now writes `tablet.png`.
2. "Two families at most" contradicted "steal the system" when both references run a monospace
   label as part of the look. Stage 2 now allows the system mono stack for labels and figures.
3. Stage 1 said to ask for screenshots when a capture fails, and Stage 0 said no second round of
   questions. Stage 1 now separates the two cases: ask when a human is present, drop that
   reference and say so when running unattended.
4. Stage 5's snippet used `var(--font-mono)`, which a two family page may not define. The snippet
   now uses a token every run has.
5. The proof strip assumed customer logos while Stage 3 forbids inventing one. Stage 5 now allows
   real numbers, `[[? ...]]` markers, or dropping the strip for one line of proof.

One more was added after the console build: Stage 5 had no rule for the product UI behind the
landing page, so the pipeline only knew how to placehold it. It now says to build `dashboard.html`
in the same tokens, with working state, and link the page into it.

