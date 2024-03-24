'use client'
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "../Scene";
import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import React from "react";

const CarSection = () => {
    return (
        <motion.div className="w-full flex h-full justify-center items-center bg-gray-800">
          <Canvas className="w-full h-full">
            <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
              <Scene />
            </Physics>
          </Canvas>
        </motion.div>
    )
};

export default CarSection