import React from "react";
import "./Feed.scss";

const Feed = () => {
    return (
        <div className="feed__component" id="feed">
            <div className="banner">
                <div className="top">
                    <h1 className="banner-h1">Feed de Receitas</h1>
                    <p className="banner-p">aqui você encontra o melhor de Sabores!</p>
                </div>
            </div>
            <div className="content"></div>
        </div>
    )
}

export default Feed;