import React, { Suspense, useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, TransformControls, OrbitControls } from '@react-three/drei'
import { Canvas, GroupProps, useFrame } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelPreviewService from "../data/services/3d_model_service";
import { AnimationMixer } from "three";

interface ModelViewerProps extends GroupProps {
  filePath: string;
}

export default function ModelViewer(props: ModelViewerProps) {
  return (
    <Canvas className='border-4 rounded-lg m-4' style={{ height: '50vh', width: '80vh' }}>
      <Suspense fallback={null}>
        <TransformControls showX={false} showY={false} showZ={false}>
          <ModelObject filePath={props.filePath} {...props}/>
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
    </Canvas>
  );
}


function ModelObject(props: ModelViewerProps) {
  const [model, setModel] = useState<GLTF>(null);

  let animationMixer: AnimationMixer = null;

  useEffect(() => {
    ModelPreviewService.load(props.filePath, (gltf) => {
      setModel(gltf);
      animationMixer = new AnimationMixer(gltf.scene);
      console.log(gltf.animations)
      gltf.animations.forEach((animation) => {
        animationMixer.clipAction(animation).play();
      })
    })
  }, [])

  useFrame((state, delta) => {
    animationMixer?.update(delta)
  })

  return model && (
    <primitive object={model.scene} position={[0, -1, 0]} {...props} />
  )
}