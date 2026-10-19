---
theme: default
title: 'Introdução ao HTML'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/04-introducao-a-estilizacao-e-css/"
/>

<Intro title="Introdução ao HTML" image="html" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>O que é HTML?</li>
      <li>Estrutura básica de uma tag</li>
      <li>Estrutura básica de uma página</li>
      <li>Exemplo de Tags</li>
      <li>Criando sua primeira página</li>
    </v-clicks>
  </ul>

---

# O que é HTML

HTML(HyperText Markup Language) é uma linguagem de marcação de texto para
criação de páginas web.

---

# Estrutura de uma Tag

<CourseImage name="tagStructure" alt="Estrutura de uma Tag" :width="750" :height="300" />

---

# Página básica em html

<CourseImage name="htmlPrint" alt="Página básica em html" :width="600" :height="300" />

---

# Tags com fechamento automático

Existem tags que não possuem conteúdos dentro delas, e essas são chamadas de
Self-Closing Tags

---

# Exemplo Self-Closing Tag

&lt;img src="./image.png" /&gt;

---

# Atributo da Tag

As tags possuem atributos que servem para gerar um comportamento especifico,
como por exemplo, o Tag &lt;img /&gt; possui o atributo 'src' que serve para
indicar qual o caminho da imagem

---

# Atributo da Tag

Existem dois tipos de atributos, globais e especificos por tag. <br />
  <ul>
    <v-clicks>
      <li>
        Atributo global: 'id' é um atributo para indicar um identificador único
        para uma tag
      </li>
      <li>
        Atributo especifico: 'alt' é um atributo especifico do &lt;img /&gt;
        para indicar o texto alternativo para caso a imagem não seja encontrada
      </li>
    </v-clicks>
  </ul>

---

# Preciso decorar todas as tags?

Existem muitas tags para html, mas a grande maioria são reflexo de uma palavra
que na maioria das vezes define o que ela aquela tag faz. <br />
Exemplo:
  <ul>
    <li>&lt;img /&gt; image</li>
    <li>&lt;h1 /&gt; heading1</li>
    <li>&lt;p /&gt; paragraph</li>
    <li>&lt;br /&gt; break line</li>
  </ul>

---

# Meta tags

A meta tag é usada para descrever um conteúdo de uma pagina web. Esta
descrição será exibida abaixo do título e da url da sua página nos resultados
do google.

---

# Meta tags

Como a meta tag aparece no titulo ou descrição da sua página, elas tem um
grande poder em ajudar na taxa de cliques da sua página

---

# Exemplo Meta tags

&lt;meta name="description" content="Descrição da pagina"&gt;

---

# Tags de formatação

Existem tags que serve para nós formatamos o nosso texto, como italico, deixar
o texto maior, entre outras formatações.

---

# Tags de formatação

<ul>
    <v-clicks>
      <li>
        &lt;p&gt;&lt;b&gt;HTML&lt;/b&gt; é muito legal!&lt;/p&gt;
        <p>
          <b>HTML</b> é muito legal
        </p>
      </li>
      <li>
        &lt;p&gt;HTML é &lt;small&gt;muito&lt;/small&gt; legal!&lt;/p&gt;
        <p>
          HTML é <small>muito</small> legal
        </p>
      </li>
    </v-clicks>
  </ul>

---

# Links

&lt;a href="https://www.google.com/" target="_blank"&gt;Google&lt;/a&gt;
[Google](https://www.google.com/)

---

# Listas desordenadas

&lt;ul&gt; <br />
&lt;li&gt;Primeiro item&lt;/li&gt; <br />
&lt;li&gt;Segundo item&lt;/li&gt; <br />
&lt;/ul&gt;<br />

  <ul>
    <li>Primeiro item</li>
    <li>Segundo item</li>
  </ul>

---

# Listas ordenadas

&lt;ol&gt; <br />
&lt;li&gt;Primeiro item&lt;/li&gt; <br />
&lt;li&gt;Segundo item&lt;/li&gt; <br />
&lt;/ol&gt;<br />

  <ol>
    <li>Primeiro item</li>
    <li>Segundo item</li>
  </ol>

---

# Tabelas

&lt;table&gt; <br />
&lt;tr&gt; <br />
&lt;td&gt;Teste&lt;/td&gt; <br />
&lt;td&gt;15&lt;/td&gt; <br />
&lt;/tr&gt;<br />
&lt;/table&gt; <br />

  <table>
    <tr>
      <td>Teste</td>
      <td>15</td>
    </tr>
  </table>

---

# Tabelas com cabeçalho

<CourseImage name="tableHead" alt="Tabelas com cabeçalho" :width="700" :height="500" />

---

# Tags semânticas

As tags semânticas servem para aumentar a coesão entre os elementos da página,
e ajuda muito na análise dos rôbos do google para ranquear a sua página na
pesquisa do Google.

---

# Tags semânticas

<ul>
    <li>&lt;article&gt;</li>
    <li>&lt;aside&gt;</li>
    <li>&lt;footer&gt;</li>
    <li>&lt;header&gt;</li>
    <li>&lt;nav&gt;</li>
    <li>&lt;section&gt;</li>
    <li>&lt;main&gt;</li>
  </ul>

---

# Criando sua primeira página

---

# Referências

[Principais tags HTML](https://www.codigofonte.com.br/artigos/principais-tags-de-html)
[Lista de tags html](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element)
[Mais tags html](https://www.w3schools.com/tags/)
[Links úteis](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# Isso é tudo pessoal!

Duvidas?
