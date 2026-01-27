import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../forms/InputField";
import "./Auth.scss";

const Recovery = () => {
  const { forgotPassword, loading } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailSent, setEmailSent] = useState("");

  const methods = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data) => {
    const result = await forgotPassword(data.email);
    
    if (result.success) {
      setIsSubmitted(true);
      setEmailSent(data.email);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Email enviado!"
        subtitle="Verifique sua caixa de entrada"
        showBackLink={true}
        backLinkText="Voltar para login"
        backLinkTo="/login"
      >
        <div className="auth-success">
          <div className="auth-success__icon">
            <FaCheckCircle />
          </div>
          
          <div className="auth-success__content">
            <h3 className="auth-success__title">Verifique seu email</h3>
            <p className="auth-success__message">
              Enviamos um link de recuperação para:
            </p>
            <p className="auth-success__email">{emailSent}</p>
            <p className="auth-success__instructions">
              Clique no link que enviamos para redefinir sua senha. O link
              expira em 10 minutos.
            </p>
          </div>

          <div className="auth-success__actions">
            <Link to="/login" className="auth-success__button">
              Voltar para login
            </Link>
            <button
              type="button"
              className="auth-success__resend"
              onClick={() => onSubmit({ email: emailSent })}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Reenviar email"}
            </button>
          </div>

          <div className="auth-success__tips">
            <p className="auth-success__tip-title">Não recebeu o email?</p>
            <ul className="auth-success__tip-list">
              <li>Verifique sua pasta de spam ou lixo eletrônico</li>
              <li>Certifique-se de que digitou o email corretamente</li>
              <li>Aguarde alguns minutos e tente novamente</li>
            </ul>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Esqueceu sua senha?"
      subtitle="Digite seu email e enviaremos um link para redefinição"
      showBackLink={true}
      backLinkText="Voltar para login"
      backLinkTo="/login"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="auth-form__info">
            <p className="auth-form__info-text">
              Não se preocupe! Iremos te ajudar a redefinir sua senha.
            </p>
          </div>

          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="seu@email.com"
            icon={FaEnvelope}
            validation={{
              required: "Email é obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            }}
            autoComplete="email"
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
                <span>Enviando...</span>
              </>
            ) : (
              "Enviar link de recuperação"
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

export default Recovery;