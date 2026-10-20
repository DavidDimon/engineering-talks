---
theme: default
title: 'Core Components'
titleTemplate: '%s — Engineering Talks'
info: |
  Faithful migration of the historical presentation about monorepos and core components.
author: David Dimon
keywords: monorepo, components, architecture, lerna, rollup
transition: slide-left
mdc: true
---

# Core Components

## How to get more reuse from your components

<div class="historical-note">Content presented in December 2019 (approximate date).</div>

---

# Why have a unified codebase?

<v-clicks>

- Better code reuse
- Standardized code
- More concise and mature code
- Easier maintenance
- Faster creation of new apps

</v-clicks>

---

# How can we create a shared codebase?

With components, services, and themes structured in a monorepo!

---

# Why create a monorepo?

- Packages stay together
- No need for multiple releases just to test
- Easy communication between packages

---

# Technologies used in the monorepo

<v-clicks>

- Lerna
- Yarn Workspaces
- Rollup

</v-clicks>

---

# Lerna

- Unifies package `node_modules`
- Exposes commands for publishing packages
- Manages which packages are published or built

---

# Why use Yarn Workspaces with Lerna?

Yarn Workspaces adds even more capabilities to Lerna.

---

# Rollup

Rollup builds the package chunks.

---

# Packages

<v-clicks>

- Apps
- Libs

</v-clicks>

---

# Apps

## Not published

Contains a mobile app and a web app for testing the packages (libs).

---

# Libs

<v-clicks>

- Components
- Services
- Themes
- `_Babel` (custom Babel configs)
- `_Rollup` (custom Rollup configs)

</v-clicks>

---

# Components

<v-clicks>

- Mobile
- Shared (styles)
- Web

</v-clicks>

---

# Atomic Design — pros

<v-clicks>

- Component separation
- Easier styling
- Smarter, more generic components
- Easier testing

</v-clicks>

---

# Atomic Design — cons

<v-clicks>

- Requires more abstraction
- More complex, generic components

</v-clicks>

---

# Shared styles

- Shares only what is truly needed across platforms
- Provides more freedom to create platform-focused components

---

# Services

- Contains all functions and hooks shared across projects
- Custom hooks can make app development easier

---

# Themes

This is where we can create themes for each project.

---

# `_Babel`

Contains all build configuration shared across packages.

---

# `_Rollup`

Configuration needed to build the packages.
