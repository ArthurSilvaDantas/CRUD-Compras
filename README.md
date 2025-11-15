# 🛒 CRUD Compras - API REST

API REST completa para gerenciamento de compras com relacionamento entre Usuários, Produtos e Pedidos.

---

## 🎯 Sobre

Sistema de gerenciamento de compras com funcionalidades completas de CRUD (Create, Read, Update, Delete) para:

- **Usuários**: Gerenciamento de clientes do sistema
- **Produtos**: Catálogo de produtos com controle de estoque
- **Pedidos**: Sistema de pedidos com relacionamento entre usuários e produtos

### Funcionalidades principais:

- ✅ Controle automático de estoque
- ✅ Transações para garantir consistência dos dados
- ✅ Relacionamento em cascata (deletar usuário deleta seus pedidos)
- ✅ Validações completas em todas as operações
- ✅ Respostas padronizadas em JSON

---

## 🔧 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **PostgreSQL** - Banco de dados relacional
- **pg** - Driver PostgreSQL para Node.js
- **dotenv** - Gerenciamento de variáveis de ambiente

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL (versão 12 ou superior)
- npm ou yarn


## 🚀 Uso
```bash
npm install
npm start
```

---

## 📚 Documentação da API

### Base URL
```
http://localhost:3000/api
```

---

## 👤 Endpoints - Usuários

### 1. Listar todos os usuários
```
GET /api/usuarios
```

**Exemplo de resposta:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@email.com",
      "telefone": "11999999999",
      "criado_em": "2025-11-15T10:00:00.000Z",
      "atualizado_em": "2025-11-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Buscar usuário por ID
```
GET /api/usuarios/:id
```

**Exemplo:**
```
GET /api/usuarios/1
```

### 3. Criar novo usuário
```
POST /api/usuarios
Content-Type: application/json
```

**Body (copie e cole no Postman):**
```json
{
  "nome": "Maria Santos",
  "email": "maria@email.com",
  "senha": "senha123",
  "telefone": "11988888888"
}
```

### 4. Atualizar usuário
```
PUT /api/usuarios/:id
Content-Type: application/json
```

**Body (copie e cole no Postman):**
```json
{
  "nome": "Maria Santos Silva",
  "telefone": "11977777777"
}
```

### 5. Deletar usuário
```
DELETE /api/usuarios/:id
```

**Exemplo:**
```
DELETE /api/usuarios/1
```

---

## 📦 Endpoints - Produtos

### 1. Listar todos os produtos
```
GET /api/produtos
```

**Exemplo de resposta:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "nome": "Notebook Dell",
      "descricao": "Notebook i7 16GB RAM",
      "preco": "3500.00",
      "estoque": 10,
      "categoria": "Informática",
      "criado_em": "2025-11-15T10:00:00.000Z",
      "atualizado_em": "2025-11-15T10:00:00.000Z"
    }
  ]
}
```

### 2. Buscar produto por ID
```
GET /api/produtos/:id
```

**Exemplo:**
```
GET /api/produtos/1
```

### 3. Criar novo produto
```
POST /api/produtos
Content-Type: application/json
```

**Body (copie e cole no Postman):**
```json
{
  "nome": "Mouse Logitech",
  "descricao": "Mouse sem fio ergonômico",
  "preco": 89.90,
  "estoque": 50,
  "categoria": "Periféricos"
}
```

**Outro exemplo:**
```json
{
  "nome": "Teclado Mecânico",
  "descricao": "Teclado mecânico RGB",
  "preco": 299.90,
  "estoque": 25,
  "categoria": "Periféricos"
}
```

### 4. Atualizar produto
```
PUT /api/produtos/:id
Content-Type: application/json
```

**Body (copie e cole no Postman):**
```json
{
  "preco": 79.90,
  "estoque": 45
}
```

### 5. Deletar produto
```
DELETE /api/produtos/:id
```

**Exemplo:**
```
DELETE /api/produtos/1
```

---

## 🛍️ Endpoints - Pedidos

### 1. Listar todos os pedidos
```
GET /api/pedidos
```

**Listar pedidos de um usuário específico:**
```
GET /api/pedidos?usuarioId=1
```

**Exemplo de resposta:**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "id": 1,
      "usuario_id": 1,
      "usuario_nome": "João Silva",
      "usuario_email": "joao@email.com",
      "status": "pendente",
      "total": "389.80",
      "criado_em": "2025-11-15T10:00:00.000Z",
      "atualizado_em": "2025-11-15T10:00:00.000Z",
      "itens": [
        {
          "id": 1,
          "produto_id": 1,
          "produto_nome": "Mouse Logitech",
          "quantidade": 2,
          "preco_unitario": "89.90",
          "subtotal": "179.80"
        },
        {
          "id": 2,
          "produto_id": 2,
          "produto_nome": "Teclado Mecânico",
          "quantidade": 1,
          "preco_unitario": "210.00",
          "subtotal": "210.00"
        }
      ]
    }
  ]
}
```

