# Epoch — GitHub Pages presentation

This folder is a **single-page, scrollable static site** that introduces [Epoch](https://github.com/BubNugs-Coding/Epoch): a browser-based civilization-style simulation built with React, TypeScript, and Vite. The layout and interaction patterns match sibling showcase folders (for example `WinterShowcase` in the same parent directory): sticky header, section nav, scroll progress, and expandable detail blocks.

## What is Epoch?

Epoch simulates **one hundred deterministic agents** on a procedurally generated hidden grid. They manage needs, make utility-based decisions, gather food, found and join **settlements**, align into **factions**, fight skirmishes, and **migrate** under pressure. Runs end with clear conditions (everyone gone, faction dominance, max day, or module-driven overrides) and surface a **chronicle-style recap** plus charts and notable figures.

The implementation keeps **simulation logic separate from canvas rendering**, uses a **fixed-step tick** advanced from `requestAnimationFrame`, and supports **toggleable modules** that hook into the same lifecycle as core systems.

For a living technical checklist and metrics, see `PROJECT_STATUS.md` in the [Epoch repository](https://github.com/BubNugs-Coding/Epoch).

## Files in this presentation

| File        | Role                                              |
| ----------- | ------------------------------------------------- |
| `index.html`| One-page content and structure                    |
| `styles.css`| Visual design (dark theme, responsive layout)     |
| `script.js` | Scroll progress, nav highlighting, copy link, expand/collapse |

Optional: add screenshots under `assets/` and replace the abstract hero in `index.html` with a `<figure>` / `<img>` if you want a photographic preview on the page.

## Publish to GitHub Pages

1. Create a GitHub repository for this site (for example `EpochPresentation`) or use an existing Pages repo.
2. Copy **the contents of this folder** (not the parent `Code` directory) to the repository root.
3. In the repo on GitHub: **Settings → Pages**
   - **Build and deployment**: Deploy from a branch  
   - **Branch**: usually `main`, folder **`/ (root)`**
4. Commit and push.

After deployment, the site URL is typically:

`https://bubnugs-coding.github.io/<your-repo-name>/`

Replace `<your-repo-name>` with the actual repository name.

## Run locally

Any static file server works, for example from this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Related

- **Application source**: [github.com/BubNugs-Coding/Epoch](https://github.com/BubNugs-Coding/Epoch)
