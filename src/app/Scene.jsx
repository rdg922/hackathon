import {
    Environment,
    OrbitControls,
    PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from 'react';

export function Scene() {
    return (
        <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={40}/>
            <Environment preset="sunset"/>
            <OrbitControls target = {[-2.64, -0.71, 0.03]} />
        </Suspense>
    )
}