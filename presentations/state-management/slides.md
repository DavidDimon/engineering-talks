---
theme: default
title: 'State Management'
titleTemplate: '%s — Engineering Talks'
info: |
  Migração fiel da apresentação histórica sobre gerenciamento de estado.
author: David Dimon
keywords: react, state-management, redux, context-api, event-emitter
transition: slide-left
mdc: true
---

# State Management

## O que é? E quais são as opções?

<div class="historical-note">Conteúdo apresentado em janeiro de 2020 (data aproximada).</div>

---

# O que é state management?

Como o nome já diz, trata-se do gerenciamento dos estados de uma aplicação. Nesta apresentação, abordamos aplicações React web ou React Native.

---

# O que é um estado?

Em uma aplicação React, o estado é basicamente uma variável que carrega um dado de um componente.

---

# Por que precisamos gerenciar esses estados?

Muitos componentes podem possuir estados e, na maioria das vezes, esses estados podem precisar ser reaproveitados. É aí que entra o state management.

---

# Quais opções temos?

<v-clicks>

- Redux/MobX
- Context API com hooks
- Event Emitter
- Ou passar os estados via props, de componente em componente

</v-clicks>

---

# Via props — como usar?

<img src="./assets/print1.png" alt="Exemplo de estado passado via props" class="deck-image" />

---

# Via props — prós

<v-clicks>

- Simples e direto
- Para uma calculadora, pode ser o ideal

</v-clicks>

---

# Via props — contras

<v-clicks>

- Possíveis props duplicadas
- Muitos re-renders
- Difícil manutenção
- Props drilling

</v-clicks>

---

# Props drilling

O props drilling acontece quando você passa props com a mesma instância para diversos componentes. Quando o estado atualiza, isso pode causar uma reação em cadeia e diversos re-renders desnecessários.

---

# Redux

Com o problema do props drilling, nasceu o Redux, para acabar com esse problema. Mas de que jeito?

---

# Redux — props drilling

<img src="./assets/propsdrilling.png" alt="Comparação visual de props drilling e Redux" class="deck-image wide" />

---

# Redux — como usar?

<v-clicks>

- Criamos um provider
- Os types
- Os reducers
- As actions
- Depois de tudo isso criado…
- Podemos chamar nossa função ou prop no componente por meio da função `connect`

</v-clicks>

---

# Redux — prós

<v-clicks>

- Single source of truth
- Centralização dos estados
- Error handling
- Possibilidade de criar side effects
- Debug com DevTools

</v-clicks>

---

# Redux — contras

<v-clicks>

- Grande dependência de uma library
- O código precisa estar muito bem estruturado para funcionar bem
- Complexidade na criação de novas funções
- Side effects…

</v-clicks>

---

# Context API

Como o nome já diz, é uma API do próprio React core que disponibiliza uma forma de criar um contexto para compartilhar estados ou funções.

---

# Context API

O próprio Redux utiliza a Context API para comunicar suas props entre os componentes. E por que não podemos usá-la da forma mais pura?

---

# Context API — como usar?

<img src="./assets/print2.png" alt="Exemplo de uso da Context API" class="deck-image" />

---

# Context API — prós

<v-clicks>

- Total controle do contexto
- Facilidade na criação
- Sem necessidade de uma library externa

</v-clicks>

---

# Context API — contras

<v-clicks>

- Total responsabilidade do desenvolvedor
- Atenção redobrada aos re-renders da aplicação

</v-clicks>

---

# Event Emitter

A emissão de eventos é muito comum no backend, muitas vezes feita com grande maestria pelo Apache Kafka; outras vezes, com a parte reativa da linguagem, como RxJava.

---

# Event Emitter

Existem várias formas de criar um Event Emitter, porém existe uma forma muito simples de aplicar a emissão de eventos entre componentes.

---

# Event Emitter — como usar?

<img src="./assets/print3.png" alt="Exemplo de Event Emitter" class="deck-image" />

---

# Event Emitter — prós

<v-clicks>

- Podemos criar side effects de uma forma mais fácil
- Total liberdade no gerenciamento dos estados e dos side effects
- Simples e de fácil manutenção

</v-clicks>

---

# Event Emitter — contras

<v-clicks>

- Total responsabilidade do desenvolvedor
- Difícil documentação (pelo menos por enquanto)
- Pode dificultar um pouco o entendimento de novos devs no projeto

</v-clicks>

---

# That's it

## Dúvidas?
