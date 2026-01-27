import React from "react";
import PropTypes from "prop-types";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok
} from "react-icons/fa";
import "./SocialIcons.scss";

const socialPlatforms = {
  twitter: { icon: FaTwitter, color: "#1DA1F2" },
  instagram: { icon: FaInstagram, color: "#E4405F" },
  facebook: { icon: FaFacebookF, color: "#1877F2" },
  pinterest: { icon: FaPinterestP, color: "#BD081C" },
  linkedin: { icon: FaLinkedinIn, color: "#0A66C2" },
  youtube: { icon: FaYoutube, color: "#FF0000" },
  tiktok: { icon: FaTiktok, color: "#000000" }
};

const SocialIcons = ({ 
  platforms = ["facebook", "instagram", "twitter", "pinterest", "linkedin"],
  size = "medium",
  variant = "default",
  onSocialClick 
}) => {
  const getSizeClass = () => {
    switch(size) {
      case "small": return "social-icons--small";
      case "large": return "social-icons--large";
      default: return "social-icons--medium";
    }
  };

  const getVariantClass = () => {
    return `social-icons--${variant}`;
  };

  const handleClick = (platform) => {
    if (onSocialClick) {
      onSocialClick(platform);
    } else {
      // URLs padrão (pode ser configurado via props)
      const urls = {
        facebook: "https://facebook.com/sabores",
        instagram: "https://instagram.com/sabores",
        twitter: "https://twitter.com/sabores",
        pinterest: "https://pinterest.com/sabores",
        linkedin: "https://linkedin.com/company/sabores",
        youtube: "https://youtube.com/sabores",
        tiktok: "https://tiktok.com/@sabores"
      };
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <div className={`social-icons ${getSizeClass()} ${getVariantClass()}`}>
      {platforms.map((platform) => {
        const Icon = socialPlatforms[platform]?.icon;
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href="#"
            className="social-icons__link"
            onClick={(e) => {
              e.preventDefault();
              handleClick(platform);
            }}
            aria-label={`Siga-nos no ${platform}`}
            title={`Siga-nos no ${platform}`}
          >
            <Icon className="social-icons__icon" />
          </a>
        );
      })}
    </div>
  );
};

SocialIcons.propTypes = {
  platforms: PropTypes.arrayOf(
    PropTypes.oneOf(["facebook", "instagram", "twitter", "pinterest", "linkedin", "youtube", "tiktok"])
  ),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  variant: PropTypes.oneOf(["default", "minimal", "colored"]),
  onSocialClick: PropTypes.func,
};

export default SocialIcons;