### 2. Buscar pedido por ID
```
GET /api/pedidos/:id
```

**Exemplo:**
```
GET /api/pedidos/1
```

### 3. Criar novo pedido
```
POST /api/pedidos
Content-Type: application/json
```

**Body (copie e cole no Postman):**
```json
{
  "usuarioId": 1,
  "produtos": [
    {
      "produtoId": 1,
      "quantidade": 2,
      "preco": 89.90
    },
    {
      "produtoId": 2,
      "quantidade": 1,
      "preco": 299.90
    }
  ],
  "status": "pendente"
}
```

**Observações importantes:**
- O `usuarioId` deve ser de um usuário existente
- Cada `produtoId` deve ser de um produto existente
- O `preco` deve ser o preço unitário do produto no momento do pedido
- O `status` é opcional (padrão: "pendente")
- Status válidos: "pendente", "processando", "enviado", "entregue", "cancelado"
- O total é calculado automaticamente
- O estoque dos produtos é atualizado automaticamente

### 4. Atualizar pedido
```
PUT /api/pedidos/:id
Content-Type: application/json
```

**Atualizar apenas o status:**
```json
{
  "status": "processando"
}
```

**Atualizar status e produtos:**
```json
{
  "status": "processando",
  "produtos": [
    {
      "produtoId": 1,
      "quantidade": 3,
      "preco": 89.90
    }
  ]
}
```

### 5. Deletar pedido
```
DELETE /api/pedidos/:id
```

**Exemplo:**
```
DELETE /api/pedidos/1
```

**Observação:** Ao deletar um pedido, o estoque dos produtos é restaurado automaticamente.

---

## 🧪 Testando no Postman

### Ordem recomendada para testar:

1. **Criar um usuário**
   - POST `/api/usuarios`
   - Copie o `id` retornado

2. **Criar alguns produtos**
   - POST `/api/produtos` (faça isso 2-3 vezes com produtos diferentes)
   - Copie os `id` dos produtos

3. **Criar um pedido**
   - POST `/api/pedidos`
   - Use o `usuarioId` e `produtoId` copiados anteriormente

4. **Listar pedidos**
   - GET `/api/pedidos`
   - Verifique que o pedido foi criado com os itens corretos

5. **Atualizar status do pedido**
   - PUT `/api/pedidos/1`
   - Mude o status para "processando" ou "enviado"

### Exemplo completo de fluxo:

```bash
# 1. Criar usuário
POST http://localhost:3000/api/usuarios
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "senha123",
  "telefone": "11999999999"
}

# 2. Criar produto 1
POST http://localhost:3000/api/produtos
{
  "nome": "Mouse Logitech",
  "descricao": "Mouse sem fio",
  "preco": 89.90,
  "estoque": 50,
  "categoria": "Periféricos"
}

# 3. Criar produto 2
POST http://localhost:3000/api/produtos
{
  "nome": "Teclado Mecânico",
  "descricao": "Teclado RGB",
  "preco": 299.90,
  "estoque": 25,
  "categoria": "Periféricos"
}

# 4. Criar pedido (use os IDs reais retornados)
POST http://localhost:3000/api/pedidos
{
  "usuarioId": 1,
  "produtos": [
    {
      "produtoId": 1,
      "quantidade": 2,
      "preco": 89.90
    },
    {
      "produtoId": 2,
      "quantidade": 1,
      "preco": 299.90
    }
  ]
}

# 5. Listar todos os pedidos
GET http://localhost:3000/api/pedidos

# 6. Atualizar status
PUT http://localhost:3000/api/pedidos/1
{
  "status": "enviado"
}
```

---

## 📊 Estrutura do Banco de Dados

### Tabelas:

- **usuarios**: id, nome, email, senha, telefone, criado_em, atualizado_em
- **produtos**: id, nome, descricao, preco, estoque, categoria, criado_em, atualizado_em
- **pedidos**: id, usuario_id, status, total, criado_em, atualizado_em
- **pedido_itens**: id, pedido_id, produto_id, quantidade, preco_unitario

### Relacionamentos:

- Um usuário pode ter vários pedidos (1:N)
- Um pedido pertence a um usuário (N:1)
- Um pedido pode ter vários produtos através de pedido_itens (N:N)
- Produtos mantêm histórico de preço nos pedidos (preço no momento da compra)

---

## ⚠️ Validações

### Usuários:
- Nome: mínimo 3 caracteres
- Email: formato válido e único no sistema
- Senha: mínimo 6 caracteres
- Telefone: opcional

### Produtos:
- Nome: mínimo 3 caracteres
- Preço: maior que 0
- Estoque: maior ou igual a 0
- Categoria: opcional

### Pedidos:
- Usuario ID: obrigatório e deve existir
- Produtos: array com pelo menos 1 item
- Cada produto: deve ter produtoId, quantidade e preco
- Status: deve ser um dos valores válidos
- Status válidos: "pendente", "processando", "enviado", "entregue", "cancelado"
