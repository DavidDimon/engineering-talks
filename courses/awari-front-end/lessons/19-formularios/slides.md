---
theme: default
title: 'Formulários'
titleTemplate: '%s — Curso de front-end Awari'
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

<Intro title="Formulários" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Introdução</li>
      <li>Tipos de input</li>
      <li>Tag &lt;form&gt;</li>
      <li>Função submit</li>
      <li>Formik</li>
      <li>Validações + yup</li>
      <li>Formulário de steps + zustand</li>
    </v-clicks>
  </ul>

---

# Introdução

A maioria das aplicações temos que fazer cadastros, ou configurações e
normalmente usamos formulários para enviar essas informações. Normalmente os
formulários seguem um padrão, que seriam um agrupamento de campos(que chamamos
de inputs) e um botão de enviar que serve para submeter aquele formulário

---

# Tipos de input

Para fazermos um formulário, possuimos uma grande varíedade de inputs
diferentes, que vai desde um input de texto, até um dropdown com opções
pre-selecionadas.

---

# Tipos de input

A tag <b>&lt;input&gt;</b> possui um atributo/prop chamada type, que ali
podemos definir um tipo especifico de input que pode ser, button, checkbox,
color, date, datetime... entre muitos outros

---

#

">

    Todo formulário que criarmos no web, precisaremos da tag <b>&lt;form&gt;</b>,
    pois assim conseguimos submeter as informações para uma api e também
    conseguiremos controlar as validações dos campos.

---

# Tag form - Exemplo

```js
<form submit={onSubmit}>
  <input value={text} />
  <button type="submit">Save</button>
</form>
```

---

# Função submit

Normalmente, nos formulários vamos passar uma função de submit para o form,
que é ativada por um button com o type submit, assim quando o submit for
acionado, conseguiremos fazer pre-validações utilizando formik + yup.

---

# Formik

Existem várias libraries para gerenciamento de formulários em react, porém
uma das mais utilizadas, é o formik, com o formik, não precisamos definir
vários states para cada input, e conseguimos criar validações para cada
input.

---

# Formik

Podemos utilizar o formik tanto como um componente, que recebe um
children(seu formulário), ou por hooks. Por hooks conseguimos abstrair os
nossos formulários de uma forma mais inteligente e mais modular, pois
conseguimos criar outros custom hooks, que retornam o formik, e mais
validações, assim a nossa page fica com menos códigos.

---

# Validações + yup

O yup seria uma outra library que possui uma gama gigantesca de validações
pre-criadas para utilizarmos nos nossos formulários. Possui uma integração
muito boa com o formik, e também é muito fácil de customizar.

---

# Yup + Formik - Exemplo

```js
const formik = useFormik({
  initialValues: { email: '' },
  validationSchema: yup.object().shape({
    email: yup.string().required('Email obrigátorio').email('Email inválido'),
  }),
});
```

---

# Formulário de steps + zustand

[Exemplo com formik, yup e zustand](https://codesandbox.io/s/formik-example-vrtu3t?file=/src/App.js)

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Documentação do input html](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/input)
[Documentação do form html](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/form)
[React hooks form(outra lib parecida com formik)](https://react-hook-form.com/)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
