import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import AppSetupPage from "../pages/AppSetupPage";
import AppAdminPage from "../pages/AppAdminPage";

import AppFeaturesPage from "../pages/AppFeaturesPage";

import UserRequestsPageV2 from "../pages/UserRequestsPageV2";
import UserRequestDetailPage from "../pages/UserRequestDetailPage";

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
  {
    path: "/app/:appId/user-requests-v2",
    element: <UserRequestsPageV2 />,
  },
  {
    path: "/app/:appId/user-requests/:requestId",
    element: <UserRequestDetailPage />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
