---
theme: default
title: 'SEO and SSR'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/22-graphql-e-arquitetura-de-software/"
/>

<Intro title="SEO and SSR" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Introduction to SEO</li>
      <li>The importance of SEO</li>
      <li>What is SSR?</li>
      <li>Advantages of SSR over SPAs</li>
      <li>Next JS</li>
      <li>Gatsby JS</li>
    </v-clicks>
  </ul>

---

# Introduction to SEO

SEO, or search engine optimization, is a set of techniques that helps pages
rank well in search engines such as Google and attract organic traffic.

---

# Introduction to SEO

Almost everything on a page can influence how Google ranks a site. A higher
ranking makes the site easier for users to find.

---

# SEO ranking factors

Many studies try to identify the factors Google uses to rank a page. Backlinko
published a list of 200 factors. We will look at the ten most important ones.

---

# SEO ranking factors

<ul>
    <li>
      Page authority/PageRank: the authority and relevance of the page
    </li>
    <li>
      Domain authority: pages on a domain with greater authority on the web
    </li>
    <li>
      Originality and content quality: search engines prioritize substantial,
      original content
    </li>
    <li>
      Content length: longer content may be considered less superficial
    </li>
    <li>
      Keyword in the title: this can strongly influence the evaluation
    </li>
    <li>
      Keyword in the content: include it in the first 100 words and in headings
    </li>
  </ul>

---

# SEO ranking factors

<ul>
    <li>How long users stay on the page</li>
    <li>Loading speed: lighter pages perform better</li>
    <li>
      Responsive design: Google prioritizes sites that adapt to mobile devices
    </li>
  </ul>

---

# SEO and SPAs

A single-page application can make SEO harder because the page content is
dynamic and loads with JavaScript, which some crawlers may not fully process.

---

# What is SSR?

Server-side rendering changes how an SPA renders by moving part of the process
to the server. The browser receives pre-rendered content, which makes indexing
easier for search crawlers.

---

# Advantages of SSR over SPAs

<ul>
    <li>Requests and assets such as images can be cached</li>
    <li>Better support for SEO</li>
    <li>Less processing on the client device</li>
    <li>Full-featured frameworks that simplify development</li>
  </ul>

---

# Disadvantages of SSR compared with SPAs

<ul>
    <li>The first render is usually slower</li>
    <li>
      Some libraries, such as styled-components, require more complex setup
    </li>
    <li>Longer build times</li>
  </ul>

---

# Next JS

Next.js is an open-source framework created and maintained by Vercel for
building React applications with SSR. It includes features such as routing,
dynamic translations, asset caching, and Vercel integration.

---

# Gatsby JS

Gatsby is a framework for building sites with React and server rendering. It
is well suited to static sites and blogs and has powered open-source tools such
as MDX Deck and Docz.

---

# References

[Repository with some tests :D](https://github.com/DavidDimon/awari-tests)
[Article about SEO](https://resultadosdigitais.com.br/o-que-e-seo/)
[SSR vs SPA](https://www.treinaweb.com.br/blog/spa-e-ssr-quais-as-diferencas?gclid=CjwKCAiA4KaRBhBdEiwAZi1zzv-e5wcRkgpH7PhkKssGuhXZyavdfKkV8NNCVRstdSlSP3nONZJU8hoCfywQAvD_BwE)
[Next JS](https://nextjs.org/)
[Gatsby JS](https://www.gatsbyjs.com/)
[Creating a simple blog with Gatsby and Netlify CMS](https://www.netlifycms.org/docs/gatsby/)

---

# That's all, folks!

Questions?
<br />
[Question form](https://forms.gle/NE5p3juqxmDaXyj3A)
