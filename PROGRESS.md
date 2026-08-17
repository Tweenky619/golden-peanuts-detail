# Golden Peanut's Detail — Progress Notes

**Project:** Mobile car detailing marketing site
**Repo:** Tweenky619/golden-peanuts-detail (GitHub Pages)
**Live site:** goldenpeanutsdetail.com
**Working dir:** /workspace/golden-peanuts-detail

## Standing Workflow
1. Edit on a branch
2. Commit → push
3. Open PR via GitHub MCP tools
4. Merge immediately (unless told to wait for explicit "watch it and merge")
5. Verify `deploy.yml` GitHub Action succeeded
6. Sync local repo to `main`, render locally with Playwright to visually confirm
7. Report back with screenshots

## Just Completed (merged, PR #21, commit `a3403e8`)
Restructured `services.html` from a single pricing page into a hub with 3 clickable category cards ("Choose a Service Category"): Car Detailing, Ceramic Coating, and a grayed-out "Coming Soon" third card (content TBD — decide after the first two are done).

**New pages:**
- `car-detailing.html` — all original pricing content (Interior/Exterior/Complete Detail, Polishing, add-ons, RV/Boat pricing, vehicle icons)
- `ceramic-coating.html` — new content: "Why Ceramic Coating" (4 benefit cards), "What's Included" (4-step process), "Ceramic Coating Pricing" (4 price cards)

**Other updates:**
- `index.html` Popular Services cards now link to `car-detailing.html` instead of `services.html`
- Added a "Ceramic Coating" option to the `contact.html` booking form's service dropdown
- New CSS: `.services-hero`, `.breadcrumb-link`, `.ps-card-soon`
- All assets cache-busted with `?v=20260816c` / `?v=20260816b`

## Current Blocker (unresolved)
User reported "its working but the service page is not."

**Verified:**
- Local repo matches deployed commit `a3403e8` exactly
- GitHub Actions deploy succeeded
- DNS resolves directly to GitHub Pages (no proxy/edge cache)
- Re-read all three files — no code bugs found, links/assets/cache-busting all correct

**Leading hypothesis (unconfirmed):** Browser-side caching on user's device — same symptom happened before in this project, previously fixed by cache-busting version strings (already in place here).

**Next step:** Ask user precisely which URL (`services.html` hub / `car-detailing.html` / `ceramic-coating.html`) and what they're seeing (old content, broken layout, 404, missing images) — code review and deploy verification both came back clean.

## Also Unavailable This Session
Canva and Cloudflare Developer Platform MCP connectors — need user authorization via claude.ai connector settings if relevant.
