import React from "react";
import "./Help.scss";

const Help = () => {
  return (
    <div className="page help">
      <header className="page__header">
        <h1>Ajuda</h1>
        <p>Estamos aqui pra te ajudar 🍀</p>
      </header>

      <section className="help__faq">
        <details>
          <summary>Como criar uma receita?</summary>
          <p>Vá até a página Criar e siga o passo a passo.</p>
        </details>

        <details>
          <summary>Posso editar depois?</summary>
          <p>Sim! Todas as receitas podem ser editadas.</p>
        </details>
      </section>
    </div>
  );
};

export default Help;
