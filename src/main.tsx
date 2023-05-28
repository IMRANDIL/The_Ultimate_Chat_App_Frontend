import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./redux/store.ts";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@chakra-ui/css-reset";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Provider store={store}>
      <ChakraProvider>
        <App />
        <ToastContainer />
      </ChakraProvider>
    </Provider>
  </>
);
