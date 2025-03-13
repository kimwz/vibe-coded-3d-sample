import { useEffect, useState } from "react";

interface UIProps {
  score: number;
}

export default function UI({ score }: UIProps) {
  const [showControls, setShowControls] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute z-10 w-full p-4 pointer-events-none">
      <div className="flex justify-between items-start">
        <div className="bg-black/50 text-white p-2 rounded">
          <h2 className="text-xl font-bold">점수 : {score}</h2>
        </div>
        
        {showControls && (
          <div className="bg-black/50 text-white p-3 rounded max-w-xs">
            <h3 className="font-bold mb-2">조작법:</h3>
            <ul className="text-sm">
              <li>W - 앞으로 이동</li>
              <li>S - 뒤로 이동</li>
              <li>A - 왼쪽으로 회전</li>
              <li>D - 오른쪽으로 회전</li>
              <li>Shift - 달리기</li>
              <li>마우스 클릭 - 공격</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
