import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import "./App.css";
import Game from "./components/Game";
import UI from "./components/UI";

function App() {
  const [score, setScore] = useState(0);
  
  const handleScoreUpdate = () => {
    setScore(prev => prev + 1);
  };

  // Define keyboard controls mapping - shift 키 추가
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "shift", keys: ["ShiftLeft", "ShiftRight"] }, // 달리기 위한 Shift 키 추가
  ];

  return (
    <div className="w-full h-screen">
      <UI score={score} />
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Game onScoreUpdate={handleScoreUpdate} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}

export default App;
