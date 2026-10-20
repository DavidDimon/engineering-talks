---
theme: default
title: 'Components — part 2'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/14-functional-component/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/16-componentes-parte-3/"
/>

<Intro title="Components — part 2" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>useReducer</li>
      <li>Prop Children</li>
      <li>Arquivo CSS</li>
      <li>Styled components</li>
      <li>Theme</li>
      <li>Como organizar os componentes?</li>
      <li>Documentação de componentes</li>
    </v-clicks>
  </ul>

---

# useReducer

Nós usamos o useReducer para os casos que precisamos alterar vários states
ao mesmo tempo, com o useReducer, conseguimos alterar mais de um state
gerando um re-render só!

---

# useReducer

O useReducer é orientado ao padrão de ações, ou seja, dependendo da ação ele
faz algo, e retorna os states atualizados.
<br />
[useReducer exemplo](https://codesandbox.io/s/use-reducer-example-2681n?file=/src/App.js)

---

# The children prop

O react possui uma propriedade reservada, que é o children, o children pode
ser usado para passar um componente como filho para um componente específico

---

# The children prop — example

```js
const Text = ({ children }) => <h1>{children}</h1>\n
const ComponentB = () => <Text>isso aqui é um children</Text>
```

---

# The children prop

Podemos passar um outro componente no children, um texto, um boolean ou
número, e também podemos usar a prop children como uma função, para
passarmos alguns valores, chamamos isso de render-props:
<br />
[Children exemplo](https://codesandbox.io/s/children-with-function-yz0ew)

---

# The children prop

```js
const Text = ({ children }) => {
  const [count, setCount] = React.useState(1)\n
  return <h1>{children({ count })}</h1>
}\n
const ComponentB = () => <Text>{({ count }) => count}</Text>
```

---

# CSS file

No react podemos usar o css como um arquivo separado também, e para isso, só
precisamos criar o arquivo .css e importar direto no componente/página, e
usar a prop className nas tags/componentes para chamarmos as nossas classes
css.

---

# CSS file — example

```js
import "./styles.css"\n
const Text = ({ children }) => {
  const [count, setCount] = React.useState(1)\n
  return <h1>{children({ count })}</h1>
}
```

---

# Styled-components

Nós temos várias formas de estilizar os nossos componentes, e uma delas(que
pra mim é a mais indicada) é a library styled-components. Com o styled
components, cada CSS vira um componente, e cada componente criado com
styled, tem conexão com um tema global!

---

# Styled-components — pros

<ul>
    <li>Integração com um tema global</li>
    <li>
      O código CSS tem uma compatibilidade de quase 100% com o react native
    </li>
    <li>Não precisamos se preocupar com classes de css</li>
    <li>Fica explicito o estilo de cada componente</li>
    <li>Possui uma comunidade enorme além de ser open source!</li>
  </ul>

---

# Styled-components — cons

<ul>
    <li>A performance não é melhor que o css puro, mas não deixa a desejar</li>
    <li>
      Dependendo do tamanho do projeto, pode haver muitos componentes com
      estilos semelhantes
    </li>
  </ul>

---

# Styled-components — example

```js
{
  ("import styled from 'styled-components'\nconst Text = styled.h1`\n font-size: 16px;\n`\nconst Component = () => <Text>test</Text>");
}
```

---

# Styled-components - Props

Também podemos passar propriedades e resgatar elas pelo css criado com
styled-components, e é bem simples. Exemplo: <br />
[styled components com props](https://codesandbox.io/s/styled-components-prop-example-gbv42?file=/src/App.js)

---

# Styled-components - Theme

Uma forma de facilitar o desenvolvimento, é criando um tema, e com o styled
components, conseguimos criar um arquivo de tema com cores, espaçamentos e
até funções, e tudo isso nós conseguimos pegar via css do componente!

---

# Styled-components - Theme

```js
import { ThemeProvider } from 'styled-components'\n
const App = () => {
  return (
    <ThemeProvider theme={{ primary: "#000" }}>
      <App />
    </ThemeProvider>
  );
}
```

---

# Styled-components - Theme

```js
const Text = styled.h1`
  color: ${({ theme }) => theme.primary};
`;
```

---

# How should components be organized?

O jeito mais simples, é criando uma pasta <b>components</b> e cada
componente ter a sua própria pasta, pois cada componente normalmente possui
um arquivo .jsx e um arquivo .css ou .js(com o estilos do styled components)
e as vezes possuem até mais arquivos, por isso é importante cada arquivo ter
a sua pasta.

---

# Component documentation

Temos algumas opções para documentar os nossos componentes, com o storybook
ou docz, podemos gerar sites que mostram exemplos dos componentes que temos
na aplicação, e com isso facilitamos e muito, na validação entre
desenvolvedor x designer x stakeholder(os interessados no projeto)

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Docs Styled-Components](https://styled-components.com/docs)
[Docs Storybook](https://storybook.js.org/docs/react/get-started/introduction)
[Docs Docz](https://docz.site/)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
