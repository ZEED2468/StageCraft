import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./auth/Layout";
import Register from "./auth/Register";
import Login from "./auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
