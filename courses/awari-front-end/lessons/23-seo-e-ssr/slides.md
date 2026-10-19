---
theme: default
title: 'SEO e SSR'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/22-graphql-e-arquitetura-de-software/"
/>

<Intro title="SEO e SSR" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Introdução SEO</li>
      <li>Importância do SEO</li>
      <li>O que é SSR?</li>
      <li>Vantagens do SSR sobre o SPA</li>
      <li>Next JS</li>
      <li>Gatsby JS</li>
    </v-clicks>
  </ul>

---

# Introdução - SEO

SEO(Search Engine Optimization ou otimização de mecanismos de busca) é um
conjunto de técnicas para alcançar um bom posicionamento de páginas nos
softwares de buscas(google ou outros), assim trazendo um tráfego orgânico.

---

# Introdução - SEO

Praticamente tudo em uma página pode influenciar em como o google ranqueia o
seu site, e quanto melhor ranqueado, mais chances dos usuários acharem o seu
site na internet.

---

# Fatores de ranqueamento - SEO

Várias pesquisas são feitas para tentar desvendar quais são os fatores que o
google usa para ranquear uma página. A BackLinko fez uma lista com 200 fatores
de ranqueamento, mas vamos ver os 10 principais.

---

# Fatores de ranqueamento - SEO

<ul>
    <li>
      Page Authority/Pagerank -> Autoridade da página (relevancia daquela
      página)
    </li>
    <li>
      Autoridade do domínio -> Páginas que fazem parte de um domínio com mais
      autoridade na internet
    </li>
    <li>
      Originalidade e qualidade do conteúdo -> Conteúdos robustos e originais
      são priorizados
    </li>
    <li>
      Tamanho do contéudo -> Conteúdos maiores são considerados menos
      superficiais, por isso tem mais preferência
    </li>
    <li>
      Palavra-chave no título -> possui uma grande influência na avaliação
    </li>
    <li>
      Palavra-chave no conteúdo -> ter a palavra-chave presente nas primeiras
      100 palavras e também em subtítulos
    </li>
  </ul>

---

# Fatores de ranqueamento - SEO

<ul>
    <li>Tempo de permanência do usuário na página</li>
    <li>Velocidade no carregamento -> Quanto mais leve, melhor</li>
    <li>
      Responsividade -> O google prioriza sites que se adaptam a dispositivos
      móveis
    </li>
  </ul>

---

# SEO e SPA

O SPA(Single Page Application) não é uma boa alternativa, pois todo conteúdo
da página é dinâmico, e carrega junto com o javascript, por isso os googleBots
não conseguem analisar esse tipo de aplicação.

---

# O que é SSR?

É ai que entra o SSR(Server Side Rendering), o SSR inverte o processo de
renderização de uma aplicação SPA, ja que parte do processo de renderização
fica na parte do servidor, assim trazendo um contéudo pré carregado e
facilitando a indexação pelos googleBots.

---

# Vantagens do SSR sobre o SPA

<ul>
    <li>Podemos fazer caching de requisições ou assets(imagens)</li>
    <li>SEO mais avançado</li>
    <li>Menos processamento na máquina do cliente</li>
    <li>Frameworks bem completos que ajudam muito no desenvolvimento</li>
  </ul>

---

# Desvantagens do SSR sobre o SPA

<ul>
    <li>Primeira renderização sempre é mais lenta</li>
    <li>
      Pode ter uma complexidade em fazer o setup de certas
      libraries(styled-components por exemplo)
    </li>
    <li>Maior tempo de build</li>
  </ul>

---

# Next JS

O Next JS, é um framework open-source criado e mantido pela vercel, que
propociona criar uma aplicação react com SSR. O Next JS possui muitas features
interessantes, tais como: routing com traduções dinâmicas, caching de assets,
integração com o vercel entre outras features.

---

# Gatsby JS

O Gatsby JS, é um framework para criação de sites utilizando SSR e React,
muito recomendado para sites estáticos e blogs, porém ele também é muito usado
em várias libraries open source, como o mdx-deck e o docz!

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Artigo sobre SEO](https://resultadosdigitais.com.br/o-que-e-seo/)
[SSR vs SPA](https://www.treinaweb.com.br/blog/spa-e-ssr-quais-as-diferencas?gclid=CjwKCAiA4KaRBhBdEiwAZi1zzv-e5wcRkgpH7PhkKssGuhXZyavdfKkV8NNCVRstdSlSP3nONZJU8hoCfywQAvD_BwE)
[Next JS](https://nextjs.org/)
[Gatsby JS](https://www.gatsbyjs.com/)
[Criando um simples blog com gatsby + netlify cms](https://www.netlifycms.org/docs/gatsby/)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
