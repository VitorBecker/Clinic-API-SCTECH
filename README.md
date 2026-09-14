# 📚 Clinic Manager API 

![BookStore Manager CLI](src/img/banner-bookstore-manager-cli.png)


---

# 📝 Sobre o Projeto

A **Clinic Manager API** é o back-end de um sistema de gerenciamento de clínica médica de pequeno porte. Este repositório contém a **Etapa de Autenticação e Autorização**: a base de acesso do sistema (cadastro de usuários, login com emissão de token JWT e controle de acesso baseado em perfis / RBAC).

Este projeto foi desenvolvido como parte avaliativa do curso de **Desenvolvimento Back-end com Node.js** (Módulo 02) do **SENAI (Programa SCTec)**.


---

# 🎯 Tecnologias utilizadas

* **Linguagem:** TypeScript
* **Ambiente de Execução:** Node.js
* **Framework Web:** Express.js
* **ORM:** TypeORM
* **Banco de Dados:** PostgreSQL
* **Criptografia & Segurança:** Bcryptjs e JSON Web Token (JWT)
* **Execução em Desenvolvimento:** ts-node-dev


---

# 🎯 Objetivo

Aplicar, na prática, os principais conceitos estudados, tais como:

- Programação Orientada a Objetos
- Arquitetura em Camadas MVC
- Banco de Dados Relacional
- SQL
- PostgreSQL
- Programação Assíncrona
- DTOs
- Classes
- Tratamento de Erros
- Clean Code, SOLID
- Git, GitHub, GitFlow

---

# 🚧 Status do Projeto

Funcionalidades de domínio da clínica (especialidades, médicos, pacientes e consultas) **não fazem parte desta entrega** e serão construídas em um projeto futuro sobre esta mesma base de código.


---

# 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de possuir instalado em sua máquina:

- Node.js 20
- npm
- PostgreSQL 14
- Git
- Visual Studio Code (ou outra IDE compatível)

> O servidor PostgreSQL deve estar em execução, e o usuário informado nas variáveis de ambiente deve possuir permissão para criar bancos de dados.

---

# 🚀 Instalação

## 1. Clone o repositório

```bash
git clone https://github.com/VitorBecker/Clinic-API-SCTECH
```

Acesse a pasta do projeto:

```bash
cd "Clinic API"
```

---

## 2. Instale as dependências

```bash
npm install
```

> O comando acima instalará automaticamente todas as dependências definidas no arquivo `package.json`.

---

## 3. Configure as variáveis de ambiente

Crie um arquivo na raiz do projeto:

```text
.env
```

Copie para ele todo o conteúdo do arquivo abaixo e o altere com suas próprias informações:

```text
.env.example
```

> A tabela de usuários é criada automaticamente pelo TypeORM (`synchronize: true`, ativo no ambiente de desenvolvimento) ao subir a aplicação pela primeira vez.


---

## 4. Execute a aplicação

### Ambiente de desenvolvimento:

Para executar diretamente o código TypeScript:

```bash
npm run dev
```

### Aplicação compilada

Primeiro, compile o projeto:

```bash
npm run build
```

Depois, execute a versão compilada:

```bash
npm run start
```


> A API sobe em `http://localhost:<PORT>`.


---

# 📂 Arquitetura do projeto e estrutura de pastas

```
src/
├── controllers/        # Recebe a requisição HTTP, aciona o service, devolve a resposta
├── services/           # Regras de negócio (validações, orquestração)
├── repositories/       # Única camada que conversa com o TypeORM/PostgreSQL
├── entities/           # Entidades TypeORM (tabelas do banco)
├── dtos/               # Formatos de entrada e saída da API (Data Transfer Objects)
├── middlewares/        # Autenticação (JWT), autorização (RBAC) e tratamento de erros
├── routes/             # Definição dos endpoints e associação com os controllers
├── errors/             # Classe de erro de aplicação (AppError)
├── utils/              # Funções auxiliares (hash de senha, geração/validação de JWT)
├── data-source.ts      # Configuração da conexão com o PostgreSQL (TypeORM)
├── server.ts           # Inicialização do Express e registro de rotas/middlewares
├── .env.example        # Modelo das variáveis de ambiente
├── .gitignore          # Arquivos e diretórios ignorados pelo Git
├── package.json        # Dependências e scripts do projeto
├── package-lock.json   # Versões exatas das dependências
└── tsconfig.json       # Configuração do compilador TypeScript
```


