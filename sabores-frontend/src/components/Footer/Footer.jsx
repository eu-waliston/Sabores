import React from "react";
import "./Footer.scss";

import { BsFacebook, BsPinterest, BsLinkedin } from "react-icons/bs";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer__component">
      <div className="left-side">
        <img
          src="./images/Sabores-Logo.png"
          alt="sabores"
          className="footer__logo"
        />
        <h1 className="footer__text">Sabores</h1>
      </div>
      <div className="right-side">
        <h3 className="social__text">Siga-nos em nossas redes sociais:</h3>
        <div className="social-medias">
          <FaTwitter className="social__icons" />
          <AiOutlineInstagram className="social__icons" />
          <BsFacebook className="social__icons" />
          <BsPinterest className="social__icons" />
          <BsLinkedin className="social__icons" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
