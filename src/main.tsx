import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./contexts/AuthContext";

const el = document.getElementById("root");
if (el === null) throw new Error("Root container missing in index.html");

const root = ReactDOM.createRoot(el);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);
