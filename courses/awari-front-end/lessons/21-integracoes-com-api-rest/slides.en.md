---
theme: default
title: 'REST API integrations'
titleTemplate: '%s — Awari front-end course'
author: David Dimon
transition: slide-left
mdc: true
---

<script setup>
import Intro from '../../shared/components/Intro.vue'
import CourseImage from '../../shared/components/CourseImage.vue'
import LessonNav from '../../shared/components/LessonNav.vue'
import '../../shared/style.css'
</script>

<LessonNav
  course-url="/engineering-talks/courses/awari-front-end/"
  previous-url="/engineering-talks/courses/awari-front-end/aulas/20-typescript/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/22-graphql-e-arquitetura-de-software/"
/>

<Intro title="REST API integrations" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Introduction</li>
      <li>Fetch api</li>
      <li>Axios</li>
      <li>React Query</li>
      <li>API documentation</li>
      <li>Postman</li>
      <li>Integrating a front end with a REST API</li>
    </v-clicks>
  </ul>

---

# Introduction

Front-end applications rarely work on their own. They need data to display,
and that data belongs in a database rather than in the front end.

---

# Introduction

This is where back-end applications come in. They contain business rules,
database access, and other server-side concerns. The front end integrates with
the back end to use those capabilities.

---

# Introduction

The back end exposes an API with several endpoints for these integrations.
Each endpoint supports a different operation, such as retrieving, changing, or
deleting data.

---

# Fetch api

The front end can integrate with an API in several ways. A common option is the
JavaScript <b>Fetch API</b>, which lets us choose the URL, request method, and
parameters to send.

---

# Fetch API — example

```js
const getCoins = async () => {
  const response = await fetch(URL, { method: 'get' });
  const data = await response.json();
};
```

---

# Axios

Libraries can also handle the work performed by the Fetch API. One of them is
<b>Axios</b>, which provides benefits such as:

  <ul>
    <li>Interceptors</li>
    <li>An object with default values such as the base URL</li>
    <li>Abstractions for query parameters</li>
  </ul>

---

# React query

<b>React Query</b> is another useful library for API integrations with Axios or
Fetch. It provides caching and hooks that simplify integrations in React apps.

---

# React Query — advantages

<ul>
    <li>Includes developer tools</li>
    <li>Works with REST and GraphQL</li>
    <li>Hooks expose loading, refetching, and other states</li>
    <li>Configurable caching</li>
  </ul>

---

# API documentation

An API usually provides documentation that lists its endpoints and their
requirements. REST applications commonly use Swagger for documentation.
<br />
[Swagger example](https://petstore.swagger.io/)

---

# Postman

We do not always test endpoints directly in the front end. <b>Postman</b>
provides a convenient way to enter an API URL and test its endpoints.

---

# Integrating a front end with an API

[Application with a back-end integration](https://codesandbox.io/s/coin-cap-example-4587ux?file=/src/App.js)

---

# References

[Repository with some tests :D](https://github.com/DavidDimon/awari-tests)
[React Query comparison with other libraries](https://react-query.tanstack.com/comparison)
[Public APIs](https://github.com/public-apis/public-apis)

---

# That's all, folks!

Questions?
<br />
[Question form](https://forms.gle/NE5p3juqxmDaXyj3A)
