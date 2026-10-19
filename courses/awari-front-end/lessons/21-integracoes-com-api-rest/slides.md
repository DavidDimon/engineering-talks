---
theme: default
title: 'Integrações com API REST'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/20-typescript/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/22-graphql-e-arquitetura-de-software/"
/>

<Intro title="Integrações com api(rest)" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Introdução</li>
      <li>Fetch api</li>
      <li>Axios</li>
      <li>React Query</li>
      <li>Documentações de api</li>
      <li>Postman</li>
      <li>Integrando um front-end com uma api rest</li>
    </v-clicks>
  </ul>

---

# Introdução

Normalmente as aplicações front-end não sobrevivem sozinhas, pois precisamos
de dados para exibir nas nossas maravilhosas telas, e obviamente, não
colocariamos esses dados no front-end, iriamos precisar de um banco de dados
para armazenar esse tipo de informação.

---

# Introdução

Com essa problemática, que entra as aplicações back-end, lá que deve ficar
todas as regras de negócio, banco de dados, e mais algumas outras coisas. O
trabalho do front-end fica em torno de fazer 'integrações' para usar funções
desse back-end.

---

# Introdução

E para fazer essas integrações, o back-end nos fornece uma api com vários
endpoints, cada endpoint irá fornecer uma função diferente, seja para resgatar
dados, alterar dados, ou excluir algo.

---

# Fetch api

No front-end, vamos ter várias formas de fazer esse tipo de integração, a
mais comum, seria usar um modulo do JavaScript, chamado <b>fetch api</b>,
com ele, podemos dizer qual url queremos, qual método da requisição(post,
put, get...etc) e quais parametros vamos mandar.

---

# Fetch api - Exemplo

```js
const getCoins = async () => {
  const response = await fetch(URL, { method: 'get' });
  const data = await response.json();
};
```

---

# Axios

É obvio, que iria existir libraries, que fazem o trabalho do fetch api, e
uma delas é o <b>axios</b>, que trouxe alguns beneficios, tais como:

  <ul>
    <li>Interceptors</li>
    <li>Um objeto com dados padrões(como url etc)</li>
    <li>Abstrações para a parte de query params</li>
  </ul>

---

# React query

Outra library interessante para fazer integrações com apis utilizando o
axios ou o fetch api, é o <b>React query</b>, ele trás caching, e alguns
hooks para facilitar as integrações com api em uma aplicação react.

---

# React query - vantagens

<ul>
    <li>Possui um devtools</li>
    <li>Funciona com rest e graphql</li>
    <li>Hooks com loading, reFetch etc</li>
    <li>Caching manipulável</li>
  </ul>

---

# Documentação de api

Normalmente uma api possui uma documentação, para sabermos, quais endpoints
teremos acesso, e quais os requisitos para eles funcionarem. Normalmente em
aplicações rest usamos o swagger para documentação.
<br />
[Exemplo do swagger](https://petstore.swagger.io/)

---

# Postman

Nem sempre vamos testar os endpoints diretamente no front-end. Um jeito
fácil de testar endpoints, é com o <b>Postman</b>, com o postman, podemos
colocar a url de uma api, e fazer testes.

---

# Integrando um front-end com uma api

[Aplicação com integração entre um backend](https://codesandbox.io/s/coin-cap-example-4587ux?file=/src/App.js)

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Comparação do react query com outras libraries](https://react-query.tanstack.com/comparison)
[APIs publicas](https://github.com/public-apis/public-apis)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
