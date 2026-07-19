# Bolys Sabitbek — academic website

Personal academic portfolio, built as a plain static site (HTML + CSS + a
little vanilla JavaScript, no build step, no dependencies). Designed to be
served by **GitHub Pages** at <https://sabitbekbolys.github.io>.

The design is dark and editorial — journal-style serif typography (STIX Two
Text, the typeface of math journals) — and the hero of every page is a **live
finite-difference simulation of the 2-D wave equation** (`u_tt = c²Δu`,
leapfrog scheme with Mur absorbing boundaries), rendered as a 3-D perspective
wireframe on a plain `<canvas>`. Moving the cursor across the surface drops
disturbances into the membrane; clicking drops a bigger one. It respects
`prefers-reduced-motion` (renders one static frame) and pauses when scrolled
out of view.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Hero + about, research interests, news, selected publications |
| `publications.html` | Full list: preprints, journal articles, work in progress |
| `teaching.html` | Lecturing, TA positions, mentoring |
| `outreach.html` | Media appearances and interviews (YouTube embeds) |
| `cv.html` | Positions, education, awards |
| `css/style.css` | All styling (colors/fonts in the `:root` variables at the top) |
| `js/wave.js` | The wave-equation simulation + 3-D renderer (hero and banner variants) |
| `js/site.js` | Mobile nav toggle + reveal-on-scroll animations |
| `assets/photo.jpg` | Profile photo |
| `assets/favicon.svg` | Browser-tab icon (∂ monogram over a wave) |

## How to edit

Everything is plain HTML — edit directly on GitHub (press `.` in the repo to
open the web editor) or locally.

**The fast way:** open the page you want to change and search (Ctrl+F /
Cmd+F) for `✏️` or the word `ADD`. Every editable spot has a big comment
block with a copy-paste template right there:

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
- **Colors / fonts:** the `:root` variables at the top of `css/style.css`.
- **Wave behaviour:** the constants at the top of `js/wave.js` — `K` (wave
  speed), `DAMP` (energy loss), `HEIGHT` (relief), and the rain interval in
  `frame()`.
- The top bar and footer are repeated in each of the five HTML files — if you
  change them (e.g. a new email), change them in all five.

## Preview locally

Any static server works, e.g.:

```sh
python3 -m http.server 4173
# then open http://localhost:4173
```

## Publish to GitHub Pages

The site must live in a repository named `sabitbekbolys.github.io` on the
`sabitbekbolys` account (its GitHub Pages then serves at that URL). From this
folder:

```sh
git init                # if not already a repo
git add -A
git commit -m "Rebuild academic portfolio"
git branch -M main
git remote add origin https://github.com/sabitbekbolys/sabitbekbolys.github.io.git
git push -u origin main --force   # --force replaces the old template site
```

Then check that **Settings → Pages** in the repo has "Deploy from a branch"
with `main` / root selected. The site updates a minute or two after each push.
