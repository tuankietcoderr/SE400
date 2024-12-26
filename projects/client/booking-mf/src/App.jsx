import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";
import "./index.scss";
import Home from "./pages/Home";
import HotelDetail from "./pages/HotelDetail";
import Search from "./pages/Search";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:hotelId" element={<HotelDetail />} />
      </Routes>
    </>
  );
};

export default App;
