import React, { useState } from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import "./PasswordField.scss";

const PasswordField = ({
  name,
  label = "Senha",
  placeholder = "Digite sua senha",
  showStrength = true,
  validation = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const passwordValue = watch(name);

  // Calcular força da senha
  const calculateStrength = (password) => {
    if (!password) return 0;

    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;

    return strength;
  };

  React.useEffect(() => {
    if (passwordValue && showStrength) {
      setPasswordStrength(calculateStrength(passwordValue));
    }
  }, [passwordValue, showStrength]);

  const getStrengthLabel = (strength) => {
    if (strength === 0) return "Muito fraca";
    if (strength <= 25) return "Fraca";
    if (strength <= 50) return "Média";
    if (strength <= 75) return "Forte";
    return "Muito forte";
  };

  const getStrengthColor = (strength) => {
    if (strength === 0) return "#e0e0e0";
    if (strength <= 25) return "#ff4757";
    if (strength <= 50) return "#ffa502";
    if (strength <= 75) return "#2ed573";
    return "#1e90ff";
  };

  return (
    <div className="password-field">
      <div className="password-field__header">
        <label htmlFor={name} className="password-field__label">
          {label}
        </label>
        {/* {showStrength && passwordValue && (
          <div className="password-field__strength">
            <span className="password-field__strength-label">
              {getStrengthLabel(passwordStrength)}
            </span>
            <div className="password-field__strength-bar">
              <div
                className="password-field__strength-fill"
                style={{
                  width: `${passwordStrength}%`,
                  backgroundColor: getStrengthColor(passwordStrength),
                }}
              />
            </div>
          </div>
        )} */}
      </div>

      <div className={`password-field__container ${error ? 'password-field__container--error' : ''}`}>
        <div className="password-field__icon">
          <FaLock className="password-field__icon-svg" />
        </div>

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          autoComplete="new-password"
          className="password-field__input"
          {...register(name, validation)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />

        <button
          type="button"
          className="password-field__toggle"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={showPassword}
        >
          {showPassword ? (
            <FaEyeSlash className="password-field__toggle-icon" />
          ) : (
            <FaEye className="password-field__toggle-icon" />
          )}
        </button>

        {error && (
          <div className="password-field__error-icon" aria-hidden="true">
            !
          </div>
        )}
      </div>

      {/* {error ? (
        <p id={`${name}-error`} className="password-field__error-message" role="alert">
          {error.message}
        </p>
      ) : showStrength && passwordValue && (
        <div className="password-field__requirements">
          <p className="password-field__requirements-title">Sua senha deve conter:</p>
          <ul className="password-field__requirements-list">
            <li className={passwordValue.length >= 8 ? 'password-field__requirement--met' : ''}>
              • Pelo menos 8 caracteres
            </li>
            <li className={/[A-Z]/.test(passwordValue) ? 'password-field__requirement--met' : ''}>
              • Uma letra maiúscula
            </li>
            <li className={/[0-9]/.test(passwordValue) ? 'password-field__requirement--met' : ''}>
              • Um número
            </li>
            <li className={/[^A-Za-z0-9]/.test(passwordValue) ? 'password-field__requirement--met' : ''}>
              • Um caractere especial
            </li>
          </ul>
        </div>
      )} */}
    </div>
  );
};

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  showStrength: PropTypes.bool,
  validation: PropTypes.object,
};

export default PasswordField;