## 🔄 Fluxo de execução da aplicação

```mermaid
graph TD
    %% Estilização de Cores
    classDef client fill:#1f2937,stroke:#4b5563,color:#fff;
    classDef security fill:#064e3b,stroke:#10b981,color:#fff;
    classDef app fill:#1e3a8a,stroke:#3b82f6,color:#fff;
    classDef dto fill:#854d0e,stroke:#eab308,color:#fff;
    classDef domain fill:#581c87,stroke:#a855f7,color:#fff;
    classDef db fill:#134e4a,stroke:#14b8a6,color:#fff;
    classDef err fill:#7f1d1d,stroke:#ef4444,color:#fff;

    %% Nós do Fluxo
    Client["💻 Cliente HTTP<br/>(Thunder Client / Postman)"]:::client
    
    subgraph Express ["🚀 Servidor Express.js"]
        Middlewares["🛡️ Middlewares de Segurança<br/>• authMiddleware (JWT)<br/>• roleMiddleware (RBAC)"]:::security
        Routes["🛣️ Roteadores Express<br/>• /auth (auth.routes.ts)<br/>• /users (users.routes.ts)"]:::app
        Controllers["🎮 Controllers<br/>(UsersControllers.ts)"]:::app
        
        subgraph DTOsLayer ["📦 Camada DTO (Data Transfer Objects)"]
            InputDTO["📥 Input DTOs<br/>• cadastroUsersDTO<br/>• loginUsersDTO"]:::dto
            OutputDTO["📤 Output DTOs<br/>• usersResponseDTO<br/>• loginResponseDTO"]:::dto
        end

        Services["⚙️ Services & Utils<br/>(UsersService / bcripto / jwt)"]:::domain
        Repositories["🗄️ Repositories & Entities<br/>(UsersRepository / Usuario)"]:::domain
        ErrorHandler["🚨 Error Handler Global<br/>(AppError & errorHandler)"]:::err
    end

    Database[("🛢️ PostgreSQL Database<br/>(Tabela: usuarios)")]:::db

    %% Conexões do Fluxo
    Client -->|1. Request HTTP  JSON| Middlewares
    Middlewares -->|2. Valida Token & Role| Routes
    Routes -->|3. Encaminha Requisição| Controllers
    Controllers -->|4. Mapeia Body para Input DTO| InputDTO
    InputDTO -->|5. Dados Tipados| Services
    Services -->|6. Consulta/Persiste Dados| Repositories
    Repositories <-->|7. Mapeamento TypeORM| Database
    Services -->|8. Instancia Output DTO| OutputDTO
    OutputDTO -->|9. Objeto Sanitizado (sem senha)| Controllers
    
    Controllers -.->|Captura Erros via next| ErrorHandler
    Services -.->|Lança AppError| ErrorHandler
    ErrorHandler -->|Resposta JSON de Erro| Client
    Controllers -->|10. Resposta HTTP  JSON DTO| Client
```



## Perfis de acesso disponíveis

| Perfil          | Descrição                                            |
|-----------------|------------------------------------------------------|
| `ADMINISTRADOR` | Acesso completo às funcionalidades da API            |
| `ATENDENTE`     | Acesso operacional, com permissões restritas (padrão)|



## Documentação dos endpoints

### POST /auth/register

Cadastra um novo usuário. Público.

**Body:**
```json
{
  "nome": "Ana Souza",
  "email": "ana@medclinic.com",
  "senha": "senha123",
  "role": "ATENDENTE"
}
```
`role` é opcional — se omitido, o usuário é criado como `ATENDENTE`.

**Resposta — 201 Created**
```json
{
  "id": "b3f1c2a0-...",
  "nome": "Ana Souza",
  "email": "ana@medclinic.com",
  "role": "ATENDENTE",
  "criadoEm": "2026-09-14T12:00:00.000Z"
}
```

**Erros:** `400` (campo obrigatório ausente) · `409` (e-mail já cadastrado)

