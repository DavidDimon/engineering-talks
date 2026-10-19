# Plano: showcase como portfólio de apresentações

- Status: Concluído
- Data: 2026-10-16
- Conclusão: 2026-10-19
- Marco concluído: M9 — Curso Awari e entrega final

## Objetivo

Reposicionar o Engineering Talks como um arquivo pessoal das apresentações criadas e compartilhadas
por David Dimon ao longo da carreira. O site deve situar cada material no tempo e levar o visitante
diretamente aos slides.

O curso de front-end ministrado pela Awari em 2021–2022 será a exceção de navegação: ele terá uma
página própria com as 23 aulas organizadas e acessíveis individualmente.

## Princípios do produto

1. **Portfólio, não plataforma de publicação.** O foco é preservar e apresentar materiais já
   ministrados, sem editor, autenticação ou CMS.
2. **Histórico claro.** Cada item deve informar quando o conteúdo foi apresentado, sem depender de
   informações sobre empresa, cliente ou evento.
3. **Acesso direto.** Um card de apresentação abre os slides; um card de curso abre o índice de
   aulas.
4. **Preservação com proveniência.** O site hospeda builds atuais, mas mantém um link para o
   repositório original e informa que o conteúdo reflete a época em que foi produzido.
5. **Nada de sincronização em tempo de execução.** O showcase não consulta o GitHub no navegador;
   todo o catálogo é validado e gerado durante o build.

## Inventário inicial

### Conteúdo candidato à publicação

