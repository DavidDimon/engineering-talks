---
theme: default
title: 'Introdução à estilização e CSS — parte 2'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/04-introducao-a-estilizacao-e-css/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/06-introducao-a-programacao/"
/>

<Intro title="Introdução a estilização e css parte 2" image="cssintro" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Váriaveis</li>
      <li>Margin</li>
      <li>Padding</li>
      <li>Flexbox</li>
      <li>Grid</li>
      <li>Media query</li>
      <li>Frameworks CSS</li>
    </v-clicks>
  </ul>

---

# Váriaveis

Enquanto desenvolvemos um site, é normal termos várias cores, ou vários
valores que se repetem. Com as váriaveis podemos armazenar esses dados e
repassar pelo nosso css inteiro!

---

# Váriaveis

<br />

```js
:root {
  --main-bg-color: #777;
}
.main {
  background-color: var(--main-bg-color);
}
```

---

# Margin

<ul>
    <li>margin: valor(adiciona um espaçamento em volta do elemento)</li>
    <li>margin-top: valor(adiciona espaçamento em cima do elemento)</li>
    <li>margin-bottom: valor(adiciona espaçamento em baixo do elemento)</li>
    <li>margin-left: valor(adiciona espaçamento na esquerda do elemento)</li>
    <li>margin-right: valor(adiciona espaçamento na direita do elemento)</li>
  </ul>

---

# Padding

<ul>
    <li>
      padding: valor(adiciona um espaçamento em volta do conteúdo do elemento)
    </li>
    <li>
      padding-top: valor(adiciona espaçamento em cima do conteúdo do elemento)
    </li>
    <li>
      padding-bottom: valor(adiciona espaçamento em baixo do conteúdo do
      elemento)
    </li>
    <li>
      padding-left: valor(adiciona espaçamento na esquerda do conteúdo do
      elemento)
    </li>
    <li>
      padding-right: valor(adiciona espaçamento na direita do conteúdo do
      elemento)
    </li>
  </ul>

---

# Flexbox

Flexbox(ou Flexible Box Module) é um modelo de layout unidimensional, ou seja,
o flexbox só controla com uma dimensão de cada vez(dimensão = linha ou coluna)

---

# Flexbox

Flexbox possui dois eixos, que seria as linhas, e as colunas, e com a
propriedade flex-direction você consegue controlar como o flexbox irá
controlar os itens daquele layout

---

# Flexbox - exemplo

<CourseImage name="flexExample" alt="Flexbox - exemplo" :width="900" :height="500" />

---

# Flexbox - row

<CourseImage name="rowDirection" alt="Flexbox - row" :width="1000" :height="450" />

---

# Flexbox - column

<CourseImage name="columnDirection" alt="Flexbox - column" :width="1000" :height="450" />

---

# Flexbox - wrap(quebra de linha)

<CourseImage name="flexWrap" alt="Flexbox - wrap(quebra de linha)" :width="1000" :height="400" />

---

# Flexbox - flex-basis

A propriedade flex-basis define o tamanho inicial dos elementos, em unidades
de pixel, antes que o espaço remanescente seja redistribuído. O valor inicial
desta propriedade é auto — neste caso o navegador observa se os itens possuem
o mesmo tamanho

---

# Flexbox - flex-grow

A propriedade flex-grow recebe um valor inteiro positivo, se caso for
preenchido o flex-grow, o elemento poderá esticar para ocupar um tamanho
disponível

---

# Flexbox - flex-shrink

A propriedade flex-shrink recebe um valor inteiro positivo, se caso for
preenchido o flex-shrink e não haja espaço suficiente para acomodar todos os
elementos, a largura pode ser reduzida a um valor menor do que a definida na
propriedade flex-basis

---

# Flexbox - flex

A propriedade flex pode receber 3 valores, sendo eles: flex-grow, flex-shrink
e flex-basis. Na pratica ficaria assim:
<br />

```js
.box {
  display: flex;
  flex: 1 1 auto;
}
```

---

# Flexbox - align-items

A propriedade align-items tem como valor inicial o stretch, pode-se definir
como flex-start para que os elementos fiquem alinhados com o topo do container

---

# Flexbox - align-items(valores possíveis)

<ul>
    <li>stretch</li>
    <li>flex-start</li>
    <li>flex-end</li>
    <li>center</li>
  </ul>

---

# Flexbox - justify-content

A propriedade justify-content é empregada para alinhar os elementos ao longo
do eixo principal, o valor inicial é flex-start, que alinha os elementos rente
à borda esquerda do container

---

# Flexbox - justify-content(valores)

<ul>
    <li>stretch</li>
    <li>flex-start</li>
    <li>flex-end</li>
    <li>center</li>
    <li>space-around</li>
    <li>space-between</li>
  </ul>

---

# CSS Grid

Grid layout é um modelo de layout bi-dimensional. Grids podem ser usados para
o design de layouts de grandes seções de uma webpage, assim como de pequenos
elementos de interface

---

# CSS Grid

```js
-----index.html-----
<div class="wrapper">
  <div>One</div>
  <div>Two</div>
  <div>Three</div>
  <div>Four</div>
  <div>Five</div>
</div>
```

  <br />

```js
------styles.css------
.wrapper {
  display: grid;
}
```

---

# Grid tracks

Nós definimos linhas e colunas no nosso grid com as propriedades
grid-template-columns e grid-template-rows. Isso define o grid tracks. Um grid
track é o espaço entre duas linhas em um grid.

---

# Grid tracks

<CourseImage name="gridTrack" alt="Grid tracks" :width="1000" :height="450" />

---

# Unidade fr

Nas propriedades de grid podem ser utilizadas quaisquer unidades de medida.
Para nos ajudar a criar layouts flexíveis utilizando o grid, foi criada uma
unidade nova. A unidade fr representa uma fração do espaço disponível no
container do grid. A próxima definição de grid cria três espaços com tamanhos
iguais que aumentam e diminuem de acordo com o espaço disponível.

---

# Unidade fr

<CourseImage name="gridFR" alt="Unidade fr" :width="1000" :height="450" />

---

# Media query

A propriedade @media serve para adicionarmos regras baseadas em largura,
altura ou cor, assim conseguimos por exemplo, apresentar ou não um elemento em
um determinado tamanho de tela

---

# Media query

```js
@media (max-width: 600px) {
  .content {
    display: none;
  }
}
```

---

# Frameworks CSS

Dependendo do projeto, não vamos ter tempo para desenvolver todo um UI kit
para o site/sistema, então recorremos a alguns frameworks que vão nos dar um
UI kit mais generico, que pode ser facilmente modificado.

---

# Frameworks CSS

Alguns exemplos abaixo:
<br />
  <ul>
    <li>
      [Bootstrap](https://getbootstrap.com/)
    </li>
    <li>
      [Semantic UI](https://semantic-ui.com/)
    </li>
    <li>
      [Tailwind CSS](https://tailwindcss.com/)
    </li>
  </ul>

---

# Referências

[Conceitos de flexbox](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
[Conceitos CSS Grid](https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
[Conceitos Media query](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Media_Queries/Using_media_queries)
[Links úteis](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# Isso é tudo pessoal!

Duvidas?