---

### POST /auth/login

Autentica um usuário e retorna o token JWT. Público.

**Body:**
```json
{
  "email": "ana@medclinic.com",
  "senha": "senha123"
}
```

**Resposta — 200 OK**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Erros:** `401` (e-mail ou senha inválidos)

---

### GET /users/me

Retorna os dados do usuário autenticado. Requer token válido.

**Header:** `Authorization: Bearer <token>`

**Resposta — 200 OK**
```json
{
  "id": "b3f1c2a0-...",
  "nome": "Ana Souza",
  "email": "ana@medclinic.com",
  "role": "ATENDENTE",
  "criadoEm": "2026-09-14T12:00:00.000Z"
}
```

**Erros:** `401` (token ausente, inválido ou expirado)

---

### GET /users/admin

Endpoint restrito ao perfil `ADMINISTRADOR`, usado para demonstrar o RBAC.
Requer token válido de um usuário `ADMINISTRADOR`.

**Header:** `Authorization: Bearer <token>`

**Resposta — 200 OK**
```json
{
  "mensagem": "Acesso ao painel administrativo concedido",
  "usuarioLogado": { "id": "b3f1c2a0-...", "role": "ADMINISTRADOR" }
}
```

**Erros:** `401` (não autenticado) · `403` (autenticado, mas sem o perfil `ADMINISTRADOR`)
-- 








### Exemplo simplificado

Ao cadastrar um autor, o fluxo percorre as seguintes etapas:

```text
AutorMenu
    → AutorController
        → AutorService
            → AutorRepository
                → PostgreSQL
```

Após a operação, o resultado percorre o caminho inverso até ser apresentado ao usuário no terminal.

---

# 📚 Funcionalidades do Sistema

## Autores

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Livros

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Clientes

- Cadastro
- Listagem
- Consulta
- Atualização
- Remoção

## Empréstimos

- Registrar empréstimo
- Registrar devolução
- Consultar empréstimos

## Relatórios

- Livros disponíveis
- Livros emprestados
- Livros por autor
- Quantidade de empréstimos por livro
- Clientes com empréstimos ativos

---

### Regras de empréstimo

A biblioteca foi configurada com as seguintes regras de negócio:

- Cada empréstimo pode incluir, no máximo, **3 livros**.
- Cada cliente pode manter, no máximo, **5 livros emprestados simultaneamente**.
- O prazo padrão para devolução é de **14 dias**.

Essas regras estão definidas no arquivo:

```text
src/configuracoes_empresa.json
```

Os limites de livros por empréstimo e por cliente podem ser desativados atribuindo o valor `null` às respectivas configurações:

```json
{
  "max_livros_por_emprestimo": null,
  "max_livros_por_cliente": null
}
```

Quando configuradas como `null`, a aplicação ignora essas limitações e permite empréstimos sem um limite específico de livros por operação ou por cliente.

---

# 🗃 Banco de Dados

O **BookStore Manager CLI** utiliza **PostgreSQL** como Sistema Gerenciador de Banco de Dados (SGBD), com persistência realizada por meio de **SQL nativo**, utilizando a biblioteca **pg**.

A estrutura do banco foi organizada utilizando um fluxo inspirado no conceito de **migrations**, no qual cada alteração da estrutura é registrada em um arquivo SQL individual e executada automaticamente pelo projeto.

## Estrutura

```text
src/database/
│
├── schemas/             # Scripts SQL responsáveis pela criação e evolução do banco
├── seeds/               # Scripts SQL para inserção de dados de teste
├── connection.ts        # Configuração da conexão com o PostgreSQL
├── RunSchemas.ts        # Executor automático dos arquivos de schema
└── DatabaseSeeder.ts    # Executor automático dos arquivos de seed
```

## Schemas

Os arquivos presentes em `src/database/schemas/` são executados em ordem cronológica pelo comando:

```bash
npm run db:schemas
```

Durante a execução, o sistema:

- verifica se o banco de dados informado no arquivo `.env` existe;
- cria automaticamente o banco de dados, caso necessário;
- cria a tabela `migrations_history`, responsável pelo controle dos schemas já executados;
- executa apenas os scripts SQL que ainda não foram aplicados.

