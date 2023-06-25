import React from "react";
import "./TopMenu.css";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div className="top_menu">
      <div className="top_menu__component">
        <div className="menu--itens">
          <img
            src={require("../images/Sabores-Logo.png")}
            alt="logo"
            className="logo--topbar"
          />
        </div>
        <div>
          <input
            type="text"
            className="input--topbar"
            placeholder="Procure sua receita aqui..."
          />
        </div>
        <div>
          <Link to={"/login"}>
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
