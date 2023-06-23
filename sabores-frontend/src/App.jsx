import React from "react";
import "./App.css";

import LeftMenu from "./components/Left-Menu/LeftMenu";
import TopMenu from "./components/Top-Menu/TopMenu";

const App = () => {
  return (
    <div className="app-component">
      <LeftMenu />
      <TopMenu />
    </div>
  );
};

export default App;
