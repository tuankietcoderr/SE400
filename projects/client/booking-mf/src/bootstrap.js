import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";

const mount = (el) => {
  if (el) {
    const root = createRoot(el);

    root.render(
      <StrictMode>
        <BrowserRouter basename="/">
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  }
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("booking-mf");

  root && mount(root);
}

export { mount };
