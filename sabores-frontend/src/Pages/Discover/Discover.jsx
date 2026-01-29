import React from "react";
import "./Discover.scss";

const Discover = () => {
  return (
    <div className="page discover">
      <header className="page__header">
        <h1>Descobrir</h1>
        <p>Explore novas receitas, criadores e sabores incríveis</p>
      </header>

      <section className="discover__grid">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="discover-card">
            <div className="discover-card__image" />
            <div className="discover-card__content">
              <h3>Receita incrível #{i + 1}</h3>
              <p>Uma descrição curta e deliciosa dessa receita.</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Discover;
