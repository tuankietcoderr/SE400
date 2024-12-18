import { createContext, createResource, useContext } from "solid-js";
import instance from "../utils/axios-config";

const UserContext = createContext();

export const useUserContext = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext must be used within UserProvider");
  }
  return ctx;
};

export const UserProvider = (props) => {
  const [user, { refetch, mutate }] = createResource(async () => {
    const res = await instance.get("/auth/me");
    return res.data.data;
  });

  const logout = async () => {
    await instance.post("/auth/logout");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const value = {
    user,
    logout,
    refetch,
    mutate,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};
