import { createContext, useContext } from "react";
import type { AuthContextModel } from "./auth";

export const AuthContext = createContext<AuthContextModel>({
  login: () => {},
  logout: () => {},
  accessToken: "",
  name: "",
  userId: "",
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return authContext;
};
