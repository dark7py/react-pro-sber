import type { UserResponse } from "./types";
import { api } from "../base";

export const getUserMe = () =>
  api.get<UserResponse>("users/me", {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
