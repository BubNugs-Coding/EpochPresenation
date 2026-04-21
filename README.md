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

This site’s source repo is **[BubNugs-Coding/EpochPresenation](https://github.com/BubNugs-Coding/EpochPresenation)** (note the spelling of the repo name).

1. Ensure the latest `main` is pushed (this directory is that repo’s working tree).
2. On GitHub: **Settings → Pages**
   - **Build and deployment**: Deploy from a branch  
   - **Branch**: `main`, folder **`/ (root)`**

After GitHub finishes building, the site URL is:

[https://bubnugs-coding.github.io/EpochPresenation/](https://bubnugs-coding.github.io/EpochPresenation/)

## Run locally

Any static file server works, for example from this directory:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Related

- **Application source**: [github.com/BubNugs-Coding/Epoch](https://github.com/BubNugs-Coding/Epoch)
