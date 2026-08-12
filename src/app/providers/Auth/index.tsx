import { useCallback, useMemo, useState, type ComponentType } from "react";
import {
  JWT_LS_KEY,
  USER_INFO_LS_KEY,
  JWT_ACCESS_LS_KEY,
} from "shared/config/constants";
import {
  clearLS,
  loadFromLS,
  saveToLocaleStorage,
} from "shared/lib/localStorage";
import type {
  AuthContextModel,
  AuthInfo,
  AuthMethods,
} from "shared/model/auth";
import { AuthContext } from "shared/model/authContext";

export const withAuthProvider = (WrappedComponent: ComponentType) => () => {
  const [authInfo, setAuthInfo] = useState<AuthInfo>(() => {
    const accessToken = loadFromLS<string>({
      key: JWT_LS_KEY,
      subTitle: JWT_ACCESS_LS_KEY,
    });
    const userInfo = loadFromLS<AuthInfo>({ key: USER_INFO_LS_KEY });

    return {
      accessToken: accessToken || "",
      userId: userInfo?.userId || "",
      name: "",
    };
  });

  const login: AuthMethods["login"] = useCallback((authInfo: AuthInfo) => {
    setAuthInfo(authInfo);

    const { accessToken, ...user } = authInfo;

    saveToLocaleStorage({
      key: JWT_LS_KEY,
      subTitle: JWT_ACCESS_LS_KEY,
      state: accessToken,
    });

    saveToLocaleStorage({
      key: USER_INFO_LS_KEY,
      state: user,
    });
  }, []);

  const logout: AuthMethods["logout"] = useCallback(() => {
    clearLS({ key: JWT_LS_KEY });
    clearLS({ key: USER_INFO_LS_KEY });

    setAuthInfo({
      accessToken: "",
      userId: "",
      name: "",
    });
  }, []);

  const contextValue: AuthContextModel = useMemo(
    () => ({
      ...authInfo,
      login,
      logout,
    }),
    [authInfo, login, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <WrappedComponent />
    </AuthContext.Provider>
  );
};
