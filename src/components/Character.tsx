import { forwardRef } from "react";
import { Box, Cylinder, Sphere } from "@react-three/drei";
import { Mesh } from "three";

interface CharacterProps {
  position: [number, number, number];
}

const Character = forwardRef<Mesh, CharacterProps>(({ position }, ref) => {
  return (
    <group ref={ref} position={position}>
      {/* Body - Suit */}
      <Box 
        position={[0, 1, 0]} 
        args={[0.9, 1.3, 0.6]}
        castShadow
      >
        <meshStandardMaterial color="#192841" /> {/* Dark blue suit */}
      </Box>
      
      {/* Shirt */}
      <Box 
        position={[0, 1.2, 0.31]} 
        args={[0.6, 0.6, 0.01]}
        castShadow
      >
        <meshStandardMaterial color="white" />
      </Box>
      
      {/* Red Tie */}
      <Box 
        position={[0, 1.05, 0.32]} 
        args={[0.15, 0.7, 0.01]}
        castShadow
      >
        <meshStandardMaterial color="#c41e3a" />
      </Box>
      
      {/* Head */}
      <Sphere 
        position={[0, 2, 0]} 
        args={[0.4, 16, 16]}
        castShadow
      >
        <meshStandardMaterial color="#fad7a0" /> {/* Skin tone */}
      </Sphere>
      
      {/* Trump's distinctive hair */}
      <Box 
        position={[0, 2.3, 0]} 
        args={[0.7, 0.2, 0.5]}
        rotation={[0.1, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#f1c40f" /> {/* Blonde hair */}
      </Box>
      
      {/* Hair sides */}
      <Box 
        position={[-0.3, 2.1, 0]} 
        args={[0.15, 0.3, 0.4]}
        castShadow
      >
        <meshStandardMaterial color="#f1c40f" />
      </Box>
      <Box 
        position={[0.3, 2.1, 0]} 
        args={[0.15, 0.3, 0.4]}
        castShadow
      >
        <meshStandardMaterial color="#f1c40f" />
      </Box>
      
      {/* Hair front sweep */}
      <Box 
        position={[0, 2.15, 0.2]} 
        args={[0.6, 0.15, 0.2]}
        rotation={[0.3, 0, 0]}
        castShadow
      >
        <meshStandardMaterial color="#f1c40f" />
      </Box>
      
      {/* Eyes */}
      <Sphere 
        position={[-0.15, 2, 0.3]} 
        args={[0.06, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="white" />
      </Sphere>
      <Sphere 
        position={[0.15, 2, 0.3]} 
        args={[0.06, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="white" />
      </Sphere>
      
      {/* Pupils */}
      <Sphere 
        position={[-0.15, 2, 0.35]} 
        args={[0.03, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="#2980b9" /> {/* Blue eyes */}
      </Sphere>
      <Sphere 
        position={[0.15, 2, 0.35]} 
        args={[0.03, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="#2980b9" />
      </Sphere>
      
      {/* Mouth */}
      <Box 
        position={[0, 1.8, 0.35]} 
        args={[0.2, 0.05, 0.05]}
        castShadow
      >
        <meshStandardMaterial color="#cb4335" />
      </Box>
      
      {/* Arms */}
      <Box 
        position={[-0.65, 1, 0]} 
        args={[0.25, 0.8, 0.25]}
        castShadow
      >
        <meshStandardMaterial color="#192841" /> {/* Match suit color */}
      </Box>
      <Box 
        position={[0.65, 1, 0]} 
        args={[0.25, 0.8, 0.25]}
        castShadow
      >
        <meshStandardMaterial color="#192841" />
      </Box>
      
      {/* Hands */}
      <Sphere 
        position={[-0.65, 0.5, 0]} 
        args={[0.15, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="#fad7a0" /> {/* Skin tone */}
      </Sphere>
      <Sphere 
        position={[0.65, 0.5, 0]} 
        args={[0.15, 8, 8]}
        castShadow
      >
        <meshStandardMaterial color="#fad7a0" />
      </Sphere>
      
      {/* Legs */}
      <Box 
        position={[-0.3, 0.3, 0]} 
        args={[0.3, 0.6, 0.3]}
        castShadow
      >
        <meshStandardMaterial color="#192841" /> {/* Match suit color */}
      </Box>
      <Box 
        position={[0.3, 0.3, 0]} 
        args={[0.3, 0.6, 0.3]}
        castShadow
      >
        <meshStandardMaterial color="#192841" />
      </Box>
      
      {/* Shoes */}
      <Box 
        position={[-0.3, 0, 0.1]} 
        args={[0.3, 0.1, 0.5]}
        castShadow
      >
        <meshStandardMaterial color="black" />
      </Box>
      <Box 
        position={[0.3, 0, 0.1]} 
        args={[0.3, 0.1, 0.5]}
        castShadow
      >
        <meshStandardMaterial color="black" />
      </Box>
    </group>
  );
});

Character.displayName = "Character";

export default Character;
