import { NotFoundPage, TaskPage, Login, PortalShowcase } from "pages/index";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { withProtection } from "shared/model/withProtection";
import { useContextAuthStrategy } from "shared/hooks/useContextAuthStrategy";
import { lazy } from "react";

const Profile = lazy(() =>
  import("pages/profile").then((module) => ({
    default: module.Profile,
  })),
);

const ProtectedProfilePage = withProtection(Profile, useContextAuthStrategy);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TaskPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "profile",
        element: <ProtectedProfilePage />,
      },
      {
        path: "portal",
        element: <PortalShowcase />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
