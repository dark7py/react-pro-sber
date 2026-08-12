export interface AuthInfo {
  userId: string;
  name: string;
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
