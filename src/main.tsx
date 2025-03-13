import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KeyboardControls } from "@react-three/drei";
import "./index.css";
import App from "./App.tsx";

// Define keyboard controls map
const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
  { name: "jump", keys: ["Space"] },
];

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KeyboardControls map={keyboardMap}>
      <App />
    </KeyboardControls>
  </StrictMode>
);
