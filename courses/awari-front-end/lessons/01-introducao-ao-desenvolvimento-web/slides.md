---
theme: default
title: 'Introdução ao desenvolvimento web'
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
  next-url="/engineering-talks/courses/awari-front-end/aulas/02-introducao-ao-terminal-e-git/"
/>

<Intro title="Introdução ao desenvolvimento web" image="introDev" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Requisitos e Setup inicial</li>
      <li>O que é front-end e back-end?</li>
      <li>Como funciona uma aplicação web?</li>
      <li>Protocolos da web</li>
      <li>Atividade</li>
    </v-clicks>
  </ul>

---

# Setup inicial

<ul>
    <li>NVM para controle de versões do node</li>
    <li>Yarn ou npm</li>
    <li>Git (crie uma conta no github)</li>
    <li>VScode ou outro editor</li>
  </ul>

---

# Requisitos opcionais

<ul>
    <li>Linux ou MacOS</li>
    <li>Gitkraken</li>
  </ul>

---

# Requisitos para ser um ótimo desenvolvedor

<ul>
    <v-clicks>
      <li>Persistência</li>
      <li>Humildade</li>
      <li>Se manter atualizado</li>
      <li>Ser aberto a novas técnologias</li>
      <li>Inglês</li>
    </v-clicks>
  </ul>

---

# Extensões que eu uso no VSCode

<ul>
    <li>Cyberpunk Theme</li>
    <li>GitLens</li>
    <li>Prettier</li>
    <li>SVGO</li>
    <li>vscode-icons</li>
  </ul>

---

# O que é back-end?

Um desenvolvedor back-end é responsável pela inteligencia do sistema integrado
com o banco de dados, toda a parte que o usuário não ve, como uma logica de
login, salvamento de dados entre outras coisas é feita no backend.

---

# O que é front-end?

Um desenvolvedor front-end, é responsável por fazer toda interface gráfica de
uma aplicação web e ainda fazer toda a integração entre a aplicação web e o
back-end.

---

# Como funciona uma aplicação web?

<CourseImage name="backendfront" alt="Como funciona uma aplicação web?" :width="700" :height="300" />

---

# O que é HTTP?

HTTP(Hyper Transfer Protocol) é um conjunto de regras para transferência de
dados que pode ser arquivos de texto, imagens, audio e outros arquivos
multimédia

---

# O que acontece quando eu acesso um site?

Quando voce acessa algum site como por exemplo: awari.com.br, o seu browser
faz uma requisição HTTP(ou HTTPS) mais ou menos deste jeito: GET
https://awari.com.br

---

# O que acontece quando eu acesso um site?

O servidor recebe essa requisição, processa, e te da um retorno que pode ser
tanto os arquivos do site, ou uma pagina de erro

---

# Principais métodos HTTP

<ul>
    <v-clicks>
      <li>GET</li>
      <li>POST</li>
      <li>PUT</li>
      <li>PATCH</li>
      <li>DELETE</li>
    </v-clicks>
  </ul>

---

# Códigos de status

Toda requisição feita retorna um numero de status, e para cada range existe
uma resposta especifica

---

# Códigos de status

<ul>
    <v-clicks>
      <li>Respostas de informação (100-199)</li>
      <li>Respostas de sucesso (200-299)</li>
      <li>Redirecionamentos (300-399)</li>
      <li>Erros do cliente (400-499)</li>
      <li>Erros do servidor (500-599)</li>
    </v-clicks>
  </ul>

---

# Diferença entre HTTP e HTTPS

O protocolo SSL(Secure Sockets Layer) produz a criptografia da transmissão de
dados entre a sua maquina e um servidor. Assim o HTTPS(HTTP seguro ou HTTP
sobre SSL) oferece segurança sobre os nossos dados durante uma requisição.

---

# Estrutura de uma URL

<CourseImage name="urlStructure" alt="Estrutura de uma URL" :width="1200" :height="300" />

---

# Atividade

A atividade desta aula é a mais básica possível mas que fará cada vez mais
sentido conforme o tempo passar. Selecione seu site preferido da internet –
sem julgamentos e tire uma screenshot da principal forma que você o utiliza.

---

# Isso é tudo pessoal!

Duvidas?
