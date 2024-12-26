import React, { useEffect, useRef } from "react";
import { mount } from "payment_mf/PaymentApp";

const PaymentApp = () => {
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

export default PaymentApp;
