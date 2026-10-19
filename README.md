# Engineering Talks

Engineering Talks is David Dimon's open-source archive of technical presentations and educational
resources. It preserves historical material while providing independently buildable Slidev
presentations and a lightweight public showcase.

The repository has completed **M9 — Awari course and final delivery**. The Portuguese portfolio
experience presents five migrated historical talks and the complete 23-lesson Awari front-end
course with validated dates, provenance, permanent URLs, responsive layouts, and accessible light
and dark themes. Every item is built locally with Slidev and assembled into the GitHub Pages
artifact without relying on legacy deployments.

The completed migration is documented in the
[showcase portfolio plan](docs/roadmap/showcase-portfolio-plan.md).

The dates and provenance used by catalog v2 are recorded in the
[editorial curation](docs/content/curation.md).

## Requirements

- Node.js 26.12.0 through nvm
- pnpm 11.28.2 installed in the selected nvm environment

```bash
nvm use
npm install --global pnpm@11.28.2
pnpm install --frozen-lockfile
```

## Workspace commands

```bash
pnpm format           # Format supported workspace files
pnpm format:check     # Check formatting without changing files
pnpm lint             # Lint workspace configuration and all lintable projects
pnpm typecheck        # Type-check all projects that expose a typecheck target
pnpm test             # Test all projects that expose a test target
pnpm build            # Build all projects that expose a build target
pnpm affected -- -t lint,test,build --base=main
pnpm graph
pnpm check            # Run all currently applicable quality checks
pnpm content:validate # Validate presentation metadata and catalog invariants
pnpm content:generate # Write dist/content/catalog.json
pnpm pages:build      # Assemble the deployable site in dist/pages
pnpm test:e2e         # Build and test the final site with Playwright
```

Run the legacy development fixture locally with:

```bash
pnpm nx dev talk-engineering-talks-intro
```

Run the showcase locally with:

```bash
pnpm nx dev showcase
```

Install Chromium once before running browser tests locally:

```bash
pnpm exec playwright install chromium
pnpm test:e2e
```

## Add a presentation

Generate a draft with the standard metadata, package scripts, Nx tags, and Slidev entry point:

```bash
pnpm new:presentation -- --format talk --slug reliable-frontends --title "Reliable Frontends"
pnpm install
pnpm content:validate
```

Use `--format workshop` for workshops. Metadata lives beside `slides.md` in `metadata.json`. The
schema requires lowercase kebab-case slugs, a matching folder and content kind, at least one topic,
a delivered date, provenance, and a supported schema version. Drafts validate but are omitted from
the production catalog. A local presentation URL is generated only after `slides.md` exists.

The generated `dist/content/catalog.json` and showcase copy are disposable build output. Entries
are sorted deterministically. Historical source URLs are explicit metadata; local presentation and
course URLs are derived from `content.config.json`.

## Workspace layout

- `apps/` — the React/Vite showcase and its production browser tests.
- `presentations/` — presentation metadata and independently buildable Slidev decks.
- `courses/` — course manifests, shared assets, and ordered lesson decks.
- `talks/` — legacy development fixtures excluded from the production catalog and Pages artifact.
- `packages/content-schema/` — framework-neutral metadata and catalog contracts.
- `tools/content/` — metadata validation and deterministic catalog generation.
- `tools/templates/` — the presentation scaffold used by `pnpm new:presentation`.
- `tools/pages/` — the final static-site assembler used by tests and deployment.
- `docs/` — architecture decisions and contributor guidance.

See [Project boundaries](docs/architecture/project-boundaries.md) for the dependency rules.
