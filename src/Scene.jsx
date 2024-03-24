import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";
import { TextPlane } from "./TextPlane";
import { useThree } from "@react-three/fiber";

export function Scene({ goToNextSection, resetSignal, isVisible }) {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/envmap.hdr"} background={"both"} />

      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />

      <TextPlane text="hello" />
      {<Ground />}

      {/*<Track />*/}
      <Car
        thirdPerson={thirdPerson}
        goToNextSection={goToNextSection}
        resetSignal={resetSignal}
        isVisible={isVisible}
      />
    </Suspense>
  );
}