| Item                                                                               | Formato                                | Situação inicial             |
| ---------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------- |
| [awari-front-end](https://github.com/DavidDimon/awari-front-end)                   | Curso com 23 aulas                     | Confirmado: Awari, 2021–2022 |
| [mdx-deck-keynote](https://github.com/DavidDimon/mdx-deck-keynote)                 | Apresentação: MDX Deck                 | Confirmar data               |
| [flutter-keynote](https://github.com/DavidDimon/flutter-keynote)                   | Apresentação: Flutter                  | Confirmar data               |
| [monorepo-keynote](https://github.com/DavidDimon/monorepo-keynote)                 | Apresentação: monorepo/core components | Confirmar data               |
| [state-management-keynote](https://github.com/DavidDimon/state-management-keynote) | Apresentação: gerenciamento de estado  | Confirmar data               |
| [tests-keynote](https://github.com/DavidDimon/tests-keynote)                       | Apresentação: testes                   | Confirmar data               |

### Conteúdo que não entra automaticamente

- `boilerplate-keynote` e `keynote-template`: exemplos/templates, não apresentações finais.
- `design-systems-and-react`: o conteúdo encontrado atribui a apresentação a Diana Mounter;
  excluir do portfólio pessoal, salvo decisão explícita de publicar uma adaptação com a devida
  atribuição.
- `engineering-talks-intro`: remover do catálogo de produção ou mantê-lo apenas como fixture de
  desenvolvimento.

O inventário é uma lista inicial. Antes da migração, revisar todos os repositórios e confirmar se
existem apresentações privadas, branches alternativas ou materiais que não devem ser publicados.

## Experiência desejada

### Página inicial

- Marca pessoal: `David Dimon — Engineering Talks` ou equivalente em português.
- Hero curto explicando que o acervo reúne apresentações técnicas criadas e compartilhadas ao
  longo da carreira.
- Uma seção principal de apresentações avulsas.
- Uma seção de cursos, inicialmente com o curso de front-end da Awari.
- Cards com título, tema e data/período.
- Clique principal de uma apresentação: `Abrir apresentação`.
- Clique principal de um curso: `Ver aulas`.
- Link secundário: `Ver código original`.
- Filtros somente se o volume justificar. Na primeira versão, priorizar leitura; manter busca por
  texto e, no máximo, filtros por ano e tema.

### Página do curso Awari

- Rota estática: `/courses/awari-front-end/`.
- Cabeçalho com Awari, período 2021–2022, papel de instrutor e descrição do curso.
- Índice numerado das 23 aulas, preservando a ordem original.
- Cada aula abre seu próprio deck em uma rota como
  `/courses/awari-front-end/aulas/01-introducao-ao-desenvolvimento-web/`.
- Navegação de aula anterior/próxima e retorno ao índice do curso.
- O curso pode manter uma identidade visual própria inspirada no material da Awari; o restante das
  apresentações usa a navegação padrão do acervo.

## Novo modelo de conteúdo

Evoluir o catálogo para a versão 2 como uma união discriminada:

```text
CatalogItem
├─ Presentation
│  ├─ title, description, slug, topics, language
│  ├─ deliveredAt ou period
│  ├─ sourceUrl e presentationUrl
│  └─ historicalNotice opcional
└─ Course
   ├─ os mesmos campos de data e conteúdo
   ├─ courseUrl e sourceUrl
   └─ lessons[] { order, slug, title, topics, presentationUrl }
```

Decisões de modelagem:

- Trocar a distinção central `talk | workshop` por `presentation | course`.
- Manter o formato original (`talk`, `workshop`, `training`) como informação secundária quando
  for útil.
- Exigir data ou período para todo item publicado.
- Permitir período, necessário para o curso Awari de 2021–2022.
- Separar `sourceUrl` do repositório histórico e `presentationUrl` do build mantido neste projeto.
- Registrar as aulas do curso em um manifesto versionado; não extrair títulos do MDX em tempo de
  build.

## Estrutura proposta

```text
presentations/
  mdx-deck/
  flutter/
  monorepos-and-core-components/
  state-management/
  software-testing/
courses/
  awari-front-end/
    course.json
    shared/
    lessons/
      01-introducao-ao-desenvolvimento-web/
      ...
      23-seo-e-ssr/
```

Cada apresentação avulsa continua sendo um projeto Nx independente. O curso Awari é um único
projeto Nx com um build que gera as 23 aulas separadamente. Isso preserva a navegação individual
sem criar 23 pacotes e 23 projetos quase idênticos.

## Estratégia de migração

Os repositórios MDX Deck permanecem como fonte histórica. O conteúdo publicado deve ser migrado
para Slidev dentro deste monorepo, porque depender dos builds antigos introduziria versões
incompatíveis de Node, Gatsby, React e MDX Deck no pipeline atual.

Para cada deck:

1. Copiar texto e assets com referência ao repositório e commit de origem.
2. Converter `Head`, `Appear`, `Steps`, `CodeSurfer` e componentes estilizados para equivalentes do
   Slidev.
3. Preservar a identidade visual quando ela fizer parte do material; não modernizar o conteúdo
   silenciosamente.
4. Adicionar um aviso quando APIs, bibliotecas ou recomendações refletirem o estado da tecnologia
   na data da apresentação.
5. Comparar capa, ordem, blocos de código, imagens e links com o original.

Usar `mdx-deck-keynote` como piloto por ser curto e exercitar os componentes de revelação e código.
Somente iniciar a migração em lote depois que o padrão do piloto estiver aprovado.

## Marcos de execução

### M5 — Curadoria e requisitos editoriais

- [x] Confirmar a data ou o período de cada apresentação candidata.
- [x] Quando o dia exato não estiver disponível, usar mês e ano ou apenas o ano, sem inferir
      empresa, cliente ou evento.

Resultado: as decisões, datas e fontes estão registradas na
[curadoria editorial do acervo](../content/curation.md). As cinco apresentações usam mês e ano
aproximados; o curso Awari mantém o período confirmado de 2021–2022.

**Aceite:** todo item publicado possui uma data, período ou ano aproximado claramente identificado.

### M6 — Catálogo v2 e estrutura do workspace

- [x] Criar os schemas discriminados de apresentação e curso.
- [x] Adicionar `presentations/` e `courses/` à descoberta de conteúdo.
- [x] Criar o manifesto do curso Awari com as 23 aulas.
- [x] Atualizar gerador, JSON Schemas, template e testes de validação.
- [x] Atualizar os limites arquiteturais e a montagem final do GitHub Pages.
- [x] Implementar redirecionamento ou remoção deliberada da apresentação de exemplo atual.

Resultado: o catálogo v2 reúne as cinco apresentações aprovadas e o curso Awari, com datas,
período, proveniência e estado de migração. As 23 aulas foram transcritas do repositório original
para um manifesto versionado e têm ordem contínua e slugs únicos validados. O exemplo
`engineering-talks-intro` permanece como fixture de desenvolvimento em `talks/`, mas deixou de ser
descoberto pelo catálogo e montado no artefato do GitHub Pages.

**Aceite:** o catálogo gerado representa apresentações e cursos, rejeita aulas duplicadas ou fora
de ordem e não depende da rede.

### M7 — Novo showcase

- [x] Reescrever hero, textos, estatísticas e rodapé para a narrativa de portfólio pessoal.
- [x] Substituir a grade genérica por seções de apresentações e cursos.
- [x] Exibir a data ou o período em todos os cards.
- [x] Criar a página estática do curso Awari e o índice de aulas.
- [x] Preservar tema claro/escuro, teclado, foco visível e layout responsivo.
- [x] Atualizar SEO e metadados sociais com autoria e propósito corretos.

Resultado: a home agora apresenta o acervo como portfólio pessoal em português, separa as cinco
apresentações do curso Awari e mantém busca e filtros compartilháveis por ano e tema. O curso possui
índice próprio, 23 rotas estáticas de aula, navegação anterior/próxima e carregamento direto no
GitHub Pages. Durante o M7, as páginas indicavam o estado da migração e preservavam o acesso às
fontes históricas; os builds concluídos nos M8 e M9 habilitaram as ações de abrir slides.

**Aceite:** o curso abre o índice; cada aula tem URL copiável e acessível por carregamento direto no
GitHub Pages. A abertura direta das apresentações usa o mesmo contrato, agora atendido pelos builds
adicionados nos M8 e M9.

### M8 — Migração das apresentações

- [x] Migrar e aprovar primeiro `mdx-deck-keynote`.
- [x] Migrar Flutter, monorepos/core components, gerenciamento de estado e testes.
- [x] Validar atribuição, imagens, links e avisos históricos.
- [x] Adicionar cada build ao assembler do Pages e ao catálogo.

Resultado: as cinco apresentações foram convertidas para projetos Slidev independentes. Cada deck
registra o commit de origem, preserva os assets e a ordem do material histórico, inclui o aviso
editorial correspondente e é montado sob sua rota permanente no artefato do Pages.

**Aceite:** todas as apresentações aprovadas abrem a partir do showcase, funcionam sem dependência
dos deploys antigos e mantêm links para suas fontes originais.

### M9 — Curso Awari e entrega final

- [x] Migrar componentes, tema, imagens e as 23 aulas.
- [x] Gerar um build estático por aula sob a rota do curso.
- [x] Adicionar navegação anterior/próxima e retorno ao índice.
- [x] Criar testes de integridade garantindo que toda aula do manifesto possui fonte e saída.
- [x] Ampliar o Playwright para cobrir homepage, curso, aula individual e apresentação avulsa.
- [x] Executar revisão visual em desktop e mobile e preparar a publicação pelo pipeline existente.

Resultado: um único projeto Nx compila as 23 aulas em saídas estáticas independentes, usando tema,
componentes e imagens compartilhados. O build verifica fonte e saída por aula; a suíte de navegador
cobre carregamento direto, navegação, apresentações avulsas e viewport mobile. Em 2026-10-19, o
artefato completo foi montado e as sete verificações Playwright passaram.

**Aceite:** as 23 aulas aparecem na ordem correta, cada uma abre isoladamente, todas as rotas
funcionam em carregamento direto e a suíte completa passa antes do deploy.

## Sequência recomendada de implementação

1. Fechar as informações editoriais do M5. **Concluído em 2026-10-16.**
2. Implementar o schema v2 sem alterar primeiro a interface.
3. Migrar `mdx-deck-keynote` como prova do pipeline novo.
4. Construir o novo showcase e a página do curso usando dados reais.
5. Migrar as demais apresentações avulsas.
6. Migrar as 23 aulas Awari em lotes, com validação a cada lote.
7. Concluir testes, acessibilidade, links, SEO e deploy.

## Fora do escopo inicial

- Buscar ou sincronizar apresentações automaticamente pela API do GitHub.
- Executar os projetos MDX Deck antigos dentro do pipeline de produção.
- Editor online, contas de usuário, progresso de curso ou exercícios avaliados.
- Publicar repositórios-modelo como se fossem apresentações ministradas.
- Reescrever ou atualizar silenciosamente afirmações históricas dos materiais.

## Informações levantadas no M5

| Apresentação                | Data editorial                 |
| --------------------------- | ------------------------------ |
| Monorepos e core components | dezembro de 2019 (aproximada)  |
| Gerenciamento de estado     | janeiro de 2020 (aproximada)   |
| Testes de software          | fevereiro de 2020 (aproximada) |
| Flutter                     | abril de 2020 (aproximada)     |
| MDX Deck                    | outubro de 2020 (aproximada)   |

O curso de front-end Awari permanece registrado como 2021–2022. A proveniência e os critérios de
precisão estão documentados na [curadoria editorial do acervo](../content/curation.md).
