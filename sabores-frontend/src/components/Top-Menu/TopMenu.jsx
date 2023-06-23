import React from "react";
import "./TopMenu.css";

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
          <h1 className="topbat-text">Sabores</h1>
        </div>
        <div>
          <input type="text" className="input--topbar" placeholder="Procure sua receita aqui..."/>
        </div>
        <div>
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
    </div>
  );
};

export default TopMenu;
