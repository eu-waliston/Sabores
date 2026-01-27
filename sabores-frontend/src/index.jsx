import React from 'react';
import ReactDOM from 'react-dom/client';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import './utilities/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Desabilitar React DevTools em produção
if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

// Configuração de Performance
const reportHandler = process.env.NODE_ENV === 'production' 
  ? reportWebVitals
  : undefined;

// Função para medcar performance
const measurePerformance = () => {
  if ('performance' in window) {
    const [navigationEntry] = performance.getEntriesByType('navigation');
    if (navigationEntry) {
      const { domContentLoadedEventEnd, loadEventEnd } = navigationEntry;
      console.log(`DOM carregado em: ${domContentLoadedEventEnd.toFixed(2)}ms`);
      console.log(`Página carregada em: ${loadEventEnd.toFixed(2)}ms`);
    }
  }
};

// Configuração do Service Worker (PWA)
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registrado com sucesso:', registration);
    } catch (error) {
      console.error('Falha ao registrar Service Worker:', error);
    }
  }
};

// Verificação de compatibilidade
const checkCompatibility = () => {
  const requiredFeatures = [
    'Promise',
    'fetch',
    'IntersectionObserver',
    'ResizeObserver',
    'MutationObserver'
  ];

  const missingFeatures = requiredFeatures.filter(feature => !(feature in window));
  
  if (missingFeatures.length > 0) {
    console.warn('Funcionalidades não suportadas:', missingFeatures);
    // Você pode adicionar polyfills aqui se necessário
  }
};

// Configuração do tema
const initializeTheme = () => {
  // Verificar preferência salva ou do sistema
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  
  // Observar mudanças na preferência do sistema
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
  });
};

// Função principal de inicialização
const initializeApp = () => {
  // Verificar compatibilidade
  checkCompatibility();
  
  // Configurar tema
  initializeTheme();
  
  // Registrar Service Worker
  registerServiceWorker();
  
  // Medir performance inicial
  measurePerformance();
  
  // Renderizar aplicação
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Log de ambiente
  console.log(`Ambiente: ${process.env.NODE_ENV}`);
  console.log(`Versão: ${process.env.REACT_APP_VERSION || '1.0.0'}`);
  
  // Configuração de erro global
  window.addEventListener('error', (event) => {
    console.error('Erro global:', event.error);
    // Aqui você pode enviar o erro para um serviço de monitoramento
    // ex: Sentry, LogRocket, etc.
  });
  
  // Configuração de rejeição de promise não tratada
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Promise não tratada:', event.reason);
  });
};

// Inicializar aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Exportar para uso em Service Worker ou outros contextos
export { reportHandler };