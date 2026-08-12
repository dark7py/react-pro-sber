import type { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useContextAuthStrategy } from "shared/hooks/useContextAuthStrategy";

export const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated, isReady } = useContextAuthStrategy();
  const location = useLocation();

  if (!isReady) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};
