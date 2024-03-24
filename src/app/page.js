"use client";
import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Scene } from "../Scene";
import { Physics } from "@react-three/cannon";
import { Zap } from "react-feather";

import Link from "next/link";

import CanModel from "../canModel/index.jsx";

import HeroSection from "@/sections/heroSection";
import CanSection from "@/sections/canSection";
import CarSection from "@/sections/carSection";

const sections = [HeroSection, CanSection, CarSection];

export default function Home() {
  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll md:no-scrollbar">
      <section className="snap-start h-screen flex items-center justify-center bg-blue-500">
        <h2 className="text-white text-3xl">Section 1</h2>
      </section>
      <section className="snap-start h-screen w-full flex items-center justify-center bg-green-500">
        <motion.div className="w-1/2 flex h-full justify-center items-center bg-gray-900">
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.1} />
            <Suspense fallback={null}>
              <CanModel />
            </Suspense>
            <Environment preset="sunset" />
          </Canvas>
        </motion.div>
        <div
          className="w-1/2 h-full justify-center  items-left bg-gray-900 px-2 flex gap-5 "
          style={{ flexDirection: "column" }}
        >
          <h2 className="text-white font-bold text-5xl">
            Dino Luzzi Energy Drink
          </h2>
          <h3 className="text-white text-3xl">
            The best energy drink in the world
          </h3>
          <div style={{ gap: 20, flexDirection: "row", display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                style={{ borderRadius: 20, padding: 9 }}
                className="bg-gray-700"
              >
                <Zap color="#A48BFF" size={70} strokeWidth={1} />
              </motion.div>
              <div
                classname="items-center flex justify-center"
                style={{ maxWidth: 85 }}
              >
                <h3 className="text-slate-300 text-sm">Long lasting energy</h3>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                style={{ borderRadius: 20, padding: 9 }}
                className="bg-gray-700"
              >
                <Zap color="#A48BFF" size={70} strokeWidth={1} />
              </motion.div>
              <div
                classname="items-center flex justify-center"
                style={{ maxWidth: 85 }}
              >
                <h3 className="text-slate-300 text-sm">Long lasting energy</h3>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 0 }}
                style={{ borderRadius: 20, padding: 9 }}
                className="bg-gray-700"
              >
                <Zap color="#A48BFF" size={70} strokeWidth={1} />
              </motion.div>
              <div
                classname="items-center flex justify-center"
                style={{ maxWidth: 85 }}
              >
                <h3 className="text-slate-300 text-sm">Long lasting energy</h3>
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.2, rotate: 0 }}
            whileTap={{
              scale: 0.8,
              borderRadius: "100%",
            }}
            style={{
              background: "white",
              borderRadius: 30,
              width: "fit-content",
            }}
          >
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-full bg-white p-4 cursor-pointer px-25">
                <p className="text-black font-bold">Buy Now!</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
      <section className="snap-start h-screen flex items-center justify-center bg-red-500">
        <motion.div className="w-full flex h-full justify-center items-center bg-gray-800">
          <Canvas className="w-full h-full">
            <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
              <Scene />
            </Physics>
          </Canvas>
        </motion.div>
      </section>
      {/* Add more sections as needed */}
    </div>
  );
}

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//       <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
//         <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
//           Get started by editing&nbsp;
//           <code className="font-mono font-bold">src/app/page.js</code>
//         </p>
//         <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
//           <a
//             className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
//             href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             By{" "}
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//           </a>
//         </div>
//       </div>

//       <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
//         <Image
//           className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
//           src="/next.svg"
//           alt="Next.js Logo"
//           width={180}
//           height={37}
//           priority
//         />
//       </div>

//       <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
//         <a
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Docs{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Find in-depth information about Next.js features and API.
//           </p>
//         </a>

//         <a
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Learn{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Learn about Next.js in an interactive course with&nbsp;quizzes!
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Templates{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
//             Explore starter templates for Next.js.
//           </p>
//         </a>

//         <a
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
//           className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <h2 className={`mb-3 text-2xl font-semibold`}>
//             Deploy{" "}
//             <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
//               -&gt;
//             </span>
//           </h2>
//           <p className={`m-0 max-w-[30ch] text-sm opacity-50 text-balance`}>
//             Instantly deploy your Next.js site to a shareable URL with Vercel.
//           </p>
//         </a>
//       </div>
//     </main>
//   );
// }
