import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// If window.initialRoute is set, we need to ensure wouter uses it
// For a static site without a real server, we can just use hash routing
// or intercept the initial render. 
if (window.initialRoute) {
  // We can just let wouter read the current window.location
  console.log("Starting at path:", window.initialRoute);
}

createRoot(document.getElementById("root")!).render(<App />);
