import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../components/Home/Home";
import Login from "../components/Login/Login";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AllRoutes;
