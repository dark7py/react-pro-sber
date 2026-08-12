import type { SignResponse, SignInRequest } from "./types";
import { api } from "../base";

export const signIn = (params: SignInRequest) =>
  api.post<SignResponse>("auth/login", params);
