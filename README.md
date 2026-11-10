# steal-a-design

A pipeline for building a landing page that looks like one to three named reference sites. It
captures the real pages, reads the CSS they ship, and rebuilds the system from that evidence. The
point is that nothing visual is invented: not the palette, not the type, not the product screenshot
in the hero.

Built and tested against railway.com and cursor.com. The output was checked at 390, 768 and 1440
and committed as `examples/longstone/`.

## How a run goes

1. Ask for one to three reference URLs, a palette, the brand facts and an output folder. Then stop
   and wait. Gaps are resolved with a stated default, not a second round of questions.
2. Capture each reference with `scripts/capture.mjs`: full page at 1440, hero, tablet, mobile,
   the HTML, and the CSS custom properties and colour frequencies the page actually ships.
3. Turn that into `design.md`, one row per role, every value carrying its source. Nothing comes
   from taste.
4. Write the copy. Your data if you have it, an invented enterprise company if not, never a
   reference site's headline.
5. Source the hard visuals from real templates. Glow, WebGL, bento grids and 3D are copied from
   something that exists or left as a visible placeholder.
6. Build `index.html`, one file, inline CSS, no build step.
7. Screenshot it at 390, 768 and 1440, open the shots, fix what is wrong, then report.

If the product UI itself is part of the ask, stage 6 also builds `dashboard.html` in the same
tokens, with a working selection, filter, one action that appends to a log, and an empty state.

## What a run leaves behind

```
<outdir>/
  index.html          the landing page, inline CSS, no build step
  dashboard.html      only when the product UI was requested
  design.md           every stolen value with its source, plus open assets
  assets/             images you own or downloaded
  refs/<slug>/        desktop.png, hero.png, tablet.png, mobile.png, page.html, tokens.json
```

## Requirements

Node 18 or newer for `fetch`. Playwright comes in through `npx`, so there is nothing to install
first, but the first capture downloads a Chromium build (about 150MB). No npm install, no
framework, no bundler anywhere in the pipeline.

## Run it

Capture a reference:

```sh
node scripts/capture.mjs https://railway.com ./out
```

Capture a local page for verification:

```sh
node scripts/capture.mjs file:///absolute/path/index.html ./out local
```

Both write into `out/refs/<slug>/`. The slug defaults to the hostname, or `local` for a file.

As an OpenCode skill, the folder is symlinked into the skills directory:

```sh
ln -s "$PWD" ~/.config/opencode/skills/steal-a-design
```

Then a request like "build me a landing page like cursor.com and railway.com" loads `SKILL.md` and
the pipeline runs.

## The example

`examples/longstone/` is a finished run: a pharmaceutical cold chain company, built from the two
references above, with a lane console behind the landing page. Start with its `design.md` if you
want to see what the provenance table, the rejected values and the resolved asset list look like.

Open `examples/longstone/index.html` in a browser, then the "Open the live console" link.

## What it refuses to do

- Pick a colour that is not in your palette or in the captured tokens.
- Describe a site from memory instead of the screenshots.
- Fake a product screenshot, a 3D scene or a customer logo.
- Reuse a reference site's headline or tagline.
- Add routing, a CMS, a framework or a build step.

## Scope

One landing page. One console page when asked. This is the test version, so there is no second
marketing page, no deployment config and no content pipeline.

## Layout

| path | what |
|---|---|
| `SKILL.md` | the pipeline an agent follows |
| `scripts/capture.mjs` | screenshots plus token extraction |
| `references/sources.md` | where to find real implementations, with query patterns |
| `examples/longstone/` | a finished run |
