
'use client'
// components/CarModel.js
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useFrame } from '@react-three/fiber';

export default function CarModel(){

  const gltf = useLoader(GLTFLoader, '/model/Luzzi_Car.glb');
  const mesh = useRef(null)
    console.log(gltf)
    // Use frame loop to update the model's rotation based on mouse position
    useFrame((state) => {
    console.log(mesh)
        // const { mouseX, mouseY } = state.pointer;
        // const xRotation = mouseY * 0.5; // Adjust rotation sensitivity here
        // const yRotation = mouseX * 0.5; // Adjust rotation sensitivity here
        // mesh.current.rotation.x = xRotation;
        // mesh.current.rotation.y = yRotation;
      });
    
      return (
        <mesh ref={mesh}>
        <primitive  object={gltf.scene} scale={1.0} />
      </mesh>
      );

};
