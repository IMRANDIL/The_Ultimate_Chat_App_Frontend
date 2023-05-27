import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </>
);
