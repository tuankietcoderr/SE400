import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./index.scss";
import Home from "./pages/Home";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:hotelId" element={<div>Hello world id</div>} />
      </Routes>
    </>
  );
};

export default App;
