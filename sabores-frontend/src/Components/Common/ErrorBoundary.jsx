import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../Routes/constants';
import './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log do erro (em produção, enviar para serviço de tracking)
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__container">
            <div className="error-boundary__icon">⚠️</div>
            
            <div className="error-boundary__content">
              <h1 className="error-boundary__title">Oops! Algo deu errado</h1>
              
              <p className="error-boundary__message">
                Desculpe pelo inconveniente. Estamos trabalhando para resolver o problema.
              </p>

              <div className="error-boundary__actions">
                <button 
                  onClick={this.handleRetry}
                  className="error-boundary__button error-boundary__button--primary"
                >
                  Tentar novamente
                </button>
                
                <Link 
                  to={ROUTES.HOME} 
                  className="error-boundary__button error-boundary__button--secondary"
                >
                  Voltar para início
                </Link>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="error-boundary__details">
                  <summary className="error-boundary__details-summary">
                    Detalhes do erro (desenvolvimento)
                  </summary>
                  <pre className="error-boundary__details-pre">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;