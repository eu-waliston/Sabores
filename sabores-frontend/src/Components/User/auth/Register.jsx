import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaUser, FaEnvelope, FaCalendar, FaLock } from "react-icons/fa";
import AuthLayout from "../layout/AuthLayout";
import InputField from "../forms/InputField";
import PasswordField from "../forms/PasswordField";
// import DatePicker from "../forms/DatePicker";
// import SocialLogin from "./SocialLogin";
import "./Auth.scss";

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading, error: authError } = useAuth();
  const [serverError, setServerError] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const methods = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateNasc: "",
      agreeTerms: false,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    watch,
    trigger,
    formState: { isValid },
  } = methods;

  const password = watch("password");

  const validateStep1 = async () => {
    const isValid = await trigger(["username", "email"]);
    if (isValid) {
      setStep(2);
    }
  };

  const onSubmit = async (data) => {
    setServerError(null);
    
    // Verificar se as senhas coincidem
    if (data.password !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        type: "manual",
        message: "As senhas não coincidem",
      });
      return;
    }

    // Verificar termos
    if (!data.agreeTerms) {
      methods.setError("agreeTerms", {
        type: "manual",
        message: "Você deve aceitar os termos",
      });
      return;
    }

    const userData = {
      username: data.username,
      email: data.email,
      password: data.password,
      profile: {
        dateNasc: data.dateNasc,
      },
    };

    const result = await registerUser(userData);
    
    if (result.success) {
      // Navegação será feita pelo hook useAuth
    } else {
      setServerError(result.error);
    }
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateChange = (date) => {
    const age = calculateAge(date);
    if (age < 13) {
      methods.setError("dateNasc", {
        type: "manual",
        message: "Você deve ter pelo menos 13 anos",
      });
    }
  };

  return (
    <AuthLayout
      title="Junte-se à nossa comunidade"
      subtitle="Crie sua conta e comece a compartilhar suas receitas"
      showBackLink={true}
      backLinkText="Voltar para login"
      backLinkTo="/login"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          {serverError && (
            <div className="auth-form__error" role="alert">
              <p className="auth-form__error-message">{serverError}</p>
            </div>
          )}

          {/* Progress steps */}
          <div className="auth-form__steps">
            <div className={`auth-form__step ${step >= 1 ? 'auth-form__step--active' : ''}`}>
              <div className="auth-form__step-number">1</div>
              <span className="auth-form__step-label">Informações</span>
            </div>
            <div className={`auth-form__step ${step >= 2 ? 'auth-form__step--active' : ''}`}>
              <div className="auth-form__step-number">2</div>
              <span className="auth-form__step-label">Senha</span>
            </div>
            <div className={`auth-form__step ${step >= 3 ? 'auth-form__step--active' : ''}`}>
              <div className="auth-form__step-number">3</div>
              <span className="auth-form__step-label">Termos</span>
            </div>
          </div>

          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="auth-form__step-content">
              <InputField
                name="username"
                label="Nome de usuário"
                placeholder="chefjoao"
                icon={FaUser}
                validation={{
                  required: "Nome de usuário é obrigatório",
                  minLength: {
                    value: 3,
                    message: "Mínimo 3 caracteres",
                  },
                  maxLength: {
                    value: 30,
                    message: "Máximo 30 caracteres",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Apenas letras, números e underscore",
                  },
                }}
                autoComplete="username"
              />

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

              {/*<DatePicker*/}
              {/*  name="dateNasc"*/}
              {/*  label="Data de nascimento"*/}
              {/*  icon={FaCalendar}*/}
              {/*  validation={{*/}
              {/*    required: "Data de nascimento é obrigatória",*/}
              {/*    validate: {*/}
              {/*      minAge: (value) => {*/}
              {/*        const age = calculateAge(value);*/}
              {/*        return age >= 13 || "Você deve ter pelo menos 13 anos";*/}
              {/*      },*/}
              {/*    },*/}
              {/*  }}*/}
              {/*  onChange={handleDateChange}*/}
              {/*/>*/}

              <button
                type="button"
                className="auth-form__next"
                onClick={validateStep1}
                disabled={!isValid}
              >
                Continuar
              </button>
            </div>
          )}

          {/* Step 2: Password */}
          {step === 2 && (
            <div className="auth-form__step-content">
              <PasswordField
                name="password"
                label="Senha"
                placeholder="Crie uma senha segura"
                showStrength={true}
                validation={{
                  required: "Senha é obrigatória",
                  minLength: {
                    value: 6,
                    message: "Mínimo 6 caracteres",
                  },
                }}
              />

              <PasswordField
                name="confirmPassword"
                label="Confirmar senha"
                placeholder="Digite a senha novamente"
                showStrength={false}
                validation={{
                  required: "Confirme sua senha",
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                }}
              />

              <div className="auth-form__step-buttons">
                <button
                  type="button"
                  className="auth-form__back"
                  onClick={() => setStep(1)}
                >
                  Voltar
                </button>
                <button
                  type="button"
                  className="auth-form__next"
                  onClick={() => setStep(3)}
                  disabled={!isValid}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Terms */}
          {step === 3 && (
            <div className="auth-form__step-content">
              <div className="auth-form__terms">
                <label className="auth-form__checkbox auth-form__checkbox--large">
                  <input
                    type="checkbox"
                    {...methods.register("agreeTerms", {
                      required: "Você deve aceitar os termos",
                    })}
                    className="auth-form__checkbox-input"
                  />
                  <span className="auth-form__checkbox-label">
                    Eu concordo com os{" "}
                    <Link to="/termos" className="auth-form__terms-link">
                      Termos de Serviço
                    </Link>{" "}
                    e{" "}
                    <Link to="/privacidade" className="auth-form__terms-link">
                      Política de Privacidade
                    </Link>
                  </span>
                </label>

                {methods.formState.errors.agreeTerms && (
                  <p className="auth-form__error-message" role="alert">
                    {methods.formState.errors.agreeTerms.message}
                  </p>
                )}
              </div>

              <div className="auth-form__divider">
                <span className="auth-form__divider-text">ou cadastre-se com</span>
              </div>

              {/*<SocialLogin onSocialLogin={(provider) => console.log(provider)} />*/}

              <div className="auth-form__step-buttons">
                <button
                  type="button"
                  className="auth-form__back"
                  onClick={() => setStep(2)}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="auth-form__submit"
                  disabled={!isValid || loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="auth-form__spinner" aria-hidden="true"></span>
                      <span>Criando conta...</span>
                    </>
                  ) : (
                    "Criar conta"
                  )}
                </button>
              </div>
            </div>
          )}

          <div className="auth-form__footer">
            <p className="auth-form__footer-text">
              Já tem uma conta?{" "}
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

export default Register;