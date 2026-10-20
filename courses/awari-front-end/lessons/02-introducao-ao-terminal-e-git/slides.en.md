---
theme: default
title: 'Introduction to the terminal and Git'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/01-introducao-ao-desenvolvimento-web/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/03-introducao-ao-html/"
/>

<Intro title="Introduction to the terminal and Git" image="github" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Why do we use the terminal?</li>
      <li>Terminal options by operating system</li>
      <li>Common commands</li>
      <li>What is Git?</li>
      <li>Git commands</li>
      <li>Setting up your GitHub account</li>
      <li>Open source</li>
    </v-clicks>
  </ul>

---

# Why do we use the terminal?

We usually use the command line, or terminal, to run commands that do not need
a graphical interface.

---

# Why do we use the terminal?

In day-to-day work, it is common to use more than one terminal to run commands,
such as the command that starts an application.

---

# Terminal options by operating system

<ul>
    <li>Windows: PowerShell or Windows Terminal</li>
    <li>Linux: Bash (default) or Zsh</li>
    <li>macOS: Bash (default) or iTerm2</li>
  </ul>

---

# Common commands

<CourseImage name="terminal" alt="Common terminal commands" :width="950" :height="500" />

---

# What is Git?

Git is a distributed version control system. It lets us create projects and
manage multiple features and fixes, supporting a healthy development workflow.

---

# The history of Git

It began when the relationship between the Linux kernel community and
BitKeeper ended. BitKeeper is a distributed version control system.

---

# The history of Git

At that point, Linus Torvalds began developing his own version control system,
with a strong focus on performance.

---

# What about GitHub?

GitHub is a code hosting platform built around Git. It provides hosted Git
repositories and many additional collaboration features, so we do not need to
configure our own Git server.

---

# How does Git work?

<CourseImage name="gitlocal" alt="How Git works" :width="950" :height="500" />

---

# Git Tree

<CourseImage name="gitTree" alt="Git Tree" :width="950" :height="500" />

---

# Common Git terms

<ul>
    <li>Commit: Save code to the local repository</li>
    <li>
      Push: Upload commits from the local repository to the remote repository
    </li>
    <li>Branch: A version of the project containing features, fixes, or other work</li>
    <li>Pull: Update the local repository with changes from the remote repository</li>
  </ul>

---

# Git commands

<ul>
    <li>git init: Creates a new local repository</li>
    <li>git add: Stages a file for a commit</li>
    <li>git commit: Saves staged files to the local repository</li>
    <li>git push: Sends committed files to the remote repository</li>
    <li>git pull: Updates local files with changes from the remote repository</li>
    <li>git checkout #branch#: Switches branches</li>
  </ul>

---

# Setting up your GitHub account

---

# Open source

Open source is very important to software development. The movement has helped
technology and programming become widely available. Without open source,
technology might not be as advanced as it is today.

---

# References

[What are Git and GitHub?](https://www.alura.com.br/artigos/o-que-e-git-github?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XHs9CtWEWVYNSv8GDJrfijl9ISmEDr9uNQXsyfhKt2gVaRcLXnbK4aAuASEALw_wcB)
[A brief history of Git](https://medium.com/@dyhalmeida/breve-hist%C3%B3ria-do-git-o-controle-de-vers%C3%A3o-mais-adotado-pelos-desenvolvedores-do-mundo-inteiro-c82466b50c02)
[Useful links](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# That's all, folks!

Questions?
