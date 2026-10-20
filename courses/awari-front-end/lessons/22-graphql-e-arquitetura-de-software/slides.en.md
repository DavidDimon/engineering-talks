---
theme: default
title: 'GraphQL and software architecture'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/21-integracoes-com-api-rest/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/23-seo-e-ssr/"
/>

<Intro title="GraphQL and software architecture" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Introdução(GraphQL)</li>
      <li>Query e Mutation</li>
      <li>GraphQL playground</li>
      <li>Apollo GraphQL</li>
      <li>Clean code</li>
      <li>Atomic design</li>
      <li>Logica X Tela</li>
    </v-clicks>
  </ul>

---

# Introduction to GraphQL

O GraphQL foi criado pelo Facebook a partir da problemática, que um app mobile
e um app web, as vezes não utilizam os mesmos dados de uma consulta do
backend, por exemplo: As vezes uma tela no web(desktop) carregam dados
diferentes como: os usuários que deram like em um post, informação que, no
mobile só aparece se clicarmos, e formos para uma outra tela.

---

# Introduction to GraphQL

Toda request feita para uma api graphQL é um post, mesmo que seja para buscar
dados, ainda sim vai ser um post, isso se da, pois o GraphQL se divide em dois
tipos de requisição, Query e Mutation.

---

# Query - GraphQL

Para buscar dados, temos as queries, nas queries, podemos passar parametros,
criar uma query dentro de outra para buscar mais dados.

---

# Query — example

```js
query users($input: InputType) {
  users {
    name
    age
  }
}
```

---

# Mutation - GraphQL

Para alteração ou criação de dados, usamos as mutations, que seguem em um
padrão semelhante ao da query, e podem ter ou não um retorno.

---

# Mutation — example

```js
mutation createUser($user: UserType!) {
  createUser(user: $user)
}
```

---

# GraphQL Playground

Assim como as APIs rest, podem ser testadas via postman, ou outros softwares,
o GraphQL possui várias opções, mas as principais são: GraphiQL e o GraphQL
playground

---

# GraphQL Playground

Com eles conseguimos ver todo o schema da api, ou seja, vamos conseguir ver
todos os Types, mutations, queries e subscriptions

---

# Apollo GraphQL

Para fazer uma integração com um backend GraphQL, podemos usar somente um
fetch api, ou um axios, porém vamos ter muito mais trabalho, pensando nisso,
foi criado o @apollo/client que é uma library que gerencia requisições GraphQL

---

# Apollo GraphQL

O apollo GraphQL para react, possui várias features, para funcionar ele possui
um provider, pois ele guarda caching das requisições, também possui alguns
hooks para facilitar a criação de chamadas para a api.

---

# Application with GraphQL

