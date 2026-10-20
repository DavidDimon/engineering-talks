---
theme: default
title: 'State management — part 2'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/17-gerenciamento-de-estados/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/19-formularios/"
/>

<Intro title="State management — part 2" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Redux</li>
      <li>Mobx</li>
      <li>Zustand</li>
      <li>Cuidados com gerenciamento de estados globais</li>
    </v-clicks>
  </ul>

---

# Redux

O Redux veio com o intuito de facilitar o gerenciamento de estados globais, se
baseando em um modelo de actions, ou seja, toda modificação é feita por uma
ação, que chamamos de actions.

---

# Redux — how it works

O Redux possui um provider, que possui uma store, e aquela store possui
actions, reducers e types. A principio parece simples, porém quanto maior o
nosso projeto, mais types, mais actions e mais reducers.

---

# Redux

O Redux possui uma arquitetura um pouco burocrática, pois ele se divide em 3
partes: <b>actions, reducers e types</b>
<br />
<ul>
<li>actions - Funções que fazem alguma regra de negócio</li>
<li>
reducers - Funções que servem para modificar o state baseado em um type
</li>
<li>types - Os tipos de ações que temos na nossa store</li>
</ul>

---

# Redux - Single source of truth

Uma das vantagens de usar o Redux, seria o single source of truth, como tudo
ficaria dentro do redux, teriamos sempre uma fonte de dados.

---

# Redux — pros

<ul>
    <li>Single source of truth</li>
    <li>Handling de erros</li>
    <li>Fácil adesão de testes nas stores</li>
    <li>Redux devTools</li>
    <li>Redux saga e outros plugins</li>
  </ul>

---

# Redux — cons

<ul>
    <li>Muita burocrácia para fazer um setup simples</li>
    <li>A arquitetura complexa de fazer</li>
  </ul>

---

# Redux — example

[Exemplo de um contador com redux](https://codesandbox.io/s/redux-example-chfuih?file=/src/App.js)

---

# Mobx

O Mobx também possui um provider que pode receber multiplas stores, e cada
store é criada como um classe, e na classe temos os atributos da store, e os
métodos que podem ou não alterar um atributo/estado da store.

---

# MobX — how it works

O Mobx pode ter várias stores, normalmente criamos uma rootStore que possui
todas as nossas stores, e usamos um useContext para acessar essa rootStore,
que a rootStore vai expor as stores que criamos, assim não precisamos criar
vários hooks para acessar cada store que criarmos.

---

# MobX — how it works

O Mobx possui anotações, as anotações servem para definir as actions e os
observables, que são métodos e atributos/estados respectivamente

---

# MobX — example

[Exemplo de um contador com mobx](https://codesandbox.io/s/mobx-example-vu1e7u?file=/src/App.js:0-358)
Obs: no codesandbox, não temos a opção de usar os decorators, por isso não funciona
a aplicação la no codesandbox

---

# MobX — pros

<ul>
    <li>Baseado em classes</li>
    <li>Handling de erros</li>
    <li>Fácil adesão de testes nas stores</li>
    <li>Setup mais simples</li>
  </ul>

---

# MobX — cons

<ul>
    <li>Temos que ter cuidado na criação da arquitetura</li>
    <li>Dificil adesão de um devtools</li>
  </ul>

---

# Zustand

O Zustand é um gerenciador de estados globais, super leve(pesando mais ou
menos 954 bytes), que aposta em uma abordagem mais simples, voltada aos hooks
e que também dispoe de uma manipulação de store por um arquivo de javacript
puro.

---

# Zustand — how it works

Com o zustand você não precisa definir um provider, só precisamos usar a
função de create, que ele vai criar um hooks baseado objeto que vamos passar.
Esse objeto recebe os estados iniciais, e os métodos de alteração desses
estados.

---

# Zustand — example

[Exemplo de um contador com zustand](https://codesandbox.io/s/zustand-example-6w6wj4?file=/src/App.js)

---

# Zustand — pros

<ul>
    <li>Simples de usar</li>
    <li>Pode manipular os estados via hooks ou funções puras</li>
    <li>Fácil adesão de testes nas stores</li>
    <li>Possui integração com redux devtools</li>
    <li>O zustand é muito leve e livre de dependencias</li>
    <li>Pode ser usado com uma arquitetura semelhante ao do redux</li>
  </ul>

---

# Zustand — cons

<ul>
    <li>Por ser simples, abre portas para arquiteturas bizarras</li>
  </ul>

---

# State management tips

Quando pensamos em gerenciamento de estados, pensamos em colocar todos os
dados la, que inclui, dados de api, estados de componentes e muitos outros
tipos de dados. Porém temos que pensar que aqueles dados vão circular pela
aplicação inteira, então devemos tomar cuidado com o que vai pras stores
globais!

---

# State management tips

O ideal é a camada de gerenciamento de estado global, sempre ser o mais
simples possível, e sempre evitar ao máximo colocar dados que não são globais,
ou não são compartilhados em mais de uma camada.

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
