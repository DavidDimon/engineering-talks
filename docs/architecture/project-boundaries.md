# Project boundaries

Engineering Talks contains two deliberately separate UI ecosystems:

- The public showcase uses React and Vite.
- Presentations use Slidev and its Vue runtime.

They may share framework-neutral metadata, validation code, build tooling, and static assets. They
must not share React or Vue components. This keeps each presentation independently buildable and
prevents the showcase from inheriting Slidev's runtime.

Nx projects use these scope tags:

- `scope:showcase` for the React application and showcase-only libraries.
- `scope:presentation` for presentations, courses, and Slidev-specific code.
- `scope:shared` for framework-neutral packages and tools.

Shared projects may depend only on other shared projects. Showcase and presentation projects may
depend on shared projects but not on one another. The root ESLint configuration enforces these
rules for tagged projects.

Every standalone presentation is its own pnpm workspace package and Nx project. A course is one Nx
project that owns its ordered lessons and produces one static deck per lesson. Nx runs Slidev
through package scripts and lightweight targets; no custom Slidev plugin is planned.

The `content-schema`, `content-tools`, and `presentation-templates` projects are framework-neutral.
The content tools discover `presentations/*/metadata.json` and `courses/*/course.json` rather than
importing presentation runtime code. This keeps catalog generation independent from Slidev and
allows the React showcase to consume the generated JSON without crossing the React/Vue boundary.
