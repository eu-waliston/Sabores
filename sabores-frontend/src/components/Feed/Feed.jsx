import React from "react";
import "./Feed.scss";

import { BsClock } from "react-icons/bs";
import { BiBowlRice } from "react-icons/bi";

const Feed = () => {
  return (
    <div className="feed__component" id="feed">
      <div className="banner">
        <div className="top">
          <h1 className="banner-h1">Feed de Receitas</h1>
          <p className="banner-p">aqui você encontra o melhor de Sabores!</p>
        </div>
      </div>
      
      <div className="content">
        <div className="content__1">
          <div className="top__itens">
            <div>
              <img
                src="./images/home-receita-g-1.webp"
                alt="receita"
                className="img-gran"
              />
              <div className="info__receitas_1">
                <p>
                  <BsClock /> Preparo: 5H , <BiBowlRice /> Rende: 8 Porções
                </p>

                <h1>Pavê de banana</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
            <div>
              <img
                src="./images/home-receita-g-2.webp"
                alt="receita"
                className="img-gran"
              />
              <div className="info__receitas_1">
                <p>
                  <BsClock /> Preparo: 3H , <BiBowlRice /> Rende: 6 Porções
                </p>

                <h1>Filé mignon na cerveja</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
          </div>
          <div className="bottom__itens">
            <div>
              <img
                src="./images/home-receita-p-1.webp"
                alt="receita"
                className="img-peq"
              />
              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 60 Minutos , <BiBowlRice /> Rende: 4
                  Porções
                </p>

                <h1>Frango assado com geleia de pimenta</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
            <div>
              <img
                src="./images/home-receita-p-2.webp"
                alt="receita"
                className="img-peq"
              />
              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 60 Minutos , <BiBowlRice /> Rende: 6
                  Porções
                </p>

                <h1> Filé de frango ao molho de pistache</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
            <div>
              <img
                src="./images/home-receita-p-3.jpg"
                alt="receita"
                className="img-peq"
              />

              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 40 Minutos , <BiBowlRice /> Rende: 12
                  Porções
                </p>

                <h1>Frango frito crocante</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="content__2">
          <div className="top__itens">
            <div>
              <img
                src="./images/home-receita-g-3.jpeg"
                alt="receita"
                className="img-gran"
              />
              <div className="info__receitas_1">
                <p>
                  <BsClock /> Preparo: 10Minutos , <BiBowlRice /> Rende: 35
                  Porções
                </p>

                <h1> Cookie de chocolate diet</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
            <div className="info__receitas_1">
              <img
                src="./images/home-receita-g-4.jpg"
                alt="receita"
                className="img-gran"
              />

              <div>
                <p>
                  <BsClock /> Preparo: 60 Minutos , <BiBowlRice /> Rende: 1
                  Porções
                </p>

                <h1>Mousse de maracujá</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
          </div>

          <div className="bottom__itens">
            <div>
              <img
                src="./images/home-receita-p-4.jpg"
                alt="receita"
                className="img-peq"
              />

              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 60 Minutos , <BiBowlRice /> Rende: 8
                  Porções
                </p>

                <h1>Brownie de batata doce</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>

            <div>
              <img
                src="./images/home-receita-p-5.jpg"
                alt="receita"
                className="img-peq"
              />

              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 60 Minutos , <BiBowlRice /> Rende: 10
                  Porções
                </p>

                <h1>Bolo de banana com bolacha cream cracker</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>

            <div>
              <img
                src="./images/home-receita-p-6.jpg"
                alt="receita"
                className="img-peq"
              />
              <div className="info__receitas_2">
                <p>
                  <BsClock /> Preparo: 40 Minutos , <BiBowlRice /> Rende: 8
                  Porções
                </p>

                <h1>Bolo de chocolate sem glúten, leite ou açúcar</h1>
                <button>
                  Receita
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
