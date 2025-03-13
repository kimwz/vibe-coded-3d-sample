import { forwardRef, useRef, useEffect, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Group } from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";

interface CharacterProps {
  position: [number, number, number];
  action: string;
}

const Character = forwardRef<Group, CharacterProps>(({ position, action }, ref) => {
  const group = useRef<Group>(null);
  const [model, setModel] = useState<Group | null>(null);
  // 캐릭터 모델을 space-marine으로 변경
  const { scene, animations } = useGLTF("https://agent8-games.verse8.io/assets/3d/characters/space-marine.glb");
  
  // 추가 애니메이션 로드
  const runAnimation = useGLTF("https://agent8-games.verse8.io/assets/3d/animations/mixamorig/run.glb");
  const attackAnimation = useGLTF("https://agent8-games.verse8.io/assets/3d/animations/mixamorig/punch.glb");
  
  // 모든 애니메이션을 하나의 배열로 합치기
  const allAnimations = [
    ...(animations || []),
    ...(runAnimation.animations || []),
    ...(attackAnimation.animations || [])
  ];
  
  // 애니메이션 이름 설정
  useEffect(() => {
    if (runAnimation.animations && runAnimation.animations.length > 0) {
      runAnimation.animations[0].name = 'run';
    }
    if (attackAnimation.animations && attackAnimation.animations.length > 0) {
      attackAnimation.animations[0].name = 'attack';
    }
  }, [runAnimation.animations, attackAnimation.animations]);
  
  const { actions, mixer } = useAnimations(allAnimations, model);
  
  // Clone the scene to avoid sharing skeleton
  useEffect(() => {
    if (scene && !model) {
      const clonedScene = SkeletonUtils.clone(scene);
      setModel(clonedScene);
    }
  }, [scene, model]);
  
  // Forward the ref to the group
  useEffect(() => {
    if (group.current && ref) {
      // @ts-ignore - forwarding ref between different types
      ref.current = group.current;
    }
  }, [ref, group]);
  
  // Handle animation changes
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;
    
    // Stop all current animations
    Object.values(actions).forEach(action => action?.stop());
    
    // Determine which animation to play based on the action prop
    let animationToPlay = 'idle';
    
    if (action === 'walking') {
      animationToPlay = 'walk';
    } else if (action === 'running') {
      animationToPlay = 'run';
    } else if (action === 'attacking') {
      animationToPlay = 'attack';
    }
    
    // Play the selected animation
    if (actions[animationToPlay]) {
      const currentAction = actions[animationToPlay];
      currentAction?.reset().fadeIn(0.2).play();
      
      // 공격 애니메이션은 한 번만 재생 후 idle로 돌아가기
      if (animationToPlay === 'attack') {
        if (currentAction) {
          // 애니메이션이 끝나면 idle로 돌아가기
          const duration = currentAction.getClip().duration;
          setTimeout(() => {
            if (actions['idle']) {
              currentAction.fadeOut(0.2);
              actions['idle'].reset().fadeIn(0.2).play();
            }
          }, duration * 1000 - 200); // 페이드 아웃 시간 고려
        }
      }
    } else {
      // Fallback to idle if the requested animation doesn't exist
      actions['idle']?.reset().fadeIn(0.2).play();
    }
    
    return () => {
      // Clean up animations
      Object.values(actions).forEach(action => action?.stop());
    };
  }, [actions, action]);

  return (
    <group ref={group} position={position} scale={[0.8, 0.8, 0.8]}>
      {model && <primitive object={model} />}
    </group>
  );
});

Character.displayName = "Character";

export default Character;
