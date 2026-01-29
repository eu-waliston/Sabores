import React from "react";
import "./Help.scss";

const Help = () => {
  return (
    <main className="page help">
      <header className="page__header help__header">
        <h1>Ajuda</h1>
        <p>Estamos aqui pra te ajudar 🍀</p>
      </header>

      <section className="help__wrapper">
        <div className="help__card">
          <div className="help__faq">
            <details>
              <summary>Como criar uma receita?</summary>
              <p>Vá até a página Criar e siga o passo a passo.</p>
            </details>

            <details>
              <summary>Posso editar depois?</summary>
              <p>Sim! Todas as receitas podem ser editadas.</p>
            </details>

            <details>
              <summary>Minhas receitas ficam públicas?</summary>
              <p>
                Sim, por padrão elas aparecem para toda a comunidade,
                mas você pode controlar a visibilidade.
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Help;
