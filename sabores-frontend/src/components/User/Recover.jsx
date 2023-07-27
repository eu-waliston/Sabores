import React from "react";
import { useForm } from "react-hook-form";
import "./User.scss";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="form-container">
      <div className="a-side">
        <img src="./images/Sabores-Logo.png" alt="logo" className="logo"/>
      </div>
      <div className="b-side">
        <h3 className="greetings">Esqueceu a sua senha ? <br /> não se preocupe !</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="email" {...register("Email")} placeholder="Email" />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;