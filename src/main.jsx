import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import {  RouterProvider } from "react-router";
import { store } from "./redux/store.js";
import router from "./routes.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="maxContainer">
      <Provider store={store}>
        <Toaster />
        <RouterProvider router={router} />
      </Provider>
    </div>
  </StrictMode>
);
