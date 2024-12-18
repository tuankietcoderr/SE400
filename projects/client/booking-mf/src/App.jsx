import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./index.scss";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:hotelId" element={<HotelDetail />} />
      </Routes>
    </>
  );
};

export default App;
