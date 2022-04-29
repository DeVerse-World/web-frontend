import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { GroupProps } from '@react-three/fiber'

export default function Idle({ ...props }: GroupProps) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/3d/woman/Idle.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group>
          <skinnedMesh geometry={nodes.Shinbi.geometry} material={materials.M_Shinbi_Skin_update} skeleton={nodes.Shinbi.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_1.geometry} material={materials.M_HairSheet_Master2_Inst_4} skeleton={nodes.Shinbi_1.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_2.geometry} material={materials.M_EyeRefractive_Inst2} skeleton={nodes.Shinbi_2.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_3.geometry} material={materials.M_TearLine_Inst2} skeleton={nodes.Shinbi_3.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_4.geometry} material={materials.M_Eye_Occlusion_Inst} skeleton={nodes.Shinbi_4.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_5.geometry} material={materials.M_EyelashMaster} skeleton={nodes.Shinbi_5.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_6.geometry} material={materials.M_Shinbi_Arms_Inst_2} skeleton={nodes.Shinbi_6.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_7.geometry} material={materials.M_Shinbi_Legs_Inst_2} skeleton={nodes.Shinbi_7.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_8.geometry} material={materials.M_Shinbi_Arms_Inst_2} skeleton={nodes.Shinbi_8.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_9.geometry} material={materials.M_Shinbi_Arms_Inst_2} skeleton={nodes.Shinbi_9.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_10.geometry} material={materials.M_Shinbi_Skin_update} skeleton={nodes.Shinbi_10.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_11.geometry} material={materials.M_Shinbi_Arms_Inst_2} skeleton={nodes.Shinbi_11.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_12.geometry} material={materials.MI_Human_Mouth_Demo} skeleton={nodes.Shinbi_12.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_13.geometry} material={materials.M_Shinbi_Skin_update} skeleton={nodes.Shinbi_13.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_14.geometry} material={materials.M_Shinbi_Legs_Inst_2} skeleton={nodes.Shinbi_14.skeleton} />
          <skinnedMesh geometry={nodes.Shinbi_15.geometry} material={materials.M_Shinbi_Arms_Inst_2} skeleton={nodes.Shinbi_15.skeleton} />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/3d/woman/Idle.gltf')