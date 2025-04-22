import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Model from './model'
import './index.css'

export default function App() {
  return (
    <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
      {/* 조명 */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={3} />
      <directionalLight position={[-5, 5, -5]} intensity={3} />
      <pointLight position={[0, 2, 0]} intensity={3} />

      {/* 태양 */}
      <Model path="/model/sun/scene.gltf" position={[30, 50, 0]} scale={1} />

      {/* 바닥용 모델 */}
      <Model path="/model/ground/scene.gltf" position={[0, -6, 0]} scale={5} />

      {/* 중심 메인 모델 (애니메이션 있음) */}
      <Model path="/model/sinoceratops/scene.gltf" position={[0, 0, 0]} scale={3} />

      {/* 중심 메인 모델 (애니메이션 있음) */}
      <Model path="/model/big_cat/scene.gltf" position={[20, 0, 20]} scale={10} />

      {/* 중심 메인 모델 (애니메이션 있음) */}
      <Model path="/model/frog/scene.gltf" position={[-20, 2, 0]} scale={400} />


      <OrbitControls makeDefault target={[0, 0.5, 0]} />
    </Canvas>
  )
}
