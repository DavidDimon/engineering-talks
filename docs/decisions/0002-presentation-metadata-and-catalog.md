# ADR 0002: Presentation metadata and deterministic catalog

- Status: Superseded by the catalog v2 amendment
- Date: 2026-10-15

## Context

Every talk and workshop needs to build independently while contributing consistent information to
the future public showcase. Hand-maintained catalog entries would duplicate URLs and allow the
published site to drift from the source presentations.

## Decision

Store declarative `metadata.json` beside each presentation and validate it with a strict,
versioned Zod schema. Keep JSON Schema mirrors for editor feedback, while Zod remains the runtime
authority.

Use a framework-neutral content tool to discover `talks/*/metadata.json` and
`workshops/*/metadata.json`. It rejects invalid metadata, folder/slug/type mismatches, duplicate
slugs, and published presentations without `slides.md`. It computes source and deployment URLs
from `content.config.json`, sorts entries deterministically, excludes drafts by default, and writes
one versioned `dist/content/catalog.json` atomically.

Each presentation remains a pnpm workspace package and Nx project with independent `dev`, `build`,
and `validate` targets. Production Slidev builds use their final sub-path and omit speaker notes.
New presentations start as drafts through the checked-in template script.

## Consequences

- Metadata is validated once and can be consumed by tooling or any UI framework.
- Catalog output is reproducible and does not need to be committed.
- Drafts can evolve without appearing in production output.
- Published entries cannot advertise a deck that lacks its Slidev source.
- Package and template versions must be deliberately updated together until repeated needs justify
  a custom Nx generator or shared configuration package.

## Catalog v2 amendment

- Date: 2026-10-16

The portfolio plan replaces `talk | workshop` as the primary distinction with a discriminated
`presentation | course` union. Presentation format remains secondary metadata. Discovery now reads
`presentations/*/metadata.json` and `courses/*/course.json`; course manifests carry their ordered
lesson list explicitly. The runtime validator rejects duplicate or non-contiguous lessons and the
generated catalog exposes local URLs only after the corresponding source exists.
