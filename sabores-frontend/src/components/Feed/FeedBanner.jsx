import React from "react";
import "./FeedBanner.scss";

const FeedBanner = () => {
  return (
    <div className="feed-banner">
      <div className="feed-banner__overlay"></div>
      <div className="feed-banner__content">
        <h1 className="feed-banner__title">Feed de Receitas</h1>
        <p className="feed-banner__subtitle">
          Descubra os melhores sabores selecionados especialmente para você
        </p>
      </div>
    </div>
  );
};

export default FeedBanner;