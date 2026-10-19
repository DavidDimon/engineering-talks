---
theme: default
title: 'Introdução ao React'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/11-errors-promises-regex-e-dom/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/13-introducao-ao-react-parte-2/"
/>

<Intro title="Introdução ao React" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Libraries</li>
      <li>Frameworks</li>
      <li>NPM</li>
      <li>Yarn vs NPM</li>
      <li>React</li>
      <li>Virtual DOM</li>
      <li>JSX</li>
      <li>ReactDOM</li>
      <li>SPA</li>
      <li>Babel</li>
      <li>Criando sua primeira aplicação React</li>
    </v-clicks>
  </ul>

---

# Libraries

Nem sempre vamos ter tempo para codar todas as nossas funções, e para
resolver esse problema, podemos recorrer as <b>libraries</b> que seriam
pequenos(ou grandes) projetos com códigos que vieram pra facilitar a nossa
vida.

---

# Libraries

A maioria das libraries que vamos usar nos nossos projetos, são open source,
ou seja, você pode ver os códigos, e até contribuir com eles.

---

# Libraries - Exemplos

<ul>
    <li>React.js</li>
    <li>Styled-components</li>
    <li>Docz</li>
    <li>DayJs</li>
    <li>Entre muitas outras</li>
  </ul>

---

# Framework

Um <b>Framework</b> seria uma coleção de bibliotecas/libraries que irá
oferecer várias funcionalidades, mas também irá fornecer uma arquitetura
para criarmos a nossa aplicação, e normalmente temos que seguir os padrões
dessa arquitetura, que pode ser bastante dinâmica ou mais 'fechada'

---

# Frameworks - Exemplos

<ul>
    <li>Vue.js</li>
    <li>Express</li>
    <li>Next.js</li>
    <li>Nest.js</li>
    <li>Entre muitos outros</li>
  </ul>

---

# NPM

O NPM(Node Package Manager) é um gerenciador de pacotes(libraries,
frameworks... etc). O NPM possui um CLI(Command Line Interface) para
gerenciarmos as dependências nos nossos projetos, mas também conta um site
que exibe todas as dependências possiveis de ser instaladas pelo npm(ou pelo
yarn)

---

# NPM

Pelo NPM podemos publicar as nossas libraries(ou frameworks) também sendo
eles privados ou públicos(se for privado necessita do pagamento de uma
licença premium)

---

# Yarn vs NPM

O yarn é um projeto open-source(igual o NPM) que foi criado pelo facebook,
com colaboração do Google, Exponent e Tilde, e o objetivo do yarn é ser mais
rapido e seguro que o NPM

---

# Yarn vs NPM

Os dois possuem poucas diferenças, e ambos fazem download do NPM, ou seja, a
decisão de usar o yarn ou npm é muito do projeto em si.

---

# Diferenças do yarn e npm

<ul>
    <li>npm init | yarn init = Inicializa o gerenciador</li>
    <li>
      npm install -pacote- | yarn add -pacote- = Instala um pacote no projeto
    </li>
    <li>
      npm update -pacote- | yarn upgrade -pacote- = Atualiza um pacote no
      projeto
    </li>
    <li>npm remove | yarn remove = Remove um pacote no projeto</li>
  </ul>

---

# React.js

React ou também chamado de ReactJS, é uma library/biblioteca JavaScript open
source que tem o foco na criação de interfaces gráficas em páginas web. É
mantido pelo Facebook, algumas empresas e uma comunidade enorme de
desenvolvedores individuais(viva o open source).

---

# Vantagens do React

<ul>
    <li>
      React é muito rápido, pois utiliza uma estrutura de dom virtualizada, que
      seria como se fosse um html em caching, assim trazendo mais performance e
      controle de quando a dom real irá atualizar.
    </li>
    <li>
      React é uma library, e isso nos da liberdade para criar uma estrutura
      única e adequada ao nosso problema/projeto
    </li>
    <li>
      React tem um foco gigante em componentização, ou seja, a ideia é de nós
      trabalharmos em pequenos pedaços de códigos para criar interfaces
      altamente dinâmicas.
    </li>
  </ul>

