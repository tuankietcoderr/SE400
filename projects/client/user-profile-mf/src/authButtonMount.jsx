import { render } from "solid-js/web";
import AuthButton from "./components/AuthButton";
import "./index.scss";
import { UserProvider } from "./context/UserContext";

const authButtonMount = (el) => {
  el &&
    render(
      () => (
        <UserProvider>
          <AuthButton />
        </UserProvider>
      ),
      el
    );
};

export default authButtonMount;
