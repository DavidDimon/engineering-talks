---
theme: default
title: 'Errors, Promises, Regex, and DOM'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/10-objetos-classes-e-muito-mais/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/12-introducao-ao-react/"
/>

<Intro title="Errors, Promises, Regex, and DOM" image="coding" />

---

# What will we cover today?

<ul>
    <v-clicks>
      <li>Error Handling</li>
      <li>Promises e callbacks</li>
      <li>Regex ou Expressão regular</li>
      <li>DOM</li>
    </v-clicks>
  </ul>

---

# Error handling

Conforme vamos criando funções, algumas delas podem ocasionar algum erro
inexperado, mas e se tivesse uma forma de tratar esse tipo de erro? Para
isso existe algumas formas de tratar-mos os erros, e uma delas seria o
<b> try-catch</b>

---

# Try-catch — example

```js
function testError(name) {
  try{
    if(!name) throw new Error('nome vazio')\n
    console.log('O nome é: ', name)
  }catch(error){
    console.error('deu ruim',error)
  }
}
testError();
testError('zézin sem erro');
```

---

# Error handling - catch

Com o try catch conseguimos fazer algumas instruções, e se em alguma dessas
instruções, der algum erro, o fluxo cairá na função <b>catch</b> e assim
podemos tratar o erro no escopo do catch

---

# Error handling - throw

Outra palavra-chave que podemos ver no exemplo, é o <b>throw</b> com ele
podemos forçar um erro, mas para que faríamos isso? Em alguns casos criamos
funções que precisam fazer determinados fluxos, porém essas funções não
tratam erros, a função que trata aquele erro, deve estar a um nível acima

---

# Error handling - throw

Sempre após o <b>throw</b> nós instanciamos uma classe, a mais comum seria
<b> Error</b> que recebe uma string por paramêtro no construtor, mas podemos
criar as nossas próprias classes de erro

---

# Error handling - finally

Em certos casos, queremos fazer algumas instruções, mas mesmo acontecendo
algum erro, queremos finalizar com algumas instruções tais como: finalização
de um loading, ou alguma outra instrução, e para isso, usamos o
<b> finally</b>

---

# Error handling - finally

Mesmo que a função de erro, o <b>try catch</b> irá ir até o <b>finally</b>.
O <b>finally</b>
serve também para caso voce queira omitir o erro, e fazer alguma instrução final.

---

# Try-catch — example 2

```js
function testError(name) {
  try{
    if(!name) throw new Error('nome vazio')\n
    console.log('O nome é: ', name)
  }catch(error){
    console.error('deu ruim',error)
  } finally {
    console.log('termino')
  }
}
testError();
testError('zézin sem erro');
```

---

# Promises and callbacks

As vezes precisamos tratar funções assíncronas, como integrações com uma api
por exemplo, ou até funções mais custosas. E para lidar com isso, temos a
classe chamada <b>Promise</b>

---

# Promises and callbacks

Quando formos instanciar uma classe promise, o primeiro paramêtro irá ser
uma função que possui mais duas funções por paramêtro, que normalmente
chamamos de <b>resolve</b> e <b>reject</b>

---

# Promises and callbacks

Temos dois jeitos para lidar com promises, podemos usar a palavra-chave
<b>await</b> acompanhada do prefixo <b>async</b> que vem antes da declaração
da função. Ou usarmos as callbacks, que são declaradas com o método
<b>then</b> e <b>catch</b>

---

# Promises - async-await

Ao adicionar o await em uma promise, o fluxo irá parar até aquela promise
ser resolvida, depois de resolvida, o valor dela é retornado(se caso tiver
um valor para retornar) e depois segue o fluxo necessário

---

# Promises and async-await — example

```js
const waitForIt = new Promise((resolve, reject) => {
  setInterval(() => {
    resolve('oi');
  }, 1500);
});
const test = async () => {
  const result = await waitForIt;
  console.log(result);
};
test();
```

---

# Promises - callback

Um outro jeito de resolver promise, seria com as callbacks, que são métodos
que vem da promise, e os métodos são: <b>then</b> para pegar o resultado da
promise, e <b>catch</b> que é para tratar algum erro daquela promise

---

# Promises and callbacks — example

```js
const waitForIt = new Promise((resolve, reject) => {
  setInterval(() => {
    resolve('oi');
  }, 1500);
});
const test = () => {
  waitForIt.then((result) => console.log(result));
};
test();
```

---

# Promises - callback

Um outro jeito de resolver promise, seria com as callbacks, que são métodos
que vem da promise, e os métodos são: <b>then</b> para pegar o resultado da
promise, e <b>catch</b> que é para tratar algum erro daquela promise

---

# Regex, or regular expressions

Regex ou expressões regulares, são padrões utilizados para selecionar
combinações de caracteres em textos, e podemos usar em diversos métodos da
string no JavaScript, tais como: match, replace ou split.

---

# Regular expressions — example

```js
const regex = /[0-9]/g;
const test = '123test'\n
console.log(test.replace(regex, ''))
```

---

# Regex, or regular expressions

Essa forma é mais otimizada e muito indicada para os casos que a regex não
mude.

---

# Regular expressions — example

```js
let regex = new RegExp("[0-9]", "g");
const test = '123test'\n
console.log(test.replace(regex, ''))
```

---

# Regex, or regular expressions

Essa segunda forma, seria mais para quando voce precise que a sua regex
mude, ou seja, se caso voce queira adicionar uma váriavel no meio da regex,
esse seria o jeito ideal.

---

# DOM

O DOM(Document Object Model) é uma interface que representa como os
documentos HTML são lidos pelo browser. Depois que o browser le o documento
HTML, ele cria um objeto que é a representação estruturada do html e define
meios de como essa estrutura pode ser acessada. Normalmente utilizamos
JavaScript para acessar e manipular os componentes dessa DOM

---

# DOM — example

<CourseImage name="dom" alt="DOM - exemplo" :width="1000" :height="500" />

---

# DOM — example

```js
var element = document.getElementById('button-element');
element.textContent = 'Elemento acessado com sucesso!';
```

---

# References

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Expressões regulares](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Guide/Regular_Expressions)
[Artigo sobre DOM](https://tableless.com.br/entendendo-o-dom-document-object-model/)
[API da DOM](https://developer.mozilla.org/pt-BR/docs/Web/API/Document_Object_Model)
[Site para teste de regex](https://regexr.com/)

---

# That's all, folks!

Questions?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
