# Bolys Sabitbek — academic website

Personal academic portfolio, built as a plain static site (HTML + CSS, no build
step, no JavaScript). Designed to be served by **GitHub Pages** at
<https://sabitbekbolys.github.io>.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | About: bio, research interests, news, selected publications |
| `publications.html` | Full list: preprints, journal articles, work in progress |
| `teaching.html` | Lecturing, TA positions, mentoring |
| `outreach.html` | Media appearances and interviews (YouTube embeds) |
| `cv.html` | Positions, education, awards |
| `css/style.css` | All styling (light + dark mode, one file) |
| `assets/photo.jpg` | Profile photo |
| `assets/favicon.svg` | Browser-tab icon (∂ monogram) |

## How to edit

Everything is plain HTML — edit directly on GitHub (press `.` in the repo to
open the web editor) or locally.

- **Add a publication:** in `publications.html`, copy an existing
  `<li>…</li>` block in the right section and edit authors / title / venue /
  links. Numbering updates automatically.
- **Add a news item:** in `index.html`, copy a `<li>` inside `<ul class="news">`
  and put it at the top.
- **Add a video:** in `outreach.html`, copy a `<li>` inside `<ul class="videos">`
  and replace the YouTube ID in the iframe `src` (the part after `/embed/`)
  and the title lines.
- **Change photo:** replace `assets/photo.jpg` (roughly square works best).
- **Offer a PDF CV:** put the file at `assets/cv.pdf` and un-comment the
  "Download CV" link near the top of `cv.html`.
- **Colors / fonts:** the `:root` variables at the top of `css/style.css`.
- The sidebar is repeated in each of the five HTML files — if you change it
  (e.g. a new email), change it in all five.

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
