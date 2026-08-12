import { NotFoundPage, TaskPage, Login, Profile } from "pages/index";
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { withProtection } from "shared/model/withProtection";
import { useContextAuthStrategy } from "shared/hooks/useContextAuthStrategy";

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
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
