import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// IMPORT BOOTSTRAP CSS
import "bootstrap/dist/css/bootstrap.min.css";
// IMPORT BOOTSTRAP JAVASCRIPT
import * as bootstrap from "bootstrap";

// IMPORT GENERAL CSS
import "./assets/css/index.css";

// IMPORT APP COMPONENT
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
