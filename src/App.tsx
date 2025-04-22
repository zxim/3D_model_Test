import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './model'
import './index.css'

import { useEffect } from 'react'
import Stats from 'stats.js'

export default function App() {
  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0) // 0: FPS, 1: ms, 2: memory

    // 스타일 커스텀 (크게 확대 + 위치 조정)
    stats.dom.style.position = 'fixed'
    stats.dom.style.left = '20px'
    stats.dom.style.top = '20px'
    stats.dom.style.transform = 'scale(2)'
    stats.dom.style.transformOrigin = 'top left'
    stats.dom.style.zIndex = '9999'

    document.body.appendChild(stats.dom)

    const animate = () => {
      stats.begin()
      stats.end()
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      document.body.removeChild(stats.dom)
    }
  }, [])

  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
      {/* 조명 */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 0]} intensity={3} />

      {/* 태양 (상단 배경) */}
      <Model path="/model/sun/scene.gltf" position={[30, 50, 0]} scale={1} />

      {/* 바닥 모델 */}
      <Model path="/model/ground/scene.gltf" position={[0, -6, 0]} scale={5} />

      {/* 메인 캐릭터 모델들 */}
      <Model path="/model/sinoceratops/scene.gltf" position={[0, 0, 0]} scale={3} />
      <Model path="/model/big_cat/scene.gltf" position={[30, 0, 0]} scale={10} />
      <Model path="/model/ostrich/scene.gltf" position={[-30, 17, 0]} scale={5} />

      {/* 카메라 마우스 컨트롤 */}
      <OrbitControls makeDefault target={[0, 0.5, 0]} />
    </Canvas>
  )
}
