import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";

import Login from "../components/User/Login";
import Register from "../components/User/Register";
import Recover from "../components/User/Recover";


const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/recover" element={<Recover />} />
    </Routes>
  );
};

export default AllRoutes;
