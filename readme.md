# 🔐 API de Autenticação com JWT

API simples de autenticação construída com **Node.js + Express**, utilizando **JWT** para controle de sessão e **bcrypt** para hash de senhas.  
Ideal para estudos de autenticação, segurança e fundamentos de backend.

---

## 🚀 Funcionalidades

- Cadastro de usuário (**signup**) com validação
- Login com verificação de senha criptografada
- Geração de token JWT com expiração
- Validação de token JWT
- Validação de dados com `express-validator`
- Uso de variáveis de ambiente para segurança

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express**
- **TypeScript (tipagem do Express)**
- **bcrypt** – hash de senhas
- **jsonwebtoken (JWT)** – autenticação
- **dotenv** – variáveis de ambiente
- **express-validator** – validação de dados

---

## 📁 Estrutura do Projeto

├── index.ts
├── .env.example
├── package.json
└── README.md

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
PORT=3000
JWT_SECRET="seu_segredo_super_secreto"

```

## ▶️ Como Executar o Projeto

### 1️⃣ Instale as dependências

- npm install

### 2️⃣ Execute o servidor

- npm run dev

## 🧠 Persistência de Dados

Este projeto **não utiliza banco de dados** ou qualquer forma de persistência permanente.

Os usuários cadastrados são armazenados **temporariamente em memória**, utilizando um vetor (`array`) no servidor:

```ts
const dados: User[] = [];
```
