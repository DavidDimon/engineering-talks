---
theme: default
title: 'Introduction to HTML'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/04-introducao-a-estilizacao-e-css/"
/>

<Intro title="Introduction to HTML" image="html" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>What is HTML?</li>
      <li>Basic tag structure</li>
      <li>Basic page structure</li>
      <li>Tag examples</li>
      <li>Creating your first page</li>
    </v-clicks>
  </ul>

---

# What is HTML?

HTML (Hypertext Markup Language) is a markup language for creating web pages.

---

# Tag structure

<CourseImage name="tagStructure" alt="Tag structure" :width="750" :height="300" />

---

# Basic HTML page

<CourseImage name="htmlPrint" alt="Basic HTML page" :width="600" :height="300" />

---

# Self-closing tags

Some tags do not contain any content. These are called self-closing tags.

---

# Self-closing tag example

&lt;img src="./image.png" /&gt;

---

# Tag attributes

Tags have attributes that define specific behavior. For example, the
&lt;img /&gt; tag has a `src` attribute that specifies the image path.

---

# Tag attributes

There are two types of attributes: global attributes and tag-specific attributes. <br />
  <ul>
    <v-clicks>
      <li>
        Global attribute: `id` assigns a unique identifier to a tag
      </li>
      <li>
        Tag-specific attribute: `alt` provides alternative text for an
        &lt;img /&gt; when the image cannot be displayed
      </li>
    </v-clicks>
  </ul>

---

# Do I need to memorize every tag?

HTML has many tags, but most names reflect what the tag does. <br />
For example:
  <ul>
    <li>&lt;img /&gt; image</li>
    <li>&lt;h1 /&gt; heading1</li>
    <li>&lt;p /&gt; paragraph</li>
    <li>&lt;br /&gt; break line</li>
  </ul>

---

# Meta tags

A meta tag describes the content of a web page. Search engines can display
this description below the page title and URL in search results.

---

# Meta tags

Because meta tags can influence the title and description shown in results,
they can help improve a page's click-through rate.

---

# Meta tag example

&lt;meta name="description" content="Page description"&gt;

---

# Text formatting tags

Some tags format text by adding italics, changing its size, or applying other
styles.

---

# Text formatting tags

<ul>
    <v-clicks>
      <li>
        &lt;p&gt;&lt;b&gt;HTML&lt;/b&gt; is very cool!&lt;/p&gt;
        <p>
          <b>HTML</b> is very cool
        </p>
      </li>
      <li>
        &lt;p&gt;HTML is &lt;small&gt;very&lt;/small&gt; cool!&lt;/p&gt;
        <p>
          HTML is <small>very</small> cool
        </p>
      </li>
    </v-clicks>
  </ul>

---

# Links

&lt;a href="https://www.google.com/" target="_blank"&gt;Google&lt;/a&gt;
[Google](https://www.google.com/)

---

# Unordered lists

&lt;ul&gt; <br />
&lt;li&gt;First item&lt;/li&gt; <br />
&lt;li&gt;Second item&lt;/li&gt; <br />
&lt;/ul&gt;<br />

  <ul>
    <li>First item</li>
    <li>Second item</li>
  </ul>

---

# Ordered lists

&lt;ol&gt; <br />
&lt;li&gt;First item&lt;/li&gt; <br />
&lt;li&gt;Second item&lt;/li&gt; <br />
&lt;/ol&gt;<br />

  <ol>
    <li>First item</li>
    <li>Second item</li>
  </ol>

---

# Tables

&lt;table&gt; <br />
&lt;tr&gt; <br />
&lt;td&gt;Test&lt;/td&gt; <br />
&lt;td&gt;15&lt;/td&gt; <br />
&lt;/tr&gt;<br />
&lt;/table&gt; <br />

  <table>
    <tr>
      <td>Test</td>
      <td>15</td>
    </tr>
  </table>

---

# Tables with headers

<CourseImage name="tableHead" alt="Tables with headers" :width="700" :height="500" />

---

# Semantic tags

Semantic tags clarify the relationship between page elements. They also help
search engines understand and rank the page.

---

# Semantic tags

<ul>
    <li>&lt;article&gt;</li>
    <li>&lt;aside&gt;</li>
    <li>&lt;footer&gt;</li>
    <li>&lt;header&gt;</li>
    <li>&lt;nav&gt;</li>
    <li>&lt;section&gt;</li>
    <li>&lt;main&gt;</li>
  </ul>

---

# Creating your first page

---

# References

[Main HTML tags](https://www.codigofonte.com.br/artigos/principais-tags-de-html)
[List of HTML tags](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element)
[More HTML tags](https://www.w3schools.com/tags/)
[Useful links](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# That's all, folks!

Questions?
