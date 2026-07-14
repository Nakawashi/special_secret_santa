# Special Secret Santa

A single-page Secret Santa app. It draws gift assignments while respecting
per-person exclusions. Everything runs in the browser. No data is sent anywhere.

## Features

- Add participants one at a time or as a comma/newline separated list. Names
  accept letters, spaces, hyphens and apostrophes — no digits or symbols.
- Set exclusions ("who can't gift whom") with a guided sentence and a
  plain-language recap of every restriction set.
- Draw random assignments that honor all exclusions.
- Share a personal link per person. Each link reveals only that person's match.
- Copy all links at once for distribution.
- Interface available in English, French, German, Romansh, and Italian.

## Usage

You can open `index.html` directly with your browser, no server needed.

Serving over `http://` is recommended so the clipboard works reliably.

An internet connection is needed for the fonts and the Doodle CSS stylesheet,
which load from CDNs.

## How the private links work

After a draw, each person gets a link. The assignment is encoded in the URL
hash (`#r=...`). The hash is never sent to a server. Opening the link shows only
who that person must gift, so the surprise stays intact, even for the organizer.

## Project structure

- `index.html` — markup, CDN links and SEO metadata.
- `style.css` — layout and app styles on top of Doodle CSS.
- `js/` — the app logic, split by purpose (utils, state, i18n, matching, links,
  people, results, reveal, main).
- `favicon.svg`, `og-image.svg` — icon and social-share image.
- `robots.txt`, `sitemap.xml` — SEO / crawler files.

The scripts are plain (not ES modules) and share the global scope. Load order
matters and `js/main.js` must stay last.

## SEO

`index.html` carries a description, keywords, canonical URL, Open Graph and
Twitter Card tags, and JSON-LD structured data. `robots.txt` and `sitemap.xml`
point crawlers at the canonical domain. All of these are shipped by the deploy
workflow (`.github/workflows/deploy.yml`).

## Fonts

The site uses **5 font families** in total.

Four web fonts are loaded from Google Fonts (in `index.html`):

| Font | Role | Where |
|------|------|-------|
| **Berkshire Swash** | decorative title | `h1` |
| **Nunito** | body text | paragraphs, checklist, summary, results |
| **Short Stack** | DoodleCSS's default hand-drawn font | buttons, inputs, `h2`/`h3`, tagline (applied by DoodleCSS) |
| **Material Icons** | icons (gift, link, casino, block…) | `.material-icons` |

Plus one system font stack (no download):

- **`var(--sans)`** = `system-ui, -apple-system, "Segoe UI", Roboto, …` — used for
  **participant names** (chips, select, assignments, summary) so they stay neutral
  and legible, distinct from the hand-drawn style.

## Credits

Made by Nakawashi and Claude.

Hand-drawn style by [Doodle CSS](https://chr15m.github.io/DoodleCSS/).
