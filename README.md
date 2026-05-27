# Desafio Técnico Full-Stack — Mini Sistema de Tarefas

Desafio técnico desenvolvido como etapa do processo seletivo para a **Agência Júnior 2026 (Coude)**. O projeto consiste em um sistema de gerenciamento de tarefas individualizado, contando com autenticação de usuários, persistência de dados e uma interface moderna.

## Funcionalidades

- Criar conta e fazer login
- Criar, editar e excluir tarefas
- Marcar tarefas como concluídas
- Dashboard protegido por autenticação
- Persistência de dados com Prisma / SQLite
- Backend em TypeScript + Express + Prisma
- Frontend em React + Vite + TypeScript

---

## Instalação local

### Backend

1. Abra o terminal em `backend`
2. Copie o exemplo de ambiente:
   ```bash
   cp .env.example .env
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Gere o Prisma Client (se necessário):
   ```bash
   npx prisma generate
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

O backend será iniciado em `http://localhost:3333` e expõe a API em `http://localhost:3333/api`.

### Frontend

1. Abra o terminal em `frontend`
2. Copie o exemplo de ambiente se quiser alterar a URL da API:
   ```bash
   cp .env.example .env
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o app:
   ```bash
   npm run dev
   ```

O frontend será aberto em `http://localhost:5173` (porta padrão Vite). Ele consome a API em `http://localhost:3333/api` por padrão.

---

## Docker

Para executar a aplicação com Docker, use o `docker compose` na raiz do projeto:

```bash
docker compose up --build
```

Isso irá:

- iniciar o backend em `http://localhost:3333`
- iniciar o frontend em `http://localhost:4173`

---

## Estrutura do projeto

- `backend/` — API, autenticação, rotas, Prisma, persistência de dados
- `frontend/` — interface React, contexto de autenticação, consumo da API
- `docker-compose.yml` — orquestra backend e frontend em containers

---

## Candidato

- **Nome:** Luiz Eduardo Alves Mendonça
- **LinkedIn:** [Luiz Eduardo Mendonça](https://www.linkedin.com/in/luizeduardomendonca/)
- **Curso:** Engenharia de Software - UNIFAN
