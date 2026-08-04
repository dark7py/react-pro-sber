export interface AuthInfo {
  email: string;
  password: string;
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
}

export interface AuthMethods {
  login: (AuthInfo: AuthInfo) => void;
  logout: () => void;
}

export type AuthContextModel = AuthInfo & AuthMethods;

export type UseAuthStrategy = () => {
  isAuthenticated: boolean;
  isReady: boolean;
};
