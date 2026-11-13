'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export type NetworkPalette = {
  node: string;
  hub: string;
  pulse: string;
  edge: string;
  additive: boolean;
  edgeOpacity: number;
};

const NODE_COUNT = 150;
const CLUSTERS = 7;
const PULSE_COUNT = 34;
const TRAIL = 5;

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildGraph() {
  const rand = mulberry32(77);
  const gauss = () => {
    const u = Math.max(rand(), 1e-6);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
  };

  const centers: THREE.Vector3[] = [];
  for (let i = 0; i < CLUSTERS; i++) {
    const x = -10 + (20 * (i + 0.5)) / CLUSTERS + (rand() - 0.5) * 1.6;
    centers.push(new THREE.Vector3(x, (rand() - 0.5) * 4.5, (rand() - 0.5) * 5 - 1));
  }

  const positions: THREE.Vector3[] = [...centers];
  const isHub: boolean[] = centers.map(() => true);
  while (positions.length < NODE_COUNT) {
    const c = centers[Math.floor(rand() * CLUSTERS)];
    const loose = rand() < 0.18;
    const spread = loose ? 3.4 : 1.5;
    positions.push(
      new THREE.Vector3(
        c.x + gauss() * spread * 1.2,
        c.y + gauss() * spread * 0.8,
        c.z + gauss() * spread,
      ),
    );
    isHub.push(false);
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  const addEdge = (a: number, b: number) => {
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    if (a === b || edgeSet.has(key)) return;
    edgeSet.add(key);
    edges.push([a, b]);
  };

  for (let i = 0; i < positions.length; i++) {
    const k = isHub[i] ? 6 : 2 + Math.floor(rand() * 2);
    const nearest = positions
      .map((p, j) => ({ j, d: p.distanceToSquared(positions[i]) }))
      .filter(({ j }) => j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, k);
    for (const { j, d } of nearest) if (d < 12 || isHub[i]) addEdge(i, j);
  }
  for (let i = 0; i < CLUSTERS - 1; i++) addEdge(i, i + 1);
  for (let i = 0; i < CLUSTERS - 2; i += 2) addEdge(i, i + 2);

  const adjacency: number[][] = positions.map(() => []);
  edges.forEach(([a, b], e) => {
    adjacency[a].push(e);
    adjacency[b].push(e);
  });

  return { positions, isHub, edges, adjacency };
}

const depthFade = /* glsl */ `
  float depthFade(float viewZ) {
    return clamp(1.0 - (-viewZ - 9.0) / 14.0, 0.18, 1.0);
  }
  float mouseGlow(vec4 clip, vec2 mouse) {
    vec2 ndc = clip.xy / clip.w;
    return smoothstep(0.42, 0.0, distance(ndc * vec2(1.6, 1.0), mouse * vec2(1.6, 1.0)));
  }
`;

const nodeVertex = /* glsl */ `
  attribute float aSize;
  attribute float aActive;
  attribute float aHub;
  uniform float uPixelRatio;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying float vActive;
  varying float vHub;
  ${depthFade}
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    float glow = mouseGlow(gl_Position, uMouse);
    vActive = max(aActive, glow * 0.6);
    vHub = aHub;
    vAlpha = depthFade(mv.z);
    gl_PointSize = aSize * (1.0 + vActive * 1.4) * uPixelRatio * (14.0 / -mv.z);
  }
`;

const nodeFragment = /* glsl */ `
  uniform vec3 uNode;
  uniform vec3 uHub;
  varying float vAlpha;
  varying float vActive;
  varying float vHub;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.15, d) * 0.35;
    vec3 color = mix(uNode, uHub, clamp(vHub + vActive, 0.0, 1.0));
    float a = (pow(core, 2.2) + halo * vActive) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(color, a);
  }
`;

const edgeVertex = /* glsl */ `
  attribute float aActive;
  uniform vec2 uMouse;
  varying float vAlpha;
  varying float vActive;
  ${depthFade}
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vActive = max(aActive, mouseGlow(gl_Position, uMouse) * 0.5);
    vAlpha = depthFade(mv.z);
  }
`;

const edgeFragment = /* glsl */ `
  uniform vec3 uEdge;
  uniform vec3 uHub;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vActive;
  void main() {
    vec3 color = mix(uEdge, uHub, vActive);
    gl_FragColor = vec4(color, (uOpacity + vActive * 0.55) * vAlpha);
  }
`;

const pulseVertex = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  uniform float uPixelRatio;
  varying float vAlpha;
  ${depthFade}
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vAlpha = aAlpha * depthFade(mv.z);
    gl_PointSize = aSize * uPixelRatio * (14.0 / -mv.z);
  }
