// components/CanModel.js
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const CanModel = () => {
  const gltf = useLoader(GLTFLoader, '/path/to/your/soda-can-model.glb');

  return <primitive object={gltf.scene} scale={1} />;
};

export const CanModelCanvas = () => (
  <Canvas>
    <Suspense fallback={null}>
      <CanModel />
    </Suspense>
  </Canvas>
);