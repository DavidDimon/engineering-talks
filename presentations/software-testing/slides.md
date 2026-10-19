---
theme: default
title: 'Vamos falar sobre testes?'
titleTemplate: '%s — Engineering Talks'
info: |
  Migração fiel da apresentação histórica sobre testes em JavaScript.
author: David Dimon
keywords: testes, javascript, jest, enzyme, tdd
transition: slide-left
mdc: true
---

# Testes (JavaScript)

## Para que servem e como fazer?

<div class="historical-note">Conteúdo apresentado em fevereiro de 2020 (data aproximada).</div>

---

# Por que fazer testes?

<v-clicks>

- Garantia de que seu código realmente funciona
- Serve como documentação
- Facilita o debug de uma função
- Confiabilidade
- Sua vida muito mais feliz!

</v-clicks>

---

# Tipos de testes

<v-clicks>

- Testes unitários
- Testes de integração
- Testes de componentes
- Testes de snapshots

</v-clicks>

---

# Quais libraries posso usar?

Temos várias libraries, mas as principais são: Enzyme e Jest.

---

# Como organizar os testes?

Podemos fazer de dois jeitos:

<v-clicks>

- Criando a pasta `__tests__` na raiz do projeto
- Criando o arquivo com o sufixo `.test.[js/jsx/ts/tsx]` no mesmo nível do arquivo testado

</v-clicks>

---

# Organização — prós de `__tests__`

<v-clicks>

- Todos os testes ficam centralizados em um lugar

</v-clicks>

---

# Organização — contras de `__tests__`

<v-clicks>

- Exige refazer a mesma estrutura do projeto na pasta `__tests__`
- Com o passar do tempo, fica um pouco difícil achar os testes

</v-clicks>

---

# Organização — prós de `.test.js`

<v-clicks>

- O arquivo de teste fica junto do arquivo que possui as funções testadas
- É fácil localizar onde estão os testes

</v-clicks>

---

# Organização — contras de `.test.js`

<v-clicks>

- A pasta onde está o arquivo de função ou componente pode ficar um pouco grande

</v-clicks>

---

# E o TDD?

## Onde fica no meio de tudo isso?

---

# Agora a parte boa

## Vamos lá pro código!
