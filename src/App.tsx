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

      {/* 상단 */}
      <Model path="/model/sun/scene.gltf" position={[30, 50, 0]} scale={1} />
      <Model path="/model/bombardino_crocodilo_game_ready_3d_model/scene.gltf" position={[-10, 40, 20]} scale={1} />
      <Model path="/model/dimorphodon/scene.gltf" position={[-40, 40, -10]} scale={10} />

      {/* 바닥 모델 */}
      <Model path="/model/ground/scene.gltf" position={[0, -6, 0]} scale={5} />
      
      {/* 메인 캐릭터 모델들 */}
      <Model path="/model/sinoceratops/scene.gltf" position={[0, 0, 0]} scale={3} />
      <Model path="/model/big_cat/scene.gltf" position={[30, 0, 0]} scale={10} />
      <Model path="/model/ostrich/scene.gltf" position={[-30, 17, 0]} scale={5} />
      <Model path="/model/frog/scene.gltf" position={[30, 0, 30]} scale={400} />
      <Model path="/model/tung_tung_tung_tung_sahur/scene.gltf" position={[0, 2, 30]} scale={6} />
      <Model path="/model/tralalero_tralala/scene.gltf" position={[-30, 5, 30]} scale={1} />


      {/* 카메라 마우스 컨트롤 */}
      <OrbitControls makeDefault target={[0, 0.5, 0]} />
    </Canvas>
  )
}
