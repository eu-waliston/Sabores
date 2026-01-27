import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes/constants';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Página não encontrada</h2>
          
          <p className="not-found__message">
            A página que você está procurando não existe ou foi movida.
          </p>
          
          <div className="not-found__actions">
            <Link to={ROUTES.HOME} className="not-found__button">
              Voltar para início
            </Link>
            
            <Link to={ROUTES.RECIPES} className="not-found__link">
              Explorar receitas
            </Link>
          </div>
          
          <div className="not-found__search">
            <p className="not-found__search-title">Ou tente buscar:</p>
            <div className="not-found__search-tags">
              <Link to="/receitas?categoria=sobremesas" className="not-found__search-tag">
                🍰 Sobremesas
              </Link>
              <Link to="/receitas?categoria=massas" className="not-found__search-tag">
                🍝 Massas
              </Link>
              <Link to="/receitas?categoria=saudavel" className="not-found__search-tag">
                🥗 Saudável
              </Link>
              <Link to="/receitas?categoria=rapido" className="not-found__search-tag">
                ⚡ Rápido
              </Link>
            </div>
          </div>
        </div>
        
        <div className="not-found__image">
          <div className="not-found__image-container">
            <div className="not-found__image-404">404</div>
            <div className="not-found__image-dish">🍳</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;