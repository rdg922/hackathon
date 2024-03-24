"use client";
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "../Scene";
import { Physics } from "@react-three/cannon";
import { Zap } from 'react-feather';


import Link from "next/link";

import CanModel from "../canModel/index.jsx";

import HeroSection from "@/sections/heroSection";
import CanSection from "@/sections/canSection";
import CarSection from "@/sections/carSection";

const sections = [HeroSection, CanSection, CarSection];




export default function Home() {

  return (
    <motion.div className="snap-y scroll-smooth snap-mandatory h-screen overflow-scroll md:no-scrollbar">


    <motion.section
        id="section-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="snap-always h-screen w-full flex items-center justify-center bg-[#0C0C0E]" 
    >
      <HeroSection />
    </motion.section>

    <motion.section 
        id="section-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="snap-always h-screen w-full flex items-center justify-center bg-[#0C0C0E]" >
          <CanSection />
      </motion.section>

    <motion.section 
        id="section-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
        className="snap-always h-screen w-full flex items-center justify-center bg-[#0C0C0E]" >
          <CarSection />
      </motion.section>
    
    </motion.div>
  )
}
