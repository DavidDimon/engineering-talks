---
theme: default
title: 'TypeScript'
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
  previous-url="/engineering-talks/courses/awari-front-end/aulas/19-formularios/"
  next-url="/engineering-talks/courses/awari-front-end/aulas/21-integracoes-com-api-rest/"
/>

<Intro title="Typescript" image="coding" />

---

# O que vamos ver hoje?

<ul>
    <v-clicks>
      <li>Introdução</li>
      <li>Novidades vindas do TypeScript</li>
      <li>Interfaces</li>
      <li>Tipos de dados</li>
      <li>Extends</li>
      <li>Types</li>
      <li>Private</li>
      <li>Integração com um projeto JS</li>
      <li>Prós e contras</li>
    </v-clicks>
  </ul>

---

# Introdução

Pensando nas limitações que o JavaScript possui com a sua tipagem fraca, a
microsoft criou o TypeScript, que seria um <b>superset</b> para o
JavaScript. Esse tal superset, se refere a uma gama de funções, e
possibilidades novas para o JavaScript.

---

# Novidades vindas do TypeScript

Com o TypeScript, é possível criar tipagens para as nossas váriaveis, criar
classes com métodos privados e criar interfaces e types para documentar/tipar
nossas funções, parametros ou váriaveis.

---

# Novidades vindas do TypeScript

A grande vantagem do TypeScript, é que tudo irá possuir um tipo, ou seja, você
consegue saber qual tipo de objeto voce precisa mandar como parametro para uma
função, ou o que uma função retorna, se é uma string, boolean ou um tipo mais
complexo de objeto.

---

# Interfaces

Um modo de criar tipagens para os nossos parametros/variaveis/funções é
criando interfaces. Para criarmos uma interface, vamos usar a palavra-chave
<b>interface</b> daremos um nome que sempre começará com letra maiuscula, e
divido por camel case.

---

# Interfaces - dica para nomes

Nornalmente, quando crio uma interface ou um type para tipar as props de um
componente, eu faço o nome do componente + props, por exemplo: <br />
nome do componente: Button
<br />
nome da interface de props: ButtonProps

---

# Interface - Exemplo

```js
interface ButtonProps {
  label: string;
  onClick: () => void; // void signifca que não tem um retorno
}\n
const Button: React.FC<ButtonProps> = () => { ... }
```

---

# Interfaces - atributos opcionais

Para determinar um atributo opcional, vamos usar o ponto de interrogação(?)
depois do nome do atributo, e antes dos dois pontos(:), assim o TypeScript
irá entender que aquele atributo não é obrigatório

---

# Interface - Exemplo atributo opcional

```js
interface ButtonProps {
  label: string;
  onClick: () => void; // void signifca que não tem um retorno
  loading?: boolean; // atributo opcional
}\n
```

---

# Tipos de dados

Na hora de declarar os atributos, vamos ter que declarar os tipos daqueles
atributos. No TypeScript temos os tipos primitivos: string, boolean, number,
null e undefined.

---

# Tipos de dados - Array

Podemos definir um tipo como array, que seria da seguinte forma: <br />

```js
interface Props {
  list: string[]; // array de strings
  list2: Array<string>; // outra forma de definição
}
```

---

# Tipos de dados - Funções

Podemos definir um tipo como uma função: <br />

```js
interface Props {
  onClick: () => void; // uma função sem parametros e sem retorno;
  onClick2: (name: string) => string; // com parametro e retorna uma string;
}
```

---

# Tipos de dados - Tipo any

Possuímos um tipo 'coringa' que é o <b>any</b> com ele, o atributo pode ser
qualquer coisa, uma função, string...etc. Porém não é uma boa pratica
usa-lo, pois quanto mais any na tipagem, mais próximos do JavaScript
ficaremos(sem tipagens)

---

# Tipos de dados - Concatenação de tipos

Podemos criar atributos que podem receber mais de um tipo, como uma string ou
um number, exemplo: <br />

```js
interface Props {
  name: string | number; // pode ser uma string ou um numero
  text: string | undefined | null;
}
```

---

# Tipos de dados - Generics

Em alguns casos não vamos saber qual tipo um atributo pertence, então
podemos definir com um tipo generico, e ao chamar a interface com o generic,
precisaremos passar esse type/interface especifica via &lt;&gt; depois do nome
da interface

