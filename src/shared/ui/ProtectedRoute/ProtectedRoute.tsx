import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContextAuthStrategy } from "shared/hooks/useContextAuthStrategy";

export function ProtectedRoute() {
  const { isAuthenticated, isReady } = useContextAuthStrategy();
  const location = useLocation();

  if (!isReady) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
