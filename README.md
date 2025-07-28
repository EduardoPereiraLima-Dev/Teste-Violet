# 🌾 API de Cadastro de Agricultores

Uma API para gerenciamento de cadastro de agricultores, desenvolvida com **NestJS**, **MongoDB** e **Mongoose**, seguindo os princípios **SOLID** e arquitetura **MVC**.

## 📋 Índice

- [Características](#-características)
- [Tecnologias](#️-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#️-configuração)
- [Executando a Aplicação](#-executando-a-aplicação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Regras de Negócio](#-regras-de-negócio)
- [Validações](#-validações)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Testes](#-testes)
- [Arquitetura](#️-arquitetura)
- [Princípios SOLID](#-princípios-solid)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## ✨ Características

- ✅ **CRUD para agricultores
- ✅ **Validação de CPF** com algoritmo oficial brasileiro
- ✅ **CPF único** no sistema
- ✅ **Filtros avançados** (nome, CPF, status)
- ✅ **Paginação**
- ✅ **Ordenação** 
- ✅ **Validação robusta** de dados
- ✅ **Arquitetura limpa** seguindo SOLID
- ✅ **Repository Pattern** para abstração de dados
- ✅ **Error handling** 
- ✅ **Transformação de dados** 

## 🛠️ Tecnologias

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[NestJS](https://nestjs.com/)** - Framework Node.js progressivo
- **[MongoDB](https://www.mongodb.com/)** - Banco de dados NoSQL
- **[Mongoose](https://mongoosejs.com/)** - ODM para MongoDB
- **[Class Validator](https://github.com/typestack/class-validator)** - Validação baseada em decorators
- **[Class Transformer](https://github.com/typestack/class-transformer)** - Transformação de objetos

## 📋 Pré-requisitos

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0
- **MongoDB** >= 4.4.0

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/agricultor-api.git
cd agricultor-api
```

### 2. Instale o NestJS CLI (se não tiver)
```bash
npm install -g @nestjs/cli
```

### 4. Instale as dependências específicas do projeto
```bash
# Dependências principais
npm install @nestjs/mongoose mongoose
npm install class-validator class-transformer
npm install @nestjs/config
npm install @nestjs/swagger swagger-ui-express


# Dependências de desenvolvimento
npm install --save-dev @types/mongoose
```

### 3. Instale as dependências
```bash
npm install
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de Dados
DATABASE_URL="mongodb://localhost:27017/agricultordb?directConnection=true"

# Servidor
PORT=3000
NODE_ENV=development

# Logs
LOG_LEVEL=debug
```

### 2. MongoDB

Certifique-se de que o MongoDB está rodando:

```bash
# Via Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Ou via instalação local
mongod --dbpath /path/to/your/db
```

## 🏃 Executando a Aplicação

### Desenvolvimento
```bash
npm run start:dev
```

### Produção
```bash
npm run build
npm run start:prod
```

### Watch mode
```bash
npm run start:debug
```

A aplicação estará disponível em: `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── 📁 common/                    # Recursos compartilhados
│   ├── 📁 decorators/           # Decorators customizados
│   ├── 📁 filters/              # Exception filters
│   ├── 📁 guards/               # Guards de autenticação/autorização
│   ├── 📁 interceptors/         # Interceptors
│   └── 📁 validators/           # Validadores customizados
│       └── 📄 cpf.validator.ts  # Validador de CPF
├── 📁 config/                   # Configurações
│   └── 📄 database.config.ts    # Configuração do MongoDB
├── 📁 modules/                  # Módulos da aplicação
│   └── 📁 agricultor/           # Módulo de agricultores
│       ├── 📄 agricultor.module.ts     # Definição do módulo
│       ├── 📁 controller/       # Camada de controle (MVC)
│       │   └── 📄 agricultor.controller.ts
│       ├── 📁 service/          # Camada de serviço (Regras de negócio)
│       │   └── 📄 agricultor.service.ts
│       ├── 📁 repository/       # Camada de dados (Repository Pattern)
│       │   └── 📄 agricultor.repository.ts
│       ├── 📁 dto/              # Data Transfer Objects
│       │   ├── 📄 create-agricultor.dto.ts
│       │   ├── 📄 update-agricultor.dto.ts
│       │   └── 📄 query-agricultor.dto.ts
│       └── 📁 schemas/          # Schemas do Mongoose
│           └── 📄 agricultor.schema.ts
├── 📄 app.module.ts             # Módulo principal
└── 📄 main.ts                   # Ponto de entrada
```

## 🛣️ API Endpoints

### Base URL
```
http://localhost:3000/agricultores
```

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/agricultores` | Criar novo agricultor |
| `GET` | `/agricultores` | Listar agricultores com filtros |
| `GET` | `/agricultores/:id` | Buscar agricultor por ID |
| `PATCH` | `/agricultores/:id` | Atualizar agricultor |
| `DELETE` | `/agricultores/:id` | Excluir agricultor (apenas inativos) |

### Parâmetros de Query (GET /agricultores)

| Parâmetro | Tipo | Descrição | Padrão |
|-----------|------|-----------|---------|
| `fullName` | string | Filtro por nome (busca parcial) | - |
| `cpf` | string | Filtro por CPF exato | - |
| `active` | boolean | Filtro por status ativo/inativo | - |
| `page` | number | Página atual | 1 |
| `limit` | number | Itens por página | 10 |
| `sortBy` | string | Campo para ordenação | createdAt |
| `sortOrder` | string | Ordem: asc ou desc | desc |

## 📝 Regras de Negócio

### RN1 - Criação de Agricultor
O sistema permite cadastro com os seguintes campos:

| Campo | Tipo | Regras |
|-------|------|---------|
| `fullName` | string | Obrigatório |
| `cpf` | string | Obrigatório, único, válido |
| `birthDate` | date | Opcional |
| `phone` | string | Opcional |
| `active` | boolean | Padrão: true |

### RN2 - CPF Único
- Não é permitido cadastrar dois agricultores com o mesmo CPF
- Sistema retorna erro 409 (Conflict) se CPF já existir

### RN3 - Validação de CPF
- CPF deve seguir o algoritmo oficial de validação brasileiro
- Aceita CPF com ou sem formatação (123.456.789-09 ou 12345678909)
- Remove automaticamente caracteres não numéricos

### RN4 - Edição de Agricultor
- Todos os campos podem ser alterados **exceto o CPF**
- Tentativa de alterar CPF retorna erro 400 (Bad Request)

### RN5 - Exclusão de Agricultor
- Só permite exclusão de agricultores com `active: false`
- Agricultores ativos devem ser desativados antes da exclusão
- Retorna erro 400 se tentar excluir agricultor ativo

### RN6 - Lista de Agricultores
- Visualização em formato JSON paginado
- Filtros por nome, CPF ou status ativo/inativo
- Ordenação por qualquer campo
- Busca case-insensitive por nome

## ✅ Validações

### Validação de Entrada
- **Nome completo**: Obrigatório, string não vazia
- **CPF**: Obrigatório, formato válido, único no sistema
- **Data de nascimento**: Formato ISO 8601 (YYYY-MM-DD)
- **Telefone**: String opcional

### Validação de CPF
```typescript
// Exemplos de CPFs válidos
"123.456.789-09"  // Com formatação
"12345678909"     // Sem formatação

// CPFs inválidos
"123.456.789-00"  // Dígito verificador incorreto
"111.111.111-11"  // Sequência repetida
"123.456.789"     // Incompleto
```

## 📖 Exemplos de Uso

### 1. Criar Agricultor

**Request:**
```bash
POST /agricultores
Content-Type: application/json

{
  "fullName": "João da Silva",
  "cpf": "123.456.789-09",
  "birthDate": "1980-01-15",
  "phone": "(11) 99999-9999"
}
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "fullName": "João da Silva",
  "cpf": "12345678909",
  "birthDate": "1980-01-15T00:00:00.000Z",
  "phone": "(11) 99999-9999",
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 2. Listar Agricultores com Filtros

**Request:**
```bash
GET /agricultores?active=true&page=1&limit=5&sortBy=fullName&sortOrder=asc
```

**Response:**
```json
{
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "fullName": "João da Silva",
      "cpf": "12345678909",
      "birthDate": "1980-01-15T00:00:00.000Z",
      "phone": "(11) 99999-9999",
      "active": true,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

### 3. Buscar por ID

**Request:**
```bash
GET /agricultores/64a1b2c3d4e5f6789012345
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "fullName": "João da Silva",
  "cpf": "12345678909",
  "birthDate": "1980-01-15T00:00:00.000Z",
  "phone": "(11) 99999-9999",
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

### 4. Atualizar Agricultor

**Request:**
```bash
PATCH /agricultores/64a1b2c3d4e5f6789012345
Content-Type: application/json

{
  "fullName": "João Silva Santos",
  "phone": "(11) 88888-8888"
}
```

**Response:**
```json
{
  "_id": "64a1b2c3d4e5f6789012345",
  "fullName": "João Silva Santos",
  "cpf": "12345678909",
  "birthDate": "1980-01-15T00:00:00.000Z",
  "phone": "(11) 88888-8888",
  "active": true,
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:45:00.000Z"
}
```

### 5. Desativar Agricultor

**Request:**
```bash
PATCH /agricultores/64a1b2c3d4e5f6789012345
Content-Type: application/json

{
  "active": false
}
```

### 6. Excluir Agricultor (apenas se inativo)

**Request:**
```bash
DELETE /agricultores/64a1b2c3d4e5f6789012345
```

**Response:**
```
204 No Content
```

### Tratamento de Erros

#### CPF Duplicado
```json
{
  "statusCode": 409,
  "message": "Já existe um agricultor cadastrado com este CPF",
  "error": "Conflict"
}
```

#### CPF Inválido
```json
{
  "statusCode": 400,
  "message": ["CPF deve ser válido"],
  "error": "Bad Request"
}
```

#### Tentativa de Alterar CPF
```json
{
  "statusCode": 400,
  "message": "CPF não pode ser modificado após o cadastro",
  "error": "Bad Request"
}
```

#### Exclusão de Agricultor Ativo
```json
{
  "statusCode": 400,
  "message": "Só é possível excluir agricultores inativos. Desative o agricultor primeiro.",
  "error": "Bad Request"
}
```

## 🧪 Testes

### Executar Testes
```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Coverage
npm run test:cov
```

### Estrutura de Testes
```
test/
├── 📁 unit/                     # Testes unitários
│   ├── 📄 agricultor.service.spec.ts
│   ├── 📄 agricultor.controller.spec.ts
│   └── 📄 cpf.validator.spec.ts
└── 📁 e2e/                      # Testes end-to-end
    └── 📄 agricultor.e2e-spec.ts
```

## 🏗️ Arquitetura

### Padrão MVC (Model-View-Controller)

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Controller   │───▶│     Service     │───▶│   Repository    │
│  (HTTP Layer)   │    │ (Business Logic)│    │  (Data Layer)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│      DTOs       │    │   Validations   │    │    MongoDB      │
│ (Data Transfer) │    │ (Business Rules)│    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Camadas da Aplicação

1. **Controller Layer** - Recebe requisições HTTP e chama o service
2. **Service Layer** - Contém regras de negócio e orquestra operações
3. **Repository Layer** - Abstrai acesso aos dados do MongoDB
4. **Schema Layer** - Define estrutura dos dados no MongoDB

## 🎯 Princípios SOLID

### Single Responsibility Principle (SRP)
- **Controller**: Apenas manipula requisições HTTP
- **Service**: Apenas regras de negócio
- **Repository**: Apenas acesso a dados
- **DTOs**: Apenas validação e transformação

### Open/Closed Principle (OCP)
- Novas validações podem ser adicionadas sem modificar código existente
- Sistema extensível através de decorators e pipes

### Liskov Substitution Principle (LSP)
- Repository pode ser substituído por implementações alternativas
- Interfaces bem definidas permitem substituição

### Interface Segregation Principle (ISP)
- DTOs específicos para cada operação (Create, Update, Query)
- Interfaces pequenas e focadas

### Dependency Inversion Principle (DIP)
- Service depende de abstrações (Repository)
- Injeção de dependência em toda aplicação
- Inversão de controle através do NestJS

## 🔧 Melhorias Futuras

- [ ] **Autenticação JWT** - Sistema de login e autorização
- [ ] **Swagger/OpenAPI** - Documentação automática da API
- [ ] **Rate Limiting** - Proteção contra abuse
- [ ] **Cache Redis** - Cache para consultas frequentes
- [ ] **Logs Estruturados** - Sistema de logs avançado
- [ ] **Monitoramento** - Métricas e health checks
- [ ] **Docker** - Containerização da aplicação
- [ ] **CI/CD** - Pipeline de integração contínua
- [ ] **Testes E2E** - Cobertura completa de testes
- [ ] **Backup Automático** - Backup regular do MongoDB

## 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Guidelines de Contribuição

- Siga os princípios SOLID
- Mantenha alta cobertura de testes
- Documente mudanças no código
- Use conventional commits
- Mantenha consistência no estilo de código

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas:
- 📧 Email: seu-email@exemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/seu-usuario/agricultor-api/issues)
- 📖 Wiki: [GitHub Wiki](https://github.com/seu-usuario/agricultor-api/wiki)

---

<div align="center">
  <p>Desenvolvido com ❤️ e ☕ por <strong>[Eduardo Pereira]</strong></p>
  <p>
    <a href="#-api-de-cadastro-de-agricultores">Voltar ao topo</a>
  </p>
</div>
