# Revisão Técnica — App Gestão Financeira

## Visão Geral

Aplicativo mobile de finanças pessoais que permite o controle de receitas e despesas. O usuário pode cadastrar transações, organizá-las por categorias, visualizar gráficos de resumo e alternar entre temas visuais.

**Stack principal:**
- **Frontend:** React Native com Expo (mobile cross-platform)
- **Backend:** Node.js + Express (API REST)
- **Banco de dados:** MySQL com Prisma ORM
- **Autenticação:** JWT (JSON Web Token)

---

## Estrutura de Pastas

```
gestao_financeira/
├── frontend/
│   ├── app/                  # Telas do app (roteamento por arquivo - Expo Router)
│   │   ├── _layout.jsx       # Layout raiz: SafeArea, tema, autenticação, estado global
│   │   ├── login.jsx         # Tela de login e cadastro
│   │   └── (tabs)/           # Navegação em abas
│   │       ├── index.jsx         # Home — lista de transações
│   │       ├── add-transactions.jsx  # Wizard de 3 passos para adicionar transação
│   │       ├── categories.jsx    # Gerenciamento de categorias
│   │       ├── summary.jsx       # Resumo mensal/anual com gráficos
│   │       └── settings.jsx      # Tema, paleta de cores, logout
│   ├── components/           # Componentes reutilizáveis de UI
│   ├── contexts/             # Estado global via React Context
│   │   ├── AuthContext.jsx   # Token e dados do usuário autenticado
│   │   ├── GlobalState.jsx   # Transações e categorias
│   │   └── ThemeContext.jsx  # Tema claro/escuro e paleta de cores
│   ├── constants/            # Paletas de cores, categorias padrão
│   ├── hooks/                # Hooks utilitários (color scheme)
│   ├── services/
│   │   └── api.js            # Cliente HTTP com todas as chamadas à API
│   └── styles/               # Estilos globais
│
└── backend/
    ├── src/
    │   ├── server.js         # Inicialização do Express
    │   ├── routes/           # Rotas: auth, categories, transactions
    │   ├── middlewares/      # Autenticação JWT, tratamento de erros
    │   ├── schemas/          # Schemas de validação com Zod
    │   └── lib/
    │       └── prisma.js     # Singleton do cliente Prisma
    └── prisma/
        ├── schema.prisma     # Modelos do banco (User, Category, Transaction)
        ├── seed.js           # Script de seed com dados iniciais
        └── migrations/       # Histórico de migrações do banco
```

---

## Frontend — Tecnologias e Justificativas

### React Native 0.81.5 + Expo 54
- **O que faz:** Framework para criação de apps mobile em JavaScript/JSX que compila para iOS e Android nativos.
- **Por que foi usado:** Permite desenvolver um único código para múltiplas plataformas. O Expo adiciona uma camada de ferramentas (build, deploy, módulos nativos) que acelera o desenvolvimento sem precisar configurar Android Studio ou Xcode.

---

### Expo Router (`expo-router` ~6.0.24)
- **O que faz:** Sistema de navegação baseado em arquivos, semelhante ao Next.js. Cada arquivo dentro da pasta `app/` vira uma rota automaticamente.
- **Por que foi usado:** Simplifica a configuração de navegação. A estrutura de pastas (`(tabs)/`, `_layout.jsx`) já define as rotas sem a necessidade de registrar cada tela manualmente.

---

### React Navigation (`@react-navigation/native`, `@react-navigation/bottom-tabs`)
- **O que faz:** Biblioteca de navegação do ecossistema React Native. O Expo Router a utiliza internamente para montar as abas (tabs) da tela principal.
- **Por que foi usado:** É o padrão da comunidade para navegação em React Native, com suporte a gestos, animações e comportamento nativo em iOS e Android.

---

