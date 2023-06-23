import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LeftMenu from "./components/Left-Menu/LeftMenu";
import TopMenu from "./components/Top-Menu/TopMenu";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <div className="app-component">
      <LeftMenu />
      <TopMenu />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
