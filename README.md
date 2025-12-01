# Barraquinha do Gomi

Aplicação fullstack para gerenciamento de mangás, permitindo cadastro,
listagem, avaliação e comentários, com autenticação completa de
usuários.\
Desenvolvido com **React + Vite + TypeScript** no frontend e **Node.js +
Express + TypeORM + SQLite** no backend.

------------------------------------------------------------------------

## Funcionalidades

-   **Autenticação de Usuários**
    -   Cadastro e login
    -   Token JWT salvo no `localStorage`
    -   Rotas protegidas com middleware de autenticação
-   **Gerenciamento de Mangás**
    -   Cadastro com: nome, volume, tipo, review, data de lançamento,
        nota e imagem
    -   Listagem em grid responsivo
    -   Padronização do tamanho das imagens
    -   Modal de detalhes
    -   Opções de edição e exclusão (apenas autenticado)
-   **Sistema de Comentários**
    -   Cada mangá possui seus próprios comentários
    -   Usuários autenticados podem criar, editar e excluir comentários

------------------------------------------------------------------------

## Pré-requisitos

-   **Node.js** (versão recomendada: 18+)
-   **npm**, **pnpm** ou **yarn**

------------------------------------------------------------------------

## Como rodar o projeto

### 1. Instalar dependências

``` bash
npm install
```

------------------------------------------------------------------------

### 2. Subir o backend (API)

``` bash
npm run server
```

A API ficará disponível em:

    http://localhost:3333

Na primeira execução, o **TypeORM** cria ou atualiza o arquivo
`database.sqlite`.

------------------------------------------------------------------------

### 3. Subir o frontend

Em outro terminal:

``` bash
npm run dev
```

Frontend disponível em:

    http://localhost:5173

E consumindo automaticamente a API em `http://localhost:3333`.

------------------------------------------------------------------------

## Rodar tudo junto com concurrently (opcional)

### Instalar:

``` bash
npm install -D concurrently
```

### Adicionar no package.json:

``` json
"scripts": {
  "dev": "vite",
  "server": "tsx watch api/server.ts",
  "dev:all": "concurrently \"npm run server\" \"npm run dev\""
}
```

### Rodar:

``` bash
npm run dev:all
```

------------------------------------------------------------------------

## Configuração de Ambiente

A API usa um JWT default:

``` ts
const JWT_SECRET: string = process.env.JWT_SECRET || "dev-secret";
```

Para produção, crie um arquivo `.env`:

    JWT_SECRET=uma_senha_bem_secreta_aqui

E mantenha o `.env` no `.gitignore`.

------------------------------------------------------------------------

## Endpoints

### Autenticação

#### POST /auth/register

``` json
{
  "name": "Usuário Teste",
  "email": "user@example.com",
  "password": "senha123"
}
```

#### POST /auth/login

``` json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

#### GET /auth/me

Header:

    Authorization: Bearer <token>

------------------------------------------------------------------------

### Usuários

#### GET /users

------------------------------------------------------------------------

### Mangás

#### GET /mangas

#### GET /mangas/:id

#### POST /mangas (protegida)

``` json
{
  "name": "Chainsaw Man",
  "volume": 1,
  "release_date": "2020-01-01",
  "type": "shonen",
  "rating": 4.5,
  "review": "Mangá extremamente dinâmico e violento, porém muito divertido.",
  "image": "https://url-da-imagem.com/capa.jpg"
}
```

#### PUT /mangas/:id

#### DELETE /mangas/:id

------------------------------------------------------------------------

### Comentários

#### GET /comments/manga/:manga_id

#### POST /comments (protegida)

``` json
{
  "manga_id": "uuid-do-manga",
  "text": "Comentário sobre o mangá",
  "likes": 0
}
```

#### PUT /comments/:id

#### DELETE /comments/:id

------------------------------------------------------------------------
