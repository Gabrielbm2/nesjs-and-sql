# 📦 Empacotamento API

API responsável por calcular a melhor forma de empacotar os pedidos da Loja do Seu Manoel. Recebe pedidos com produtos e dimensões, retorna caixas utilizadas e produtos alocados.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem principal
- **Swagger** - Documentação da API
- **Docker** - Containerização
- **Microservices** - Arquitetura híbrida (HTTP + TCP)

## 🏗️ Arquitetura

A aplicação possui uma arquitetura híbrida:

- **API REST** (porta 3000) - Endpoints HTTP com documentação Swagger
- **Microservice TCP** (porta 4000) - Comunicação interna via mensagens

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Configure as variáveis no arquivo `.env`:

```env
API_KEY=sua-api-key-secreta-aqui
APP_PORT=3000
NODE_ENV=development
```

### 2. Instalação das Dependências

```bash
pnpm install
```

## 🏃‍♂️ Executando a Aplicação

### Desenvolvimento Local

```bash
# Modo desenvolvimento
pnpm run start:dev

# Build da aplicação
pnpm run build

# Modo produção
pnpm run start:prod
```

### Docker (Recomendado)

```bash
# 1. Build da aplicação TypeScript
pnpm build

# 2. Build e execução do container
docker-compose up -d --build

# 3. Verificar logs
docker-compose logs

# 4. Parar os containers
docker-compose down
```

## 🌐 Acessando a API

### URLs Principais

- **API Base**: http://localhost:3000
- **Documentação Swagger**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/pedidos

### Autenticação

Todas as rotas são protegidas por API Key. Inclua o header:

```
x-api-key: api-key
```

### Exemplo de Requisição

```bash
# Listar pedidos
curl -X GET http://localhost:3000/pedidos \
  -H "x-api-key: api-key"

# Criar pedido
curl -X POST http://localhost:3000/pedidos \
  -H "Content-Type: application/json" \
  -H "x-api-key: api-key" \
  -d '{
    "produtos": [
      {
        "nome": "Produto A",
        "largura": 10,
        "altura": 5,
        "profundidade": 3,
        "peso": 0.5
      }
    ]
  }'
```

## 📊 Endpoints Disponíveis

| GET | `/pedidos` | Lista todos os pedidos |
| POST | `/pedidos` | Cria um novo pedido |

> 📖 **Documentação**: Acesse `/api` para ver os endpoints no Swagger

## 🧪 Testes

```bash
# Testes unitários
pnpm run test
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
pnpm run start:dev        # Inicia em modo watch

# Docker
docker-compose up -d      # Inicia containers
docker-compose logs       # Visualiza logs
docker-compose down       # Para containers
```

## 🏭 Microservices

A aplicação também expõe um microservice TCP na porta 4000:

```typescript
const client = ClientProxyFactory.create({
  transport: Transport.TCP,
  options: { host: 'localhost', port: 4000 }
});

client.send({ cmd: 'criar_pedido' }, pedidoData);
client.send({ cmd: 'listar_pedidos' }, {});
```

## 🐳 Docker

### Estrutura dos Containers

- **empacotamento_api**: Aplicação principal
  - Porta 3000: API HTTP
  - Porta 4000: Microservice TCP

### Variáveis de Ambiente no Docker

O container automaticamente carrega o arquivo `.env`. Certifique-se de que:

1. O arquivo `.env` existe na raiz
2. A variável `API_KEY` está definida
3. Execute `pnpm build` antes do `docker-compose up`

### Portas ocupadas

```bash
# Verificar portas em uso
netstat -tulpn | grep :3000
netstat -tulpn | grep :4000

# Parar containers
docker-compose down
```

## 📝 Estrutura do Projeto

```
src/
├── auth/
│   └── api-key.guard.ts      # Guard de autenticação
├── pedidos/
│   ├── dto/                  # Data Transfer Objects
│   ├── domain/               # Lógica de domínio
│   ├── repositories/         # Repositórios
│   ├── pedidos.controller.ts # Controller HTTP
│   ├── pedidos.micro.ts      # Controller Microservice
│   ├── pedidos.client.ts     # Cliente TCP
│   └── pedidos.service.ts    # Lógica de negócio
├── app.module.ts             # Módulo principal
└── main.ts                   # Bootstrap da aplicação
```