import React from "react";
import ReactDOM from "react-dom/client";

import "./app/styles/globals.css";
import { App } from "./app/App";
import { initPlausibleTracking } from "./lib/plausible";

initPlausibleTracking();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
