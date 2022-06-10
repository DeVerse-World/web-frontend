import React, { Suspense, useEffect, useState } from "react";
import { TransformControls, OrbitControls } from '@react-three/drei'
import { Canvas, GroupProps, useFrame } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelPreviewService from "../data/services/3d_model_service";
import { AnimationMixer } from "three";

interface ModelViewerProps extends GroupProps {
  filePath: string;
}

interface ModelObjectProps extends GroupProps {
  gltf: GLTF;
}

export default function ModelViewer(props: ModelViewerProps) {
  const [model, setModel] = useState<GLTF>(null);

  useEffect(() => {
    ModelPreviewService.load(props.filePath, (gltf) => {
      setModel(gltf);
    })
  }, [])


  return model && (
    <Canvas className='border-4 rounded-lg m-4' style={{ height: '50vh', width: '80vh' }}>
      <Suspense fallback={null}>
        <TransformControls showX={false} showY={false} showZ={false}>
          <ModelObject filePath={props.filePath} {...props} gltf={model} />
        </TransformControls>
      </Suspense>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <spotLight position={[-10, -10, 0]} angle={0.55} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <OrbitControls makeDefault zoomSpeed={2}/>
      {/* <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} /> */}
      {/* <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}></PresentationControls> */}
    </Canvas>
  );
}


function ModelObject(props: ModelObjectProps) {

  let animationMixer: AnimationMixer = new AnimationMixer(props.gltf.scene);

  useEffect(() => {
    props.gltf.animations.forEach((animation) => {
      animationMixer.clipAction(animation).play();
    })
  }, [])

  useFrame((state, delta) => {
    animationMixer?.update(delta)
  })

  return (
    <primitive object={props.gltf.scene} position={[0, -1, 0]} {...props} />
  )
}