### React Context API (`AuthContext`, `GlobalState`, `ThemeContext`)
- **O que faz:** Mecanismo nativo do React para compartilhar estado entre componentes sem precisar passar props manualmente por toda a árvore.
- **Por que foi usado:** O app possui três tipos de estado global — autenticação do usuário, dados financeiros (transações/categorias) e preferências visuais. O Context evita "prop drilling" e mantém cada responsabilidade isolada em seu próprio contexto.

  | Contexto | Responsabilidade |
  |---|---|
  | `AuthContext` | Token JWT, dados do usuário, login/logout |
  | `GlobalState` | Lista de transações e categorias, sincronização com a API |
  | `ThemeContext` | Modo claro/escuro, paleta de cores selecionada |

---

### AsyncStorage (`@react-native-async-storage/async-storage` 2.2.0)
- **O que faz:** Armazenamento persistente de chave-valor no dispositivo, equivalente ao `localStorage` do browser.
- **Por que foi usado:** Persiste o token JWT e as preferências de tema entre sessões. Ao reabrir o app, o usuário continua autenticado e com o tema que havia escolhido.

---

### React Native SVG (`react-native-svg` 15.12.1)
- **O que faz:** Permite renderizar gráficos vetoriais (SVG) dentro do app React Native.
- **Por que foi usado:** Usado em dois lugares: no `CurvedHeader` (ondas e bordas arredondadas no topo das telas) e no `AnimatedDonut` (gráfico de pizza para visualização das despesas por categoria). SVG é ideal para esses casos por ser escalável e permitir animações precisas.

---

### Expo Vector Icons (`@expo/vector-icons` ^15.0.3)
- **O que faz:** Coleção de ícones vetoriais (Ionicons, MaterialIcons, FontAwesome, etc.) prontos para uso no Expo.
- **Por que foi usado:** Fornece os ícones usados nos itens de categoria, na tab bar customizada e em botões de ação do app, sem necessidade de importar assets de imagem.

---

### Expo Haptics (`expo-haptics` ~15.0.8)
- **O que faz:** Aciona o motor de vibração do dispositivo com padrões específicos (impacto leve, médio, notificação de sucesso/erro).
- **Por que foi usado:** Melhora o feedback sensorial ao executar ações como adicionar uma transação ou selecionar uma categoria, tornando a experiência mais responsiva.

---

### DateTimePicker (`@react-native-community/datetimepicker` 8.4.4)
- **O que faz:** Componente nativo para seleção de data e hora, usando o seletor padrão do iOS ou Android.
- **Por que foi usado:** Utilizado no passo 3 do wizard de criação de transações para o usuário selecionar a data da transação. Por ser nativo, segue o look-and-feel de cada plataforma.

---

### Picker (`@react-native-picker/picker` 2.11.1)
- **O que faz:** Componente nativo de lista suspensa (dropdown) para seleção de opções.
- **Por que foi usado:** Permite selecionar opções dentro das configurações e formulários do app com o comportamento nativo de cada plataforma.

---

### Módulos de Infraestrutura Expo
| Módulo | Função |
|---|---|
| `expo-splash-screen` | Controla a tela de carregamento inicial enquanto fontes e dados são carregados |
| `expo-font` | Carrega fontes customizadas antes de exibir qualquer conteúdo |
| `expo-constants` | Acessa informações do manifesto do app (versão, configurações do `app.json`) |
| `expo-status-bar` | Controla a cor e estilo da barra de status do sistema operacional |
| `expo-system-ui` | Define a cor de fundo do sistema (barra de navegação Android) |
| `react-native-safe-area-context` | Provê informações sobre áreas seguras (notch, home indicator) para evitar que o conteúdo fique sobreposto |
| `react-native-screens` | Otimiza a renderização das telas usando fragmentos nativos ao invés de views comuns, melhorando a performance |
| `react-native-gesture-handler` | Base para gestos nativos (swipe, drag) usados pela navegação e componentes interativos |

---

## Backend — Tecnologias e Justificativas

### Node.js + Express 4
- **O que faz:** Servidor HTTP que expõe uma API REST para o app mobile consumir.
- **Por que foi usado:** Node.js é leve e eficiente para APIs REST. O Express é o framework mais popular do ecossistema Node, com roteamento simples, middlewares e grande quantidade de bibliotecas compatíveis.

---

