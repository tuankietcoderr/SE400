import React, { lazy, useEffect, useRef } from "react";
import { mount } from "booking_mf/BookingApp";
import useBanner from "../components/Banner";
const BookingApp = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
    useBanner();
  }, []);
  return (
    <div>
      <app-banner />
      <div ref={ref} />
    </div>
  );
};

export default BookingApp;
