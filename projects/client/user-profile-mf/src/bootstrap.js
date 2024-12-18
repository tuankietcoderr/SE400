import { render } from "solid-js/web";

import App from "./App";

const mount = (el) => {
  el && render(() => <App />, el);
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("user-profile-mf");

  root && mount(root);
}

export { mount };