[Exemplo de aplicação react com GraphQL](https://github.com/DavidDimon/app-graphql-course)

---

# GraphQL — pros

<ul>
    <li>Podemos escolher o que vem no JSON</li>
    <li>Fácil criação das mutations e queries</li>
    <li>Apollo GraphQL</li>
    <li>Documentação com o playground ou graphiQL</li>
  </ul>

---

# GraphQL — cons

<ul>
    <li>Curva de aprendizado</li>
    <li>As consultas sempre retornam o código de status 200.</li>
  </ul>

---

# Clean code

Ao decorrer do desenvolvimento de uma aplicação, é normal tomarmos decisões
para resolver problemas de uma forma rápida sem pensar que no futuro, podemos
passar por aqueles códigos novamente, com essa problemática, Robert C. Martin,
escreveu um livro com algumas dicas de como fazer 'códigos limpos'.

---

# General rules — follow conventions

Sempre que definir um padrão para algo no projeto, como por exemplo, criar
todas as constantes com letras maiusculas. Acontece muito de criarmos um
padrão no inicio do projeto, porém ao decorrer do desenvolvimento abandonarmos
esse padrão, para facilitar a codificação.

---

# Regras gerais - KISS

KISS (Keep it Stupid Simple) (mantenha isso estupidamente simples), parece
algo bobo, porém é muito importante, é comum fazermos funções milaborantes
para resolver um problema, mas sempre temos que ter em mente, que nem todo
mundo pensa como a gente. Então, bora resolver os problemas das formas mais
simples possíveis!

---

# General rules — the Scout Rule

"Deixe sempre o acamapamento mais limpo do que você encontrou!". O mesmo vale
para o código, se você começou a mexer em algo, que possui problemas, e você
pode resolver, resolva!, não deixe um TODO para resolver amanhã, o que podemos
resolver hoje!

---

# General rules — root cause

Sempre tente resolver um problema pela causa raiz, as vezes sabemos como
resolver só parte daquele problema, mas o tempo não para, e o bug não some!

---

# Atomic design

O Atomic design é um conceito criado por Brad Frost(possui um livro sobre),
esse conceito se baseia no seguinte pensamento: E se cada parte do nosso
software fosse divida em várias partes e cada parte se compoe até formar a
nossa pagina?

---

# Atomic design

Em atomic design, temos 5 níveis de componentes, que são: Atoms, Molecules,
Organisms, Templates, e Pages, cada um com uma caracterista distinta

---

# Atomic design - Atoms

O átomo é o nível mais básico do atomic design, no nível de átomo, podemos
criar botões, labels, inputs simples(cuidado com isso!), icones e alguns
outros.

---

# Atomic design - Molecules

Componentes que possuem átomos para sua criação ou componentes que podem
receber átomos como children. Ex: ButtonGroup, InputDate, Footer, TableFooter

---

# Atomic design - Organisms

São componentes mais complexos, que podem possuir estados globais, possuem
molecules e atoms para serem criados. Normalmente possui um children. Ex:
Form, DataTable.

---

# Atomic design - Templates

Components que normalmente trazem um padrão para as telas, como um wrapper de
uma tela inteira, com header e outros itens essenciais para se criar uma tela
de um tipo especifico(como forms, lists...etc)

---

# Atomic design - Pages

E nas pages, seria onde colocariamos todos os componentes para formar a página
com suas regras(integrações, regras de formulários etc).

---

# Atomic design - React

E como isso tudo ficaria no react? Eu gosto de pensar que, na prática o atomic
design não se encaixa 100%, se não pensarmos que um átomo pode estar dentro do
outro, e esse tipo de componente, eu costumo chamar de 'trunfo'

---

# Atomic design - React

Um texto, é um componente difícil de não re-usar dentro de um átomo, então o
componente de texto, poderia ser um átomo trunfo, que pode ser usado em
componentes do mesmo nível

---

# Atomic design — pros

<ul>
    <li>Componentes mais separados e reúsaveis</li>
    <li>Perfeito para um sistema mais complexo</li>
    <li>Facilidade na criação das telas</li>
  </ul>

---

# Atomic design — cons

<ul>
    <li>Cuidados com os exports e imports</li>
    <li>Pode ser dificultar um pouco a adaptação da equipe</li>
  </ul>

---

# Atomic design - React

Um texto, é um componente difícil de não re-usar dentro de um átomo, então o
componente de texto, poderia ser um átomo trunfo, que pode ser usado em
componentes do mesmo nível

---

# Logic versus UI

Antes dos hooks, existia uma arquitetura de container, que consistia em criar
componentes 'dumbs' que não possuiam regras de negócio(nem states, chamadas de
api...etc), e um componente que possuia toda regra de negócio, que era chamado
de Container

---

# Logic versus UI

Com o passar do tempo, veio os hooks, que vieram para facilitar exatamente
isso, com os custom hooks, podemos criar hooks de regras de negócio(com
chamadas de api, validações de formulário...etc), e usar dentro de
componentes, assim quando uma regra de negócio falha, conseguimos ir direto no
problema(hooks)

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Apollo docs](https://www.apollographql.com/docs/react/get-started/)
[Artigo sobre clean code](https://balta.io/artigos/clean-code)
[Atomic design por Brad Frost](https://bradfrost.com/blog/post/atomic-web-design/)
[Artigo sobre atomic design](https://www.notion.so/Atomic-design-18650c7c024b4c2caec9d20ed71124d8)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
