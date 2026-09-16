# Workato Foundations — Boarding Pass

Static, single-page GitHub Pages site: pre-requisites and setup checklist for the Aretex × Workato Foundations hands-on training. Plain HTML/CSS/JS — no build step, no framework.

Design plan and content sourcing behind this page: see the Obsidian note
`🏢 Customers/Embedded/Aretex/Aretex Training — Prerequisites Site Plan.md`.

## Files

- `index.html` — page content
- `styles.css` — all styling
- `script.js` — checklist persistence only (localStorage, degrades gracefully without it)

## Before publishing

- [ ] Fill in the confirmed session date/venue in the hero (`index.html`, "Date & venue" row) — left as "to be confirmed" pending final scheduling.
- [ ] Confirm the crew list in the Support section still matches trainers assigned.

## Publish to GitHub Pages

1. Create a new **public** repo on your personal GitHub account (e.g. `workato-foundations-boarding-pass`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Aretex Workato Foundations — prerequisites site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repo's **Settings → Pages**, set Source to `main` branch, `/ (root)`.
4. Site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
