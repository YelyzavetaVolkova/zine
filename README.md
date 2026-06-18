# Ukrainian Electronic Music Scene in Berlin — zine flipbook

A static, no-build website that displays the zine as a real page-turning
flipbook (page-curl, not a slide/fade), built with the open-source
[StPageFlip](https://github.com/Nodlik/StPageFlip) library (MIT).

## Status

Work in progress — pages 1–20 of 75 are in. The book already works end to
end; it just gets longer as more pages are added.

## Structure

```
index.html        the page
style.css          all styling (white background, vellum treatment, nav)
script.js          builds the book from pages.js and wires up StPageFlip
pages.js           ordered list of page image filenames — THE thing to edit
assets/pages/      the page images themselves (page-01.jpg, page-02.jpg, ...)
assets/vendor/     the StPageFlip library, vendored locally (no CDN dependency)
```

## Adding more pages

1. Drop the new page images into `assets/pages/`, named `page-21.jpg`,
   `page-22.jpg`, etc., continuing the sequence.
2. Add their filenames, in order, to the `PAGES` array in `pages.js`.

That's it — the book rebuilds itself from that list. The translucent
"vellum" treatment is applied automatically to whichever page is first
and last in the list, so once the real final page is added it will pick
up the effect on its own.

## Running locally

Any static file server works, e.g.:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

## Deploying to GitHub Pages

Covered once all 75 pages are in — it's a plain static site, so it's a
straightforward `git push` + flipping on Pages in the repo settings.
