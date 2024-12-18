import React, { lazy, Suspense, useEffect, useRef } from "react";
import "./index.scss";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const BookingApp = lazy(() => import("./pages/BookingApp"));
const UserProfileApp = lazy(() => import("./pages/UserProfileApp"));
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/*" element={<BookingApp />} />
        <Route path="/user/*" element={<UserProfileApp />} />
      </Routes>
    </div>
  );
};

export default App;
