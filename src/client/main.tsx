import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./context/UserContext";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserContextProvider>
    <App />
  </UserContextProvider>
);
