"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Scene } from "../Scene";
import { Physics } from "@react-three/cannon";
import { Zap, Hexagon, Slash, ArrowDown, ArrowDownCircle } from "react-feather";

import CanModel from "../canModel/index.jsx";

import ResponsiveIcon from "@/ResponsiveIcon";

const CanvasComponent = ({ setToJump, toJump, isVisible }) => {
  const canvasRef = useRef();

  // Lock scroll function
  const lockScroll = useCallback((e) => {
    e.preventDefault();
  }, []);

  // Adds event listeners to lock scroll when mouse is over the canvas
  const addLockListeners = useCallback(() => {
    if (canvasRef.current)
      canvasRef.current.addEventListener("wheel", lockScroll, {
        passive: false,
      });
  }, [lockScroll]);

  // Removes event listeners to allow scrolling when mouse is not over the canvas
  const removeLockListeners = useCallback(() => {
    if (canvasRef.current)
      canvasRef.current.removeEventListener("wheel", lockScroll);
  }, [lockScroll]);

  // UseEffect to attach and clean up the event listeners
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      addLockListeners();
      return () => {
        removeLockListeners();
      };
    }
  }, [addLockListeners, removeLockListeners]);

  return (
    <Canvas
      className="w-full h-full"
      ref={canvasRef}
      onPointerOver={addLockListeners}
      onPointerOut={removeLockListeners}
    >
      <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
        <Scene
          resetSignal={toJump}
          goToNextSection={() => {
            if (!toJump) setToJump(true);
          }}
          isVisible={isVisible}
        />
      </Physics>
    </Canvas>
  );
};

export default function Home() {
  const [isCanvasVisible, setCanvasVisible] = useState(false);
  const nextSectionRef = useRef(null);
  const carSectionRef = useRef(null);

  const [toJump, setToJump] = useState(false);

  useEffect(() => {
    let timeoutId = null;

    if (toJump && isCanvasVisible) {
      if (nextSectionRef.current) {
        nextSectionRef.current.scrollIntoView({ behavior: "smooth" });
        timeoutId = setTimeout(() => {
          console.log("jumped!");
          setToJump(false);
        }, 600);
      }
    }

    if (timeoutId != null) {
      return () => clearTimeout(timeoutId);
    }
  }, [toJump, isCanvasVisible]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Adjust based on when you want to load/unload the Canvas
    );

    if (carSectionRef.current) {
      observer.observe(carSectionRef.current);
    }

    return () => {
      if (carSectionRef.current) {
        observer.unobserve(carSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="snap-y snap-mandatory h-screen overflow-scroll md:no-scrollbar">
      <section className="snap-start h-screen flex flex-col flex-row items-center justify-center gap-5 bg-blue-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          <h2 className="text-white text-4xl">Experience the world's first</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <h2 className="text-white text-4xl">designer energy drink</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          style={{ justifySelf: "left" }}
        >
          <ArrowDown color="white" size={60} strokeWidth={1.5} />
        </motion.div>
      </section>
      <section
        ref={nextSectionRef}
        className="snap-start h-screen w-full flex items-center justify-center bg-green-500"
      >
        <motion.div className="w-1/2 flex h-full justify-center items-center bg-gray-900">
          <Canvas className="w-full h-full">
            <ambientLight intensity={0.1} />
            <Suspense fallback={null}>
              <CanModel />
            </Suspense>
            <Environment preset="sunset" />
          </Canvas>
        </motion.div>
        <div className="w-1/2 h-full flex flex-col justify-center items-start bg-gray-900 px-2 gap-5">
          <h2 className="text-white font-bold text-4xl md:text-5xl lg:text-7xl">
            Dino Luzzi Energy Drink
          </h2>
          <h3 className="text-gray-400 text-3xl md:text-3xl lg:text-4xl">Find your Power</h3>
          <div className="flex flex-row gap-5">
            <div className="flex flex-col gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
              <ResponsiveIcon Icon={Zap} />

              </div>

              <div className="flex items-center justify-center max-w-[85px]">
                <h3 className="text-slate-300 text-sm">Long lasting energy</h3>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="motion-div bg-gray-700 rounded-lg p-4">
              <ResponsiveIcon Icon={Hexagon} />
              </div>
              <div className="flex items-center justify-center max-w-[85px]">
                <h3 className="text-slate-300 text-sm">
                  Contains vitamins B2, B12, B13
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="motion-div bg-gray-700 rounded-lg p-4">
              <ResponsiveIcon Icon={Slash}/>
              </div>
              <div className="flex items-center justify-center max-w-[85px]">
                <h3 className="text-slate-300 text-sm">
                  Made with zero fat or cholesterol
                </h3>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="motion-div bg-gray-700 rounded-lg p-4">
              <ResponsiveIcon Icon={ArrowDownCircle}/>

              </div>
              <div className="flex items-center justify-center max-w-[85px]">
                <h3 className="text-slate-300 text-sm">
                  Only 115 calories per can
                </h3>
              </div>
            </div>
          </div>
          <div className="motion-div hover:scale-110 hover:rotate-0 tap:scale-80 tap:rounded-full bg-white rounded-full w-fit">
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="rounded-full bg-white p-4 cursor-pointer px-6">
                <p className="text-black font-bold">Buy Now!</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section
        ref={carSectionRef}
        className="snap-start h-screen flex items-center justify-center bg-red-500"
      >
        <motion.div className="w-full flex h-full justify-center items-center bg-gray-800">
          <CanvasComponent
            setToJump={setToJump}
            toJump={toJump}
            isVisible={isCanvasVisible}
          />
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
