import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
// Import additional pages/components as needed
// import FeatureDetails from "./pages/FeatureDetails";
// import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   { path: "feature/:id", element: <FeatureDetails /> },
    //   { path: "*", element: <NotFound /> }
    // ]
  },
  // Example for future routes:
  // {
  //   path: "/feature/:id",
  //   element: <FeatureDetails />,
  // },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
