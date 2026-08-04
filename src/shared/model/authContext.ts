import { createContext, useContext } from "react";
import type { AuthContextModel } from "./auth";

export const AuthContext = createContext<AuthContextModel>({
  email: "",
  password: "",
  login: () => {},
  logout: () => {},
  accessToken: "",
  user: {
    email: "",
    id: "",
  },
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }

  return authContext;
};
