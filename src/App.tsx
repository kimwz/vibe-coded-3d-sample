import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import "./App.css";
import Game from "./components/Game";
import UI from "./components/UI";

function App() {
  const [score, setScore] = useState(0);
  
  const handleScoreUpdate = () => {
    setScore(prev => prev + 1);
  };

  return (
    <div className="w-full h-screen">
      <UI score={score} />
      <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Game onScoreUpdate={handleScoreUpdate} />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
