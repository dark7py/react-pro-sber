import type { ComponentType, FC } from "react";
import { Navigate, useLocation } from "react-router";
import type { UseAuthStrategy } from "./auth";

export const withProtection = <P extends object>(
  WrappedComponent: ComponentType<P>,
  useAuthStrategy: UseAuthStrategy,
) => {
  const ComponentWithProtection: FC<P> = (props) => {
    const { isAuthenticated, isReady } = useAuthStrategy();

    const location = useLocation();

    if (!isReady)
      return (
        <div style={{ display: "flex", justifyContent: "center" }}>
          Loading…
        </div>
      );

    if (!isAuthenticated) {
      return (
        <Navigate
          to="/login"
          replace={true}
          state={{
            from: location.pathname,
          }}
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithProtection.displayName = `${withProtection.name}${WrappedComponent.displayName}`;

  return ComponentWithProtection;
};
