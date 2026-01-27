export const ROUTES = {
  // Públicas
  HOME: '/',
  ABOUT: '/sobre',
  CONTACT: '/contato',
  FAQ: '/faq',
  BLOG: '/blog',
  RECIPES: '/receitas',
  RECIPE_DETAIL: '/receitas/:id',
  CATEGORIES: '/categorias',
  CATEGORY_DETAIL: '/categoria/:slug',
  SEARCH: '/busca',
  
  // Autenticação
  LOGIN: '/login',
  REGISTER: '/registrar',
  RECOVERY: '/recuperar-senha',
  RESET_PASSWORD: '/resetar-senha/:token',
  VERIFY_EMAIL: '/verificar-email/:token',
  
  // Privadas (usuário logado)
  PROFILE: '/perfil',
  PROFILE_EDIT: '/perfil/editar',
  MY_RECIPES: '/minhas-receitas',
  FAVORITES: '/favoritos',
  NOTIFICATIONS: '/notificacoes',
  SETTINGS: '/configuracoes',
  
  // Criação/Edição
  CREATE_RECIPE: '/receitas/nova',
  EDIT_RECIPE: '/receitas/:id/editar',
  
  // Admin
  ADMIN_DASHBOARD: '/admin',
  ADMIN_USERS: '/admin/usuarios',
  ADMIN_RECIPES: '/admin/receitas',
  ADMIN_CATEGORIES: '/admin/categorias',
  ADMIN_STATS: '/admin/estatisticas',
  
  // Error
  NOT_FOUND: '/404',
  ERROR: '/erro',
};

export const ROUTE_NAMES = {
  [ROUTES.HOME]: 'Início',
  [ROUTES.LOGIN]: 'Entrar',
  [ROUTES.REGISTER]: 'Registrar',
  [ROUTES.RECIPES]: 'Receitas',
  [ROUTES.PROFILE]: 'Meu Perfil',
  [ROUTES.MY_RECIPES]: 'Minhas Receitas',
  [ROUTES.FAVORITES]: 'Favoritos',
  [ROUTES.ADMIN_DASHBOARD]: 'Dashboard',
};

export const NAVIGATION = [
  {
    path: ROUTES.HOME,
    name: 'Início',
    icon: '🏠',
    showInMenu: true,
    showInFooter: true,
  },
  {
    path: ROUTES.RECIPES,
    name: 'Receitas',
    icon: '🍳',
    showInMenu: true,
    showInFooter: true,
  },
  {
    path: ROUTES.CATEGORIES,
    name: 'Categorias',
    icon: '📁',
    showInMenu: true,
    showInFooter: true,
  },
  {
    path: ROUTES.BLOG,
    name: 'Blog',
    icon: '📝',
    showInMenu: true,
    showInFooter: false,
  },
  {
    path: ROUTES.ABOUT,
    name: 'Sobre',
    icon: 'ℹ️',
    showInMenu: false,
    showInFooter: true,
  },
  {
    path: ROUTES.CONTACT,
    name: 'Contato',
    icon: '📧',
    showInMenu: false,
    showInFooter: true,
  },
];