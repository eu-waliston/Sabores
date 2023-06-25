import React from "react";
import { useForm } from "react-hook-form";

import "../Login/Login.css";
// import { Link } from "react-router-dom";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <div className="a-side">
        <img src={require("../images/Sabores-Logo.png")} alt="logo" className="logo"/>
      </div>
      <div className="b-side">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("usuario")} placeholder="Usuario" />
          <input {...register("email")} placeholder="Email" type="email"/>
          <input {...register("usuario")} placeholder="Senha" type="password"/>
          <input {...register("dat-nasc")} type="date"/>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default Register;