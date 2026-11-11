# bibek_portfolio

Personal portfolio of Bibek Panda, Flutter engineer.

Live at **https://bibekpanda55.github.io/bibek_portfolio/**

## What's here

- `index.html`: the page.
- `assets/data.js`: all content (projects, features, experience, skills). Edit this to change the text.
- `assets/app.js`: renders the page and the interactive phone mockups for each feature.
- `assets/style.css`: styles.
- `.github/workflows/deploy.yml`: deploys to GitHub Pages on every push to `main`.

No build step: it's plain HTML, CSS and JavaScript. Open `index.html` in a browser to preview.

Finsco, Vine Gypsy and TVMAX use real screenshots (in `assets/img`); Innopay screens are working mockups and contain
no real customer data.

## Adding images

Put images in `assets/img/` as `.webp` (videos as `.mp4` with a `<name>-poster.webp` beside them), then run `python3 tools/img_sizes.py` so each one
gets its real size on the page. Without it, the layout shifts while images load and Safari
jumps while scrolling.
