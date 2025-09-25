# Crud Produtos

Bem-vindo ao projeto Crud Produtos\! Esta é uma aplicação web Full-Stack desenvolvida para demonstrar um sistema completo de Gerenciamento de Produtos, com operações de Criar, Ler, Atualizar e Excluir (CRUD).

A aplicação é dividida em duas partes principais: um **backend** construído com Node.js, Express e Sequelize, que serve uma API RESTful, e um **frontend** reativo e moderno construído com Next.js, React e Tailwind CSS.

## 🚀 Funcionalidades

A plataforma oferece uma experiência de usuário fluida para gerenciar um catálogo de produtos.

### Frontend

- **Listagem de Produtos:** Visualize todos os produtos cadastrados em uma tabela clara e organizada.
- **Criação de Novos Produtos:** Adicione produtos ao catálogo através de um formulário modal intuitivo.
- **Edição de Produtos:** Atualize as informações de qualquer produto existente diretamente na interface.
- **Exclusão de Produtos:** Remova produtos do catálogo com um único clique.
- **Busca Dinâmica:** Filtre produtos em tempo real digitando na barra de busca.
- **Interface Reativa:** A interface responde instantaneamente às ações do usuário, com feedbacks visuais de carregamento e estados de vazio.

### Backend

- **API RESTful Completa:** Endpoints bem definidos para todas as operações CRUD (`GET`, `POST`, `PUT`, `DELETE`).
- **Banco de Dados com Sequelize:** Utiliza o ORM Sequelize para abstrair a comunicação com o banco de dados SQLite.
- **Busca no Servidor:** Endpoint otimizado para realizar buscas por nome no banco de dados, retornando os resultados filtrados.
- **Validação de Dados:** Utiliza Zod para validar os dados de entrada na criação e atualização de produtos, garantindo a integridade dos dados.
- **Tratamento de Erros:** Um sistema robusto para tratar diferentes tipos de erros (ex: produto não encontrado, conflitos no banco, erros de validação) e retornar respostas claras para o cliente.

## 🛠️ Tecnologias Utilizadas

| Área         | Tecnologia                  | Descrição                                                |
| :----------- | :-------------------------- | :------------------------------------------------------- |
| **Backend**  | **Node.js** com **Express** | Criação da API RESTful.                                  |
|              | **TypeScript**              | Tipagem estática para um código mais robusto.            |
|              | **Sequelize**               | ORM para interagir com o banco de dados.                 |
|              | **SQLite**                  | Banco de dados relacional leve e baseado em arquivo.     |
|              | **Zod**                     | Biblioteca para validação de esquemas de dados.          |
|              | **CORS**                    | Permite que o frontend acesse os recursos da API.        |
| **Frontend** | **Next.js** com **React**   | Framework para construção da interface de usuário.       |
|              | **TypeScript**              | Tipagem estática para componentes e lógica.              |
|              | **Jotai**                   | Gerenciador de estado global, atômico e minimalista.     |
|              | **Tailwind CSS**            | Framework CSS para estilização rápida e customizável.    |
|              | **Axios**                   | Cliente HTTP para realizar requisições à API do backend. |

## 🏛️ Arquitetura

O projeto é estruturado em duas pastas principais, `frontend` e `backend`, funcionando como um monorepo.

- **`backend`**: Contém a API RESTful. É responsável por toda a lógica de negócio, comunicação com o banco de dados e validação dos dados. Ele roda de forma independente em um servidor Node.js.
- **`frontend`**: Contém a aplicação de cliente desenvolvida em Next.js. É responsável pela apresentação da interface ao usuário, pela captura de interações e pela comunicação com a API do backend para buscar e manipular dados.

Essa separação garante um baixo acoplamento entre as camadas de apresentação e de negócio, facilitando a manutenção e a escalabilidade de ambas as partes.

## ⚙️ Como Testar Localmente

Para executar este projeto em sua máquina local, siga os passos abaixo.

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou um gerenciador de pacotes compatível

### 1\. Clonar o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd <NOME_DA_PASTA_DO_PROJETO>
```

### 2\. Configurar e Iniciar o Backend

O backend e o frontend possuem dependências e servidores separados. Primeiro, vamos configurar o backend.

1. Abra um terminal e navegue até a pasta do backend:

   ```bash
   cd backend
   ```

2. Instale as dependências do backend:

   ```bash
   npm install
   ```

3. **Atenção:** Crie o arquivo do banco de dados. O Sequelize com SQLite precisa que o arquivo exista. Crie um arquivo **vazio** chamado `database.db` dentro da pasta `src/database`.

4. Inicie o servidor do backend:

   ```bash
   npm run dev
   ```

5. Você deverá ver a mensagem de confirmação no terminal, indicando que o servidor está rodando na porta 4000:

   ```bash
   Database connection established successfully.
   Backend running on port: 4000
   ```

### 3\. Configurar e Iniciar o Frontend

Agora, vamos configurar o frontend em um **novo terminal**.

1. Abra um **novo terminal** e navegue até a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências do frontend:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento do frontend:

   ```bash
   npm run dev
   ```

4. O servidor do Next.js será iniciado, geralmente na porta 3000.

### 4\. Acessar a Aplicação

Com os dois servidores rodando, abra seu navegador e acesse:

**<http://localhost:3000>**

Pronto\! Agora você pode interagir com a aplicação, criando, buscando, editando e excluindo produtos.
