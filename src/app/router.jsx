import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AppSetupPage from "../pages/AppSetupPage";
import AppAdminPage from "../pages/AppAdminPage";

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
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
