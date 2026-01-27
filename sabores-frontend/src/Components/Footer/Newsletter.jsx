import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import "./Newsletter.scss";

const Newsletter = ({ 
  title = "Receba nossas receitas",
  subtitle = "Inscreva-se para receber novas receitas por email",
  placeholder = "Seu melhor email",
  buttonText = "Inscrever",
  onSubmit 
}) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      return;
    }

    setLoading(true);
    
    try {
      if (onSubmit) {
        await onSubmit(email);
      } else {
        // Simulação de chamada à API
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log("Email inscrito:", email);
      }
      
      setSubscribed(true);
      setEmail("");
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    } catch (error) {
      console.error("Erro na inscrição:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="newsletter">
      <div className="newsletter__content">
        <h3 className="newsletter__title">{title}</h3>
        <p className="newsletter__subtitle">{subtitle}</p>
        
        {subscribed ? (
          <div className="newsletter__success">
            <p className="newsletter__success-message">
              ✅ Inscrição realizada com sucesso!
            </p>
          </div>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <div className="newsletter__input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                className="newsletter__input"
                required
                aria-label="Email para newsletter"
              />
              <button 
                type="submit" 
                className="newsletter__button"
                disabled={loading || !email}
                aria-label={buttonText}
              >
                {loading ? (
                  <span className="newsletter__spinner"></span>
                ) : (
                  <>
                    <span className="newsletter__button-text">
                      {buttonText}
                    </span>
                    <FaPaperPlane className="newsletter__button-icon" />
                  </>
                )}
              </button>
            </div>
            <p className="newsletter__privacy">
              Ao se inscrever, você concorda com nossa{" "}
              <a href="/privacidade" className="newsletter__privacy-link">
                Política de Privacidade
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

Newsletter.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default Newsletter;