`;

const pulseFragment = /* glsl */ `
  uniform vec3 uPulse;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.6) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(mix(uPulse, vec3(1.0), pow(core, 6.0) * 0.6), a);
  }
`;

type Pulse = { edge: number; from: number; t: number; speed: number; history: THREE.Vector3[] };

function Network({ palette, animate }: { palette: NetworkPalette; animate: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const smoothPointer = useRef(new THREE.Vector2(0, 0));
  const { gl } = useThree();
  const pixelRatio = gl.getPixelRatio();

  const graph = useMemo(buildGraph, []);
  const rand = useMemo(() => mulberry32(2024), []);

  const nodeData = useMemo(() => {
    const pos = new Float32Array(graph.positions.length * 3);
    const size = new Float32Array(graph.positions.length);
    const hub = new Float32Array(graph.positions.length);
    graph.positions.forEach((p, i) => {
      p.toArray(pos, i * 3);
      size[i] = graph.isHub[i] ? 18 : 6 + rand() * 5;
      hub[i] = graph.isHub[i] ? 1 : 0;
    });
    return { pos, size, hub, active: new Float32Array(graph.positions.length) };
  }, [graph, rand]);

  const edgeData = useMemo(() => {
    const pos = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], e) => {
      graph.positions[a].toArray(pos, e * 6);
      graph.positions[b].toArray(pos, e * 6 + 3);
    });
    return { pos, active: new Float32Array(graph.edges.length * 2), level: new Float32Array(graph.edges.length) };
  }, [graph]);

  const pulses = useMemo<Pulse[]>(() => {
    return Array.from({ length: PULSE_COUNT }, () => {
      const edge = Math.floor(rand() * graph.edges.length);
      const start = graph.positions[graph.edges[edge][0]].clone();
      return {
        edge,
        from: graph.edges[edge][0],
        t: rand(),
        speed: 0.35 + rand() * 0.5,
        history: Array.from({ length: TRAIL }, () => start.clone()),
      };
    });
  }, [graph, rand]);

  const pulseData = useMemo(() => {
    const n = PULSE_COUNT * TRAIL;
    const size = new Float32Array(n);
    const alpha = new Float32Array(n);
    for (let i = 0; i < PULSE_COUNT; i++) {
      for (let j = 0; j < TRAIL; j++) {
        const k = 1 - j / TRAIL;
        size[i * TRAIL + j] = 13 * k;
        alpha[i * TRAIL + j] = Math.pow(k, 1.5);
      }
    }
    return { pos: new Float32Array(n * 3), size, alpha };
  }, []);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: pixelRatio },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uNode: { value: new THREE.Color() },
      uHub: { value: new THREE.Color() },
      uPulse: { value: new THREE.Color() },
      uEdge: { value: new THREE.Color() },
      uOpacity: { value: 0.12 },
    }),
    [pixelRatio],
  );
  uniforms.uNode.value.set(palette.node);
  uniforms.uHub.value.set(palette.hub);
  uniforms.uPulse.value.set(palette.pulse);
  uniforms.uEdge.value.set(palette.edge);
  uniforms.uOpacity.value = palette.edgeOpacity;

  const nodeGeo = useRef<THREE.BufferGeometry>(null);
  const edgeGeo = useRef<THREE.BufferGeometry>(null);
  const pulseGeo = useRef<THREE.BufferGeometry>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, rawDelta) => {
    const delta = animate ? Math.min(rawDelta, 0.05) : 0;
    const t = state.clock.elapsedTime;

    smoothPointer.current.lerp(pointer.current, 0.05);
    if (group.current) {
      const aspect = state.size.width / Math.max(state.size.height, 1);
      group.current.scale.x = THREE.MathUtils.clamp(aspect / 2.2, 1, 2);
      group.current.rotation.y = Math.sin(t * 0.06) * 0.28 + smoothPointer.current.x * 0.18;
      group.current.rotation.x = -smoothPointer.current.y * 0.1 + Math.sin(t * 0.04) * 0.04;
    }

    const canvasRect = gl.domElement.getBoundingClientRect();
    const mx = ((smoothPointer.current.x + 1) / 2) * window.innerWidth;
    const my = ((1 - smoothPointer.current.y) / 2) * window.innerHeight;
    uniforms.uMouse.value.set(
      ((mx - canvasRect.left) / canvasRect.width) * 2 - 1,
      -((my - canvasRect.top) / canvasRect.height) * 2 + 1,
    );

    const nodeDecay = Math.exp(-delta * 1.8);
    const edgeDecay = Math.exp(-delta * 2.6);
    for (let i = 0; i < nodeData.active.length; i++) nodeData.active[i] *= nodeDecay;
    for (let e = 0; e < edgeData.level.length; e++) edgeData.level[e] *= edgeDecay;

    pulses.forEach((p, i) => {
      const [a, b] = graph.edges[p.edge];
      const to = p.from === a ? b : a;
      const len = graph.positions[a].distanceTo(graph.positions[b]);
      p.t += (delta * p.speed * 2.2) / Math.max(len, 0.5);
      edgeData.level[p.edge] = Math.max(edgeData.level[p.edge], 0.9);

      if (p.t >= 1) {
        nodeData.active[to] = 1;
        const options = graph.adjacency[to].filter((e) => e !== p.edge);
        p.edge = options.length ? options[Math.floor(rand() * options.length)] : p.edge;
        p.from = to;
        p.t = 0;
      }

      const [na, nb] = graph.edges[p.edge];
      const dest = p.from === na ? nb : na;
      tmp.copy(graph.positions[p.from]).lerp(graph.positions[dest], p.t);

      for (let j = TRAIL - 1; j > 0; j--) p.history[j].lerp(p.history[j - 1], 0.55);
      p.history[0].copy(tmp);
      for (let j = 0; j < TRAIL; j++) p.history[j].toArray(pulseData.pos, (i * TRAIL + j) * 3);
    });

    for (let e = 0; e < edgeData.level.length; e++) {
      edgeData.active[e * 2] = edgeData.level[e];
      edgeData.active[e * 2 + 1] = edgeData.level[e];
    }

    if (nodeGeo.current) nodeGeo.current.attributes.aActive.needsUpdate = true;
    if (edgeGeo.current) edgeGeo.current.attributes.aActive.needsUpdate = true;
    if (pulseGeo.current) pulseGeo.current.attributes.position.needsUpdate = true;
  });

  const blending = palette.additive ? THREE.AdditiveBlending : THREE.NormalBlending;

  return (
    <group ref={group}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry ref={edgeGeo}>
          <bufferAttribute attach="attributes-position" args={[edgeData.pos, 3]} />
          <bufferAttribute attach="attributes-aActive" args={[edgeData.active, 1]} />
        </bufferGeometry>
        <shaderMaterial
          key={`e-${blending}`}
          vertexShader={edgeVertex}
          fragmentShader={edgeFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blending}
        />
      </lineSegments>
      <points frustumCulled={false}>
        <bufferGeometry ref={nodeGeo}>
          <bufferAttribute attach="attributes-position" args={[nodeData.pos, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[nodeData.size, 1]} />
          <bufferAttribute attach="attributes-aHub" args={[nodeData.hub, 1]} />
          <bufferAttribute attach="attributes-aActive" args={[nodeData.active, 1]} />
        </bufferGeometry>
        <shaderMaterial
          key={`n-${blending}`}
          vertexShader={nodeVertex}
          fragmentShader={nodeFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blending}
        />
      </points>
      <points frustumCulled={false}>
        <bufferGeometry ref={pulseGeo}>
          <bufferAttribute attach="attributes-position" args={[pulseData.pos, 3]} />
          <bufferAttribute attach="attributes-aSize" args={[pulseData.size, 1]} />
          <bufferAttribute attach="attributes-aAlpha" args={[pulseData.alpha, 1]} />
        </bufferGeometry>
        <shaderMaterial
          key={`p-${blending}`}
          vertexShader={pulseVertex}
          fragmentShader={pulseFragment}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={blending}
        />
      </points>
    </group>
  );
}

export default function AgentNetwork({
  palette,
  animate,
  active,
}: {
  palette: NetworkPalette;
  animate: boolean;
  active: boolean;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 13], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? (animate ? 'always' : 'demand') : 'never'}
      style={{ pointerEvents: 'none' }}
    >
      <Network palette={palette} animate={animate} />
    </Canvas>
  );
}