---

# Tipos de dados - Generics

```js
interface CardProps<T> {
  label: string;
  data: T;
}\n
interface CardData {
  name: string;
  age: number;
}\n
const Card: React.FC<CardProps<CardData>> = ({ label, data }) => { ... }
// data = { name: string, age: number }
<Card data={{age: 10, name: 'david'}} label="test"/>
```

---

# Tipos de dados - Generics

No exemplo anterior, o T que é atribuido ao data, é substituido pelo
CardData, assim conseguimos ter tipos dinâmicos!

---

# Omit e Pick

Temos duas funções globais que são o <b>Omit</b> e o <b>Pick</b>, com eles
podemos omitir ou pegar somente alguns atributos de uma interface ou type.

---

# Omit e Pick - Exemplo

```js
interface CardProps {
  label: string;
  age: number;
  name: string;
}\n
const Card: React.FC<Omit<CardProps, 'name' | 'age'>> = () => { ... }
const Card: React.FC<Pick<CardProps, 'name' | 'age'>> = () => { ... }
```

---

# Interfaces - Extends

A grande vantagem de usarmos as interfaces, é pela possibilidade de herança,
com as interfaces, podemos gerar interfaces genericas, que são extendidas
por outras interfaces mais especificas

---

# Interfaces Extends - Exemplo

```js
interface ButtonProps {
  label: string;
}\n
interface SuperButtonProps extends ButtonProps {
  icon: string;
}
```

---

# Types

Os types funcionam de forma semelhante as interfaces, porém não possuem o
extends, mas podem ser concatenadas com outros types. Mas podemos usa-las
para tipar nossos componentes, parametros, funções...etc.

---

# Types - Exemplo

```js
type ButtonProps = {
  label: string;
}\n
type Color = 'warning' | 'primary' | 'secondary'
interface SuperButtonProps {
  color: Color;
}
```

---

# Private

Outra adição interessante do TypeScript, é o prefixo <b>private</b> com ele
podemos definir atributos e métodos privados nas nossas classes. Assim
conseguimos expor somente os métodos que lhe interessam, e esconder métodos
que são exclusivos da classe.

---

# Private - Exemplo

```js
class Test {
  private name;\n
  private function test() { ... }
}
```

---

# Integração do TS com o JS

O TypeScript é um superset totalmente opcional para um projeto JavaScript,
porém não podemos negar que ele adiciona muito mais segurança e uma certa
prevenção de erros ao nosso projeto. Quando sabemos o que uma função recebe,
ou o que ela retorna, fica muito mais fácil de manter aquele código.

---

# Integração do TS com o JS

Normalmente para configurarmos um projeto que é em JS para TS, precisaremos
fazer algumas mudanças no nosso .eslintrc(que é o arquivo de linting), criar
um tsconfig.json, e adicionarmos as libs de TypeScript no devDependencies

---

# Integração do TS com o JS

No arquivo de tsconfig.json, podemos fazer todas as configurações
necessárias para o nosso projeto, inclusive permitir arquivos JS, para
podermos fazer as alterações aos poucos.

---

# Prós

<ul>
    <li>Maior documentação do projeto</li>
    <li>Facilidade de manutenção</li>
    <li>Linting melhorado</li>
    <li>Ajuda na criação de testes</li>
    <li>Bastante utilizado pelas empresas</li>
  </ul>

---

# Contras

<ul>
    <li>Se o projeto não for bem configurado, só irá trazer problemas</li>
    <li>Não impede que o usuário digite uma string em um campo number</li>
    <li>É um pouco dificil de configurar</li>
    <li>
      Pode ser um empecilho em equipes com muitos devs iniciantes em TypeScript
    </li>
  </ul>

---

# Referências

[Repositório com alguns testes :D](https://github.com/DavidDimon/awari-tests)
[Documentação do TypeScript](https://www.typescriptlang.org/)
[Configurando projeto TypeScript](https://dev.to/otaviopalma/criando-um-projeto-react-com-typescript-eslint-e-prettier-2okg)

---

# Isso é tudo pessoal!

Duvidas?
<br />
[Formulário para dúvidas](https://forms.gle/NE5p3juqxmDaXyj3A)
