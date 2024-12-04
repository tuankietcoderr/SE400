import React, { lazy, Suspense } from "react";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const BookingApp = lazy(() => import("booking_mf/BookingApp"));

const App = () => (
  <div>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/*" element={<BookingApp />} />
      </Routes>
    </Suspense>
  </div>
);

export default App;
