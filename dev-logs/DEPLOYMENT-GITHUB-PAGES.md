# GitHub Pages Deployment

**Date:** 2024-11-06  
**Author:** Cascade (AI Pair Programmer)  
**Status:** Complete

## Overview

Configured automated deployment of the Dyscalculia Knowledge Repository to GitHub Pages using Eleventy with a `pathPrefix`-aware build. Added workflow automation, build tooling, and URL handling updates to ensure the site renders correctly at `https://willguessed.github.io/dyscalculia-hub/`.

---

## 1. Eleventy Configuration

- Added `pathPrefix` support in `.eleventy.js` so all generated URLs honour `/dyscalculia-hub/` when deployed.
- Ensured asset passthrough (CSS, JS, assets, policies) remained intact under the new prefix.
- Introduced a `searchIndex` collection and template to emit `search-index.json` during the Eleventy build.

## 2. Build Tooling

- Added `cross-env` dev dependency and `npm run build:gh` script to set `ELEVENTY_PATH_PREFIX` consistently across platforms.
- Documented usage in `README.md` and `PROJECT-STATUS.md`.

## 3. GitHub Actions Workflow

- Created `.github/workflows/deploy.yml` with build and deployment jobs:
  - Checkout, Node setup, dependency install (`npm ci`).
  - Run `npm run build:gh` to produce prefixed static output in `_site`.
  - Publish artifacts via `actions/upload-pages-artifact@v3` and deploy with `actions/deploy-pages@v4`.
- Added `workflow_dispatch` trigger for manual redeploys.

## 4. Front-end Adjustments

- Wrapped all internal links and asset references with Eleventy’s `url` filter.
- Injected path-prefix metadata through `<body data-site-prefix="…">` attributes and updated `search.js` to consume them.
- Converted section listings, header/footer links, and JavaScript routing to use prefixed URLs.
- Generated initial changelog entry (`2024-11-06 Project Launched`).

## 5. Verification

- Local build (`npm run build:gh`) passes without errors.
- GitHub Actions pipeline completes successfully and publishes the site.
- Live site verified: navigation, help articles, search, and assets load correctly.

## 6. Follow-up

- Monitor GitHub Pages deployment logs after future pushes.
- Consider moving residual inline scripts (footer timestamp, submission form handler) into external JS to satisfy stricter CSP policies.
- Configure custom domain + HTTPS in long-term roadmap.
