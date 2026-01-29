import React from "react";
import "./Popular.scss";

const Popular = () => {
  return (
    <div className="page popular">
      <header className="page__header">
        <h1>Populares</h1>
        <p>As receitas que todo mundo tá fazendo agora</p>
      </header>

      <ul className="popular__list">
        {[...Array(10)].map((_, i) => (
          <li key={i} className="popular-item">
            <span className="popular-item__rank">#{i + 1}</span>
            <div>
              <h3>Receita viral</h3>
              <p>🔥 {1200 - i * 73} curtidas</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popular;
