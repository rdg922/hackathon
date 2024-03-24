'use client'
import React from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import CanModel from "./canModel";

const CanComponent = () => React.forwardRef((props, ref) => 
    (
    <div ref={ref} {...props}>
      <motion.div
            className="w-1/2 flex h-full justify-center items-center bg-gray-800"
          >
            <Canvas className="w-full h-full">
              <ambientLight intensity={0.1} />
              <Suspense fallback={null}>
                <CanModel />
              </Suspense>
              <Environment preset="sunset" />
            </Canvas>
          </motion.div>
      <div className="w-1/2 h-full flex justify-center items-center bg-gray-800">

      </div>
    </div>
    )
);

export default CanComponent;