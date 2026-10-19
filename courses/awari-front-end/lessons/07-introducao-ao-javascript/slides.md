---
theme: default
title: 'Introdução ao JavaScript'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/06-introducao-a-programacao/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/08-o-javascript-contra-ataca/"
/>

<Intro title="Introdução ao JavaScript" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>O que é o JavaScript?</li>
      <li>Console</li>
      <li>Tipagem</li>
      <li>Tipos de dados e varíaveis</li>
      <li>Concatenação de strings</li>
      <li>Propriedades e Métodos</li>
      <li>Operador typeof</li>
      <li>Funções</li>
      <li>Palavra-chave: return</li>
      <li>If-Else</li>
      <li>Operador ternário</li>
    </v-clicks>
  </ul>

---

# O que é o JavaScript

O JavaScript é uma linguagem fracamente tipada, que foi criada principalmente
para execução no browser, porém com o tempo foi ganhando força e sendo usada
para criação de APIs, apps mobile e muito mais!

---

# Console

A palavra reservada 'console', é usada para exibir dados em terminais ou no
próprio console do navegador, pode ser usada para fins de debug, ou para
mostrar informações simples sobre a aplicação.

---

# Console

Com o console, podemos exibir mensagens de vários tipos, sendo elas:
  <ul>
    <li>console.log('mensagem') = para logs comuns</li>
    <li>console.error('mensagem') = para logs de erro</li>
    <li>console.warn('mensagem') = para logs de aviso(warning)</li>
    <li>console.table('mensagem') = para logs em forma de tabela</li>
  </ul>

---

# Tipagem

Como dito no ínicio, o JavaScript é uma linguagem fracamente tipada, isso quer
dizer que, não precisamos declarar o tipo da variável ao cria-la, e também
podemos mudar o tipo de valor que uma variável em tempo de execução, feature
que em uma linguagem como Java(fortemente tipada) não poderia acontecer.

---

# Tipagem - Exemplo

```js
var value = 15;
value = 'i am a string!';
console.log(value); // i am a string!
```

---

# Tipos de dados

Não é porque o JavaScript é fracamente tipado, que quer dizer que não existe
tipos de dados.

---

# Tipos de dados

<ul>
    <v-clicks>
      <li>
        String(texto) = qualquer agrupamento de caracteres, inclusive números.
      </li>
      <li>
        Number(número) = qualquer tipo de número, seja ele negativo, positivo,
        ou decimal(com casas decimais)
      </li>
      <li>
        Boolean(booleano) = só possui dois valores possíveis, true ou false
      </li>
      <li>
        Null(nulo) = representa a ausência intencional de um valor que é
        representado pela palavra-chave <b>null</b>
      </li>
      <li>
        Undefined(indefinido) = representa a ausência de valor, muito usado para
        identificar que um atributo não existe em um objeto
      </li>
      <li>Object(objeto) = uma coleção de dados</li>
    </v-clicks>
  </ul>

---

# Tipos de varíaveis - let

O <b>let</b> é um tipo de variável para utilizar dentro de um escopo de
bloco, ou seja, se for declarada dentro de um if, ela só poderá ser acessada
dentro desse if

---

# Tipos de varíaveis - let(exemplo)

```js
if (1 === 1) {
  let value = 1;
  console.log(value); // 1
}
console.log(value); // value is not defined
```

---

# Tipos de varíaveis - var

O <b>var</b> é um tipo de variável para utilizar dentro de um escopo de uma
função, ou seja, se for declarada dentro de uma função, ela só poderá ser
acessada dentro dessa função.

---

# Tipos de varíaveis - var(exemplo)

```js
if (1 === 1) {
  var value = 1;
  console.log(value); // 1
}
console.log(value); // 1
```

---

# Tipos de varíaveis - const

O <b>const</b> possui uma semelhança com o let, ambas possuem escopo de
bloco, ou seja, se for declarada no escopo de um if, só poderá ser usada
dentro daquele if. Uma const também não pode ser alterada por atribuição e
não pode ser redeclarada no mesmo escopo.

---

