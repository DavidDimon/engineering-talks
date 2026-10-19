# ADR 0001: Nx and pnpm monorepo foundation

- Status: Accepted
- Date: 2026-10-14

## Context

Engineering Talks needs independent presentation builds, affected-project execution, deterministic
dependency installation, and a React showcase without coupling it to Slidev's Vue runtime.

## Decision

Use pnpm workspaces for package ownership and dependency installation, and Nx for the project graph,
task orchestration, caching, and affected execution. Keep each presentation as an independent
workspace package and Nx project. Use official Nx plugins where they fit and ordinary package
scripts or lightweight targets for Slidev.

Pin Node 26.12.0 through nvm. Pin pnpm 11 for the initial workspace because pnpm 12's native
executable did not complete its startup check on the development host. Revisit pnpm 12 after its
native distribution has been validated on local and CI hosts.

Pin TypeScript 6.0.3 because the current Nx ESLint dependency chain is not yet compatible with
TypeScript 7's compiler API changes.

Do not create a custom Nx plugin or shared presentation theme until repeated use demonstrates that
the additional abstraction is worthwhile.

## Consequences

- Presentations can develop and build independently.
- Nx can cache work and select affected projects as the collection grows.
- React and Vue code remain on separate dependency paths.
- Each presentation has a small amount of package metadata, which a later template script will
  generate consistently.