---

# Vantagens do React

<ul>
    <li>
      O React tem uma comunidade gigante, e internacional, não só empresas daqui
      do brasil, mas de todo mundo adotam o react como library principal para
      desenvolvendo de sistemas web.
    </li>
    <li>
      O React utiliza o JSX que seria uma mistura do HTML com JavaScript, e isso
      torna o código mais dinâmico!
    </li>
    <li>
      Por fim, o react é open source, e com muitas pessoas e empresas que apoiam
      e mantem o react vivo!
    </li>
  </ul>

---

# Virtual DOM

Quando temos uma página web as vezes temos que manipular alguns elementos,
porém cada acesso ao DOM consome um tempo e a cada alteração obriga o
navegador renderizar novamente a parte da tela que foi afetada pela
manipulação que fizemos, pensando assim, se tivermos uma página bastante
dinâmica e com muitos acessos direto ao DOM teriamos problemas de
performance.

---

# Virtual DOM

Por causa desse tipo de problema, nasceu o <b>Virtual DOM</b>, que é uma
representação da DOM que é mantida em memória(caching), assim quando
precisamos fazer uma modificação, vamos modificar o objeto em memória.

---

# Virtual DOM

Após fazer as modificações em memória, o virtual DOM, terá que ser
sincronizado com a DOM em um processo que se chama <b>Reconciliação</b>. A
vantagem é que com o virtual DOM, é que essa análise permite que haja um
menor número de atualizações na DOM

---

# JSX

JSX é uma extensão de sintaxe para JavaScript que foi criado para utilizar
junto com o React para criação de páginas, e componentes. Esse tipo de
arquivo, deve ser compilado, pois o navegador só entende html, css e
javascript(.js).

---

# JSX - Exemplo

```js
const Component = () => {
  return <div>aeho</div>;
};
```

---

# ReactDOM

O ReactDOM é mais uma library do react que contém vários métodos para lidar
com a DOM de uma aplicação React.

---

# ReactDOM - render

O <b>ReactDOM.render()</b> é o método que vamos utilizar para renderizar o
nosso JSX. Ele recebe uma expressão JSX, cria uma árvore correspondente de
nós DOM e adiciona essa árvore ao DOM.

---

# ReactDOM - render

<b>ReactDOM.render(JSX, document.getElementById("app"));</b>
<br />O primeiro argumento seria o nosso JSX principal, e o segundo argumento
seria onde aquele JSX irá ser renderizado no HTML

---

# ReactDOM - render

Geralmente em aplicações SPA temos uma div com um id único no
body(geralmente chamada de app) que lá vai ser renderizado toda nossa
aplicação.

---

# SPA

SPA ou Single Page Applications, são aplicações web que possuem uma página
só, ou seja, quando mudamos de tela, ao invés de browser carregar uma tela
totalmente nova, nós só mudamos o conteúdo da página, com isso conseguimos
ganhar um pouco mais de performance, deixando o site/sistema mais fluído

---

# Babel

O Babel é um transpilador ou seja, é um algoritmo semelhante a um compilador
que transforma o nosso código ES6 em uma versão mais antiga do JavaScript
que é compátivel com mais browsers. Com o babel podemos utilizar funções
mais novas do EcmaScript sem se preocupar se vai ou não funcionar em certos
browsers.

---

# Criando a primeira aplicação React

Para criarmos a nossa primeira aplicação react, temos alguns requisitos.
<ul>
<li>Node.js >= 14</li>
<li>Yarn ou NPM</li>
<li>Algum editor de código</li>
</ul>

---

# Criando a primeira aplicação React

```js
npx create-react-app <nome_do_projeto>
```

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Diferença entre library e framework](https://www.dio.me/articles/biblioteca-vs-framework)
[Virtual DOM](https://www.treinaweb.com.br/blog/o-que-e-dom-virtual-dom-e-shadow-dom)
[Documentacão React Virtual DOM](https://pt-br.reactjs.org/docs/faq-internals.html)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