# Tipos de varíaveis - const(exemplo)

```js
if (1 === 1) {
  const value = 1;
  console.log(value); // 1
  value = 3; // TypeError: "value" is read-only
}
console.log(value); // value is not defined
```

---

# Concatenação de strings

No JavaScript as vezes precisamos 'somar textos' para montar frases,
mensagens...etc, e temos várias formas de fazer isso!

---

# Concatenação de strings

```js
{
  "var name = 'David'\n" +
    "var surname = 'Dimon'\n" +
    'var allNames = `${name} ${surname}`// David Dimon\n' +
    "var otherWay = name + ' ' + surname // David Dimon";
}
```

---

# Propriedades

Alguns valores(dados) podem ter algumas propriedades exclusivas, um exemplo
seria um dado do tipo string, todas as strings, carregam algumas propriedades,
uma delas seria o .length, que usamos para saber o tamanho do texto!

---

# Propriedades - exemplo

```js
console.log('text'.length); // 4
```

---

# Métodos

Além de propriedades, os valores, podem ter métodos exclusivos também, um
valor do tipo string por exemplo, possui vários métodos e um deles seria o
.toUpperCase(), que é usado para deixar os caracteres maiúsculos.

---

# Métodos - exemplo

```js
console.log('text'.toUpperCase()); // TEXT
```

---

# Operador typeof

Em alguns casos, precisamos saber o tipo do valor de uma variável, para
tomar-mos uma decisão, é ai que entra o operador typeof.

---

# Operador typeof

```js
var value = 0;
if (typeof value === 'number') {
  console.log('sim, isso é um número');
} else {
  console.log('não, isso não é um número');
}
```

---

# Funções

Uma função seria um conjunto de instruções que executa uma tarefa ou calcula
um valor. Para usar uma função, devemos defini-la em algum lugar no escopo do
qual você quiser chamá-la

---

# Funções - exemplo named function

```js
function test() {
  console.log('hello world');
}
test(); // hello world
```

---

# Funções - exemplo anonymous function

```js
var test = function () {
  console.log('hello world');
};
test(); // hello world
```

---

# Funções - exemplo arrow function

```js
var test = () => {
  console.log('hello world');
};
test(); // hello world
```

---

# Operador return

Em alguns casos precisamos que uma função retorne um valor e para isso,
temos a palavra-cache <b>return</b>. Após usado o return, a função retornará
o valor e irá parar a execução daquela função.

---

# Operador return - exemplo

```js
var sayHello = () => {
  return 'hello world';
};
var test = sayHello();
console.log(test); // hello world
console.log(sayHello()); // hello world
```

---

# Operador return - exemplo 2

```js
var sayHello = (lang) => {
  if(lang === 'portuguese') return 'olá mundo'\n
  return 'hello world'
}
console.log(sayHello('portuguese')); // olá mundo
console.log(sayHello()); // hello world
```

---

# If-Else

Você deve ter percebido nos slides anteriores, a palavra-chave <b>if</b>, o
if-else, pode ser usado para fazer validações de valores para assim
tomar-mos decisões.

---

# If-Else - exemplo

```js
if (condition) {
  // se condition === true vai pra cá!
} else {
  // se condition === false vai pra ca!
}
```

---

# If-Else - exemplo else If

```js
if (name === 'david') {
  // se name === david vai pra cá!
} else if (name === 'kojima') {
  // se name === kojima vai pra cá!
} else {
  // se name diferente de kojima ou david vai pra ca!
}
```

---

# Operador ternário

Em algumas situações, não queremos fazer um if-else para fazer validações, as
vezes queremos fazer uma validação simples, e retornar um valor, para isso,
temos o operador ternário!

---

# Operador ternário - exemplo

```js
var age = 18;
var underAgeMessage = age > 17 ? 'é maior de idade' : 'não é maior de idade';
console.log(underAgeMessage); // é maior de idade
```

---

# Referências

[O que é javascript](https://kenzie.com.br/blog/javascript/)
[Funções JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Functions/)
[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)

---

# Isso é tudo pessoal!

Duvidas?
