# 📈 Finlytics

> Plataforma de controle de investimentos em ações, com funcionalidades de cadastro, edição, exclusão (soft e hard delete), histórico e cálculo automático de lucro/prejuízo.

## 🧾 Descrição

O **Finlytics** é um sistema web que permite o gerenciamento de ações compradas pelos usuários, oferecendo uma visão clara e intuitiva da carteira, lucros e prejuízos.  
A aplicação foi construída utilizando ASP.NET Core no backend e React.js no frontend, com integração ao banco de dados MySQL.  

Funcionalidades principais:
- Cadastro de novas ações
- Edição e exclusão (soft delete)
- Histórico de ações excluídas
- Cálculo automático de lucro/prejuízo
- Interface moderna com Bootstrap 5

---

## 👥 Integrantes da Dupla

- Fernando Araujo Pereira – [Fpereiraaraujo](https://github.com/Fpereiraaraujo)  
- Eduardo Bryan Braga Rocha – [eduardobbr](https://github.com/eduardobbr)

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem Backend:** C# (.NET 8)
- **Framework Backend:** ASP.NET Core
- **ORM:** Entity Framework Core
- **Frontend:** React.js
- **Estilização:** Bootstrap 5
- **Banco de Dados:** MySQL
- **Versionamento:** Git + GitHub

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)
- Node.js 18+
- MySQL instalado
- Git instalado

### Passos

#### 🔧 Backend

```bash
# 1. Clone o repositório
git clone https://github.com/eduardobbr/Finlytics-Csharp.git

# 2. Acesse a pasta do backend
cd Finlytics-Csharp

# 3. Restaure os pacotes
dotnet restore

# 4. Atualize o banco de dados
dotnet ef database update

# 5. Execute a aplicação
dotnet run
```

#### 💻 Frontend

```bash
# 1. Acesse a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm start
```

---

## 🔑 Configuração do Banco de Dados

### Exemplo do `appsettings.Development.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "server=localhost;database=FinlyticsDb;user=root;password=rootroot"
  }
}
```

---

## 📄 Licença

Este projeto é acadêmico e foi desenvolvido como parte das atividades da disciplina de Programação Web.
