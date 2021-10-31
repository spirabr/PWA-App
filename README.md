# Aplicativo de Coleta do Projeto SPIRA

## Objetivo

Este aplicativo é um Progressive Web App (PWA) utilizado para coletar a voz de pacientes em hospitais. A voz coletada é usada para o treinamento de um modelo de *Machine Learning* que tenta predizer se uma pessoa deve ou não ser internada devido a insuficiência respiratória.

## Como funciona?

O aplicativo tem um fluxo de coleta dos dados que deve ser seguido. Ao longo da coleta, coletamos algumas informações básicas sobre o paciente e gravamos 4 áudios, são eles:
- **Aceite**, onde coletamos a confirmação da pessoa para uso de seus dados para o projeto.
- **Vogal sustentada**, um trecho de voz contínuo constituido pela vogal "A".
- **Parlenda**, uma pequena frase conhecida, como trechos de músicas infantis.
- **Frase Lida**, um trecho de voz de um paciente lendo uma frase padronizada.

## Arquitetura

O aplicativo usa o arcabouço Vue. Para cada página do aplicativo, existe um componente representante da página na pasta **src/views**. As páginas são divididas em componentes que abstraem lógica e permitem a reutilização. Cada página ou componente pode ser composto por um arquivo **.vue** somente, onde temos a visualização, estilização e lógica no mesmo arquivo. Ou pode ser dividido em três arquivos, um .js, onde temos lógicas complexas do componente como requisições a APIs, outro .vue, onde temos a visualização, estilização e lógicas associadas a visualização, e outro .test.js, onde temos os testes associados ao componente.

## Setup local
O projeto usa o yarn para administrar as dependências.

Para instalar as dependencias, use o comando
```
yarn install
```

Em seguida, para servir o componente localmente use o comando
```
yarn serve
```

Para contruir o bundle de produção, use o comando
```
yarn build
```

O projeto usa o ESLint para garantir alguns padrões de código.

Para formatar o projeto de acordo com as regras de Lint, use o comando
```
yarn lint
```
