export const ROUTES = {
  // Páginas Principais
  HOME: '/',
  FEED: '/feed',

  // Receitas
  RECIPES: '/receitas',
  RECIPE_DETAIL: '/receita/:id',
  CREATE_RECIPE: '/receitas/nova',
  EDIT_RECIPE: '/receitas/:id/editar',

  // Categorias
  CATEGORIES: '/categorias',
  CATEGORY_DETAIL: '/categoria/:slug',

  // Busca
  SEARCH: '/busca',

  // Informações
  ABOUT: '/sobre',
  CONTACT: '/contato',
  BLOG: '/blog',
  FAQ: '/faq',

  // Autenticação
  LOGIN: '/login',
  REGISTER: '/registrar',
  RECOVERY: '/recuperar-senha',
  RESET_PASSWORD: '/redefinir-senha/:token',
  VERIFY_EMAIL: '/verificar-email/:token?',

  // Usuário
  PROFILE: '/perfil',
  MY_RECIPES: '/minhas-receitas',
  FAVORITES: '/favoritos',
  SETTINGS: '/configuracoes',

  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/usuarios',
  ADMIN_RECIPES: '/admin/receitas',
  ADMIN_CATEGORIES: '/admin/categorias',

  // API Endpoints (se necessário para referência)
  API: {
    BASE: '/api/v1',
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      REFRESH: '/auth/refresh',
      VERIFY: '/auth/verify',
    },
    USERS: '/users',
    RECIPES: '/recipes',
    CATEGORIES: '/categories',
    COMMENTS: '/comments',
    FAVORITES: '/favorites',
    UPLOAD: '/upload',
  }
};

// Helper para gerar URLs dinâmicas
export const generateRoute = (route, params = {}) => {
  let generatedRoute = route;

  Object.keys(params).forEach(key => {
    generatedRoute = generatedRoute.replace(`:${key}`, params[key]);
  });

  return generatedRoute;
};

// Navegações comuns
export const NAVIGATION = {
  // Menu principal
  MAIN: [
    { path: ROUTES.HOME, label: 'Home', icon: 'home' },
    { path: ROUTES.FEED, label: 'Feed', icon: 'feed' },
    { path: ROUTES.RECIPES, label: 'Receitas', icon: 'recipes' },
    { path: ROUTES.CATEGORIES, label: 'Categorias', icon: 'categories' },
    { path: ROUTES.BLOG, label: 'Blog', icon: 'blog' },
  ],

  // Menu do usuário
  USER: [
    { path: ROUTES.PROFILE, label: 'Meu Perfil', icon: 'profile' },
    { path: ROUTES.MY_RECIPES, label: 'Minhas Receitas', icon: 'my-recipes' },
    { path: ROUTES.FAVORITES, label: 'Favoritos', icon: 'favorites' },
    { path: ROUTES.SETTINGS, label: 'Configurações', icon: 'settings' },
  ],

  // Menu footer
  FOOTER: [
    { path: ROUTES.ABOUT, label: 'Sobre Nós' },
    { path: ROUTES.CONTACT, label: 'Contato' },
    { path: ROUTES.FAQ, label: 'FAQ' },
    { path: '/termos', label: 'Termos de Serviço' },
    { path: '/privacidade', label: 'Política de Privacidade' },
  ]
};