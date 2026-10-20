---
theme: default
title: 'Functional Component'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/13-introducao-ao-react-parte-2/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/15-componentes-parte-2/"
/>

<Intro title="Functional Component" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Functional Component</li>
      <li>Hooks</li>
      <li>useState</li>
      <li>Ciclo de vida</li>
      <li>useEffect</li>
      <li>useMemo</li>
      <li>useCallback</li>
      <li>Referências(useRef e useImperativeHandle)</li>
      <li>Exibição de valores no component</li>
    </v-clicks>
  </ul>

---

# Functional Component

Antes dos hooks, os componentes funcionais só serviam como stateless(sem
estados, e sem manipulação de ciclo de vida), mas com a chegada dos hooks,
conseguimos gerenciar ciclo de vida, criar estados e fazer algumas coisas
mais!

---

# Functional component — example

```js
import React from 'react'\n
const Component = () => {\n
  return <div>test</div>
}
```

---

# Functional component — props example

```js
import React from 'react'\n
const Component = ({ text }) => {\n
  return <div>{text}</div>
}\n
<Component text="test"/>
```

---

# Hooks

Os hooks é uma feature que foi lançada em meados de 2019. Os hooks são funções
que só podem ser executadas dentro de components e que podem receber
parametros, e podem retornar ou não, funções ou variáveis. Os hooks são úteis
para separarmos regras de négocio, funções utilitárias ou outras coisas.

---

# Hooks

Junto com essa possibilidade de criar custom hooks, a propria library do
react, trás alguns hooks que podemos usar na nossa aplicação
<br />
obs: Todo hooks que formos criar, temos que usar o prefixo <b>use</b>

---

# Hooks — examples

<ul>
    <li>
      useState - Para criar estados que podem ser booleans, strings,
      objetos...etc
    </li>
    <li>useMemo - Para criar variáveis imutáveis a partir de uma função</li>
    <li>useCallback - Para criar uma função imutável</li>
    <li>useContext - Para utilizar um contexto criado</li>
    <li>useEffect - Para manipular os ciclos de vida</li>
    <li>
      useLayoutEffect - Manipula ciclo de vida, porém executa logo após a DOM
      for alterada, e é executado antes do useEffect
    </li>
    <li>useRef - Usado para manipular referências de componentes</li>
  </ul>

---

# Custom Hooks

Podemos também criar os nossos próprios hooks ou utilizar hooks de outras
libs. Criamos custom hooks para facilitar o nosso desenvolvimento e para
reaproveitar mais os códigos, as vezes vamos se deparar com situações que
precisamos reutiliazr certos códigos que podem virar hooks.

---

# Custom hooks — example

```js
// useMath.js
import React from 'react'\n
export const useMath = () => {
  const [result, setResult] = React.useState(0)
  const sum = (value1, value2) => setResult(value1 + value2)\n
  return { sum, result }
}
```

---

# Custom hooks — usage example

```js
import React from 'react'
import { useMath } from './useMath'\n
const Component = () => {
  const { sum, result } = useMath()\n
  return <button onClick={() => sum(1,1)}>{result}</button>
}
```

---

# useState

Para criarmos estados nos nossos componentes, usamos o useState, ele retorna
um array com dois valores, o primeiro com o estado, e o segundo com uma função
para modificar esse estado e recebe um parametro que seria o dado inicial
daquele estado.

---

# useState — example

```js
import React from 'react'\n
const Component = () => {
  const [count, setCount] = React.useState(0)\n
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
```

---

# useState — example 2

```js
import React from 'react'\n
const Component = () => {
  const [count, setCount] = React.useState(0)
  return (
    <button onClick={() => setCount((prevCount) => prevCount + 1)}>
      {count}
    </button>
  )
}
```

---

# Lifecycle

Assim como vimos nos class components, os componentes funcionais, também
possuem a possibilidade de manipular os eventos do ciclo de vida, porém não
usamos os didMount, didUpdate...etc, ao invés disso, usamos o hooks
<b>useEffect</b>

---

# useEffect

O hooks de useEffect, recebe uma função como primeiro parametro, e um array
de dependencias no segundo parametro.
<br />
Na função do primeiro parametro, é onde manipulamos aquele evento do ciclo
de vida, e essa função não pode ser assincrona.

---

# useEffect

Já no segundo parametro, que seria o array de dependencias, é onde vamos
colocar os estados ou props que queremos manipular no ciclo de vida, por
exemplo: se quisermos manipular a mudança de um estado, colocamos aquele
estado nesse array, então a cada mudança desse estado, esse useEffect irá
ser chamado, igual como acontece com o componentDidUpdate

---

# useEffect

Se não passarmos nada no array, o useEffect irá funcionar como o
componentDidMount, ou seja, só irá ser chamado na primeira renderização do
componente.

---

# useEffect

Para simularmos o componentDidUnmount, teremos que passar um return com uma
função no final da função do primeiro parametro do useEffect

---

# useEffect — unmount example

```js
import React from 'react'\n
const Component = () => {
  React.useEffect(() => {
    return () => { ...// função que irá fazer ao desmontar o componente }
  }, []) // \n
  return <div />
}
```

---

# useEffect — update example

```js
import React from 'react'\n
const Component = () => {
  const [loading, setLoading] = React.useState(false)\n
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500)
  }, [loading]) // \n
  return <button onClick={() => !loading && setLoading(true)}>{loading ? 'carregando' : 'click'}</button>
}
```

---

# useEffect — mount example

```js
import React from 'react'\n
const Component = () => {
  React.useEffect(() => {
    console.log('componente iniciado!')
  }, []) // \n
  return <div />
}
```

---

# useMemo

O useMemo, recebe uma função no primeiro parametro, que precisa ter um
retorno de um valor(seja ele boolean, object...etc), e no segundo parametro,
seria um array com as props ou states que vão funcionar como trigger para
atualizar aquele valor em memória.

---

# useMemo — example

```js
import React from 'react'\n
const Component = ({ text }) => {
   const value = React.useMemo(() => {
     return text.toLowerCase();
   }, [text]) // caso o text mude, essa função é executada novamente \n
  return <div>{value}</div>
}
```

---

# useCallback

O useCallback, funciona da mesma forma que o useMemo, porém com funções,
serve para mantermos na memória uma função que é usada no componente, isso
serve para otimizarmos mais o nosso código

---

# useImperativeHandle

Em certos casos, vamos precisar usar uma variável ou função de um componente
filho, para isso, temos o hooks do useImperativeHandle, com ele podemos
expor essas funções, ou até estados, e para acessar essas funções ou
estados, usamos as referências.

---

# References

Em alguns casos, vamos precisar manipular um componente, e pra isso temos as
referências, elas servem para nós manipularmos uma tag html, ou se caso um
componente ter funções expostas por useImperativeHandle, vamos poder acessar
essas funções por referência.

---

# useImperativeHandle — example

```js
import React from 'react'\n
const Component = React.forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    test: 'test',
    testFunc: () => ''
  }))\n
  return <div/>
})
```

---

# useRef — example

```js
import React from 'react'\n
const ComponentFather = (props) => {
  const componentRef = React.useRef(null)
  return <Component ref={componentRef} />
}
```

---

# Displaying values — example

```js
import React from 'react'\n
const Component = () => {\n
const [state, setState] = React.useState('test')
  return <div>{state}</div> // não aceita um objeto e nem array
}
```

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
