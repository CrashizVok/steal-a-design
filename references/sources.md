# Where to find real implementations

Reach for these before writing anything visual by hand. Copy the shortest working version, rewire it to the stolen tokens, leave the source URL in a comment.

## Local, already installed

- `~/.config/opencode/skills/struq/blocks/CATALOG.md` and `references/craft.md`: admitted blocks with three variants each. Next.js markup, but the CSS and structure port cleanly.
- `~/.config/opencode/skills/premium-saas-web/`: measured CSS recipes for glow, gradient borders, glass navs, bento grids, scroll reveals.
- `~/.claude/skills/page-design/`: token pattern for a single-file page.

## Component libraries

Verified reachable:

- https://ui.aceternity.com (21st.dev family, heavy animated sections)
- https://magicui.design (marquee, meteors, particles, bento)
- https://21st.dev (community components, copy-paste)
- https://ui.shadcn.com/blocks (clean marketing blocks)
- https://hyperui.dev (plain Tailwind marketing components)
- https://freefrontend.com (aggregates CodePen-grade effects)
- https://cruip.com (SaaS landing sections, free set)
- https://www.untitledui.com (marketing sections and charts)
- https://vercel.com/templates (full landing page sources)
- https://astro.build/themes (full static pages)
- https://tailwindcss.com/plus/ui-blocks (paid, worth naming to the user)
- https://themeforest.net (paid templates, check licence before shipping)
- https://webflow.com/templates (preview pages hold usable markup ideas)

Blocked to `curl`, fine in a browser:

- https://tympanus.net/codrops (the best source for scroll and WebGL demos)
- https://codepen.io
- https://uiverse.io (buttons, loaders, toggles)

## Query pattern

Search `<element> codepen` or `<element> tailwind component`, where `<element>` is the visual, not the product: "animated grid background", "gradient border card", "terminal typing hero", "logo marquee", "bento grid dark", "pricing table toggle", "sticky scroll section".

## Rules

- Take the shortest working implementation, not the prettiest demo.
- Strip analytics, fonts and dependencies you do not need.
- Keep the licence compatible: MIT and free tiers first, and tell the user when a source is paid.
- If the component needs a WebGL context, a canvas engine or more than roughly 100 lines, and nothing simple exists, use the placeholder instead.
