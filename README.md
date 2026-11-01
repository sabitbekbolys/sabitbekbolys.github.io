# Bolys Sabitbek — academic website

Personal academic portfolio, built as a plain static site (HTML + CSS + one
small vanilla JavaScript file, no build step, no dependencies). Served by
**GitHub Pages** at <https://sabitbekbolys.github.io>.

The design is light and editorial — near-white paper background,
journal-style serif typography (STIX Two Text, the typeface of math journals)
— and the header of every page is a **live finite-difference simulation of the
2-D wave equation** (`u_tt = c²Δu`, leapfrog scheme with Mur absorbing
boundaries), drawn as a 3-D perspective wireframe in ink-like lines on a plain
`<canvas>`. Moving the cursor across the surface (or tapping it) drops
disturbances into the membrane. It respects `prefers-reduced-motion` (renders
one static frame) and pauses when scrolled out of view.

The pages work without JavaScript too: if `js/wave.js` fails to load, the
header simply shows a plain background — all text and navigation stay
visible.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Hero + about, research interests, news, selected publications |
| `publications.html` | Full list: preprints, journal articles, work in progress |
| `teaching.html` | Lecturing, TA positions, mentoring |
| `outreach.html` | Media appearances and interviews (YouTube embeds) |
| `cv.html` | Positions, education, awards |
| `css/style.css` | All styling — colours and fonts in the `:root` variables at the top |
| `js/wave.js` | The wave-equation simulation + 3-D renderer (hero and banner variants) |
| `assets/photo.jpg` | Profile photo |
| `assets/favicon.svg` | Browser-tab icon (∂ over a wave) |

## How to edit

Everything is plain HTML — edit directly on GitHub (open a file, click the
pencil icon) or locally.

**The fast way:** open the page you want to change and search (Ctrl+F /
Cmd+F) for `✏️` or the word `ADD`. Every editable spot has a comment block
with a copy-paste template right there:

| You want to… | File | Search for |
| --- | --- | --- |
| Add a preprint | `publications.html` | `ADD NEW PREPRINT` |
| Add a journal article | `publications.html` | `ADD NEW JOURNAL ARTICLE` |
| Move a published preprint | `publications.html` | `PAPER GOT PUBLISHED` |
| Add a news item | `index.html` | `ADD NEWS` |
| Change the featured papers | `index.html` | `UPDATE SELECTED PUBLICATIONS` |
| Add a course | `teaching.html` | `ADD NEW COURSE` |
| Add a video | `outreach.html` | `ADD NEW VIDEO` |
| Add a position / award | `cv.html` | `ADD NEW POSITION` |

In every list the newest entry goes first, numbering is automatic, and your
name stays inside `<strong>…</strong>`.

- **Change photo:** replace `assets/photo.jpg` (roughly square works best).
- **Offer a PDF CV:** put the file at `assets/cv.pdf` and un-comment the
  "Download CV" link near the top of `cv.html`.
- **Colours / fonts:** the `:root` variables at the top of `css/style.css`.
  The wave's line colours are the `--wave-near` / `--wave-far` /
  `--wave-depth` variables there (written as `r, g, b`).
- **Wave behaviour:** the constants at the top of `js/wave.js` — `K` (wave
  speed), `DAMP` (energy loss), `HEIGHT` (relief), and the rain interval in
  `frame()`.
- The top bar and footer are repeated in each of the five HTML files — if you
  change them (e.g. a new email), change them in all five.

## Updating the live site (GitHub website)

1. Open <https://github.com/sabitbekbolys/sabitbekbolys.github.io>.
2. Click **Add file → Upload files**.
3. In Finder, select **everything in this folder** — the five `.html` files,
   `README.md`, and the `css`, `js` and `assets` folders — and drag it all
   into the upload box at once. GitHub keeps the folders, so files land in
   the right place and replace the old versions.
4. Click **Commit changes**. The site updates within a few minutes; reload
   with Cmd+Shift+R to bypass the browser cache.

Avoid copy-pasting file contents into GitHub's editor for whole files —
special characters (—, ∂, Kazakh letters) can get garbled. Uploading the file
itself is safer.

Uploading never deletes old files. Files in the repository that the site does
not use and that can be deleted (open the file on GitHub → `…` menu → Delete
file): `style.css` and `styles.css` in the top level (the real stylesheet is
`css/style.css`), `js/site.js`, `preview-desktop.png`, `preview-mobile.png`,
and `assets/math-hero.png`.

## Preview locally

Any static server works, e.g.:

```sh
python3 -m http.server 4173
# then open http://localhost:4173
```
