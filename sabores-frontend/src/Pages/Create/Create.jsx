import React from "react";
import { useNavigate } from "react-router-dom";
import "./Create.scss";

const Create = () => {
  const navigate = useNavigate();

  return (
    <div className="page create">
      <header className="page__header">
        <h1>Criar</h1>
        <p>Compartilhe sua receita com o mundo</p>
      </header>

      <div className="create__cta">
        <button onClick={() => navigate("/receitas/nova")}>
          Criar nova receita 🍳
        </button>
      </div>
    </div>
  );
};

export default Create;
