# 🏢 Nest SQL - Projetos da Loja do Seu Manoel

Repositório contendo soluções para diferentes aspectos do negócio da Loja do Seu Manoel, incluindo empacotamento de produtos e gestão de horários acadêmicos.

## 📁 Estrutura do Projeto

```
nest-sql/
├── empacotamento/          # API NestJS para empacotamento
└── horarios/              # Scripts SQL para horários
```

## 📦 Empacotamento (API NestJS)

**Localização:** `/empacotamento`

API responsável por calcular a melhor forma de empacotar pedidos da loja, otimizando o uso de caixas disponíveis.

### Tecnologias
- NestJS + TypeScript
- Docker + Docker Compose
- Swagger (Documentação)
- Microservices (HTTP + TCP)

### Funcionalidades
- ✅ Cálculo automático de empacotamento
- ✅ API REST com autenticação por API Key
- ✅ Microservice TCP para comunicação interna
- ✅ Documentação Swagger automática
- ✅ Containerização Docker

### Quick Start
```bash
cd empacotamento
cp .env.example .env
# Configure sua API_KEY no .env
pnpm install && pnpm build
docker-compose up -d
# Acesse: http://localhost:3000/api
```

## 📅 Horários (Scripts SQL)

**Localização:** `/horarios`

Scripts SQL para consultas relacionadas ao sistema de horários acadêmicos, incluindo gestão de salas e carga horária de professores.

### Scripts Disponíveis
- **script-1-horas-professor.sql** - Total de horas por professor
- **script-2-salas-ocupadas.sql** - Horários de ocupação das salas
- **script-3-salas-livres.sql** - Salas disponíveis por horário

### Funcionalidades
- ✅ Cálculo de carga horária docente
- ✅ Controle de ocupação de salas
- ✅ Identificação de horários livres
- ✅ Relatórios organizados por sala/professor

### Quick Start
```sql
-- Execute no PostgreSQL
\i horarios/script-1-horas-professor.sql
\i horarios/script-2-salas-ocupadas.sql
\i horarios/script-3-salas-livres.sql
```

## 🚀 Tecnologias Utilizadas

### Backend (Empacotamento)
- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem principal
- **Docker** - Containerização
- **Swagger** - Documentação API

### Database (Horários)
- **PostgreSQL** - Banco de dados
- **SQL** - Linguagem de consulta

## 📖 Documentação Detalhada

Para instruções específicas de cada projeto:

- **Empacotamento API**: Veja `empacotamento/README.md`
- **Scripts SQL**: Veja `horarios/README.md`

## 🎯 Objetivos dos Projetos

### Empacotamento
Automatizar o processo de empacotamento na Loja do Seu Manoel, reduzindo custos e otimizando o uso de caixas através de algoritmos inteligentes.

### Horários
Facilitar a gestão acadêmica através de consultas SQL eficientes para controle de horários, salas e cargas horárias.
