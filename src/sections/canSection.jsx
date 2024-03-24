'use client'

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import CanModel from "@/canModel";
import React from "react";

const CanSection = () => {
    return (
    <>
        <motion.div className="w-1/2 flex h-full justify-center items-center ">
            <Canvas className="w-full h-full">
            <ambientLight intensity={0.1} />
            <Suspense fallback={null}>
                <CanModel />
            </Suspense>
            <Environment preset="sunset" />
            </Canvas>
        </motion.div>
        <motion.div className="w-1/2 h-full flex justify-center items-center"></motion.div>
    </>
    )
};

export default CanSection;