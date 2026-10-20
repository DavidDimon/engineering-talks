---
theme: default
title: 'Forms'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/18-gerenciamento-de-estados-parte-2/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/20-typescript/"
/>

<Intro title="Forms" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Introduction</li>
      <li>Input types</li>
      <li>Tag &lt;form&gt;</li>
      <li>The submit function</li>
      <li>Formik</li>
      <li>Validation with Yup</li>
      <li>Multistep forms with Zustand</li>
    </v-clicks>
  </ul>

---

# Introduction

Most applications need forms for registration or configuration. Forms usually
group fields, which we call inputs, and provide a submit button that sends the
information.

---

# Input types

Forms can use many kinds of inputs, from plain text fields to dropdowns with
preselected options.

---

# Input types

The <b>&lt;input&gt;</b> tag has a `type` attribute that selects a specific kind of
input, including button, checkbox, color, date, and datetime.

---

#

">

    Every form on the web needs a <b>&lt;form&gt;</b> tag. It lets us submit data to
    an API and control field validation.

---

# The form tag — example

```js
<form submit={onSubmit}>
  <input value={text} />
  <button type="submit">Save</button>
</form>
```

---

# The submit function

We usually pass a submit function to the form. A button with `type="submit"`
triggers it, allowing us to validate the data with Formik and Yup first.

---

# Formik

Several libraries manage forms in React. Formik is one of the most widely
used. It avoids separate state definitions for every input and supports
validation for each field.

---

# Formik

Formik works either as a component that receives the form as children or
through hooks. Hooks let us extract form behavior into reusable custom hooks,
keeping the page component smaller.

---

# Validation with Yup

Yup provides a large set of ready-made validation rules. It integrates well
with Formik and is easy to customize.

---

# Yup and Formik — example

```js
const formik = useFormik({
  initialValues: { email: '' },
  validationSchema: yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
  }),
});
```

---

# Multistep form with Zustand

[Example with Formik, Yup, and Zustand](https://codesandbox.io/s/formik-example-vrtu3t?file=/src/App.js)

---

# References

[Repository with some tests :D](https://github.com/DavidDimon/awari-tests)
[HTML input documentation](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input)
[HTML form documentation](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/form)
[React Hook Form, another library similar to Formik](https://react-hook-form.com/)

---

# That's all, folks!

Questions?
<br />
[Question form](https://forms.gle/NE5p3juqxmDaXyj3A)
