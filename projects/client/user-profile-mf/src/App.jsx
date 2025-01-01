import { Route, Router } from "@solidjs/router";
import UserProfile from "./routes/UserProfile";
import Login from "./routes/Login";
import Register from "./routes/Register";
import "./index.scss";
import { Toaster } from "solid-toast";
import ForgotPassword from "./routes/ForgotPassword";
import { UserProvider } from "./context/UserContext";
import GoogleCallback from "./routes/GoogleCallback";

const App = () => {
  return (
    <>
      <UserProvider>
        <Toaster />
        <Router base="user">
          <Route path="/" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/login/google/callback" component={GoogleCallback} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Router>
      </UserProvider>
    </>
  );
};

export default App;
