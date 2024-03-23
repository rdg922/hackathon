'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import styles from "./style.module.scss"

export default function index() {
    return (
        <div className={styles.main}>
            <Canvas>
                <Cube/>
            </Canvas>
        </div>
    )
}

function Cube() {
    return (
        <mesh>
            <boxGeometry args={[1, 1, 1]}/>
        </mesh>
    )
}