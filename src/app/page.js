"use client";
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "../Scene";
import { Physics } from "@react-three/cannon";

import Link from "next/link";

import CanModel from "../canModel/index.jsx";

import HeroSection from "@/sections/heroSection";
import CanSection from "@/sections/canSection";
import CarSection from "@/sections/carSection";

const sections = [HeroSection, CanSection, CarSection];




export default function Home() {

  const [currentSection, setCurrentSection] = useState(0);
  const sectionRefs = useRef(sections.map(() => React.createRef()));



  // const scrollToSection = (index) => {
  //   window.scrollTo({
  //     top: sectionRefs.current[index].current.offsetTop,
  //     behavior: 'smooth',
  //   });
  // };
  // const handleWheel = (e) => {
  //   console.log("listening")
  //   e.preventDefault(); // Prevent default scroll behavior
    
  //   if (e.deltaY > 0) { // Scrolling down
  //     if (currentSection < sections.length - 1) {
  //       setCurrentSection((prevSection) => {
  //         scrollToSection(prevSection + 1);
  //         return prevSection + 1;
  //       });
  //     }
  //   } else if (e.deltaY < 0) { // Scrolling up
  //     if (currentSection > 0) {
  //       setCurrentSection((prevSection) => {
  //         scrollToSection(prevSection - 1);
  //         return prevSection - 1;
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener('wheel', handleWheel, { passive: false });
  
  //   return () => {
  //     window.removeEventListener('wheel', handleWheel);
  //   };
  // }, [currentSection]);
  const handleScroll = (e) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, '');
    const elem = document.getElement(targetId);
    elem?.scrollIntoView({
      behavior: 'smooth'
    });

  }

  const handleWheel = (e) => {
    e.preventDefault(); // Prevent default scroll behavior
    
    if (e.deltaY > 0) { // Scrolling down
      if (currentSection < 1) {
        setCurrentSection((prevSection) => {
          handleScroll(prevSection + 1);
          return prevSection + 1;
        })
      }
    } else if (e.deltaY < 0) { // Scrolling up
      if (currentSection > 0) {
        setCurrentSection((prevSection) => {
          handleScroll(prevSection - 1);
          return prevSection - 1;
        });
      }
    }
  };


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

  // return (
  //   <motion.div className="h-screen overflow-scroll md:no-scrollbar">
  //     <motion.section 
  //       initial={{ opacity: 0 }}
  //       animate={{ opacity: 1 }}
  //       exit={{ opacity: 0 }}
  //       transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
  //       className="h-screen flex items-center justify-center bg-[#0C0C0E]">
  //     </motion.section>
      // <motion.section 
      //   initial={{ opacity: 0 }}
      //   animate={{ opacity: 1 }}
      //   exit={{ opacity: 0 }}
      //   transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
      //   className="h-screen w-full flex items-center justify-center bg-[#0C0C0E]">
      //   <CanSection />
      // </motion.section>
  //     <motion.section className="h-screen flex items-center justify-center">
  //       <CarSection />
  //     </motion.section>
  //   </motion.div>
  // );