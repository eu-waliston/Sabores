import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaUser, FaLock } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
// import SocialLogin from "./SocialLogin";
import "./Auth.scss";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [showResetLink, setShowResetLink] = useState(false);

  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = methods;

  const email = watch("email");

  const onSubmit = async (data) => {
    setServerError(null);
    const result = await login(data.email, data.password);

    if (!result.success) {
      setServerError(result.error);

      // Mostrar link para reset de senha se for erro de credenciais
      if (result.error.toLowerCase().includes('credenciais') ||
        result.error.toLowerCase().includes('senha')) {
        setShowResetLink(true);
      }
    }
  };

  const handleSocialLogin = () => {
    navigate("/")
  };

  return (
    <AuthLayout

      title="Bem-vindo de volta!"
      subtitle="Entre na sua conta para continuar sua jornada culinária"
      showBackLink={false}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {serverError && (
            <div className="auth-form__error" role="alert">
              <p className="auth-form__error-message">{serverError}</p>
              {showResetLink && (
                <Link to="/recovery" className="auth-form__error-link">
                  Esqueceu sua senha?
                </Link>
              )}
            </div>
          )}

          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            icon={FaUser}
            validation={{
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            }}
            autoComplete="email"
          />

          <PasswordField
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
          // validation={{
          //   required: "Senha é obrigatória",
          //   minLength: {
          //     value: 6,
          //     message: "Senha deve ter pelo menos 6 caracteres",
          //   },
          // }}
          />

          <div className="auth-form__options">
            <label className="auth-form__checkbox">
              <input
                type="checkbox"
                {...methods.register("rememberMe")}
                className="auth-form__checkbox-input"
              />
              <span className="auth-form__checkbox-label">Lembrar-me</span>
            </label>

            <Link to="/recovery" className="auth-form__forgot-link">
              Esqueceu a senha?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-form__submit"
            disabled={!isValid || loading}
            aria-busy={loading}
            onClick={handleSocialLogin}
          >
            {loading ? (
              <>
                <span className="auth-form__spinner" aria-hidden="true"></span>
                <span>Entrando...</span>
              </>
            ) : (
              " Entrar"
            )}
          </button>

          <div className="auth-form__divider">
            <span className="auth-form__divider-text">ou continue com</span>
          </div>

          {/*<SocialLogin onSocialLogin={handleSocialLogin} />*/}

          <div className="auth-form__footer">
            <p className="auth-form__footer-text">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="auth-form__footer-link">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </FormProvider>
    </AuthLayout>
  );
};

export default Login;