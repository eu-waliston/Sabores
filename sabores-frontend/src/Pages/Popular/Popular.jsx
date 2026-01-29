import React from "react";
import "./Popular.scss";

const Popular = () => {
    return (
        <main className="page popular">
            <header className="page__header popular__header">
                <h1>Populares</h1>
                <p>As receitas que todo mundo tá fazendo agora</p>
            </header>

            <section className="popular__grid">
                {[...Array(12)].map((_, i) => (
                    <article key={i} className="popular-item">
                        <span className="popular-item__rank">#{i + 1}</span>

                        <div className="popular-item__image" />

                        <div className="popular-item__content">
                            <h3>Receita viral</h3>
                            <p>🔥 {1200 - i * 73} curtidas</p>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    );
};

export default Popular;
