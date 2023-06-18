import React, { Suspense, useEffect, useState } from "react";
import { TransformControls } from '@react-three/drei'
import { GroupProps, useFrame } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelPreviewService from "../data/services/ModelRenderService";
import { AnimationMixer, Event } from "three";
import { OrbitControls, Environment } from "@react-three/drei";

interface ModelViewerProps extends GroupProps {
  filePath: string;
  animationPath: string;
}

interface ModelObjectProps extends GroupProps {
  gltf: GLTF;
  animationPath: string;
}

export default function ModelViewer(props: ModelViewerProps) {
  const [model, setModel] = useState<GLTF>(null);
  const [loadProgress, setLoadProgress] = useState(100);
  useEffect(() => {
    ModelPreviewService.load(props.filePath, (gltf) => {
      setModel(gltf);
    }, (e) => {
      setLoadProgress(e);
    })
    //TODO: add cleanup function to avoid memory leak
  }, [])

  const onChangeControl = (e: Event) => {
    console.log(e)
  }

  return model && (
    <Suspense fallback={
      <div>
        <h1>Loading {loadProgress}%</h1>
      </div>
    }>
      <TransformControls showX={false} showY={false} showZ={false}>
        <ModelObject filePath={props.filePath} animationPath={"/3d/StandingRPM.glb"}  {...props} gltf={model} />
      </TransformControls>
    </Suspense>
  );
}

//TODO: add default animation to rotate horizontally continously
function ModelObject(props: ModelObjectProps) {
  let animationMixer: AnimationMixer = new AnimationMixer(props.gltf.scene);

  useEffect(() => {
    if (props.animationPath)
      try {
        ModelPreviewService.load(props.animationPath, (gltf) => {
          gltf.animations.forEach((animation) => {
            console.log(animation.name)
            animationMixer.clipAction(animation).play();
          })
        })
      } catch (e) {
        console.log(e)
      }

    // props.animations.forEach(animation => {
    //   animationMixer.clipAction(animation).play();
    // })
    // props.gltf.animations.forEach((animation) => {
    //   animationMixer.clipAction(animation).play();
    // })
  }, [])

  useFrame((state, delta) => {
    if (animationMixer) animationMixer.update(delta)
  })

  return (
    <>
    <primitive object={props.gltf.scene} lookAt={[1,-10,0]} />
    <OrbitControls makeDefault />
    
    </>
    
  )
}