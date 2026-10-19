---
theme: default
title: 'Gerenciamento de estados'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/16-componentes-parte-3/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/18-gerenciamento-de-estados-parte-2/"
/>

<Intro title="Gerenciamento de estados" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Introdução</li>
      <li>Dados voláteis</li>
      <li>Dados não voláteis</li>
      <li>LocalStorage</li>
      <li>Props Drilling</li>
      <li>Memoização/imutabilidade</li>
      <li>Context api</li>
      <li>useContext</li>
    </v-clicks>
  </ul>

---

# Introdução

Quando desenvolvemos uma aplicação, é normal termos que compartilhar dados
entre camadas, e no front-end fazemos muito disso, pois temos vários
componentes, que são frações do nosso layout

---

# Introdução

Pensando nessa problemática, vieram várias soluções para resolvermos esse
compartilhamento de informações entre componentes e camadas, dentre elas,
podemos ter estados voláteis e até dados não voláteis em front-end, como um
banco de dados mesmo!

---

# Dados voláteis

Os dados voláteis, são dados que só permanecem temporariamente, e são apagados
depois de terminar a execução do software ou de uma função. Exemplo: se você
esta navegando em um site, após você ir pra outra tela, ou fechar o site,
alguns dados voláteis(como váriaveis, estados) vão ser perdidos.

---

# Dados voláteis

Normalmente usamos esse tipo de dado como um caching ou para guardar dados que
não são tão importantes e que sofrem muitas alterações ao decorrer da execução
do software

---

# Dados não voláteis

Já os dados não voláteis servem para nós salvarmos dados permanentes (sim
podemos excluir), são usados para guardar informações sobre o usuário, ou
informações mais permanentes, que normalmente não mudam muitas vezes durante a
execução.

---

# Dados não voláteis

Também podemos ter um cache não volátil, mas é algo mais complexo de
gerenciar, pois precisamos sempre manter a integridade dos dados, entre o
mundo externo(back-end) e o front-end.

---

# LocalStorage

Existem algumas formas de armazenar dados não voláteis no browser, porém a
mais comum é o localStorage, com ele podemos salvar dados com um esquema de
key e value, ou seja, precisamos de um identificador, e o valor. A key
normalmente é uma string, e o value sempre é um dado primitivo(string, number
ou boolean).

---

# LocalStorage

Porém as vezes precisamos salvar um objeto javascript no localstorage, para
isso transformamos o objeto com o JSON.stringify e quando formos pegar esse
json string, vamos usar o JSON.parse para transformar em objeto.

---

# LocalStorage - Exemplo

```js
localStorage.setItem('name', 'david'); // ou window.localStorage
const name = localStorage.getItem('name'); // ou window.localStorage
```

---

# LocalStorage

<ul>
    <li>localStorage.setItem(key, value) - serve para salvar um dado</li>
    <li>localStorage.getItem(key) - serve para resgatar um dado</li>
    <li>localStorage.removeItem(key) - serve para apagar um dado</li>
    <li>localStorage.clear() - apaga todos os dados do banco de dados</li>
  </ul>

---

# Props Drilling

O jeito mais comum de passarmos estados ou dados para outro componente, é via
propriedades(props), porém em alguns casos precisamos passar um dado/estado
para vários níveis.

---

# Props Drilling

Porém quando passamos a mesma prop para vários componentes, se aquela prop é
atualizada, todos os componentes que recebem ela via prop, vão sofrer um
re-render, Exemplo: <br />
[Exemplo de props drilling](https://codesandbox.io/s/props-drilling-example-jxcgvo?file=/src/App.js)

---

# Props drilling

<CourseImage name="propsdrilling" alt="Props drilling" :width="850" :height="500" />

---

# Memoização

É impossível falar de gerenciamento de dados em front-end, sem mencionar a
memoização ou a imutabilidade, o ato de memoizar um dado, seria como manter um
dado em caching, a memoização é importante, pois muitas vezes vamos ter dados
que só precisam mudar em certas circunstâncias.

---

# Imutabilidade

Já a imutabilidade está mais ligada a deixar uma váriavel/estado com uma
referência fixa, mas isso não quer dizer que o valor salvo não seja mutável.
Por isso quando usamos um useState, ele retorna um valor, e uma função para
alterar o valor, pois assim, a referência daquele estado permanece a mesma,
porém o valor é alterado.

---

# Contextos

Contextos existem tanto em back-end quanto em front-end, mas no front-end são
um pouco mais complexos, pois o front-end possui mais dados em cache para
gerenciar.

---

# Contextos

Basicamente um contexto é um agrupamento, onde o que estiver dentro desse
agrupamento vai ter acesso aos dados, funções...etc. Porém se esse contexto
for atualizado, tudo que estiver dentro desse contexto, irá ser atualizado!

---

# Contextos

Sempre que formos criar um contexto, precisamos ver a aplicação como um todo,
pois podemos ter contextos aninhados, e se um atualizar, o outro atualizará
também, e com isso podemos ter vários problemas de performance.

---

# Contextos - useMemo

Um jeito de controlar as atualizações dos dados é com o useMemo, para o caso
dos estados não é indicado usar o useMemo, mas para dados que sofrem algum
tipo de parsing, é muito indicado.

---

# Contextos - memo

Outra dica seria de usar o memo nos componentes, para controlar-mos o que vai
ser atualizado, com a função de memo, podemos criar condições de re-render
baseado em props.

---

# Context Api

O react possui a context api, que veio para facilitar a criação de contextos,
primeiro precisamos criar o contexto com o createContext e depois criamos um
provider, que serve para determinar onde inicia o agrupamento.

---

# useContext

Para usarmos o contexto, podemos usar o hooks useContext, e por parametro
passamos o contexto criado pelo createContext. Exemplo:
<br />
[Exemplo de uso do useContext](https://codesandbox.io/s/context-example-e44ry6?file=/src/App.js)

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Artigo sobre imutabilidade](https://segredo.dev/o-que-e-imutabilidade/)
[Library para gerenciamento de dados imutáveis](https://immutable-js.com/)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
