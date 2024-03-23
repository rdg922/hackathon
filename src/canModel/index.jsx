
// components/CanModel.js
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from '@react-three/fiber';

export default function CanModel(){
    const modelRef = useRef();

  const gltf = useLoader(GLTFLoader, '../model/Luzzi_Can.glb');
    console.log(gltf)
    // Use frame loop to update the model's rotation based on mouse position
    useFrame((state) => {
        const { mouseX, mouseY } = state.pointer;
        const xRotation = mouseY * 0.5; // Adjust rotation sensitivity here
        const yRotation = mouseX * 0.5; // Adjust rotation sensitivity here
        modelRef.current.rotation.x = xRotation;
        modelRef.current.rotation.y = yRotation;
      });
    
      return <primitive ref={modelRef} object={gltf.scene} scale={1.5} />;
};
