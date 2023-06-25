import React from "react";
import { useForm } from "react-hook-form";

import "./Login.css";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <div className="a-side"></div>
      <div className="b-side">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("usuario")} placeholder="Usuario" />
          <input {...register("usuario")} placeholder="Senha" />
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;