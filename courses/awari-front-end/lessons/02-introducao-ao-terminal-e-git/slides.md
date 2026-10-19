---
theme: default
title: 'Introdução ao terminal e Git'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/01-introducao-ao-desenvolvimento-web/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/03-introducao-ao-html/"
/>

<Intro title="Introdução ao terminal e Git" image="github" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Para que utilizamos o terminal?</li>
      <li>Opções de terminais por SO</li>
      <li>Comandos mais usados</li>
      <li>O que é Git?</li>
      <li>Comandos do git</li>
      <li>Configurando sua conta no github</li>
      <li>Open source</li>
    </v-clicks>
  </ul>

---

# Para que utilizamos o terminal?

Normalmente utilizamos a linha de comando(terminal) para rodar comandos que
não valeriam a pena estarem em uma interface gráfica

---

# Para que utilizamos o terminal?

No dia-a-dia é normal utilizarmos até mais de um terminal para executar
comandos, tais como um comando de start de uma aplicação.

---

# Opções de terminais por SO

<ul>
    <li>Windows: PowerShell ou windows terminal</li>
    <li>Linux: Bash(padrão) ou ZSH</li>
    <li>MacOS: Bash(padrão) ou iTerm2</li>
  </ul>

---

# Comandos mais usados

<CourseImage name="terminal" alt="Comandos mais usados" :width="950" :height="500" />

---

# O que é git?

O Git é um sistema de controle de versão distribuído, onde podemos criar
projetos, gerenciar multiplas features/fixes e com isso podemos criar um
ambiente saudável para desenvolvimento de um projeto.

---

# Historia do git

Tudo começou quando houve um rompimento da relação entre a comunidade que
desenvolvia o Kernel do Linux e a BitKeeper. Bitkeeper é um sistema de
controle de versão distribuído.

---

# Historia do git

A partir deste momento, nosso lendário Linus Torvalds passa a desenvolver o
próprio sistema de controle de versão com um grande foco em ter a melhor
performance entre os softwares de controle de versão

---

# E o github?

O Github é uma plataforma de hospedagem de código, que utiliza a técnologia
Git. Com o github, não precisamos configurar um servidor de Git, o proprio
github já disponibiliza o git e muito mais!

---

# E como funciona o Git?

<CourseImage name="gitlocal" alt="E como funciona o Git?" :width="950" :height="500" />

---

# Git Tree

<CourseImage name="gitTree" alt="Git Tree" :width="950" :height="500" />

---

# Gírias do git

<ul>
    <li>Commitar: Ato de subir um código para o repositorio local</li>
    <li>
      Dar um Push: Ato de fazer upload do repositório local, para o remoto
    </li>
    <li>Branch: Versão do projeto com fixes/features ou outras coisas</li>
    <li>Dar um Pull: Atualizar o repositório local com o remoto</li>
  </ul>

---

# Comandos do git

<ul>
    <li>git init: Cria um novo repositório local</li>
    <li>git add: Adiciona um arquivo para 'commitar'(staged file)</li>
    <li>git commit: Sobe os staged files para o repositório local</li>
    <li>git push: Sobe os arquivos commitados para o repositório remoto</li>
    <li>git pull: Atualizar os arquivos locais com o remoto</li>
    <li>git checkout #branch#: Muda de branch</li>
  </ul>

---

# Configurando a sua conta do github

---

# Open source

O open source(ou código aberto) é algo muito importante para o mundo da
programação, por causa desse movimento, que temos essa liberdade e essa
popularidade da técnologia e programação, talvez sem o open source não
estáriamos tão avançados em técnologia.

---

# Referências

[O que é git e github?](https://www.alura.com.br/artigos/o-que-e-git-github?gclid=Cj0KCQiA15yNBhDTARIsAGnwe0XHs9CtWEWVYNSv8GDJrfijl9ISmEDr9uNQXsyfhKt2gVaRcLXnbK4aAuASEALw_wcB)
[Uma breve história do Git](https://medium.com/@dyhalmeida/breve-hist%C3%B3ria-do-git-o-controle-de-vers%C3%A3o-mais-adotado-pelos-desenvolvedores-do-mundo-inteiro-c82466b50c02)
[Links úteis](https://www.notion.so/Links-teis-aula-2-111941eb054b4edea263d16d2ca2ac94)

---

# Isso é tudo pessoal!

Duvidas?
