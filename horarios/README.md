# 📅 Scripts SQL - Horários

Scripts SQL para consultas relacionadas ao sistema de horários acadêmicos do professor.

## 📋 Scripts Disponíveis

### 1. script-1-horas-professor.sql
**Total de Horas por Professor**

Calcula o total de horas que cada professor leciona, somando todas as suas turmas.

**Resultado:**
- ID e nome do professor
- Total de horas semanais
- Ordenado por maior carga horária

### 2. script-2-salas-ocupadas.sql
**Salas Ocupadas**

Lista todas as salas com seus horários de ocupação.

**Resultado:**
- ID e nome da sala
- Dia da semana
- Horário de início e fim
- Ordenado por sala e horário

### 3. script-3-salas-livres.sql
**Salas Livres**

Identifica salas disponíveis em horários específicos (08:00-18:00, segunda a sexta).

**Resultado:**
- ID e nome da sala
- Dia da semana
- Horários livres disponíveis
- Ordenado por sala e dia

## 🔧 Como Usar

Execute os scripts em um banco PostgreSQL:

```sql
-- Para horários dos professores
\i script-1-horas-professor.sql

-- Para salas ocupadas
\i script-2-salas-ocupadas.sql

-- Para salas livres
\i script-3-salas-livres.sql
```

## 📊 Estrutura Esperada do Banco

Os scripts assumem as seguintes tabelas:
- `professor` (id, name)
- `subject` (id, professor_id)
- `class` (id, subject_id)
- `class_schedule` (class_id, room_id, day_of_week, start_time, end_time)
- `room` (id, name)