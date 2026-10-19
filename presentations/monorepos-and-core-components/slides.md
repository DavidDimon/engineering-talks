---
theme: default
title: 'Core Components'
titleTemplate: '%s — Engineering Talks'
info: |
  Migração fiel da apresentação histórica sobre monorepos e core components.
author: David Dimon
keywords: monorepo, componentes, arquitetura, lerna, rollup
transition: slide-left
mdc: true
---

# Core Components

## Como reaproveitar melhor os seus componentes

<div class="historical-note">Conteúdo apresentado em dezembro de 2019 (data aproximada).</div>

---

# Por que ter uma base de código unificada?

<v-clicks>

- Melhor reaproveitamento do código
- Padronização do código
- Códigos mais concisos e “amadurecidos”
- Facilidade de manutenção
- Velocidade de criação de novos apps

</v-clicks>

---

# Como podemos criar uma base de código?

Com uma estrutura de componentes, serviços e temas em um monorepo!

---

# E por que criar um monorepo?

- Os pacotes ficam unificados
- Não há necessidade de fazer múltiplas publicações para testar
- Fácil comunicação entre os pacotes

---

# Tecnologias usadas no monorepo

<v-clicks>

- Lerna
- Yarn Workspaces
- Rollup

</v-clicks>

---

# Lerna

- Unifica o `node_modules` dos pacotes
- Expõe comandos para a publicação dos pacotes
- Gerencia quais pacotes serão publicados ou buildados

---

# Por que Yarn Workspaces junto com Lerna?

Yarn Workspaces traz ainda mais recursos para o Lerna.

---

# Rollup

O Rollup é responsável pelo build dos chunks dos pacotes.

---

# Pacotes

<v-clicks>

- Apps
- Libs

</v-clicks>

---

# Apps

## Não é publicado

Possui um app mobile e um app web para teste dos pacotes (libs).

---

# Libs

<v-clicks>

- Components
- Services
- Themes
- `_Babel` (custom Babel configs)
- `_Rollup` (custom Rollup configs)

</v-clicks>

---

# Components

<v-clicks>

- Mobile
- Shared (styles)
- Web

</v-clicks>

---

# Atomic Design — prós

<v-clicks>

- Separação dos componentes
- Facilidade na estilização
- Componentes mais inteligentes e genéricos
- Maior facilidade nos testes

</v-clicks>

---

# Atomic Design — contras

<v-clicks>

- Necessita de uma maior abstração
- Componentes mais complexos e genéricos

</v-clicks>

---

# Shared styles

- Compartilha somente o que é realmente necessário entre plataformas
- Dá mais liberdade para criar componentes focados nas plataformas

---

# Services

- Possui todas as funções e hooks compartilhados entre os projetos
- Aqui podemos ter custom hooks para facilitar o desenvolvimento dos apps

---

# Themes

Aqui podemos criar temas por projeto.

---

# `_Babel`

Possui todas as configurações necessárias para o build, compartilhadas entre os pacotes.

---

# `_Rollup`

Configurações necessárias para o build dos pacotes.
