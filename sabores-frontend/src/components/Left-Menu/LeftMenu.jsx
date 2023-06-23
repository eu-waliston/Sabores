import React from "react";
import "./LeftMenu.css";

const LeftMenu = () => {
  return (
    <div className="LeftMenu-Component">
      <i class="fa-solid fa-bars-staggered btn-effect"></i>
      {/* <i class="fa-solid fa-xmark"></i> */}
      <div className="leftmenu-itens">
        <div className="leftmenu--iten">
          <i class="fa-solid fa-cake-candles"></i>
          <h1>Bolos e Tortas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-drumstick-bite"></i>
          <h1>Carnes</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-egg"></i>
          <h1>Aves</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-fish"></i>
          <h1>Peixes e Frutos do Mar</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-utensils"></i>
          <h1>Saladas e Molhos</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-spoon"></i>
          <h1>Sopas</h1>
        </div>

        <div className="leftmenu--iten">
        <i class="fa-solid fa-utensils"></i>
          <h1>Massas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-martini-glass-citrus"></i>
          <h1>Bebidas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-cookie-bite"></i>
          <h1>Doces e Sobremesas</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-burger"></i>
          <h1>Lanches</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-heart"></i>
          <h1>Alimentação Saudável</h1>
        </div>

        <div className="leftmenu--iten">
          <i class="fa-solid fa-kitchen-set"></i>
          <h1>Todas as Receitas</h1>
        </div>
      </div>
    </div>
  );
};

export default LeftMenu;
