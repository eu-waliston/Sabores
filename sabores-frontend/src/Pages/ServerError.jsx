import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Routes/constants';
import './ErrorPage.scss';

const ServerError = () => {
    return (
        <div className="error-page server-error">
            <div className="error-page__container">
                <div className="error-page__content">
                    <div className="error-page__icon">⚠️</div>
                    <h1 className="error-page__title">500</h1>
                    <h2 className="error-page__subtitle">Erro no Servidor</h2>
                    <p className="error-page__message">
                        Oops! Algo deu errado no nosso servidor. Nossa equipe já foi notificada e está trabalhando para resolver o problema.
                    </p>

                    <div className="error-page__actions">
                        <Link to={ROUTES.HOME} className="error-page__button">
                            Voltar para Home
                        </Link>
                        <button
                            onClick={() => window.location.reload()}
                            className="error-page__button error-page__button--secondary"
                        >
                            Tentar novamente
                        </button>
                    </div>

                    <div className="error-page__help">
                        <p>Se o problema persistir, entre em contato:</p>
                        <a href="mailto:support@sabores.com" className="error-page__link">
                            support@sabores.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerError;