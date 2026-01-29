import React from "react";
import PropTypes from "prop-types";
import "./FooterBottom.scss";

const FooterBottom = ({ 
  copyright = `© ${new Date().getFullYear()} Sabores. Todos os direitos reservados.`,
  legalLinks = [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Cookies", href: "/cookies" }
  ],
  showBackToTop = true
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="footer-bottom">
      <div className="footer-bottom__content">
        <div className="footer-bottom__legal">
          <p className="footer-bottom__copyright">{copyright}</p>

          <div className="footer-bottom__links">
            {legalLinks.map((link) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  className="footer-bottom__link"
                  aria-label={link.label}
                >
                  {link.label}
                </a>
                <span className="footer-bottom__separator" aria-hidden="true">
                  ·
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {showBackToTop && (
          <button 
            className="footer-bottom__back-to-top"
            onClick={scrollToTop}
            aria-label="Voltar ao topo"
          >
            ↑
          </button>
        )}
      </div>
    </div>
  );
};

FooterBottom.propTypes = {
  copyright: PropTypes.string,
  legalLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
  showBackToTop: PropTypes.bool,
};

export default FooterBottom;