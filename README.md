# Alex Dragoi — Copywriter Portfolio

Next.js portfolio site with a "Selected Work" grid backed by `lib/projects.json`.

## Getting started

Requires Node 22+.

```bash
git clone git@github.com:AlexDragoi7/copy-video-portfolio.git
cd copy-video-portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

## Editing "Selected Work" via the admin panel

Projects can be edited through a local-only `/admin` page instead of hand-editing code. It's gated to development mode, so it's never reachable on the deployed site.

1. Create a branch off `main` for your changes:
   ```bash
   git checkout main
   git pull
   git checkout -b update-selected-work
   ```
2. Run the dev server: `npm run dev`
3. Go to [http://localhost:3000/admin](http://localhost:3000/admin).
4. From there you can:
   - **Add a project** — click "+ Add project" and fill in the form.
   - **Edit a project** — click a project in the list (or the ✎ icon) to load it into the form.
   - **Delete a project** — click the × icon in the list, or "Delete project" inside the edit form. This removes the entry from `lib/projects.json` and deletes its cover/detail images from `public/work` (unless another project still references the same image file).
   - Upload a **cover image** and any **detail images** (shown in the project's modal) directly through the file inputs — no need to touch `/public/work` by hand.
5. Saving writes straight to `lib/projects.json` and drops uploaded images into `public/work`. The homepage picks up changes immediately — check [http://localhost:3000](http://localhost:3000) to verify how it looks before moving on.
6. Once you're happy with it, commit and push as usual, then open a PR into `main`:
   ```bash
   git add lib/projects.json public/work
   git commit -m "Update selected work"
   git push -u origin update-selected-work
   ```

A couple of field notes for the form:
- **Id** is the project's slug — keep it lowercase with hyphens, it must be unique.
- **Ratio** controls the card's aspect ratio in the grid (e.g. `4/5`, `1/1`, `4/3`).
  <img width="1996" height="880" alt="Screenshot 2026-08-04 at 16 20 18" src="https://github.com/user-attachments/assets/7cb6266c-4e81-42ce-89c0-cf2d007dc3e8" />
- **Email content** supports the same formatting the modal renders: separate paragraphs with a blank line, and start every line of a paragraph with `- ` to render it as a bullet list.
