import React from "react";
import PropTypes from "prop-types";
import { useFormContext } from "react-hook-form";
import "./InputField.scss";

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  disabled = false,
  validation = {},
  autoComplete = "off",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="input-field">
      {label && (
        <label htmlFor={name} className="input-field__label">
          {label}
        </label>
      )}
      
      <div className={`input-field__container ${error ? 'input-field__container--error' : ''} ${disabled ? 'input-field__container--disabled' : ''}`}>
        {Icon && (
          <div className="input-field__icon">
            <Icon className="input-field__icon-svg" />
          </div>
        )}
        
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className="input-field__input"
          {...register(name, validation)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        
        {error && (
          <div className="input-field__error-icon" aria-hidden="true">
            !
          </div>
        )}
      </div>
      
      {error && (
        <p id={`${name}-error`} className="input-field__error-message" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.elementType,
  disabled: PropTypes.bool,
  validation: PropTypes.object,
  autoComplete: PropTypes.string,
};

export default InputField;