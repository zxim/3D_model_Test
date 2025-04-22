import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

type ModelProps = {
  path: string
  position?: [number, number, number]
  scale?: number | [number, number, number]
}

export default function Model({ path, position = [0, 0, 0], scale = 1 }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null)
  const { scene, animations } = useGLTF(path)
  const { camera } = useThree()

  useEffect(() => {
    // 그림자 제거
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh
        mesh.castShadow = false
        mesh.receiveShadow = false
      }
    })

    // 애니메이션 설정
    if (animations.length && group.current) {
      const mixer = new THREE.AnimationMixer(group.current)
      animations.forEach((clip) => {
        mixer.clipAction(clip)?.play()
      })
      mixerRef.current = mixer
    }

    return () => {
      mixerRef.current?.stopAllAction()
      mixerRef.current = null
    }
  }, [animations, scene])

  // 거리 기준 렌더 여부 결정
  useFrame((_, delta) => {
    if (!group.current) return

    const distance = camera.position.distanceTo(group.current.position)
    group.current.visible = distance < 150 // 여기서 거리 조절

    if (group.current.visible && animations.length > 0) {
      mixerRef.current?.update(delta)
    }
  })

  return <primitive object={scene} ref={group} position={position} scale={scale} />
}
