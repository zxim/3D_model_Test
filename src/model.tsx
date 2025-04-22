import { useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type ModelProps = {
  path: string
  position?: readonly [number, number, number]
  scale?: number
}

export default function Model({ path, position = [0, 0, 0], scale = 1 }: ModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(path)
  const mixerRef = useRef<THREE.AnimationMixer | null>(null) // ✅ 여기 수정

  useEffect(() => {
    if (animations.length && group.current) {
      const mixer = new THREE.AnimationMixer(group.current)
      animations.forEach((clip) => {
        mixer.clipAction(clip)?.play()
      })
      mixerRef.current = mixer
    }
  }, [animations])

  useFrame((_state, delta) => {
    mixerRef.current?.update(delta)
  })

  return <primitive object={scene} ref={group} position={position} scale={scale} />
}
