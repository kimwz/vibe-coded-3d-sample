import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Sphere, useKeyboardControls, PerspectiveCamera } from "@react-three/drei";
import { Vector3, Mesh, Quaternion, Euler } from "three";
import { generateRandomPosition, generateRandomTree } from "../utils/helpers";
import Character from "./Character";
import Terrain from "./Terrain";

interface GameProps {
  onScoreUpdate: () => void;
}

export default function Game({ onScoreUpdate }: GameProps) {
  const playerRef = useRef<Mesh>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const playerRotation = useRef(new Euler(0, 0, 0));
  const { camera } = useThree();
  
  const [targets, setTargets] = useState(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      position: generateRandomPosition(20),
      collected: false
    }))
  );
  
  const [trees, setTrees] = useState(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      ...generateRandomTree(30)
    }))
  );
  
  const [, getKeys] = useKeyboardControls();
  
  // Update camera position to follow player
  useFrame((_, delta) => {
    if (!playerRef.current || !cameraRef.current) return;
    
    const { forward, backward, left, right } = getKeys();
    const moveSpeed = 5;
    const rotateSpeed = 2;
    
    // Calculate movement direction based on player's rotation
    const direction = new Vector3();
    const rotation = playerRotation.current;
    
    // Handle rotation first
    if (left) {
      rotation.y += rotateSpeed * delta;
      playerRef.current.rotation.y = rotation.y;
    }
    if (right) {
      rotation.y -= rotateSpeed * delta;
      playerRef.current.rotation.y = rotation.y;
    }
    
    // Then handle movement in the direction the player is facing
    if (forward || backward) {
      // Calculate forward direction based on player rotation
      direction.set(0, 0, backward ? 1 : -1).applyEuler(rotation);
      playerRef.current.position.add(direction.multiplyScalar(moveSpeed * delta));
    }
    
    // Keep player within bounds
    playerRef.current.position.x = Math.max(-30, Math.min(30, playerRef.current.position.x));
    playerRef.current.position.z = Math.max(-30, Math.min(30, playerRef.current.position.z));
    
    // Update camera position to follow player
    const idealOffset = new Vector3(0, 3, 6);
    idealOffset.applyEuler(new Euler(0, rotation.y, 0));
    
    const targetPosition = playerRef.current.position.clone().add(idealOffset);
    
    // Smoothly move camera to follow player
    cameraRef.current.position.lerp(targetPosition, 5 * delta);
    
    // Make camera look at player
    const lookAtPos = playerRef.current.position.clone().add(new Vector3(0, 1, 0));
    cameraRef.current.lookAt(lookAtPos);
    
    // Update the main camera to match our camera ref
    camera.position.copy(cameraRef.current.position);
    camera.quaternion.copy(cameraRef.current.quaternion);
    
    // Check for collisions with targets
    if (playerRef.current) {
      const playerPosition = playerRef.current.position;
      
      targets.forEach((target, index) => {
        if (!target.collected) {
          const targetPosition = new Vector3(
            target.position[0],
            target.position[1],
            target.position[2]
          );
          
          const distance = playerPosition.distanceTo(targetPosition);
          
          if (distance < 1.5) {
            // Collect the target
            setTargets(prev => 
              prev.map((t, i) => 
                i === index ? { ...t, collected: true } : t
              )
            );
            onScoreUpdate();
            
            // Respawn target after a delay
            setTimeout(() => {
              setTargets(prev => 
                prev.map((t, i) => 
                  i === index ? { ...t, position: generateRandomPosition(20), collected: false } : t
                )
              );
            }, 1000);
          }
        }
      });
    }
  });
  
  return (
    <>
      {/* Camera */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 3, 6]} />
      
      {/* Player Character */}
      <Character ref={playerRef} position={[0, 0, 0]} />
      
      {/* Terrain */}
      <Terrain />
      
      {/* Targets/Collectibles */}
      {targets.map((target) => (
        !target.collected && (
          <Sphere
            key={target.id}
            position={target.position}
            args={[0.5, 16, 16]}
            castShadow
          >
            <meshStandardMaterial color="gold" emissive="orange" emissiveIntensity={0.5} />
          </Sphere>
        )
      ))}
      
      {/* Trees */}
      {trees.map((tree) => (
        <group key={tree.id} position={[tree.position[0], 0, tree.position[2]]} scale={tree.scale}>
          {/* Tree trunk */}
          <Box 
            position={[0, 1, 0]} 
            args={[0.5, 2, 0.5]} 
            castShadow
          >
            <meshStandardMaterial color="brown" />
          </Box>
          {/* Tree top */}
          <Sphere
            position={[0, 2.5, 0]}
            args={[1, 16, 16]}
            castShadow
          >
            <meshStandardMaterial color="darkgreen" />
          </Sphere>
        </group>
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />
    </>
  );
}
