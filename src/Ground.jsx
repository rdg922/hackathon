import { usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { BufferAttribute } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { ColliderBox } from "./ColliderBox";

export function Ground() {
  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );

  const racetrackText = useLoader(
    TextureLoader,
    "/textures/Racetrack_text.png"
  );
  const racetrackBackground = useLoader(
    TextureLoader,
    "/textures/Racetrack_background.png"
  );

  const alphaMap = useLoader(TextureLoader, "/textures/alpha-map.png");

  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  useEffect(() => {
    if (!racetrackText) return;

    racetrackText.anisotropy = 16;
  }, [racetrackText]);

  useEffect(() => {
    if (!racetrackBackground) return;

    racetrackBackground.anisotropy = 16;
  }, [racetrackBackground]);

  useEffect(() => {
    if (!meshRef.current) return;

    var uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    var uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-1.5, 0.002, 0]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={Math.PI * 1}
        scale={[0.21, 0.8, 1]}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial map={racetrackBackground} transparent={true} />
      </mesh>

      <mesh
        ref={meshRef2}
        position={[-1.5, 0.2, 0]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={Math.PI * 1}
        scale={[0.21, 0.8, 1]}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial map={racetrackText} transparent={true} />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-1.5, -0.01, 0]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={0}
      >
        <circleGeometry args={[6.12, 50]} />
        <MeshReflectorMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.3}
          metalness={0.05}
          roughness={0.9}
          dithering={true}
          blur={[1024, 512]} // Blur ground reflections (width, heigt), 0 skips blur
          mixBlur={3} // How much blur mixes with surface roughness (default = 1)
          mixStrength={30} // Strength of the reflections
          mixContrast={1} // Contrast of the reflections
          resolution={1024} // Off-buffer resolution, lower=faster, higher=better quality, slower
          mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={0} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [bl
          debug={0}
          reflectorOffset={0.02} // Offsets the virtual camera that projects the reflection. Useful when the reflective
        ></MeshReflectorMaterial>
      </mesh>
      <ColliderBox position={[-1.53, 0.0, -4.075]} scale={[2, 1, 0.3]} />
    </>
  );
}
