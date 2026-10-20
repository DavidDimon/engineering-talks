---
theme: default
title: 'Introduction to web development'
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
  next-url="/engineering-talks/courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/"
/>

<Intro title="Introduction to web development" image="introDev" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Requirements and initial setup</li>
      <li>What are front-end and back-end development?</li>
      <li>How does a web application work?</li>
      <li>Web protocols</li>
      <li>Exercise</li>
    </v-clicks>
  </ul>

---

# Initial setup

<ul>
    <li>NVM to manage Node versions</li>
    <li>Yarn or npm</li>
    <li>Git (create a GitHub account)</li>
    <li>VS Code or another editor</li>
  </ul>

---

# Optional requirements

<ul>
    <li>Linux or macOS</li>
    <li>Gitkraken</li>
  </ul>

---

# What it takes to become a great developer

<ul>
    <v-clicks>
      <li>Persistence</li>
      <li>Humility</li>
      <li>Keeping up to date</li>
      <li>Being open to new technologies</li>
      <li>English</li>
    </v-clicks>
  </ul>

---

# VS Code extensions I use

<ul>
    <li>Cyberpunk Theme</li>
    <li>GitLens</li>
    <li>Prettier</li>
    <li>SVGO</li>
    <li>vscode-icons</li>
  </ul>

---

# What is back-end development?

A back-end developer handles the application's logic and its database
integration. This includes everything users do not see, such as login logic,
data storage, and other server-side behavior.

---

# What is front-end development?

A front-end developer builds the visual interface of a web application and
integrates it with the back end.

---

# How does a web application work?

<CourseImage name="backendfront" alt="How a web application works" :width="700" :height="300" />

---

# What is HTTP?

HTTP (Hypertext Transfer Protocol) is a set of rules for transferring data,
including text files, images, audio, and other media.

---

# What happens when I open a website?

When you open a website such as awari.com.br, your browser sends an HTTP (or
HTTPS) request that looks roughly like this: GET
https://awari.com.br

---

# What happens when I open a website?

The server receives and processes the request, then responds with either the
website files or an error page.

---

# Main HTTP methods

<ul>
    <v-clicks>
      <li>GET</li>
      <li>POST</li>
      <li>PUT</li>
      <li>PATCH</li>
      <li>DELETE</li>
    </v-clicks>
  </ul>

---

# Status codes

Every request returns a status code. Each range represents a specific type of
response.

---

# Status codes

<ul>
    <v-clicks>
      <li>Informational responses (100-199)</li>
      <li>Successful responses (200-299)</li>
      <li>Redirects (300-399)</li>
      <li>Client errors (400-499)</li>
      <li>Server errors (500-599)</li>
    </v-clicks>
  </ul>

---

# The difference between HTTP and HTTPS

SSL (Secure Sockets Layer) encrypts data transmitted between your computer and
a server. HTTPS, also called secure HTTP or HTTP over SSL, protects our data
during a request.

---

# URL structure

<CourseImage name="urlStructure" alt="URL structure" :width="1200" :height="300" />

---

# Exercise

This exercise is very simple, but it will make more sense as the course
progresses. Choose your favorite website, with no judgment, and take a
screenshot showing the main way you use it.

---

# That's all, folks!

Questions?
