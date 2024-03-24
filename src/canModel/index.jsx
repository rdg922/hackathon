"use client";
import { useRef, useEffect } from "react";
import { useLoader, useThree, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Box3, Vector3 } from "three";

function clamp(val, min, max) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export default function CanModel({ onModelLoaded }) {
  const scale = 1.3; // Your scale factor
  const gltf = useLoader(GLTFLoader, "/model/Luzzi_Can.glb");
  const mesh = useRef(null);
  const { camera, size, mouse } = useThree();

  useEffect(() => {
    const setPosition = () => {
      if (!mesh.current) return; // Ensure mesh is loaded

      // Calculate mesh height considering scale
      const bbox = new Box3().setFromObject(mesh.current);
      bbox.applyMatrix4(mesh.current.matrixWorld); // Adjust bbox based on mesh's world matrix
      const height = (bbox.max.y - bbox.min.y) * scale; // Apply scale to height calculation

      // Camera and viewport calculations
      const aspectRatio = size.width / size.height;
      const verticalFov = camera.fov * (Math.PI / 180); // Convert vertical FOV to radians
      const visibleHeightAtDistance =
        2 * Math.tan(verticalFov / 2) * camera.position.z;
      const visibleWidthAtDistance = visibleHeightAtDistance * aspectRatio;

      // Calculate new positions
      const newYPosition = visibleHeightAtDistance / 2 - height / 2;
      const newXPosition = -(visibleWidthAtDistance / 4); // Adjust this as needed

      // Apply positions
      //   mesh.current.position.y = newYPosition + 1;
      //   mesh.current.position.x = newXPosition;
    };

    setPosition();
    window.addEventListener("resize", setPosition);

    return () => {
      window.removeEventListener("resize", setPosition);
    };
  }, [size.width, size.height, scale]); // React to changes in size, camera, or scale

  useFrame(() => {
    if (!mesh.current) return;

    const xTilt = clamp(-(mouse.y * Math.PI) / 2, -Math.PI / 30, Math.PI / 30); // Controls the tilt based on mouse Y position
    const yTilt =
      clamp((mouse.x * Math.PI) / 2, -Math.PI / 20, Math.PI / 20) +
      (6.5 / 4) * Math.PI; // Controls the tilt based on mouse X position

    mesh.current.rotation.x += (xTilt - mesh.current.rotation.x) / 20;
    mesh.current.rotation.y += (yTilt - mesh.current.rotation.y) / 20 - 0.02;
  });

  return (
    <mesh
      ref={mesh}
      scale={[scale, scale, scale]}
      rotation-y={(6.8 / 4) * Math.PI}
    >
      <primitive object={gltf.scene} />
    </mesh>
  );
}
