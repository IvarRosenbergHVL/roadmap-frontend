import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AppSetupPage from "../pages/AppSetupPage";
import AppAdminPage from "../pages/AppAdminPage";

import AppFeaturesPage from "../pages/AppFeaturesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/app/:appId",
    element: <AppSetupPage />,
  },
  {
    path: "/app/:appId/admin",
    element: <AppAdminPage />,
  },
  {
    path: "/app/:appId/features",
    element: <AppFeaturesPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
