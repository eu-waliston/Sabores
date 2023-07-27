import React from "react";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home__component">
      <div className="home--message">
        <div className="home---sab">
          <h1>Sabores</h1>
          <h1 className="st-2">Receitas Online.</h1>
        </div>
        <div>
          <img src="./images/Sabores-Logo.png" alt="website logo" />
        </div>
      </div>
      <button className="discover">descobrir</button>
    </div>
  );
};

export default Home;
