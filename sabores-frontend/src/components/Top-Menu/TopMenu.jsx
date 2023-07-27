import React from "react";
import "./TopMenu.scss";
import { Link } from "react-router-dom";

const TopMenu = () => {
  return (
    <div className="top_menu">
      <div className="top_menu__component">
        <div className="menu--itens">
          <Link to={"/"}>
            <img
              src="./images/Sabores-Logo.png"
              alt="logo"
              className="logo--topbar"
            />
          </Link>
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
