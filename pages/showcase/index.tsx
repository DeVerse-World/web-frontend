import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Idle from '../../components/gltf/Idle'

function Showcase() {
  return (
    <Canvas style={{minHeight:1080}}>
      <Suspense fallback={null}>
        <Idle />
      </Suspense>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}
    </Canvas>
  )
}

export default Showcase;