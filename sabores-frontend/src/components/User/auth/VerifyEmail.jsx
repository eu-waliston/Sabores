import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import "./Auth.scss";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Chamada à API para verificar email
        // await api.verifyEmail(token);
        
        // Simulação
        setTimeout(() => {
          setStatus("success");
          setMessage("Email verificado com sucesso!");
        }, 1500);
      } catch (error) {
        setStatus("error");
        setMessage("Link de verificação inválido ou expirado.");
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus("error");
      setMessage("Token de verificação não fornecido.");
    }
  }, [token]);

  const handleResendEmail = async () => {
    try {
      // await api.resendVerificationEmail();
      setMessage("Email de verificação reenviado com sucesso!");
    } catch (error) {
      setMessage("Erro ao reenviar email. Tente novamente.");
    }
  };

  if (status === "verifying") {
    return (
      <AuthLayout
        title="Verificando email..."
        subtitle="Por favor, aguarde"
        showBackLink={false}
      >
        <div className="auth-verifying">
          <div className="auth-verifying__spinner"></div>
          <p className="auth-verifying__message">
            Estamos verificando seu email...
          </p>
        </div>
      </AuthLayout>
    );
  }

  if (status === "error") {
    return (
      <AuthLayout
        title="Verificação falhou"
        subtitle="Não foi possível verificar seu email"
        showBackLink={true}
        backLinkText="Voltar"
        backLinkTo="/"
      >
        <div className="auth-error">
          <div className="auth-error__icon">
            <FaTimesCircle />
          </div>
          
          <div className="auth-error__content">
            <h3 className="auth-error__title">Verificação falhou</h3>
            <p className="auth-error__message">{message}</p>
            
            <div className="auth-error__actions">
              <button
                type="button"
                className="auth-error__button"
                onClick={handleResendEmail}
              >
                <FaEnvelope className="auth-error__button-icon" />
                Reenviar email de verificação
              </button>
              
              <Link to="/" className="auth-error__link">
                Ir para página inicial
              </Link>
            </div>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Email verificado!"
      subtitle="Sua conta está ativa e pronta para uso"
      showBackLink={false}
    >
      <div className="auth-success">
        <div className="auth-success__icon">
          <FaCheckCircle />
        </div>
        
        <div className="auth-success__content">
          <h3 className="auth-success__title">Conta verificada</h3>
          <p className="auth-success__message">
            Parabéns! Seu email foi verificado com sucesso. Sua conta agora está
            ativa e você pode aproveitar todos os recursos do Sabores.
          </p>
          
          <div className="auth-success__features">
            <h4 className="auth-success__features-title">
              Agora você pode:
            </h4>
            <ul className="auth-success__features-list">
              <li className="auth-success__feature">
                <span className="auth-success__feature-icon">🍳</span>
                <span className="auth-success__feature-text">
                  Criar e compartilhar receitas
                </span>
              </li>
              <li className="auth-success__feature">
                <span className="auth-success__feature-icon">❤️</span>
                <span className="auth-success__feature-text">
                  Salvar receitas favoritas
                </span>
              </li>
              <li className="auth-success__feature">
                <span className="auth-success__feature-icon">👨‍🍳</span>
                <span className="auth-success__feature-text">
                  Seguir outros chefs
                </span>
              </li>
              <li className="auth-success__feature">
                <span className="auth-success__feature-icon">💬</span>
                <span className="auth-success__feature-text">
                  Comentar e avaliar receitas
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="auth-success__actions">
          <Link to="/" className="auth-success__button auth-success__button--primary">
            Explorar receitas
          </Link>
          <Link to="/receitas/nova" className="auth-success__button">
            Criar minha primeira receita
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;