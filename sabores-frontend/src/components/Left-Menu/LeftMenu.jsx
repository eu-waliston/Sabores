import React, { useState } from "react";
import "./LeftMenu.scss";

const LeftMenu = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  return (
    <div className={nav ? "LeftMenu-Component" : "LeftMenu-Component-clicked"}>
      <i class={nav ? "btn-effect fa-solid fa-circle-chevron-left" :  "btn-effect fa-solid fa-circle-chevron-right"  } onClick={handleClick}></i>

      <div className="leftmenu-itens">
        <div className="leftmenu--iten">
          <i class="fa-solid fa-cake-candles"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Bolos e Tortas
          </h1>
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
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Peixes e Frutos do Mar
          </h1>
        </div>

        <div className="leftmenu--iten">
        <i class="fa-solid fa-bowl-rice"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Saladas e Molhos
          </h1>
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
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Doces e Sobremesas
          </h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-burger"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>Lanches</h1>
        </div>

        <div className="leftmenu--iten">
        <i class="fa-solid fa-heart-pulse"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Alimentação Saudável
          </h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-kitchen-set"></i>
          <h1 className={nav ? "leftmenu--iten-h1" : "h1-effect"}>
            Todas as Receitas
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
