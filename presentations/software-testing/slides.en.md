---
theme: default
title: 'Shall we talk about testing?'
titleTemplate: '%s — Engineering Talks'
info: |
  Faithful migration of the historical presentation about JavaScript testing.
author: David Dimon
keywords: testing, javascript, jest, enzyme, tdd
transition: slide-left
mdc: true
---

# Testing (JavaScript)

## What is it for, and how do we do it?

<div class="historical-note">Content presented in February 2020 (approximate date).</div>

---

# Why write tests?

<v-clicks>

- Confidence that your code actually works
- Tests serve as documentation
- Easier function debugging
- Reliability
- A much happier life!

</v-clicks>

---

# Types of tests

<v-clicks>

- Unit tests
- Integration tests
- Component tests
- Snapshot tests

</v-clicks>

---

# Which libraries can I use?

There are several libraries, but the main ones are Enzyme and Jest.

---

# How should tests be organized?

There are two options:

<v-clicks>

- Create a `__tests__` folder at the project root
- Create a file with the `.test.[js/jsx/ts/tsx]` suffix next to the tested file

</v-clicks>

---

# Organization — `__tests__` pros

<v-clicks>

- All tests are centralized in one place

</v-clicks>

---

# Organization — `__tests__` cons

<v-clicks>

- The project structure must be duplicated inside `__tests__`
- Over time, tests become somewhat difficult to find

</v-clicks>

---

# Organization — `.test.js` pros

<v-clicks>

- The test file stays next to the file containing the tested functions
- Tests are easy to locate

</v-clicks>

---

# Organization — `.test.js` cons

<v-clicks>

- The function or component folder can become somewhat crowded

</v-clicks>

---

# What about TDD?

## Where does it fit into all this?

---

# Now for the good part

## Let's code!
