# Special Secret Santa

A single-page Secret Santa app. It draws gift assignments while respecting
per-person exclusions. Everything runs in the browser. No data is sent anywhere.

## Features

- Add participants one at a time or as a comma/newline separated list.
- Set exclusions: pick a person, check who they must not gift.
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

- `index.html` — markup and CDN links.
- `style.css` — layout and app styles on top of Doodle CSS.
- `js/` — the app logic, split by purpose (utils, state, i18n, matching, links,
  people, results, reveal, main).

The scripts are plain (not ES modules) and share the global scope. Load order
matters and `js/main.js` must stay last.

## Credits

Made by Nakawashi and Claude.

Hand-drawn style by [Doodle CSS](https://chr15m.github.io/DoodleCSS/).
