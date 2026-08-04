import { useCallback, useState, type ComponentType } from "react";
import type { AuthInfo, AuthMethods } from "shared/model/auth";
import { AuthContext } from "shared/model/authContext";

export const withAuthProvider = (WrappedComponent: ComponentType) => () => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(() => {
    const storedAuthInfo = localStorage.getItem("authInfo");
    return storedAuthInfo ? JSON.parse(storedAuthInfo) : null;
  });

  const login: AuthMethods["login"] = useCallback((authInfo: AuthInfo) => {
    setAuthInfo(authInfo);
    localStorage.setItem("authInfo", JSON.stringify(authInfo));
  }, []);

  return (
    <AuthContext.Provider value={authInfo}>
      <WrappedComponent />
    </AuthContext.Provider>
  );
};
