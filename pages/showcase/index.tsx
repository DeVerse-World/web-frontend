import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import HomeNavbar from '../../components/home/HomeNavbar'
import { OrbitControls, TransformControls } from '@react-three/drei'
import ModelPreviewService from "../../data/services/3d_model_service";
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

function Showcase() {

  const [model, setModel] = useState<GLTF>(null);

  useEffect(() => {
    ModelPreviewService.load((gltf) => {
      setModel(gltf);
    })
  },[])

  const renderModel = (element: JSX.Element) => {
    return (
      <Canvas className='border-4 rounded-lg m-4' style={{ height: '50vh', width: '80vh' }}>
        <Suspense fallback={null}>
          <TransformControls showX={false} showY={false} showZ={false}>
            {element}
          </TransformControls>

        </Suspense>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <spotLight position={[-10, -10, 0]} angle={0.55} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <OrbitControls makeDefault />
        {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
        {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}
      </Canvas>);
  }

  return (
    <>
      <HomeNavbar />
      <div className='text-center'>
        <h1>Models</h1>
      </div>
      <div className='flex flex-row justify-center '>
        {model && renderModel(<primitive object={model.scene} position={[0, -1, 0]} />)}
      </div>
    </>

  )
}

export default Showcase;