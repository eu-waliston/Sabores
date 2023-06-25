import React from "react";
import "./App.css";

import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

import LeftMenu from "./components/Left-Menu/LeftMenu";
import TopMenu from "./components/Top-Menu/TopMenu";

import AllRoutes from "./routes/routes";

const App = () => {
  return (
    <div className="app-component">
      <LeftMenu />
      <TopMenu />
      <AllRoutes />
    </div>
  );
};

export default App;
