#!/usr/bin/env node
// Captures a reference site so the agent copies what is there instead of guessing:
// full-page and mobile screenshots plus the CSS tokens the page really ships.
// Usage: node scripts/capture.mjs <url|file:///path> <outdir> [slug]
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';

const run = promisify(execFile);
const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const [url, outdir, slugArg] = process.argv.slice(2);
if (!url || !outdir) {
  console.error('usage: node capture.mjs <url|file:///path> <outdir> [slug]');
  process.exit(2);
}

const isFile = url.startsWith('file://');
const slug =
  slugArg ||
  (isFile
    ? 'local'
    : new URL(url).hostname.replace(/^www\./, '').replace(/[^a-z0-9]+/gi, '-'));

const dir = join(outdir, 'refs', slug);
await mkdir(dir, { recursive: true });

async function get(target, accept) {
  if (target.startsWith('file://')) return readFile(new URL(target), 'utf8');
  const res = await fetch(target, {
    headers: { 'user-agent': UA, accept: accept || 'text/html,text/css,*/*' },
    redirect: 'follow',
  });
  if (!res.ok) throw new Error(`${res.status} ${target}`);
  return res.text();
}

let html;
try {
  html = await get(url, 'text/html');
} catch (e) {
  console.error(`capture failed: ${e.message}`);
  process.exit(1);
}
await writeFile(join(dir, 'page.html'), html);

// Stylesheets the page links. Skip fonts, analytics, and anything not CSS.
const linked = [...html.matchAll(/<link[^>]+rel=["']?stylesheet["']?[^>]*>/gi)]
  .map((tag) => /href=["']([^"']+)["']/i.exec(tag[0])?.[1])
  .filter(Boolean)
  .map((href) => new URL(href, url).href)
  .slice(0, 6);

const chunks = [html];
for (const href of linked) {
  try {
    chunks.push(await get(href, 'text/css'));
  } catch (e) {
    console.warn(`skip stylesheet ${href}: ${e.message}`);
  }
}
const css = chunks.join('\n');

const tally = (matches) => {
  const counts = new Map();
  for (const m of matches) counts.set(m, (counts.get(m) || 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([value, count]) => ({ value, count }));
};

const vars = {};
for (const [, name, value] of css.matchAll(/--([\w-]+)\s*:\s*([^;}]+)/g)) {
  if (!(name in vars)) vars[name] = value.trim();
}

const tokens = {
  url,
  capturedAt: new Date().toISOString(),
  cssVariables: vars,
  // Ordered by how often the value appears, which is a decent proxy for "is this a real system color".
  colors: tally(css.match(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi) || [])
    .filter(({ value }) => !/^#(0000|fff0)$/i.test(value) && !/rgba?\([^)]*,\s*0\s*\)/i.test(value))
    .slice(0, 30),
  fonts: tally((css.match(/font-family\s*:\s*[^;}]+/gi) || []).map((s) => s.replace(/^font-family\s*:\s*/i, '').trim())).slice(0, 8),
  radii: tally((css.match(/border-radius\s*:\s*[^;}]+/gi) || []).map((s) => s.replace(/^border-radius\s*:\s*/i, '').trim())).slice(0, 8),
  shadows: tally((css.match(/box-shadow\s*:\s*[^;}]+/gi) || []).map((s) => s.replace(/^box-shadow\s*:\s*/i, '').trim())).slice(0, 6),
  containers: tally((css.match(/max-width\s*:\s*\d{3,4}px/gi) || []).map((s) => s.replace(/^max-width\s*:\s*/i, ''))).slice(0, 8),
  effects: Object.fromEntries(
    ['backdrop-filter', 'linear-gradient', 'radial-gradient', 'mix-blend-mode', 'filter: blur', 'text-shadow']
      .map((k) => [k, (css.match(new RegExp(k, 'gi')) || []).length])
  ),
};

await writeFile(join(dir, 'tokens.json'), JSON.stringify(tokens, null, 2));

const shots = [
  ['desktop.png', ['--full-page', '--viewport-size=1440,900']],
  ['hero.png', ['--viewport-size=1440,900']],
  // Narrow viewport instead of --device: device descriptors pick a browser engine that may not be installed.
  ['mobile.png', ['--full-page', '--viewport-size=390,844']],
  ['tablet.png', ['--full-page', '--viewport-size=768,1024']],
];

for (const [name, flags] of shots) {
  try {
    await run(
      'npx',
      ['--yes', 'playwright', 'screenshot', '--wait-for-timeout=2500', ...flags, url, join(dir, name)],
      { timeout: 180000 }
    );
  } catch (e) {
    console.warn(`screenshot ${name} failed: ${(e.stderr || e.message).trim().slice(-300)}`);
  }
}

console.log(`captured ${url} -> ${dir}`);
console.log(
  `css vars ${Object.keys(vars).length} | colors ${tokens.colors.length} | fonts ${tokens.fonts.length} | radii ${tokens.radii.length}`
);
