import { Box } from "@react-three/drei";

export default function Terrain() {
  return (
    <>
      {/* Main ground */}
      <Box 
        position={[0, -0.5, 0]} 
        args={[60, 1, 60]} 
        receiveShadow
      >
        <meshStandardMaterial color="#4a7c59" />
      </Box>
      
      {/* Add some terrain features */}
      <Box 
        position={[-15, 0, -15]} 
        args={[10, 1.5, 10]} 
        receiveShadow
      >
        <meshStandardMaterial color="#3a6349" />
      </Box>
      
      <Box 
        position={[20, 0, 10]} 
        args={[15, 2, 15]} 
        receiveShadow
      >
        <meshStandardMaterial color="#3a6349" />
      </Box>
      
      <Box 
        position={[0, -0.2, -20]} 
        args={[20, 1.2, 10]} 
        receiveShadow
      >
        <meshStandardMaterial color="#4a7c59" />
      </Box>
    </>
  );
}
