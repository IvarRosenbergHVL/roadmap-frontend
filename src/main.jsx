import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./app/router";
import "@digdir/designsystemet-css/index.css";
import "@digdir/designsystemet-theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <AppRouter />
  </Provider>
);
