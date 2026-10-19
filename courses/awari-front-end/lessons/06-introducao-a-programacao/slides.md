---
theme: default
title: 'Introdução à programação'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/05-introducao-a-estilizacao-e-css-parte-2/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/07-introducao-ao-javascript/"
/>

<Intro title="Introdução a programação" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Algoritmos</li>
      <li>Linguagens de programação</li>
      <li>Principais paradígmas de programação</li>
      <li>Linguagens alto e baixo nível</li>
      <li>Variáveis</li>
      <li>Operadores</li>
      <li>Condicionais</li>
    </v-clicks>
  </ul>

---

# Algoritmos

O algoritmo seria uma sequencia de instruções, raciocínios ou operações para
alcançar um objetivo, sendo necessário que os passos sejam finitos e operados
sistematicamente. Os exemplos mais comuns de algoritmo, seria uma receita
culinária ou até um manual de instruções.

---

# Algoritmos - exemplo

<ul>
    <v-clicks>
      <li>Acordar</li>
      <li>Tomar banho</li>
      <li>Vestir-se</li>
      <li>Tomar café</li>
      <li>Ligar o computador</li>
      <li>Começar um código para lançamento de um foguete</li>
    </v-clicks>
  </ul>

---

# Linguagens de programação

A linguagem de programação é basicamente um sistema de comunicação, composto
por conjuntos de símbolos, palavras-chave, regras semânticas e sintáticas que
permitem o entedimento entre programador e uma máquina.

---

# Linguagens de programação

Hoje em dia existem diversas linguagens de programação, e cada uma resolve
alguns tipos de problemas, algumas delas tentam resolver uma gama de
problemas, e algumas tentam resolver problemas mais específicos.

---

# Linguagens de programação

JavaScript por exemplo, é executado principalmente no browser, porém também
pode ser usado em sistemas embarcados, sistemas móveis, desktop e pode ser
usado até para desenvolver APIs.

---

# O que define uma linguagem de programação?

Para ser uma linguagem de programação, a tecnologia precisa ter todas as
capacidades de uma maquina teórica mínima

---

# O que é a Máquina de Turing?

A maquina de turing tem algumas capacidades básicas, que se caso a
tecnologia(como por exemplo html) ter essas capacidades, ela pode ser
considerada uma linguagem de programação

---

# O que é a Máquina de Turing?

<ul>
    <li>Fazer cálculos</li>
    <li>Mudar informações contidas em algum tipo de memória</li>
    <li>Tomar decisões</li>
    <li>Mudar fluxo de execução</li>
  </ul>

---

# Principais paradigmas de programação

Existem vários paradigmas de programação que ditam como uma linguagem de
programação irá se comportar, mas os principais(mais conhecidos) são:
  <ul>
    <li>Imperativo</li>
    <li>Orientado a objeto</li>
    <li>Funcional</li>
  </ul>

---

# paradigmas de programação - Imperativo

As instruções são passadas em sequência que devem ser executadas pelo
computador. Vários tipos de linguagens suportam esse tipo de programação tais
como: Cobol, Fortran e Pascal

---

# paradigmas de programação - Orientado a objetos

Orientação a objetos é um paradigma aplicado na programação que consiste na
interação entre diversas unidades chamadas de objetos. O paradigma de
orientação a objeto tenta se basear na vida real para resolver problemas de
software.

---

# paradigmas de programação - Orientado a objetos

Para definir uma linguagem de programação como orientada a objeto, ela precisa
seguir os 4 pilares da orientação a objeto, que seria:
  <ul>
    <li>Herança</li>
    <li>Encapsulamento</li>
    <li>Abstração</li>
    <li>Polimorfismo</li>
  </ul>

---

# paradigmas de programação - Funcional

O uso de funções é destaque. O problema é dividido em blocos e, para sua
resolução, são implementadas funções que definem variáveis em seu escopo e
retornam algum resultado. São exemplos de linguagens suportadas por esse
paradigma o LISP, o Scheme e o Haskell.

---

# Linguagem de baixo nível

Quanto mais baixo o nível da linguagem, mais perto do hardware ela esta, ou
seja, linguagens de baixo nível servem para manipulação/programação do
hardware. Outra caracteristica de uma linguagem de baixo nível, seria a
complexidade de entendimento dos comandos e da estrutura, sendo assim mais
perto da linguagem da máquina.

---

# Linguagem de baixo nível - Exemplos

<ul>
    <li>Assembly</li>
  </ul>

---

# Assembly - exemplo

<CourseImage name="assembly" alt="Assembly - exemplo" :width="900" :height="500" />

---

# Linguagem de alto nível

Já as linguagens de alto nível, ficam mais perto do nosso idioma(ou no caso do
inglês), assim sendo muito mais fácil de entender e escrever funções.
Normalmente as linguagens de alto nível são as que usamos para programar os
softwares do nosso dia-a-dia.

---

# Linguagem de alto nível - Exemplos

<ul>
    <li>JavaScript</li>
    <li>Java</li>
    <li>Golang</li>
    <li>Elixir</li>
    <li>...E muitas outras</li>
  </ul>

---

# Variáveis

Podem ser entendidas como um espaço em memória para guardar um dado ou mais.

---

# Variáveis - Exemplo

var name = 'David';
<br />
console.log(name) // David

---

# Operadores

Possuímos 3 tipos de Operadores, tais como:
  <ul>
    <li>Operadores Aritméticos</li>
    <li>Operadores Relacionais</li>
    <li>Operadores Lógicos</li>
  </ul>

---

# Operadores - Arítméticos

<ul>
    <li>
      Adição: <b>+</b>
    </li>
    <li>
      Subtração: <b>-</b>
    </li>
    <li>
      Multiplicação: <b>*</b>
    </li>
    <li>
      Divisão: <b>/</b>
    </li>
    <li>
      Resto da divisão: <b>mod ou %</b>
    </li>
    <li>
      Divisão inteira: <b>\</b>
    </li>
    <li>
      Potenciação: <b>^</b>
    </li>
  </ul>

---

# Operadores - Relacionais

<ul>
    <li>
      Igual: <b>=</b>
    </li>
    <li>
      Maior que: <b>{'>'}</b>
    </li>
    <li>
      Menor que: <b>{'<'}</b>
    </li>
    <li>
      Menos ou igual a: <b>{'<='}</b>
    </li>
    <li>
      Maior ou igual a: <b>{'>='}</b>
    </li>
    <li>
      Diferente de: <b>!=</b>
    </li>
  </ul>

---

# Operadores - Lógicos

<ul>
    <li>
      Negação: <b>!</b>
    </li>
    <li>
      Conjunção (e): <b>AND ou &&</b>
    </li>
    <li>
      Disjunção (ou): <b>OR ou ||</b>
    </li>
  </ul>

---

# Condicionais

Estruturas condicionais são recursos oferecidos pelas linguagens para que seja
possível verificar uma condição e alterar o fluxo de execução do algoritmo.

---

# Condicionais - Exemplo

```js
if (condicao) {
  // bloco para condição 'true';
} else {
  // bloco para condição 'false';
}
```

---

# Condicionais - Exemplo 2

```js
var age = 19;
if (age >= 18) {
  console.log('Pode fazer a carteira de motorista');
} else {
  console.log('Não pode fazer a carteira de motorista =/');
}
```

---

# Referências

[Linguagens de programação](https://rockcontent.com/br/blog/linguagem-de-programacao/)
[Orientação a objetos](https://balta.io/blog/orientacao-a-objetos)

---

# Isso é tudo pessoal!

Duvidas?
