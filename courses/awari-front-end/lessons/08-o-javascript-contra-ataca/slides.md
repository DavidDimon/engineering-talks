---
theme: default
title: 'O JavaScript contra-ataca'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/07-introducao-ao-javascript/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/09-javascript-contra-ataca-parte-2/"
/>

<Intro title="O JavaScript contra-ataca" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Switch-case</li>
      <li>JSON</li>
      <li>Object-literals</li>
      <li>Arrays</li>
      <li>Looping - For</li>
      <li>Looping - Métodos</li>
      <li>While</li>
    </v-clicks>
  </ul>

---

# Switch-case

Switch é uma condicional que avalia uma expressão combinando o valor da
expressão com uma cláusula <b>case</b> e executa as instruções daquele case.

---

# Switch-case - Exemplo

```js
var value = 'Hotdog';
switch (
  value // expressão
) {
  case 'Hotdog':
    console.log('é um Hotdog!');
    break; // serve para não pular para proxima cláusula
  case 'Batata':
    console.log('é uma batata!');
    break;
  default:
    console.log('não é um hotdog nem uma batata =/');
}
```

---

# Switch-case - Break

Como visto no último exemplo, o switch-case possui uma palavra-reservada
<b> break</b>, sem o break a cada final do case, o programa seguirá até o ultimo
case.

---

# Switch-case - Default

Outra palavra reservada é o <b>default</b> que é usada para definir um valor
padrão para se caso, nenhum <b>case</b> for suficiente o programa usar a
claúsula padrão(default).

---

# JSON

<b>JSON</b> ou <b>JavaScript Object Notation</b> é uma sintaxe de
serialização de objetos, matrizes, números, strings, booleanos e null. Com
JSON, podemos fazer estruturas de dados mais complexas.

---

# JSON - Exemplo

```js
var objectSample = { name: 'test', params: { age: 25, isUnderAge: false } };
```

---

# Object-literals

Outro jeito interessante de criar estruturas semelhantes ao do switch-case,
seria com objetos javascript, utilizando este tipo de estrutura, conseguimos
criar uma estrutura mais flexivel, com cláusulas dinâmicas!

---

# Object-literals - Exemplo

```js
var sample = {
  hotdog: 'é um hotdog!',
  batata: 'é uma batata!',
  default: 'não é um hotdog nem uma batata =/'
};
const getSample = (key) => {
  if(!key) return sample.default\n
  return sample[key] || sample.default
}
console.log(getSample('hotdog')) // é um hotdog!
```

---

# Arrays

Arrays ou vetores é um tipo de dado semelhante a uma lista, podendo carregar
vários dados dentro dela. Como o JavaScript é fracamente tipado, o array pode
carregar vários dados de diferentes tipos.

---

# Arrays - Exemplo

```js
var arraySample = ['test', 1, false, { age: 26 }];
console.log(arraySample[0]); // 'test'
```

---

# Looping - For

Existem várias formas para manipulação desses arrays(ou listas), a mais
comum seria usando a palavra reservada <b>for</b>

---

# Looping For - Exemplo

```js
var arraySample = ['test', 1, false, { age: 26 }];
for (var i = 0; i < arraySample.length; i++) {
  console.log(i, arraySample[i]);
}
```

---

# Looping For in - Exemplo

```js
var arraySample = ['test', 1, false, { age: 26 }];
for (var value in arraySample) {
  console.log(value);
}
```

---

# Looping - Métodos

Todos os arrays possuem várias propriedades(entre elas o length), e vários
métodos que podemos usar para facilitar a manipulação ou o uso dessas
listas.

---

# Looping - forEach

```js
var arraySample = ['test', 1, false, { age: 26 }];
arraySample.forEach((value, index) => console.log(index, value));
```

---

# Looping - map

```js
var arraySample = [1, 2, 3];
console.log(arraySample.map((value, index) => value + 1)); // [2,3,4]
```

---

# Looping - filter

```js
var arraySample = [1, 2, 3, 4];
console.log(arraySample.filter((value) => value > 1)); // [2,3,4]
```

---

# Looping - find

```js
var arraySample = [1, 2, 3, 4];
console.log(arraySample.find((value) => value === 2)); // 2
```

---

# Looping - reduce

```js
var arraySample = [1,2,3,4]
console.log(arraySample.reduce((memory, currentValue, index, array) => {
  return [...memo, currentValue + 2]
}, [] // valor inicial do parametro memory)) // [2, 4, 5, 6]
```

---

# Outros métodos úteis

<ul>
    <li>Adicionar item no final do array -> array.push(1)</li>
    <li>Remover item do final do array -> array.pop()</li>
    <li>Remover item do inicio do array -> array.shift()</li>
    <li>Adicionar item no inicio do array -> array.unshift(1)</li>
    <li>Buscar um indice por um valor do array -> array.indexOf('batata')</li>
    <li>Remover um item pelo indice -> array.splice(index, 1)</li>
  </ul>

---

# Looping - While

Em alguns casos, precisamos executar um loop várias vezes até que uma tarefa
seja concluída, pensando nisso temos o <b>while</b> que cria um laço de
repetição que executa uma rotina enquanto a condição for verdadeira

---

# Looping - While

```js
var sample = 0;
while (sample < 3) {
  sample++;
  console.log(sample);
}
```

---

# Looping - do...while

Já o <b>do...while</b> cria um laço que executa uma declaração até que a
condição seja falsa. A grande diferença entre o do while e o while é que a
condição é avaliada depois que o bloco de código é executado, resultando que
uma declaração seja executada pelo menos uma vez.

---

# Looping - do while

```js
var sample = 0;
do {
  sample++;
  console.log(sample);
} while (sample < 2);
```

---

# Referências

[Switch-case](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/switch)
[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[JSON](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON)
[Object literals](https://blog.rocketseat.com.br/substituindo-a-instrucao-switch-por-object-literal/)
[Vários métodos do array!](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array)
[do...While](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/do...while)

---

# Isso é tudo pessoal!

Duvidas?
