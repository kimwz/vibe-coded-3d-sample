export function generateRandomPosition(range: number): [number, number, number] {
  return [
    (Math.random() - 0.5) * range * 2,
    0.5, // Fixed height
    (Math.random() - 0.5) * range * 2
  ];
}

export function generateRandomTree(range: number) {
  return {
    position: [
      (Math.random() - 0.5) * range * 2,
      0,
      (Math.random() - 0.5) * range * 2
    ] as [number, number, number],
    scale: 0.8 + Math.random() * 0.7
  };
}
