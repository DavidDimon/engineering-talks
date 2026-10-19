# ADR 0004: Production browser tests and GitHub Pages delivery

- Status: Accepted
- Date: 2026-10-16

## Context

The showcase and every presentation build independently, but GitHub Pages needs one artifact with
the showcase at the repository root and presentations at their published subpaths. The delivery
pipeline must verify real browser behavior against that exact layout before publishing it.

## Decision

Add a small framework-neutral Pages project that assembles existing production outputs into
`dist/pages`. It copies the showcase to the artifact root, preserves presentation and course subpaths,
and adds `.nojekyll`. It does not rebuild or transform another project's output.

Use Playwright with Chromium to test the assembled artifact through Vite's production preview.
Cover catalog discovery, URL-backed filters, theme persistence, and the presence of presentation
builds. Run formatting, linting, type checks, unit tests, production builds, and browser tests in a
single GitHub Actions workflow. Pull requests stop after verification; pushes to `main` and manual
runs upload and deploy the same tested `dist/pages` directory through the official Pages actions.

## Consequences

- Browser tests exercise the same directory structure that reaches production.
- Presentation and showcase projects remain independently buildable.
- Deployable presentation and course projects must be dependencies of the Pages project; the
  assembler discovers and copies their existing outputs without importing runtime code.
- Local end-to-end runs require the Playwright Chromium binary in addition to workspace packages.
