---
theme: default
title: 'Objects, classes, and much more!'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/09-javascript-contra-ataca-parte-2/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/11-errors-promises-regex-e-dom/"
/>

<Intro title="Objects, classes, and much more!" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Objetos</li>
      <li>Destruturing</li>
      <li>Palavra-chave - this</li>
      <li>Getters e Setters</li>
      <li>Classes</li>
      <li>Construtor</li>
      <li>Herança</li>
      <li>Métodos e atributos estáticos</li>
    </v-clicks>
  </ul>

---

# Objects

Assim como em outras linguagens orientada a objetos, os objetos do JavaScript
são como objetos da vida real, como uma caneca por exemplo, uma caneca possui
caracteristicas, como cor, tamanho, peso...

---

# Objects

No JavaScript podemos definir objetos de várias formas, mas basicamente um
objeto é uma estrutura com chave e valor, a chave pode ser uma string, não
pode iniciar com simbolos, mas pode iniciar com números ou letras.

---

# Objects — example

```js
const caneca = new Object();
caneca.cor = 'azul';
console.log(caneca); // { cor: 'azul' };
```

---

# Objects — example 2

```js
const objeto = { chave: 'valor' };
console.log(objeto); // { chave: 'valor' };
```

---

# Objects — accessing a property

E para acessar um atributo de um objeto, podemos fazer de duas formas, ou
usando um . como: <b>caneca.nome</b> ou com colchetes: <b>caneca['nome']</b>

---

# Objects — example 3

```js
const caneca = { cor: 'azul' };
console.log(caneca.azul); // 'azul';
console.log(caneca['azul']); // 'azul'
```

---

# Objects — destructuring

Uma outra forma de extrair dados de um objeto, seria com o destruturing, desse
jeito podemos extrair um atríbuto do objeto e usa-lo como uma variável

---

# Objects — destructuring

```js
const caneca = { cor: 'azul' };
const { cor } = caneca;
console.log(cor); // 'azul';
```

---

# The this keyword

A palavra this, faz referência ao objeto e fornece acesso ás propriedades e
aos dados que estiverem no objeto.

---

# This - Exemplo

```js
const caneca = {
  cor: 'azul',
  qtdUso: 0,
  aumentarUso() {
    this.qtdUso++;
  },
};
console.log(caneca.qtdUso); // 0
caneca.aumentarUso();
console.log(caneca.qtdUso); // 1
```

---

# Getters

Os Getters são métodos usados para retornar propriedades de um objeto e são
identificados pela palavra reservada <b>get</b>, porém com esses métodos
podemos fazer validações extras, ou regras de negócio!

---

# Getters - Exemplo

```js
const caneca = {
  cor: 'azul',
  qtdUso: 0,
  get todosDados() {
    return this.cor + ' ' + this.qtdUso;
  },
};
console.log(caneca.todosDados); // azul 0
```

---

# Setters

Ja os Setters são métodos usados para reatribuir propriedades de um objeto e
são identificados pela palavra reservada <b>set</b>, e possuem um objetivo
semelhante aos getters, são usados para criar mais regras ao alterar um
atributo.

---

# Setters - Exemplo

```js
const caneca = {
  cor: 'azul',
  qtdUso: 0,
  set aumentarUso(qtd) {
    if (qtd < 0) return;
    this.qtdUso += qtd;
  },
};
caneca.aumentarUso = 2;
console.log(caneca.qtdUso); // 2
```

---

# Classes

As classes são modelos de objetos, só que mais organizados e com a
possibilidade de criar heranças entre outras classes.

---

# Classes — instance

Para utilizarmos uma classe, precisamos instância-la, para isso, utilizamos
a palavra-chave <b>new</b> ao instânciar uma classe, criamos um objeto em
memória

---

# Classes — example

```js
class Caneca {
  constructor(cor) {
    this._cor = cor;
  }\n
  get cor() {
    return this._cor
  }\n
  set cor(cor) {
    this._cor = cor
  }
};
const caneca = new Caneca(); // instância
caneca.cor = 'azul';
console.log(caneca.cor); // azul
```

---

# Classes — constructor

O método construtor de uma classe seria o primeiro método que é iniciado ao
criar uma instância daquela classe e possui a palavra reservada
<b> constructor</b>, ou seja, no construtor, nós fazemos todos os
processamentos iniciais, como criação de atributos, ou atribuições de
valores iniciais.

---

# Classes — inheritance

Algumas vezes vamos conseguir criar classes mais genéricas que possuem
métodos ou atributos em comum com outras classes, pensando nessa situação
foi criado a herança, com a herança, podemos criar classes especificas, que
herdam métodos e atributos das classes genéricas. Para fazer a herança,
precisamos utilizar a palavra-chave <b>extends</b>

---

# Classes — inheritance

Assim como temos o this para referenciar o objeto que estamos, para
referenciar a classe pai, temos a palavra-chave <b>super</b> ela funciona
semelhante ao this, porém referenciando a classe pai.

---

# Inheritance — example

```js
class Person {
  constructor(name) {
    this._name = name;
  }\n
  get name() {
    return this._name
  }\n
  set name(name) {
    this._name = name
  }
};
```

---

# Inheritance — example

```js
class Programmer extends Person {
  constructor(name, lang){
    super(name)
    this._lang = lang;
  }\n
  get lang() {
    return this._lang
  }\n
  set lang(lang) {
    this._lang = lang
  }
}
const programmer = new Programmer('david', 'JavaScript');
console.log(programmer.name + ' ' + programmer.lang); // david JavaScript
```

---

# Classes - Static

Em alguns casos precisamos de uma classe que não precise ser instânciada,
com isso podemos criar métodos e atributos estáticos.

---

# Static - Exemplo

```js
class Calculator {
  static sum(value1,value2){
    return value1 + value2
  }
};
console.log(Calculator.sum(1,1) // 2
```

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Classes](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes)
[Classes parte 2](https://developer.mozilla.org/pt-BR/docs/conflicting/Learn/JavaScript/Objects/Classes_in_JavaScript)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
