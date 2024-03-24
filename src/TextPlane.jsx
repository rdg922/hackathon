import { useMemo } from 'react';
import { CanvasTexture } from 'three';

export function TextPlane({ text }) {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    canvas.width = 512; // Power-of-two dimensions
    canvas.height = 512;
    
    // Customize your text style
    context.fillStyle = '#ffffff'; // Background color
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = '48px sans-serif';
    context.fillStyle = 'black'; // Text color
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    return new CanvasTexture(canvas);
  }, [text]);

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry attach="geometry" args={[5, 5]} />
      <meshBasicMaterial attach="material" map={texture} />
    </mesh>
  );
}
