import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./FooterLinks.scss";

const FooterLinks = ({ 
  title, 
  links,
  columns = 1
}) => {
  return (
    <div className={`footer-links footer-links--${columns}-col`}>
      {title && <h4 className="footer-links__title">{title}</h4>}
      <ul className="footer-links__list">
        {links.map((link) => (
          <li key={link.id || link.label} className="footer-links__item">
            {link.to ? (
              <Link 
                to={link.to} 
                className="footer-links__link"
                aria-label={link.label}
              >
                {link.label}
              </Link>
            ) : (
              <a 
                href={link.href} 
                className="footer-links__link"
                aria-label={link.label}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
              >
                {link.label}
                {link.external && (
                  <span className="footer-links__external-icon" aria-hidden="true">
                    ↗
                  </span>
                )}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

FooterLinks.propTypes = {
  title: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
      href: PropTypes.string,
      external: PropTypes.bool,
    })
  ).isRequired,
  columns: PropTypes.oneOf([1, 2, 3]),
};

export default FooterLinks;