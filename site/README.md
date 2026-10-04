# The Wolf site

This static site is published by `.github/workflows/deploy-pages.yml`. The build reads every photo in `docs/gallery/`, makes web-sized copies, and includes the keymap SVG from the checked-out firmware submodule.

To preview locally, install Node.js and FFmpeg, then run from the repository root:

```sh
node site/build.mjs
```

Open `site/dist/index.html` in a browser. The generated `site/dist/` folder is ignored by Git.

GitHub Pages must use **GitHub Actions** as its publishing source in the repository's **Settings → Pages**. Pushes to `main` deploy when the site, gallery, firmware submodule pointer, or Pages workflow changes.
