import React from "react";
import "./Home.scss";
import Feed from "../components/Feed/Feed";
import Footer from "../components/Footer/Footer";


const Home = () => {
  return (
    <>
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
        <a href="#feed" className="discover">
          descobrir
        </a>
      </div>
      < Feed/>
      <Footer />
    </>
  );
};

export default Home;
