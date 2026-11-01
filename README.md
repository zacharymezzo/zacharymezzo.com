# Zachary Mezzo — website

A one-page static site built with [Eleventy](https://www.11ty.dev/). **All content lives in `src/_data/site.yaml`** — the name, sidebar links, and every section, in order.

## Editing content

Each section in `site.yaml` has a `title`, an optional `type` (`album`, `link`, or `about`), and `items`. Each item can override `type`, so one section can mix album tiles and plain links (see *Scoring*).

```yaml
- title: "Recording Credits"
  id: credits            # optional URL anchor (#credits)
  type: album
  items:
    - artist: "Miss Grit"
      title: "Overflow"
      note: "Violin, String Arrangement"
      image: "albums/miss-grit.jpg"          # in src/images/
      links:
        - { label: "Bandcamp", url: "https://missgrit.bandcamp.com/track/overflow" }
```

- **album** items show as a cover in a grid. Hover (or tap on a phone) to reveal the `links` as buttons; clicking one opens it in a new tab. No `image`? A text placeholder tile is shown. Add `image_fit: contain` for non-square art.
- **link** items show as a list. The first link is the main one; extra links appear as "(+ label)".
- **about** takes `image`, `image_credit`, and `bio` (Markdown).

Images go in `src/images/` (square, ~800px, JPG). Originals are kept in `Website Materials/`.

## Run it

```bash
npm install
npm start          # http://localhost:8080 with live reload
npm run build      # outputs the static site to _site/
```

## Deploying

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

**Custom domain:** `zacharymezzo.com` is set in the repo's Settings → Pages. DNS is managed in Squarespace Domains (A records → GitHub Pages IPs, `www` CNAME → `sourencho.github.io`).

Colours and fonts are CSS variables at the top of `src/css/style.css`.

## Files

```
src/_data/site.yaml     ← all content
src/index.njk           ← page template
src/_includes/base.njk  ← HTML shell (fonts, meta)
src/css/style.css       ← styles
src/js/albums.js        ← tap-to-reveal album links
src/images/             ← headshot + albums/
eleventy.config.js      ← YAML + Markdown support, filters
```
