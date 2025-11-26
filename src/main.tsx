// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { loadGtag } from "./ga"; // correct relative import to src/ga/index.ts

// Load GA early on initial boot (idempotent)
loadGtag();

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
