import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
