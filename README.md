# golden-peanuts-detail
Website for Golden Peanut's Detail — mobile car detailing in San Diego

## Running locally
Plain static site, no build step. Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000

## Structure
- `index.html` — the whole site (hero, services, gallery, about, pay, contact)
- `css/style.css` — styles (brand colors: teal `#1c93a0`, gold `#f5a623`, navy `#0b2545`)
- `js/main.js` — mobile nav toggle + booking form (opens a pre-filled email)
- `images/` — put `logo.png` (the peanut mascot logo) and any gallery/before-after photos here

## TODO before launch
- [ ] Add `images/logo.png` (transparent background version of the logo)
- [ ] Add `images/favicon.png`
- [ ] Add real before/after photos to the Gallery section (`index.html`, `#gallery`)
- [x] Add pricing to each service card (Inside/Outside/Complete/Polishing + RV/Trailer/Boat, per email)
- [x] Venmo link confirmed (`@lunadlgd03`)
- [ ] Deploy (GitHub Pages, Netlify, or Vercel all work with zero config for static sites)

## Deploying with GitHub Pages
1. Repo Settings → Pages → Source: `main` branch, root folder
2. Site will be live at `https://tweenky619.github.io/golden-peanuts-detail/`
