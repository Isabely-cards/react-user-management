# React User Management

Aplicação de gerenciamento de usuários desenvolvida como solução para teste técnico.

O projeto implementa listagem, criação, edição e remoção de usuários, seguindo boas práticas de arquitetura, acessibilidade e testes automatizados.

---

## Preview

<img width="1337" height="633" alt="image" src="https://github.com/user-attachments/assets/aff957a1-d75a-4a08-ad90-40896f5a59b1" />
<img width="1336" height="629" alt="image" src="https://github.com/user-attachments/assets/6048fa43-6ea6-4545-8863-62fdc2c06114" />

## LINK VERSEL

https://react-user-management-five.vercel.app/

## Objetivo

Construir uma aplicação front-end moderna com:

- Listagem de usuários
- Criação de novo usuário
- Edição de usuário
- Remoção de usuário
- Busca por nome
- Ordenação
- Testes unitários e de integração
- Acessibilidade básica

---

## Arquitetura

O projeto foi estruturado utilizando:

Separação por feature-based structure pensando em crescer o sistema

Redux Toolkit para gerenciamento de estado global

Camada de services para comunicação com API

Componentes desacoplados e testáveis

Testes isolando dependências externas

Estrutura simplificada:
<img width="747" height="760" alt="image" src="https://github.com/user-attachments/assets/49b71f0f-518b-4dd9-a395-a81cb6b6bef7" />
src/
├── app/
│ └── routes.tsx
│
├── features/
│ └── users/
│ ├── components/
│ │ ├── DeleteUserDialog/
│ │ ├── Sidebar/
│ │ ├── UserFormDialog/
│ │ ├── UsersHeader/
│ │ ├── UsersSearch/
│ │ └── UsersTable/
│ │
│ ├── pages/
│ │ └── UserList/
│ │ ├── index.tsx
│ │ └── UserList.test.tsx
│ │
│ ├── store/
│ │ ├── userSlice.ts
│ │ └── userSelectors.ts
│ │
│ ├── schema/
│ │ └── schemaCreateUser.ts
│ │
│ └── types/
│ └── User.ts
|
│── services/
│ └── userService.ts
|
├── store/
│ └── store.ts
| └── themeSlice.ts
│
├── theme/
│
├── main.tsx
└── setupTests.ts

## Tecnologias Utilizadas

- **React 19**
- **TypeScript**
- **Vite**
- **Material UI (MUI)**
- **React Hook Form + Zod/Yup** – Validação de formulários
- **Axios** – Comunicação HTTP
- **Vitest + Testing Library** – Testes
- **Storybook** – Documentação de componentes

---

## RODAR db.json

Instale globalmente (caso não tenha):

npm install -g json-server

json-server --watch db.json --port 3001

## Instale as dependências:

npm install

npm run dev

## Testes

npm run test

## Modo watch

npm run test:watch

## Gerar cobertura

npm run coverage

## Executar Storybook

npm run storybook

## Executar lint

npm run lint

## Formatar código

npm run format
