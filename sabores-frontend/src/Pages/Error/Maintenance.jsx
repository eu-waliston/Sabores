import React from 'react';
import { ROUTES } from '../../Routes/constants';
import './ErrorPages.scss';

const Maintenance = () => {
    return (
        <div className="error-page maintenance">
            <div className="error-page__container">
                <div className="error-page__content">
                    <div className="error-page__icon">🔧</div>
                    <h1 className="error-page__title">Em Manutenção</h1>
                    <h2 className="error-page__subtitle">Voltamos em breve!</h2>
                    <p className="error-page__message">
                        Estamos trabalhando para melhorar sua experiência. O site estará de volta em breve com novidades e melhorias.
                    </p>

                    <div className="error-page__countdown">
                        <p>Estamos trabalhando duro para voltar o mais rápido possível!</p>
                    </div>

                    <div className="error-page__contact">
                        <h3>Enquanto isso:</h3>
                        <ul>
                            <li>Siga-nos nas redes sociais para atualizações</li>
                            <li>Explore nossas receitas no Instagram @sabores</li>
                            <li>Volte em algumas horas</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Maintenance;