Cada arquivo representa uma alteração específica da estrutura do banco, como criação de tabelas, inclusão de constraints ou outras modificações.

## Seeds

Os arquivos presentes em `src/database/seeds/` são responsáveis por popular o banco de dados com registros para testes.

A execução é realizada através do comando:

```bash
npm run db:seed
```

Essa etapa é opcional e facilita a validação das funcionalidades durante o desenvolvimento da aplicação.

## Entidades do Sistema

O banco de dados é composto pelas seguintes entidades principais:

- Autores
- Livros
- Clientes
- Empréstimos

A tabela livros possui uma chave estrangeira que referencia autores. Dessa forma, cada livro deve estar vinculado a um autor previamente cadastrado, enquanto um autor pode possuir vários livros.

A tabela emprestimos possui uma chave estrangeira para clientes. Assim, cada empréstimo pertence a um cliente, e um mesmo cliente pode realizar diferentes empréstimos.

Como um empréstimo pode conter mais de um livro, utilizamos a tabela associativa emprestimo_livros. Ela relaciona os empréstimos aos livros por meio de suas chaves estrangeiras.

As relações entre essas entidades são garantidas por **Primary Keys**, **Foreign Keys**, **Constraints** e demais mecanismos de integridade referencial disponibilizados pelo PostgreSQL.

---

# 🌿 Versionamento

O projeto utiliza um fluxo de versionamento inspirado no **GitFlow**, adaptado às necessidades da equipe e aos requisitos acadêmicos do projeto.

## Branches principais

```text
main
develop
```

- **main**: contém apenas versões estáveis e prontas para entrega.
- **develop**: branch de integração, onde são reunidas e testadas as funcionalidades antes da incorporação à `main`.

## Branches de desenvolvimento

Cada funcionalidade é desenvolvida em uma **branch temporária**, criada a partir da `develop`, seguindo o padrão de nomenclatura definido pela equipe.

Exemplo:

```text
feat/kan-7-vit-clientes
refactor/kan-9-bcf-autor-melhorias
fix/kan-10-rmg-livro-repository
```

Onde:

- **feat**, **fix** ou **refactor** identificam o tipo da alteração;
- **kan-XX** corresponde ao cartão da tarefa no Kanban;
- **iniciais do integrante** identificam o responsável pela implementação;
- o último trecho descreve resumidamente a funcionalidade desenvolvida.

## Pull Requests

Todas as alterações são integradas à branch `develop` por meio de **Pull Requests (PRs)**.

Como prática adotada pela equipe:

- nenhum integrante aprova o próprio Pull Request;
- toda alteração passa por revisão de pelo menos outro integrante da squad antes da integração;
- somente após aprovação o código é incorporado à branch `develop`.

## Histórico das branches

Conforme requisito do projeto, **as branches temporárias não são removidas após o merge**, permanecendo disponíveis para consulta do histórico de desenvolvimento e avaliação da evolução do projeto.

---

### Fluxo resumido

```text
Branch de desenvolvimento
    → Implementação e testes
        → Pull Request
            → Revisão da equipe
                → Develop
                    → Testes
 → Revisão final
     → Main
```

---

# 📌 Kanban

O planejamento das etapas de desenvolvimento e acompanhamento das atividades foi gerenciado de forma visual por meio de um quadro Kanban, utilizando a ferramenta Jira.

Link do quadro: 
> https://rodrigomgrassioto.atlassian.net/jira/software/projects/KAN/boards/1

---

# 👥 Integrantes

- Bruna Caroline Fraga
- Rodrigo Medeiros Grassioto
- Vítor Olegário Becker de Aquino

---

# 🧪 Exemplo de Utilização

## Funcionalidades — Autor

### Cadastro e listagem

![Fluxo de cadastro e listagem de autores](src/img/fluxo-autor-parte-1.png)

### Atualização, busca e exclusão

![Fluxo de atualização, busca e exclusão de autores](src/img/fluxo-autor-parte-2.png)


## Funcionalidades — Livro

### Cadastro, listagem e busca

![Fluxo de cadastro e listagem de livros](src/img/fluxo-livro-parte-1.png)

### Atualização e exclusão

![Fluxo de atualização, busca e exclusão de livros](src/img/fluxo-livro-parte-2.png)


## Funcionalidades — Cliente

### Cadastro e listagem

![Fluxo de cadastro e listagem de clientes](src/img/fluxo-cliente-parte-1.png)

### Busca e exclusão

![Fluxo de atualização, busca e exclusão de clientes](src/img/fluxo-cliente-parte-2.png)


## Funcionalidades — Empréstimo

### Cadastro

![Fluxo de cadastro e listagem de empréstimos](src/img/fluxo-emprestimo-parte-1.png)

### Busca e devolução

![Fluxo de busca e devolução de empréstimos](src/img/fluxo-emprestimo-parte-2.png)


## Funcionalidades — Relatórios

### Exibição de Relatórios

![Fluxo de exibição de Relatórios](src/img/fluxo-relatorios-parte-1.png)

![Fluxo de exibição de Relatórios](src/img/fluxo-relatorios-parte-2.png)

---

# 🚀 Melhorias Futuras

O projeto atende aos requisitos definidos para esta etapa, mas algumas melhorias foram identificadas durante o desenvolvimento e poderão ser implementadas em versões futuras:

- **Aprimorar a tipagem e o tratamento de erros:** substituir o uso do tipo `any` por `unknown`, realizando a verificação segura dos valores antes de acessá-los. Essa melhoria poderá ser aplicada tanto no tratamento de exceções quanto em outros pontos do código que ainda utilizem tipagem genérica.

- **Padronizar os erros da aplicação:** criar classes personalizadas que estendam a classe nativa `Error`, como erros de validação, regras de negócio, registros não encontrados e falhas no banco de dados. Isso permitirá identificar e tratar cada categoria de erro de maneira mais consistente.

- **Implementar a busca de autores por nome:** permitir a localização de autores pelo nome completo ou por parte dele, facilitando a consulta quando o usuário não souber o identificador do registro.

- **Detalhar o relatório de clientes com empréstimos ativos:** incluir o ID de cada empréstimo apresentado no relatório, tornando mais fácil localizar a operação e realizar consultas ou devoluções.

- **Registrar a devolução por livro:** permitir a devolução individual de um livro, em vez de exigir a devolução de todos os livros associados ao mesmo empréstimo.

- **Validar as configurações da aplicação:** verificar, durante a inicialização, se as variáveis de ambiente e as regras presentes no arquivo `configuracoes_empresa.json` possuem valores válidos, exibindo mensagens claras quando houver alguma configuração incorreta.

- **Implementar controle de atrasos:** identificar empréstimos com prazo de devolução vencido e apresentar essa informação nas consultas e nos relatórios.

- **Adicionar renovação de empréstimos:** permitir a alteração da data prevista de devolução, desde que o empréstimo esteja ativo e atenda às regras definidas pela biblioteca.

- **Criar histórico detalhado de movimentações:** registrar empréstimos, devoluções e renovações para facilitar consultas futuras e oferecer maior rastreabilidade das operações.

- **Adicionar paginação e filtros às consultas:** melhorar a visualização quando houver muitos registros, permitindo filtrar livros, clientes, autores e empréstimos por diferentes critérios.

Essas melhorias buscam ampliar a segurança, a manutenibilidade e a experiência de uso da aplicação, além de preparar o projeto para o desenvolvimento de novas funcionalidades.

## Evolução do projeto ao longo do curso

Acompanhando a evolução dos conteúdos abordados nos próximos módulos do curso, o projeto poderá ser ampliado gradualmente, aproveitando a arquitetura em camadas e as regras de negócio já implementadas. Entre as possíveis evoluções, destacam-se:

- **Implementar testes automatizados:** criar testes unitários para as regras de negócio e testes de integração para as operações realizadas no PostgreSQL, reduzindo o risco de regressões durante futuras alterações.

- **Disponibilizar as funcionalidades por meio de uma API REST:** desenvolver uma API com Node.js, TypeScript e Express para permitir que as operações de autores, livros, clientes, empréstimos e relatórios sejam acessadas por requisições HTTP.

---

# 📄 Licença

Projeto desenvolvido exclusivamente para fins acadêmicos.

---
