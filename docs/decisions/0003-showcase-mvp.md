# ADR 0003: Static React showcase

- Status: Accepted
- Date: 2026-10-16

## Context

The public catalog needs fast static hosting, useful discovery controls, and direct links to
independently built presentations. It must not couple React to Slidev's Vue runtime or require a
server-side routing layer on GitHub Pages.

## Decision

Build the showcase as a React 19 and Vite 8 single page with no client router. Generate a private
catalog copy beside the application before type checking or building, then bundle that validated
data into the static output. Search and filters are reflected in URL query parameters so a catalog
view remains shareable without server rewrites.

Use plain CSS with project-specific design tokens, responsive layouts, system-aware dark mode, and
an explicit saved theme preference. Keep interactions native and keyboard accessible. Put global
SEO and social metadata in the static HTML shell; per-presentation pages remain the responsibility
of their Slidev builds.

## Consequences

- The showcase builds to static assets under the repository's Pages base path.
- Catalog data cannot drift from metadata when the Nx dependency graph is used.
- No React code enters presentation projects and no Vue code enters the showcase.
- Automated browser coverage, final Pages assembly, and deployment remain M4 work.

## Portfolio amendment

- Date: 2026-10-16

M7 replaces the generic English catalog with a Portuguese personal portfolio. The home separates
presentations and courses, retains URL-backed text/year/topic filters, and displays editorial dates
with their precision. The showcase renders the Awari course index and temporary lesson archive
pages from the catalog without adding a client router. During Pages assembly, the root HTML shell
is copied to each course and lesson path so direct requests work on static hosting; future Slidev
lesson builds may overwrite those route shells without changing their public URLs.
