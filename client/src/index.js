import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AxiosProvider, axios } from "react-hooks-axios";

import "bootstrap/dist/css/bootstrap.min.css";

axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AxiosProvider axios={axios}>
    <App />
  </AxiosProvider>
);
