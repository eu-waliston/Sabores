import React, { useState } from "react";
import "./LeftMenu.css";

const LeftMenu = () => {
  const [nav, setNav] = useState(true);
  const handleClick = () => {
    setNav(!nav);
  };

  // ={nav ? "" : ""}

  return (
    <div className={nav ? "LeftMenu-Component" : "LeftMenu-Component-clicked"}>
      <i
        class="fa-solid fa-bars-staggered btn-effect"
        onClick={handleClick}
      ></i>
      {/* <i class="fa-solid fa-xmark"></i> */}
      <div className="leftmenu-itens">
        <div className="leftmenu--iten">
          <i class="fa-solid fa-cake-candles"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Bolos e Tortas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-drumstick-bite"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Carnes</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-egg"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Aves</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-fish"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Peixes e Frutos do Mar</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-utensils"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Saladas e Molhos</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-spoon"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Sopas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-utensils"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Massas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-martini-glass-citrus"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Bebidas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-cookie-bite"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Doces e Sobremesas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-burger"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Lanches</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-heart"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Alimentação Saudável</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-kitchen-set"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Todas as Receitas</h1>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
