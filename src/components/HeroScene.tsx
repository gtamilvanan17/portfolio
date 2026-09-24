import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Line, Stars } from '@react-three/drei'
import * as THREE from 'three'

interface NodeDef {
  position: [number, number, number]
  scale: number
  shape: 'icosahedron' | 'box' | 'octahedron'
  color: string
  speed: number
}

const NODE_COLORS = ['#00f0ff', '#7c3aed', '#22ff88']

function generateNodes(count: number): NodeDef[] {
  const nodes: NodeDef[] = []
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count)
    const theta = Math.sqrt(count * Math.PI) * phi
    const radius = 3.6
    nodes.push({
      position: [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi) * 0.7,
        radius * Math.cos(phi),
      ],
      scale: 0.14 + Math.random() * 0.18,
      shape: (['icosahedron', 'box', 'octahedron'] as const)[i % 3],
      color: NODE_COLORS[i % NODE_COLORS.length],
      speed: 0.4 + Math.random() * 0.6,
    })
  }
  return nodes
}

function generateEdges(nodes: NodeDef[]): [number, number][] {
  const edges: [number, number][] = []
  for (let i = 0; i < nodes.length; i++) {
    let closestDist = Infinity
    let closestIdx = -1
    let secondDist = Infinity
    let secondIdx = -1
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue
      const a = new THREE.Vector3(...nodes[i].position)
      const b = new THREE.Vector3(...nodes[j].position)
      const d = a.distanceTo(b)
      if (d < closestDist) {
        secondDist = closestDist
        secondIdx = closestIdx
        closestDist = d
        closestIdx = j
      } else if (d < secondDist) {
        secondDist = d
        secondIdx = j
      }
    }
    if (closestIdx >= 0) edges.push([i, closestIdx])
    if (secondIdx >= 0) edges.push([i, secondIdx])
  }
  const unique = new Set<string>()
  return edges.filter(([a, b]) => {
    const key = [a, b].sort((x, y) => x - y).join('-')
    if (unique.has(key)) return false
    unique.add(key)
    return true
  })
}

function MeshNode({ node }: { node: NodeDef }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += 0.003 * node.speed
    ref.current.rotation.y += 0.004 * node.speed
    const t = state.clock.elapsedTime
    ref.current.position.y = node.position[1] + Math.sin(t * node.speed + node.position[0]) * 0.15
  })

  return (
    <Float speed={node.speed} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={node.position} scale={node.scale}>
        {node.shape === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
        {node.shape === 'box' && <boxGeometry args={[1.3, 1.3, 1.3]} />}
        {node.shape === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  )
}

function ConnectionLine({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const points = useMemo(() => [start, end], [start, end])
  return <Line points={points} color={color} transparent opacity={0.25} lineWidth={1} />
}

function DataPacket({ start, end, offset, speed, color }: { start: THREE.Vector3; end: THREE.Vector3; offset: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = ((state.clock.elapsedTime * speed + offset) % 1)
    ref.current.position.lerpVectors(start, end, t)
    const mat = ref.current.material as THREE.MeshBasicMaterial
    mat.opacity = Math.sin(t * Math.PI)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

function ServiceMesh({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => generateNodes(14), [])
  const edges = useMemo(() => generateEdges(nodes), [nodes])

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.current.y * 0.25, 0.03)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, mouse.current.x * 0.08, 0.03)
  })

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <MeshNode key={i} node={node} />
      ))}
      {edges.map(([a, b], i) => (
        <ConnectionLine
          key={i}
          start={nodes[a].position}
          end={nodes[b].position}
          color={i % 2 === 0 ? '#00f0ff' : '#7c3aed'}
        />
      ))}
      {edges.slice(0, 10).map(([a, b], i) => (
        <DataPacket
          key={`packet-${i}`}
          start={new THREE.Vector3(...nodes[a].position)}
          end={new THREE.Vector3(...nodes[b].position)}
          offset={i / 10}
          speed={0.15 + (i % 3) * 0.05}
          color={NODE_COLORS[i % NODE_COLORS.length]}
        />
      ))}
    </group>
  )
}

function SceneContent({ reducedMotion }: { reducedMotion: boolean }) {
  const mouse = useRef({ x: 0, y: 0 })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#00f0ff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#7c3aed" />
      <Stars radius={60} depth={40} count={reducedMotion ? 800 : 2500} factor={2} saturation={0} fade speed={reducedMotion ? 0 : 0.5} />
      <ServiceMesh mouse={mouse} />
      <PointerPlane mouse={mouse} />
    </>
  )
}

function PointerPlane({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { gl } = useThree()
  useMemo(() => {
    const handleMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect()
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null
}

export default function HeroScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <SceneContent reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
