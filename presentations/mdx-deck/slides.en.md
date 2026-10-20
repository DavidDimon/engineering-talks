---
theme: default
title: 'MDX Deck'
titleTemplate: '%s — Engineering Talks'
info: |
  Faithful migration of the historical presentation about MDX Deck.
author: David Dimon
keywords: mdx, mdx-deck, react, presentations
transition: slide-left
mdc: true
---

# mdx-deck

## How to create presentations in a more front-end way

<div class="historical-note">Content presented in October 2020 (approximate date).</div>

---

# What is MDX?

---

# What is MDX Deck?

---

# What are the advantages of MDX Deck?

<v-clicks>

- Presentation hosting
- Using React components in presentations
- Extensive customization
- CodeSurfer

</v-clicks>

---

# What are the disadvantages of MDX Deck?

<v-clicks>

- Gatsby build
- It can be a somewhat radical solution

</v-clicks>

---

# What is CodeSurfer?

---

# CodeSurfer example

```js {1-5|7-9}
// Bad code
if (test === true) {
  return 'its truly';
} else {
  return 'its falsy';
}

// Good code
if (test) return 'its truly';
return 'its falsy';
```

---

# Shall we code?

<img src="./assets/printExample.png" alt="Printed example of the presentation code" class="deck-image square" />
