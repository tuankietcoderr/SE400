import React, { lazy, useEffect, useRef } from "react";
import { mount } from "booking_mf/BookingApp";
const BookingApp = () => {
  const ref = useRef(null);
  useEffect(() => {
    mount(ref.current);
  }, []);
  return (
    <div>
      <div ref={ref} />
    </div>
  );
};

export default BookingApp;