### Prisma ORM (`prisma` + `@prisma/client` 5.22.0)
- **O que faz:** ORM (Object-Relational Mapper) que abstrai o banco de dados. O schema em `prisma/schema.prisma` define os modelos e o Prisma gera um cliente TypeScript/JavaScript com queries tipadas.
- **Por que foi usado:** Elimina a necessidade de escrever SQL manual. As migrações são versionadas automaticamente e o cliente gerado oferece autocompletar e segurança de tipos nas queries.

---

### MySQL
- **O que faz:** Banco de dados relacional para persistência de todos os dados do app (usuários, categorias, transações).
- **Por que foi usado:** Banco relacional é ideal para os relacionamentos do projeto (usuário → transações, transação → categoria). MySQL é amplamente utilizado, tem boa performance e integração nativa com o Prisma.

  **Modelos do banco:**

  | Modelo | Campos principais |
  |---|---|
  | `User` | id, name, email (único), password (hash), createdAt |
  | `Category` | id, name, displayName, icon, background (hex), isIncome, isDefault, userId |
  | `Transaction` | id, description, value (Decimal 12,2), date, categoryId, userId |

---

### JSON Web Token (`jsonwebtoken` ^9.0.3)
- **O que faz:** Gera e valida tokens JWT para autenticação stateless.
- **Por que foi usado:** Após o login, o servidor emite um token com expiração de 7 dias. O app envia esse token no header `Authorization: Bearer <token>` em todas as requisições protegidas. Não é necessário manter sessões no servidor.

---

### Bcryptjs (`bcryptjs` ^3.0.3)
- **O que faz:** Aplica hash criptográfico nas senhas antes de armazená-las no banco de dados.
- **Por que foi usado:** Nunca armazenar senhas em texto puro. O bcrypt aplica um salt aleatório e múltiplas rodadas de hash (10 rounds), tornando ataques de força bruta inviáveis mesmo que o banco seja comprometido.

---

### Zod (`zod` ^3.23.8)
- **O que faz:** Biblioteca de validação e parsing de schemas em TypeScript/JavaScript.
- **Por que foi usado:** Valida os dados recebidos nas rotas antes de processá-los. Garante que campos obrigatórios estejam presentes, tipos corretos e regras de negócio respeitadas (ex: senha mínimo 6 caracteres, cor em formato hex). Erros de validação retornam automaticamente HTTP 400 com detalhes.

---

### CORS (`cors` ^2.8.5)
- **O que faz:** Middleware que configura os headers de Cross-Origin Resource Sharing no Express.
- **Por que foi usado:** O app mobile acessa a API de uma origem diferente (Expo dev server). Sem o CORS configurado, requisições seriam bloqueadas pelo browser/webview.

---

### Dotenv (`dotenv` ^16.4.5)
- **O que faz:** Carrega variáveis de ambiente de um arquivo `.env` para `process.env`.
- **Por que foi usado:** Separa configurações sensíveis (URL do banco, porta, secret do JWT) do código-fonte. O arquivo `.env` não é versionado no git.

---

### Nodemon (`nodemon` ^3.1.4) — devDependency
- **O que faz:** Monitora alterações nos arquivos do projeto e reinicia o servidor Node automaticamente.
- **Por que foi usado:** Agiliza o desenvolvimento — não é necessário parar e reiniciar o servidor manualmente a cada alteração no código.

---

## Endpoints da API

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Não | Cadastra novo usuário |
| POST | `/auth/login` | Não | Retorna token JWT |
| GET | `/categories` | Sim | Lista categorias (padrão + do usuário) |
| POST | `/categories` | Sim | Cria nova categoria |
| PUT | `/categories/:id` | Sim | Atualiza categoria |
| DELETE | `/categories/:id` | Sim | Remove categoria (bloqueia padrão do sistema) |
| GET | `/transactions` | Sim | Lista todas as transações do usuário |
| POST | `/transactions` | Sim | Cria nova transação |
| PUT | `/transactions/:id` | Sim | Atualiza transação |
| DELETE | `/transactions/:id` | Sim | Remove transação |
