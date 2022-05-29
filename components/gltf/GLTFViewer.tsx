import React, { useRef } from "react";
import { useGLTF, useAnimations } from '@react-three/drei'
import { GroupProps } from "@react-three/fiber";

export default function GLTFViewer({ ...props }: GroupProps) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/3d/man/SK_Mannequin_UE4_WithWeapon.gltf");
  return (
    <group ref={group} {...props} dispose={null}>
      <skinnedMesh
        material={materials.SK_Mannequin_UE4_WithWeapon}
        geometry={nodes.SK_Mannequin_UE4_WithWeapon.geometry}
      />
    </group>
  );
}
