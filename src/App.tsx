import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useEffect, Suspense, lazy } from 'react'
import Stats from 'stats.js'
import Model from './model'
import './index.css'

// ✅ lazy 로딩된 모델 컴포넌트들
const Dino = lazy(() => import('./model/Dino'))
const Frog = lazy(() => import('./model/Frog'))
const Cat = lazy(() => import('./model/Cat'))
const Ostrich = lazy(() => import('./model/Ostrich'))
const Sun = lazy(() => import('./model/Sun'))
const Crocodile = lazy(() => import('./model/Crocodile'))
const Dimorphodon = lazy(() => import('./model/Dimorphodon'))
const Sahur = lazy(() => import('./model/Sahur'))
const Tralala = lazy(() => import('./model/Tralala'))

export default function App() {
  useEffect(() => {
    const stats = new Stats()
    stats.showPanel(0)
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
    <Canvas frameloop="demand" camera={{ position: [0, 2, 8], fov: 50 }}>
      {/* 조명 */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 0]} intensity={3} />

      {/* 모델들 lazy-load + animation frustum 기반 */}
      <Suspense fallback={null}>
        <Frog />
        <Cat />
        <Dino />
        <Ostrich />
        <Sun />
        <Crocodile />
        <Dimorphodon />
        <Sahur />
        <Tralala />
        <Model path="/model/ground/scene.gltf" position={[0, -6, 0]} scale={5} />
      </Suspense>

      {/* 마우스 컨트롤 */}
      <OrbitControls makeDefault target={[0, 0.5, 0]} />
    </Canvas>
  )
}
