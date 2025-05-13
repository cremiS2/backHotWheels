# HotWheelsAPI - Backend

A **HotWheels API** é uma aplicação backend construída com **Node.js**, **Express** e **MongoDB**, que fornece uma interface para gerenciamento de HotWheels. Com ela, é possível realizar operações CRUD completas (Create, Read, Update, Delete).

## 🧰 Tecnologias Utilizadas

* **Node.js** – Plataforma JavaScript para o backend
* **Express** – Framework web leve e flexível
* **MongoDB** – Banco de dados NoSQL
* **Mongoose** – ODM para modelar os dados do MongoDB
* **dotenv** – Para gerenciar variáveis de ambiente
* **CORS** – Para permitir requisições cross-origin
* **body-parser** – Para interpretar o corpo das requisições HTTP
* **Swagger** – Para documentação interativa da API

---

## 🚗 Funcionalidades

A API permite:

* Criar um ou vários HotWheels
* Listar todos os HotWheels
* Buscar um HotWheels por ID
* Atualizar dados de um HotWheels
* Deletar um HotWheels por ID
* Deletar todos os HotWheels
* Ver mensagem de boas-vindas
* Documentação interativa via Swagger

---

## 📄 Endpoints

### **\[POST] /api/hot**

Cria um novo HotWheels.

**Exemplo de corpo (JSON):**

```json
{
  "nome": "BMW X6",
  "modelo": "2020",
  "ano": 2010,
  "imagem": "http://example.com/images/bmw-x6.jpg"
}
```

---

### **\[POST] /api/hot/multiple**

Cria múltiplos HotWheels de uma vez.

**Corpo (JSON):**

```json
[
  {
    "nome": "Civic",
    "modelo": "2018",
    "ano": 2018,
    "imagem": "http://example.com/images/civic.jpg"
  },
  {
    "nome": "Corolla",
    "modelo": "2019",
    "ano": 2019,
    "imagem": "http://example.com/images/corolla.jpg"
  }
]
```

---

### **\[GET] /api/hot**

Retorna a lista de todos os HotWheels cadastrados.

---

### **\[GET] /api/hot/\:id**

Retorna um HotWheels específico com base no ID.

---

### **\[PUT] /api/hot/\:id**

Atualiza os dados de um HotWheels.

**Corpo esperado (JSON):**

```json
{
  "nome": "BMW X6",
  "modelo": "2021",
  "ano": 2021,
  "imagem": "http://example.com/images/bmw-x6-2021.jpg"
}
```

---

### **\[DELETE] /api/hot/\:id**

Remove um HotWheels pelo ID.

---

### **\[DELETE] /api/hot/delete-all**

Remove **todos** os HotWheels do banco de dados.

---

### **\[GET] /api/hot/welcome**

Retorna uma mensagem simples de boas-vindas:

```json
{
  "message": "Bem-vindo à API de HotWheels!"
}
```

---

## 📘 Documentação Swagger

A documentação interativa da API está disponível em:

```
http://localhost:3000/api-docs
```

---

## ▶️ Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/cremiS2/backHotWheels.git
cd HotWheels
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com o seguinte conteúdo:

```
MONGO_URI=mongodb+srv://<usuario>:<senha>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

> Substitua `<usuario>`, `<senha>`, `<cluster>` e `<dbname>` pelos valores reais do seu banco MongoDB.

---

### 4. Inicie o servidor

```bash
npm start
```

A API estará disponível em:
📍 `http://localhost:3000`

---

### 5. Teste com CURL ou Postman

Exemplo de requisição **POST** via `curl`:

```bash
curl -X POST http://localhost:3000/api/hot \
-H "Content-Type: application/json" \
-d '{
  "nome": "BMW X6",
  "modelo": "2020",
  "ano": 2010,
  "imagem": "http://example.com/images/bmw-x6.jpg"
}'
```
