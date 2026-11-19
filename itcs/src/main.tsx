import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { DesignSystem } from "./DesignSystem";
import "./tokens.css";
import "./style.css";
const system = location.pathname.includes("/design-system/");
createRoot(document.getElementById("app")!).render(
  <React.StrictMode>{system ? <DesignSystem /> : <App />}</React.StrictMode>,
);
