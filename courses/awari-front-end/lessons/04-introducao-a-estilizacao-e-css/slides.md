---
theme: default
title: 'Introdução à estilização e CSS'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/03-introducao-ao-html/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/05-introducao-a-estilizacao-e-css-parte-2/"
/>

<Intro title="Introdução a estilização e css" image="cssintro" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Estilização inline</li>
      <li>CSS</li>
      <li>Propriedades do CSS</li>
      <li>Seletores</li>
      <li>Pseudo-classes</li>
      <li>Únidades</li>
      <li>Box model</li>
      <li>Como usar o CSS</li>
    </v-clicks>
  </ul>

---

# Estilização inline

Nem sempre precisamos criar um arquivo css, ou armazenar as informações de
estilo em um outro arquivo, podemos passar um atributo de estilo, com varias
informações de estilos para alguma tag.

---

# Estilização inline

Exemplo: <br />
&lt;p style="color: red; padding-left: 10px;"&gt;teste&lt;/&gt;
  <p :style="{ color: 'red', paddingLeft: '10px' }">teste</p>

---

# Estilização inline

Mas agora imaginem uma página complexa, com vários elementos, e todos sendo
estilizados inline. Muito código duplicado, e uma complexidade enorme de
manutenção, e para resolver isso criaremos um arquivo CSS.

---

# Propriedades do CSS

As propriedades do CSS funcionam de uma forma simples, sempre vão ser
acompanhada de uma key(chave) como por exemplo, 'color' e um valor ('red' por
exemplo)

---

# Seletor CSS - Elemento

Altera todos os elementos de um tipo especifico, Ex: <br />
&lt;p&gt;Texto&lt;/p&gt;
<br />

```js
p {
  color: red;
}
```

---

# Seletor CSS - Classe

Altera todos os elementos de uma classe especifica, Ex:
<br />
&lt;p class="paragraph-class"&gt;Texto&lt;/p&gt;
<br />

```js
.paragraph-class {
  color: red;
}
```

---

# Seletor CSS - Classe

Um elemento pode ter mais de uma classe, assim trazendo ainda mais
possibilidades de reaproveitamento de código. Ex:
<br />
&lt;p class="paragraph-class text-class"&gt;Texto&lt;/p&gt;
<br />

```js
.paragraph-class {
  color: red;
}
.text-class {
  font-size: 0.5rem;
}
```

---

# Seletor CSS - Id

Altera todos os elementos com um id em especifico, Ex:
<br />
&lt;p id="paragraph-id"&gt;Texto&lt;/p&gt;
<br />

```js
#paragraph-id {
  color: red;
}
```

---

# Seletor CSS - Universais

Ele irá alterar todos os elementos, Ex:
<br />
&lt;p&gt;Texto&lt;/p&gt;
<br />

```js
* {
  color: red;
}
```

---

# Seletor CSS - Atributo

<ul>
    <v-clicks>
      <li>[attribute] -> Seleciona todos os elementos com atributo target</li>
      <li>
        [attribute=value] -> Seleciona os elementos com um atributo com um valor
        especifico
      </li>
      <li>
        [attribute~=value] -> Seleciona os elementos com um atributo que contem
        um valor especifico
      </li>
      <li>
        [attribute|=value] -> Seleciona os elementos com um atributo que começa
        com um valor especifico
      </li>
      <li>
        element[attribute^=value] -> Seleciona o elemento em especifico com um
        atributo que começa com um valor especifico
      </li>
      <li>
        element[attribute$=value] -> Seleciona o elemento em especifico com um
        atributo que termina com um valor especifico
      </li>
      <li>
        element[attribute*=value] -> Seleciona o elemento em especifico com um
        atributo que contem um valor especifico
      </li>
    </v-clicks>
  </ul>

---

# Pseudo-classes

Pseudo classe é uma palavra reservada que é adicionada a um seletor que
especifica um estado especial de um elemento. Exemplo:
<br />

```js
p:hover {
  color: red;
}
```

---

# Pseudo-classes

O sufixo 'hover' acompanhado do ':' indica que, caso o usuário passe o mouse
em cima do elemento p(paragraph) a cor do texto mudará para vermelho

---

# Únidades de tamanho absoluto

<ul>
    <v-clicks>
      <li>px -> Tamanho em pixels (relativo ao dispositivo)</li>
      <li>em -> Tamanho relativo à fonte utilizada no elemento</li>
      <li>in -> Polegadas (1polegada = 2.54 cm)</li>
      <li>cm -> Centimetros</li>
      <li>mm -> milimetros</li>
      <li>pt -> Pontos (1pt = 1/72 polegadas)</li>
      <li>pc -> Picas (1pica = 12 pontos)</li>
    </v-clicks>
  </ul>

---

# Únidades de tamanho relativo

<ul>
    <v-clicks>
      <li>% -> Calcula o tamanho relativo ao elemento pai</li>
      <li>em -> 1em é uma vez o font-size do elemento</li>
      <li>
        rem -> 1rem é uma vez o font-size do elemento acima na hierarquia de
        elementos
      </li>
      <li>vw -> 1vw é 1% da largura da janela do navegador</li>
      <li>vh -> 1vh é 1% da altura da janela do navegador</li>
      <li>vmin -> 1vmin é 1% da menor dimensão da janela do navegador</li>
      <li>vmax -> 1vmax é 1% da maior dimensão da janela do navegador</li>
    </v-clicks>
  </ul>

---

# Únidades de cor

<ul>
    <v-clicks>
      <li>#RRGGBB -> Cor RGB(#000000) </li>
      <li>#RRGGBBAA -> Cor RGBA(#00000050) </li>
      <li>#RGB -> Notação simplificada(#000) </li>
      <li>#RGBA -> Notação simplificada(#0005) </li>
      <li>rgb(R,G,B) -> Cor RGB (valores de 0 a 255) </li>
      <li>rgb(R,G,B,A) -> Cor RGB (valores de 0 a 255) </li>
      <li>rgb(R%,G%,B%) -> Cor RGB (valores de 0 a 255) </li>
      <li>rgb(R%,G%,B%,A%) -> Cor RGB (valores de 0 a 255) </li>
    </v-clicks>
  </ul>

---

# Box model

<CourseImage name="boxmodel" alt="Box model" :width="600" :height="300" />

---

# Como importar o arquivo CSS?

```js
<html>
  <head>
    <link rel="stylesheet" href="caminho do arquivo css" />
  </head>
</html>
```

---

# Referências

[Seletores](https://tableless.com.br/referencia-seletores-css/)
[Links úteis](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# Isso é tudo pessoal!

Duvidas?
