# **Sabores** 🍽️

<div align="center">

![Sabores Logo](https://github.com/wal-wizard/Sabores/assets/82295321/6820a157-b0ec-4fd6-b916-4de192f3c9d7)

**Descubra, compartilhe e saboreie as melhores receitas!**

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-✓-blue.svg)](https://www.typescriptlang.org/)
[![Sass](https://img.shields.io/badge/Sass-1.64-hotpink.svg)](https://sass-lang.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black.svg)](https://vercel.com)

[✨ Acesse o Projeto](https://sabores-ten.vercel.app/) · [🐛 Reportar Bug](https://github.com/wal-wizard/Sabores/issues) · [💡 Sugerir Feature](https://github.com/wal-wizard/Sabores/issues)

</div>

## 📋 Índice

- [✨ Demonstração](#-demonstração)
- [🚀 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias](#️-tecnologias)
- [🏗️ Arquitetura](#️-arquitetura)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [⚡ Começando](#-começando)
- [🔧 Scripts Disponíveis](#-scripts-disponíveis)
- [🎨 Design System](#-design-system)
- [🧪 Testes](#-testes)
- [🌐 Deploy](#-deploy)

## ✨ Demonstração

### 🏠 Página Inicial
![Home Page](https://github.com/wal-wizard/Sabores/assets/82295321/35957213-7b98-468c-8a84-6ba274367237)

### 📱 Responsividade
<div align="center">
  <img src="https://img.shields.io/badge/Desktop-✓-green" alt="Desktop" />
  <img src="https://img.shields.io/badge/Tablet-✓-blue" alt="Tablet" />
  <img src="https://img.shields.io/badge/Mobile-✓-orange" alt="Mobile" />
</div>

### 🎥 Vídeo Demo
> [Assista ao vídeo de demonstração](https://www.youtube.com/watch?v=...) *(link a ser adicionado)*

## 🚀 Funcionalidades

### ✅ Implementadas
- **🔍 Busca Avançada** - Filtre receitas por ingredientes, tempo de preparo, dificuldade
- **📖 Visualizador de Receitas** - Interface detalhada com passo a passo
- **👤 Sistema de Autenticação** - Cadastro, login, recuperação de senha
- **❤️ Favoritos** - Salve receitas para acessar depois
- **📱 Design Responsivo** - Experiência otimizada para todos os dispositivos
- **🎨 Interface Moderna** - Design atrativo e intuitivo

### 🔄 Em Desenvolvimento
- **👨‍🍳 Criar Receitas** - Editor completo com upload de imagens
- **💬 Comentários e Avaliações** - Sistema de interação entre usuários
- **📊 Dashboard Pessoal** - Estatísticas e recomendações personalizadas
- **🔔 Notificações** - Alertas sobre receitas favoritas
- **🌙 Modo Escuro** - Tema escuro para uso noturno

### 📅 Planejadas
- **📱 App Mobile** - Aplicativo nativo para iOS e Android
- **🛒 Lista de Compras** - Gere listas automaticamente das receitas
- **👥 Comunidades** - Grupos por interesses culinários
- **🎥 Video Receitas** - Suporte a tutoriais em vídeo
- **🤖 IA Culinária** - Sugestões inteligentes de receitas

## 🛠️ Tecnologias

### **Frontend**
<p align="left">
  <img src="https://skillicons.dev/icons?i=react,typescript,html,css,sass,redux" />
</p>

- **React 18** - Biblioteca principal com hooks e contexto
- **TypeScript** - Tipagem estática para maior segurança
- **Sass/SCSS** - Sistema de estilização com módulos
- **React Router DOM** - Navegação client-side
- **React Hook Form** - Gerenciamento de formulários
- **React Icons** - Biblioteca de ícones
- **Axios** - Cliente HTTP para APIs
- **Vite** - Build tool e bundler (opcional)

### **Backend**
<p align="left">
  <img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,jest" />
</p>

- **Node.js + Express** - API RESTful
- **MongoDB + Mongoose** - Banco de dados NoSQL
- **JWT + Passport** - Autenticação e autorização
- **Multer** - Upload de arquivos
- **Bcrypt** - Hash de senhas
- **Helmet** - Segurança HTTP
- **CORS** - Cross-Origin Resource Sharing

### **DevOps & Ferramentas**
<p align="left">
  <img src="https://skillicons.dev/icons?i=git,github,vercel,aws,docker,figma" />
</p>

- **Git + GitHub** - Controle de versão
- **Vercel** - Deploy do frontend
- **Render/AWS** - Hospedagem do backend
- **Docker** - Containerização
- **Figma** - Design e prototipagem
- **ESLint + Prettier** - Padronização de código
- **Jest + React Testing Library** - Testes

## 🏗️ Arquitetura

### **Frontend Architecture**

```

┌─────────────────────────────────────────────────────────────┐
│                        Component Tree                        │
├─────────────────────────────────────────────────────────────┤
│  App                                                        │
│  ├── Layout                                                 │
│  │   ├── TopMenu (Navigation, Search, UserMenu)            │
│  │   ├── LeftMenu (Categories)                             │
│  │   └── Footer                                            │
│  │                                                          │
│  ├── Pages                                                  │
│  │   ├── Home (Hero, Stats, Features, Feed)                │
│  │   ├── Recipes (Grid, Filters, Pagination)               │
│  │   ├── RecipeDetail (Steps, Ingredients, Comments)       │
│  │   ├── Auth (Login, Register, Reset)                     │
│  │   └── User (Profile, Favorites, Settings)               │
│  │                                                          │
│  ├── Context                                                │
│  │   ├── AuthContext (Authentication)                      │
│  │   ├── ThemeContext (Dark/Light Mode)                    │
│  │   └── RecipeContext (Global State)                      │
│  │                                                          │
│  └── Utilities                                              │
│      ├── Hooks (useAuth, useRecipes, useTheme)             │
│      ├── Services (API calls)                              │
│      └── Constants (Routes, API endpoints)                 │
└─────────────────────────────────────────────────────────────┘

```
### **Backend Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                         API Structure                        │
├─────────────────────────────────────────────────────────────┤
│  Controllers                                                │
│  ├── authController.js      # Authentication               │
│  ├── userController.js      # User management              │
│  ├── recipeController.js    # Recipe CRUD                  │
│  ├── categoryController.js  # Categories                   │
│  └── uploadController.js    # File uploads                 │
│                                                             │
│  Models                                                     │
│  ├── User.js               # User schema                   │
│  ├── Recipe.js             # Recipe schema                 │
│  ├── Category.js           # Category schema               │
│  └── Comment.js            # Comment schema                │
│                                                             │
│  Routes                                                     │
│  ├── authRoutes.js         # /api/auth/*                   │
│  ├── userRoutes.js         # /api/users/*                  │
│  ├── recipeRoutes.js       # /api/recipes/*                │
│  └── uploadRoutes.js       # /api/upload/*                 │
│                                                             │
│  Middleware                                                 │
│  ├── auth.js              # Authentication middleware      │
│  ├── errorHandler.js      # Error handling                 │
│  └── validation.js        # Request validation             │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estrutura do Projeto

```

sabores/
├── 📂 backend/                    # API Server
│   ├── 📂 src/
│   │   ├── 📂 controllers/       # Business logic
│   │   ├── 📂 models/           # MongoDB schemas
│   │   ├── 📂 routes/           # API endpoints
│   │   ├── 📂 middleware/       # Express middleware
│   │   ├── 📂 config/           # Configuration files
│   │   ├── 📂 utils/           # Utility functions
│   │   └── app.js              # Express app setup
│   ├── package.json
│   └── server.js              # Entry point
│
├── 📂 frontend/                   # React Application
│   ├── 📂 public/                # Static assets
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── images/
│   │
│   └── 📂 src/                   # Source code
│       ├── 📂 assets/           # Images, fonts, etc.
│       ├── 📂 components/       # Reusable components
│       │   ├── 📂 common/      # ErrorBoundary, Loading, etc.
│       │   ├── 📂 layout/      # Layout components
│       │   ├── 📂 ui/          # UI components (buttons, cards)
│       │   └── 📂 features/    # Feature components
│       │
│       ├── 📂 pages/            # Page components
│       │   ├── Home/
│       │   ├── Recipes/
│       │   ├── RecipeDetail/
│       │   ├── Auth/
│       │   └── User/
│       │
│       ├── 📂 hooks/            # Custom React hooks
│       │   ├── useAuth.js
│       │   ├── useRecipes.js
│       │   └── useLocalStorage.js
│       │
│       ├── 📂 context/          # React Context
│       │   ├── AuthContext.js
│       │   └── ThemeContext.js
│       │
│       ├── 📂 services/         # API services
│       │   ├── authService.js
│       │   ├── recipeService.js
│       │   └── api.js
│       │
│       ├── 📂 utils/           # Utility functions
│       │   ├── helpers.js
│       │   ├── constants.js
│       │   └── validation.js
│       │
│       ├── 📂 styles/          # Global styles
│       │   ├── variables.scss
│       │   ├── mixins.scss
│       │   └── globals.scss
│       │
│       ├── 📂 routes/          # Routing configuration
│       │   ├── AppRoutes.js
│       │   └── PrivateRoute.js
│       │
│       ├── App.jsx             # Root component
│       ├── main.jsx           # Entry point
│       └── index.scss         # Global styles entry
│
├── 📂 docs/                     # Documentation
│   ├── api.md                 # API documentation
│   ├── design.md              # Design system
│   └── deployment.md          # Deployment guide
│
├── 📂 .github/                 # GitHub configurations
│   ├── workflows/             # CI/CD pipelines
│   └── ISSUE_TEMPLATE/        # Issue templates
│
├── .env.example               # Environment variables template
├── .gitignore
├── package.json
├── README.md                  # This file
└── LICENSE                    # MIT License

```

## ⚡ Começando

### Pré-requisitos
   - Node.js 16+

   - npm ou yarn

   - MongoDB (local ou Atlas)

   - Git


## Instalação Local

```

1 - Clone o repositório

git clone https://github.com/wal-wizard/Sabores.git
cd Sabores

2 - Configure o Backend

cd backend
npm install
cp .env.example .env
# Configure suas variáveis de ambiente no .env
npm run dev

3 - Configure o Frontend

cd ../frontend
npm install
cp .env.example .env
# Configure suas variáveis de ambiente no .env
npm run dev

4 - Acesse a aplicação

Frontend: http://localhost:3000

Backend API: http://localhost:5000

```

## Usando Docker

```

# Clone o projeto
git clone https://github.com/wal-wizard/Sabores.git
cd Sabores

# Inicie com Docker Compose
docker-compose up --build

# Acesse http://localhost:3000

```

## 🔧 Scripts Disponíveis

```
# Frontend

npm run dev        # Inicia servidor de desenvolvimento
npm run build      # Cria build de produção
npm run preview    # Visualiza build de produção
npm run lint       # Executa ESLint
npm run format     # Formata código com Prettier
npm test           # Executa testes
npm run test:watch # Executa testes em modo watch

# Backend

npm run dev        # Inicia servidor com nodemon
npm start         # Inicia servidor de produção
npm test          # Executa testes
npm run lint      # Executa ESLint

```
## 🎨 Design System
```
// Tema Principal (Laranja Sabores)

$primary: #f97316;
$primary-light: #fdba74;
$primary-dark: #c2410c;

// Cores de Suporte
$secondary: #3b82f6;
$success: #22c55e;
$warning: #eab308;
$error: #ef4444;

// Neutros
$white: #ffffff;
$gray-50: #fafafa;
$gray-900: #171717;

// Tipografia

// Fontes
$font-primary: 'Poppins', sans-serif;
$font-secondary: 'Caprasimo', serif;
$font-mono: 'Inter', monospace;

// Escala de Tamanhos
$text-xs: 0.75rem;    // 12px
$text-base: 1rem;     // 16px
$text-xl: 1.25rem;    // 20px
$text-4xl: 2.25rem;   // 36px

```

## Componentes

  - Botões: Primário, Secundário, Outline

  - Cards: Receita, Categoria, Usuário

  - Formulários: Inputs, Selects, Checkboxes

  - Feedback: Loaders, Toasts, Modais

# 🧪 Testes

```
// Frontend

# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Gerar cobertura de código
npm run test:coverage

// Backend

# Executar testes unitários
npm test

# Executar testes de integração
npm run test:integration

```
## Estrutura de Testes
```

tests/
├── unit/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── integration/
│   ├── api/
│   └── auth/
└── e2e/
    ├── recipes.spec.js
    └── auth.spec.js

```


## 🌐 Deploy

```

Frontend (Vercel)

# Instale a CLI da Vercel
npm i -g vercel

# Faça deploy
vercel --prod

```

### Backend (Render)

   - Conecte seu repositório no Render

   - Configure as variáveis de ambiente

   - Deploy automático com GitHub
  
## Variáveis de Ambiente

```
# Frontend (.env)
VITE_API_URL=https://api.sabores.com
VITE_APP_NAME=Sabores
VITE_GOOGLE_ANALYTICS_ID=UA-XXXXX-Y

# Backend (.env)
MONGODB_URI=mongodb+srv://...
JWT_SECRET=seu_secret_jwt_aqui
NODE_ENV=production
PORT=5000

```

## Feito com ❤️ e ☕ por amantes de culinária

"Compartilhar receitas é compartilhar amor" 🍳