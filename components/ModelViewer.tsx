import React, { Suspense, useEffect, useState } from "react";
import { TransformControls, OrbitControls } from '@react-three/drei'
import { Canvas, GroupProps, useFrame } from "@react-three/fiber";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import ModelPreviewService from "../data/services/ModelRenderService";
import { AnimationMixer, Event } from "three";

interface ModelViewerProps extends GroupProps {
  filePath: string;
}

interface ModelObjectProps extends GroupProps {
  gltf: GLTF;
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
        <ModelObject filePath={props.filePath} {...props} gltf={model} />
      </TransformControls>
    </Suspense>
  );
}

//TODO: add default animation to rotate horizontally continously
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