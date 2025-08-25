🚀 Sistema de Atendimento ao Cliente

Este é um projeto de teste desenvolvido em Node.js (Express + Prisma + TypeScript) no backend e React + TypeScript no frontend.
O sistema permite login com autenticação JWT, gerenciamento de tickets e gestão de usuários com diferentes níveis de acesso (Admin e Atendente).

🛠️ Tecnologias Utilizadas

Backend: Node.js, Express, Prisma, JWT, Swagger

Banco de Dados: PostgreSQL (local)

Frontend: React + Vite + TailwindCSS

⚙️ Preparando o Ambiente
🔹 Pré-requisitos

Node.js v18+

PostgreSQL instalado localmente

npm (gerenciador de pacotes)

▶️ Como Rodar o Projeto
1. Clonar o repositório
git clone https://github.com/GuilhermeOSR/avaliacao-candidatos-comigo.git
cd seu-repo

2. Configurar variáveis de ambiente

Crie um arquivo .env dentro da pasta backend/ com o seguinte conteúdo:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meubanco"
JWT_SECRET="segredo_super_secreto"


⚠️ Ajuste o usuário, senha e nome do banco conforme sua instalação local do PostgreSQL.

3. Configurar o banco

No diretório backend:

npm install
npx prisma migrate dev

4. Rodar o backend

Ainda no diretório backend:

npm run dev


A API ficará disponível em:
👉 http://localhost:3333/api
Swagger docs:
👉 http://localhost:3333/api-docs

5. Rodar o frontend

Na raiz do projeto (pasta frontend ou a raiz que contém o React):

npm install
npm run dev


Frontend disponível em:
👉 http://localhost:5173

🔑 Autenticação

A autenticação é feita via JWT.

O token é armazenado no LocalStorage para simplificar este teste (não foi implementado refresh token ou persistência no banco).

Usuários Admin podem:

Criar, editar, excluir tickets

Gerenciar usuários

Usuários Atendentes podem:

Criar e editar tickets

Não podem excluir tickets ou acessar gestão de usuários

📖 Swagger

A documentação da API pode ser acessada em:
👉 http://localhost:3333/api-docs

⚠️ Observações Importantes

O foco aqui foi funcionalidade rápida.

Não foi implementada camada de testes automatizados.

Infraestrutura foi mantida simples (sem Docker, CI/CD, etc.).

LocalStorage foi usado para salvar o token apenas para praticidade, não sendo o mais seguro em produção.

✅ Próximos Passos (se fosse evoluir)

Implementar testes unitários e de integração

Melhorar segurança do token (refresh, blacklist, etc.)

Configurar Docker e pipelines de CI/CD

Adicionar frontend no mesmo fluxo de deploy

👉 Pronto, assim qualquer pessoa pode rodar sua aplicação localmente com Node e Postgres.