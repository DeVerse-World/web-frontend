import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import HomeNavbar from '../../components/home/HomeNavbar'
import { OrbitControls, TransformControls } from '@react-three/drei'
import ModelPreviewService from "../../data/services/3d_model_service";
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import ModelViewer from '../../components/ModelViewer';

function Showcase() {
  const [model, setModel] = useState<GLTF>(null);

  return (
    <>
      <HomeNavbar />
      <div className='text-center'>
        <h1>Models</h1>
      </div>
      <div className='flex flex-row justify-center '>
        {<ModelViewer filePath='/3d/cleric_idle_equipped.glb' />}
      </div>
    </>

  )
}

export default Showcase;