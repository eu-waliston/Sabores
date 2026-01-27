import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaLock, FaCheckCircle } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import PasswordField from "../forms/PasswordField";
import "./Auth.scss";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword, loading } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidToken, setIsValidToken] = useState(true);

  useEffect(() => {
    // Aqui você pode verificar se o token é válido
    // Fazendo uma chamada à API
    const verifyToken = async () => {
      try {
        // await api.verifyResetToken(token);
        setIsValidToken(true);
      } catch (error) {
        setIsValidToken(false);
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token]);

  const methods = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid },
  } = methods;

  const password = watch("password");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        type: "manual",
        message: "As senhas não coincidem",
      });
      return;
    }

    const result = await resetPassword(token, data.password);
    
    if (result.success) {
      setIsSubmitted(true);
    }
  };

  if (!isValidToken) {
    return (
      <AuthLayout
        title="Link inválido ou expirado"
        subtitle="O link de recuperação não é válido ou expirou"
        showBackLink={true}
        backLinkText="Voltar para login"
        backLinkTo="/login"
      >
        <div className="auth-error">
          <div className="auth-error__icon">⚠️</div>
          <div className="auth-error__content">
            <h3 className="auth-error__title">Link expirado</h3>
            <p className="auth-error__message">
              Este link de recuperação de senha expirou ou é inválido.
            </p>
            <p className="auth-error__action">
              Por favor, solicite um novo link de recuperação.
            </p>
          </div>
          <Link to="/recovery" className="auth-error__button">
            Solicitar novo link
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Senha alterada!"
        subtitle="Sua senha foi redefinida com sucesso"
        showBackLink={false}
      >
        <div className="auth-success">
          <div className="auth-success__icon">
            <FaCheckCircle />
          </div>
          
          <div className="auth-success__content">
            <h3 className="auth-success__title">Senha alterada</h3>
            <p className="auth-success__message">
              Sua senha foi redefinida com sucesso. Agora você pode fazer login
              com sua nova senha.
            </p>
          </div>

          <div className="auth-success__actions">
            <Link to="/login" className="auth-success__button">
              Fazer login
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Redefinir senha"
      subtitle="Crie uma nova senha para sua conta"
      showBackLink={true}
      backLinkText="Voltar"
      backLinkTo="/recovery"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <PasswordField
            name="password"
            label="Nova senha"
            placeholder="Digite sua nova senha"
            showStrength={true}
            validation={{
              required: "Nova senha é obrigatória",
              minLength: {
                value: 6,
                message: "Mínimo 6 caracteres",
              },
            }}
          />

          <PasswordField
            name="confirmPassword"
            label="Confirmar nova senha"
            placeholder="Digite a senha novamente"
            showStrength={false}
            validation={{
              required: "Confirme sua senha",
              validate: (value) =>
                value === password || "As senhas não coincidem",
            }}
          />

          <button
            type="submit"
            className="auth-form__submit"
            disabled={!isValid || loading}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <span className="auth-form__spinner" aria-hidden="true"></span>
                <span>Redefinindo...</span>
              </>
            ) : (
              "Redefinir senha"
            )}
          </button>

          <div className="auth-form__footer">
            <p className="auth-form__footer-text">
              Lembrou sua senha?{" "}
              <Link to="/login" className="auth-form__footer-link">
                Faça login
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default ResetPassword;