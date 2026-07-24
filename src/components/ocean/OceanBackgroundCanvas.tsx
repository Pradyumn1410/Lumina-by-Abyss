import { Canvas, useFrame, useThree } from "@react-three/fiber";
import DynamicBaitball from "./DynamicBaitball";
import { useRef, useEffect, useState, useMemo } from "react";
import * as THREE from "three";

// Physically-based Gerstner Wave Shader with calm surface, clear reflection & realistic sunset scattering
const WaterShader = {
    vertexShader: `
        uniform float uTime;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying float vWaveHeight;

        struct Wave {
            vec2 direction;
            float frequency;
            float amplitude;
            float steepness;
            float speed;
        };

        vec3 calculateGerstnerWave(Wave wave, vec3 pos, float time, inout vec3 tangent, inout vec3 binormal) {
            vec2 dir = normalize(wave.direction);
            float proj = dot(dir, pos.xz);
            float phase = wave.frequency * proj + time * wave.speed;
            float c = cos(phase);
            float s = sin(phase);

            float k = wave.frequency;
            float a = wave.amplitude;
            float q = wave.steepness / (k * a * 4.0);

            tangent += vec3(
                -q * dir.x * dir.x * a * k * s,
                dir.x * a * k * c,
                -q * dir.x * dir.y * a * k * s
            );

            binormal += vec3(
                -q * dir.x * dir.y * a * k * s,
                dir.y * a * k * c,
                -q * dir.y * dir.y * a * k * s
            );

            return vec3(
                q * a * dir.x * c,
                a * s,
                q * a * dir.y * c
            );
        }

        void main() {
            vec3 gridPoint = position;
            vec3 tangent = vec3(1.0, 0.0, 0.0);
            vec3 binormal = vec3(0.0, 0.0, 1.0);
            vec3 p = gridPoint;

            // Calmer, gentler waves for realistic BBC documentary look
            Wave w1 = Wave(vec2(1.0, 0.3), 0.04, 0.08, 0.15, 0.6);
            Wave w2 = Wave(vec2(0.4, 0.9), 0.08, 0.04, 0.10, 0.8);
            Wave w3 = Wave(vec2(-0.7, 0.5), 0.15, 0.02, 0.05, 1.0);
            Wave w4 = Wave(vec2(0.2, -0.8), 0.30, 0.01, 0.02, 1.2);

            p += calculateGerstnerWave(w1, gridPoint, uTime, tangent, binormal);
            p += calculateGerstnerWave(w2, gridPoint, uTime, tangent, binormal);
            p += calculateGerstnerWave(w3, gridPoint, uTime, tangent, binormal);
            p += calculateGerstnerWave(w4, gridPoint, uTime, tangent, binormal);

            vWaveHeight = p.y - gridPoint.y;

            vec4 worldPos = modelMatrix * vec4(p, 1.0);
            vWorldPosition = worldPos.xyz;

            vec3 norm = normalize(cross(binormal, tangent));
            vNormal = normalize(modelMatrix * vec4(norm, 0.0)).xyz;

            gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
    `,
    fragmentShader: `
        uniform vec3 uSunPosition;
        uniform vec3 uSunColor;
        uniform vec3 uSunsetGlowColor;
        uniform vec3 uWaterColorDepth;
        uniform vec3 uWaterColorShallow;
        uniform vec3 uSkyColor;
        uniform float uCameraY;

        varying vec3 vWorldPosition;
        varying vec3 vNormal;
        varying float vWaveHeight;

        void main() {
            vec3 normal = normalize(vNormal);
            if (uCameraY < 0.0) {
                normal = -normal;
            }

            vec3 viewDir = normalize(cameraPosition - vWorldPosition);

            // Stronger Fresnel for a highly reflective, glass-like calm ocean surface
            float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
            fresnel = clamp(fresnel, 0.0, 1.0);

            // Softer, broader sunset specular scattering
            vec3 sunDir = normalize(uSunPosition);
            vec3 halfDir = normalize(sunDir + viewDir);
            float specFactor = pow(max(dot(normal, halfDir), 0.0), 80.0);
            vec3 specular = uSunColor * specFactor * 1.2;

            // Warm sunset ambient reflection on wave crests
            float crestFactor = smoothstep(0.01, 0.08, vWaveHeight);
            vec3 crestReflection = mix(uSkyColor, uSunsetGlowColor, crestFactor * 0.4);

            // Water depth color absorption
            vec3 waterColor = mix(uWaterColorDepth, uWaterColorShallow, clamp(vWaveHeight * 4.0 + 0.6, 0.0, 1.0));

            // Combine base water with sky & crest reflection
            vec3 finalColor = mix(waterColor, crestReflection, fresnel * 0.85);

            // Add golden sun glints
            finalColor += specular;

            // Subtle foam only on very highest crests (calm water)
            float foamFactor = smoothstep(0.06, 0.12, vWaveHeight);
            vec3 foamColor = vec3(1.0, 0.95, 0.90);
            finalColor = mix(finalColor, foamColor, foamFactor * 0.15);

            // Smooth fade into atmospheric horizon fog
            float dist = length(vWorldPosition.xz);
            float fogFactor = smoothstep(60.0, 160.0, dist);
            finalColor = mix(finalColor, uSkyColor, fogFactor);

            float alpha = uCameraY < 0.0 ? 0.80 : 1.0;
            gl_FragColor = vec4(finalColor, alpha);
        }
    `
};

// 1. Sunset Sun & Halo Bloom
function SunsetSun() {
    return (
        <group position={[20, 2.2, -90]}>
            {/* Sun Disk */}
            <mesh>
                <circleGeometry args={[4.2, 32]} />
                <meshBasicMaterial color="#FFAE63" />
            </mesh>
            {/* Inner Atmospheric Glow */}
            <mesh position={[0, 0, -0.1]}>
                <circleGeometry args={[8.5, 32]} />
                <meshBasicMaterial color="#FF7E5F" transparent opacity={0.45} />
            </mesh>
            {/* Outer Soft Bloom */}
            <mesh position={[0, 0, -0.2]}>
                <circleGeometry args={[18.0, 32]} />
                <meshBasicMaterial color="#E86B8B" transparent opacity={0.25} />
            </mesh>
        </group>
    );
}

// 2. Distant Coastline Island (Environmental Storytelling)
function DistantCoastline() {
    return (
        <group position={[45, -0.2, -90]} rotation={[0, -0.4, 0]}>
            {/* Sandy island slope */}
            <mesh position={[0, 0.2, 0]}>
                <coneGeometry args={[22, 2.2, 16]} />
                <meshStandardMaterial color="#3D3035" roughness={0.9} />
            </mesh>

            {/* Distant Palm Silhouettes */}
            {[
                [-4, 1.2, 2], [-2, 1.4, 1], [0, 1.5, 0], [3, 1.3, -1], [6, 1.1, 2]
            ].map(([x, y, z], i) => (
                <group key={i} position={[x, y, z]}>
                    {/* Trunk */}
                    <mesh position={[0, 0.8, 0]}>
                        <cylinderGeometry args={[0.08, 0.14, 1.6, 6]} />
                        <meshBasicMaterial color="#1A1829" />
                    </mesh>
                    {/* Fronds */}
                    <mesh position={[0, 1.6, 0]}>
                        <sphereGeometry args={[0.7, 8, 6]} />
                        <meshBasicMaterial color="#1A1829" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// 3. Different Vessels (Research Vessel, Sailboat, Fishing Boat)
function ResearchVessel({ position, delay }: { position: [number, number, number]; delay: number }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() + delay;
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t * 0.6) * 0.05;
            meshRef.current.rotation.z = Math.sin(t * 0.45) * 0.02;
            meshRef.current.rotation.x = Math.cos(t * 0.35) * 0.012;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={[1.2, 1.2, 1.2]}>
            <mesh castShadow>
                <boxGeometry args={[1.6, 0.35, 0.6]} />
                <meshStandardMaterial color="#164170" roughness={0.3} metalness={0.7} />
            </mesh>
            <mesh position={[-0.1, 0.32, 0]} castShadow>
                <boxGeometry args={[0.8, 0.35, 0.45]} />
                <meshStandardMaterial color="#E3F2FD" roughness={0.4} />
            </mesh>
            <mesh position={[0.3, 0.55, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 0.8, 8]} />
                <meshStandardMaterial color="#00D2FC" roughness={0.2} metalness={0.9} />
            </mesh>
        </group>
    );
}

function Sailboat({ position, delay }: { position: [number, number, number]; delay: number }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() + delay;
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t * 0.7 + 1) * 0.04;
            meshRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
            meshRef.current.rotation.x = Math.cos(t * 0.4) * 0.015;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={[0.9, 0.9, 0.9]}>
            {/* Hull */}
            <mesh>
                <boxGeometry args={[1.2, 0.25, 0.4]} />
                <meshStandardMaterial color="#4A2522" roughness={0.5} />
            </mesh>
            {/* Mast */}
            <mesh position={[0, 0.8, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
                <meshStandardMaterial color="#D4A373" />
            </mesh>
            {/* Sail (sunset lit) */}
            <mesh position={[0.2, 0.9, 0]} rotation={[0, 0, -0.15]}>
                <planeGeometry args={[0.7, 1.2]} />
                <meshStandardMaterial color="#FFE5D9" roughness={0.8} side={THREE.DoubleSide} transparent opacity={0.9} />
            </mesh>
        </group>
    );
}

function FishingBoat({ position, delay }: { position: [number, number, number]; delay: number }) {
    const meshRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        const t = state.clock.getElapsedTime() + delay;
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(t * 0.55 + 2) * 0.045;
            meshRef.current.rotation.z = Math.sin(t * 0.4) * 0.025;
        }
    });

    return (
        <group ref={meshRef} position={position} scale={[1.0, 1.0, 1.0]}>
            <mesh>
                <boxGeometry args={[1.1, 0.3, 0.5]} />
                <meshStandardMaterial color="#2B3A41" roughness={0.6} />
            </mesh>
            <mesh position={[0.2, 0.28, 0]}>
                <boxGeometry args={[0.4, 0.3, 0.35]} />
                <meshStandardMaterial color="#E07A5F" />
            </mesh>
        </group>
    );
}




// 6. Shallow Coral Formations & Seabed (0m - 10m)
function ShallowCoralReef({ cameraY }: { cameraY: number }) {
    if (cameraY < -8.0) return null; // Attenuate deeply

    return (
        <group position={[0, -5, -4]}>
            {/* Sea Fans & Coral Clusters */}
            {[
                { pos: [-4.5, 0, -2], color: "#FF7B54", scale: 0.7 }, // Coral Orange
                { pos: [-3.2, -0.2, 1], color: "#F26B6B", scale: 0.9 }, // Pink Coral
                { pos: [3.8, -0.1, -1], color: "#9B82D8", scale: 0.8 }, // Purple Fan
                { pos: [4.8, 0.1, 2], color: "#34D399", scale: 1.0 },  // Seafoam Green Sea Grass
                { pos: [0.5, -0.4, -3], color: "#00D2FC", scale: 0.6 }, // Turquoise Coral
            ].map((c, i) => (
                <group key={i} position={c.pos as [number, number, number]} scale={[c.scale, c.scale, c.scale]}>
                    {/* Main coral head */}
                    <mesh>
                        <dodecahedronGeometry args={[0.6, 1]} />
                        <meshStandardMaterial color={c.color} roughness={0.7} />
                    </mesh>
                    {/* Sea fan / branching detail */}
                    <mesh position={[0, 0.6, 0]}>
                        <coneGeometry args={[0.5, 0.9, 5]} />
                        <meshStandardMaterial color={c.color} roughness={0.6} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// 7. Dynamic Baitball Ecosystem (Distributed across all depths)
function BaitballEcosystem() {
    return (
        <group>
            {/* SURFACE EXCLUSION ZONE (0 to -6) - No Fish */}

            {/* UPPER UNDERWATER (-6 to -12) - Very sparse, small distant schools only */}
            <DynamicBaitball position={[-35, -8, -40]} count={600} color="#b2ebf2" opacity={0.7} speedMultiplier={1.2} scale={1.0} />
            <DynamicBaitball position={[40, -11, -45]} count={500} color="#00e5ff" opacity={0.6} speedMultiplier={1.1} scale={0.9} />

            {/* MID OCEAN (-12 to -25) - Moderate density, larger schools, pushed far back */}
            <DynamicBaitball position={[-45, -15, -50]} count={2000} color="#00838f" opacity={0.8} speedMultiplier={1.0} scale={1.0} />
            <DynamicBaitball position={[35, -18, -45]} count={1800} color="#00acc1" opacity={0.7} speedMultiplier={1.0} scale={1.0} />
            <DynamicBaitball position={[15, -22, -60]} count={1500} color="#4dd0e1" opacity={0.6} speedMultiplier={0.9} scale={0.9} />
            <DynamicBaitball position={[-25, -24, -55]} count={1600} color="#0097a7" opacity={0.6} speedMultiplier={0.8} scale={0.9} />

            {/* DEEP OCEAN (-25 to -35) - Lower density, darker colors, scattered */}
            <DynamicBaitball position={[-30, -28, -45]} count={800} color="#37474f" opacity={0.4} speedMultiplier={0.6} scale={0.8} />
            <DynamicBaitball position={[40, -31, -55]} count={600} color="#263238" opacity={0.3} speedMultiplier={0.5} scale={0.8} />
            <DynamicBaitball position={[-10, -34, -65]} count={700} color="#455a64" opacity={0.3} speedMultiplier={0.5} scale={0.7} />

            {/* ABYSSOPELAGIC (-35 to -45) - Very sparse, occasional distant black silhouettes */}
            <DynamicBaitball position={[25, -38, -60]} count={300} color="#0a0f18" opacity={0.2} speedMultiplier={0.3} scale={0.6} />
            <DynamicBaitball position={[-20, -42, -70]} count={200} color="#000000" opacity={0.15} speedMultiplier={0.2} scale={0.5} />
        </group>
    );
}

// 8. Plankton & Floating Particles
function UnderwaterParticles() {
    const pointsRef = useRef<THREE.Points>(null);
    const count = 220;

    const [positions, speeds] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 45;
            pos[i * 3 + 1] = -Math.random() * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 45;
            spd[i] = 0.2 + Math.random() * 0.5;
        }
        return [pos, spd];
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (pointsRef.current) {
            const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
            const arr = posAttr.array as Float32Array;
            for (let i = 0; i < count; i++) {
                arr[i * 3 + 1] += Math.sin(t * speeds[i] + i) * 0.006;
                arr[i * 3] += Math.cos(t * 0.3 + i) * 0.003;
            }
            posAttr.needsUpdate = true;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.14}
                color="#00D2FC"
                transparent
                opacity={0.45}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

// Scene Manager with Depth Fog & Sunset Atmosphere Interpolation
function SceneManager({ scrollY }: { scrollY: number }) {
    const { scene, camera } = useThree();
    const waterMaterialRef = useRef<THREE.ShaderMaterial>(null);
    const [cameraY, setCameraY] = useState(1.5);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Smooth camera descent mapping scroll to depth
        const targetY = 1.5 - (scrollY * 0.0025);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06);

        // Downward camera pitch
        const targetPitch = -0.15;
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetPitch, 0.06);

        // Gentle lateral drift
        camera.position.x = Math.sin(t * 0.2) * 0.18;

        const camY = camera.position.y;
        setCameraY(camY);

        // Sunset Atmospheric Sky & Ocean Fog Colors
        // Sunset surface: Warm Golden (#FFB878) -> Coral (#FF7B54) -> Sunset Sky (#E66885) -> Deep Navy (#0A192F) -> Hadal Abyss (#010812)
        const skySunsetColor = new THREE.Color("#FFB878");
        const horizonSunsetColor = new THREE.Color("#FF7B54");
        const shallowWaterColor = new THREE.Color("#2E6EA6");
        const upperColor = new THREE.Color("#164170");
        const midColor = new THREE.Color("#0A192F");
        const deepColor = new THREE.Color("#060E1F");
        const abyssColor = new THREE.Color("#030810");
        const blackColor = new THREE.Color("#010812");

        const currentFogColor = new THREE.Color();

        if (camY >= 1.0) {
            const factor = Math.min((camY - 1.0) / 0.5, 1);
            currentFogColor.lerpColors(horizonSunsetColor, skySunsetColor, factor);
        } else if (camY >= 0.0) {
            const factor = camY / 1.0;
            currentFogColor.lerpColors(shallowWaterColor, horizonSunsetColor, factor);
        } else if (camY >= -5.0) {
            const factor = -camY / 5.0;
            currentFogColor.lerpColors(shallowWaterColor, upperColor, factor);
        } else if (camY >= -12.0) {
            const factor = (-camY - 5.0) / 7.0;
            currentFogColor.lerpColors(upperColor, midColor, factor);
        } else if (camY >= -20.0) {
            const factor = (-camY - 12.0) / 8.0;
            currentFogColor.lerpColors(midColor, deepColor, factor);
        } else if (camY >= -30.0) {
            const factor = (-camY - 20.0) / 10.0;
            currentFogColor.lerpColors(deepColor, abyssColor, factor);
        } else {
            const factor = Math.min((-camY - 30.0) / 15.0, 1);
            currentFogColor.lerpColors(abyssColor, blackColor, factor);
        }

        scene.background = currentFogColor;
        const fogDensity = 0.005 + Math.max(0, 1.5 - camY) * 0.006;
        scene.fog = new THREE.FogExp2(currentFogColor, Math.min(fogDensity, 0.95));

        if (waterMaterialRef.current) {
            waterMaterialRef.current.uniforms.uTime.value = t;
            waterMaterialRef.current.uniforms.uCameraY.value = camY;
            waterMaterialRef.current.uniforms.uSkyColor.value = currentFogColor;
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uCameraY: { value: 1.5 },
        uSunPosition: { value: new THREE.Vector3(20, 2.2, -90) },
        uSunColor: { value: new THREE.Color("#FFAE63") },
        uSunsetGlowColor: { value: new THREE.Color("#FF7B54") },
        uWaterColorDepth: { value: new THREE.Color("#0A192F") },
        uWaterColorShallow: { value: new THREE.Color("#164170") },
        uSkyColor: { value: new THREE.Color("#FFB878") },
    }), []);

    return (
        <>
            {/* Sunset Ambient & Directional Lighting */}
            <ambientLight intensity={0.65} color="#FFE5D9" />
            <directionalLight
                position={[20, 12, -70]}
                intensity={2.2}
                castShadow
                color="#FFAE63"
            />
            <pointLight position={[-15, 8, -20]} intensity={0.6} color="#00D2FC" />

            {/* Gerstner Ocean Surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeGeometry args={[400, 400, 160, 160]} />
                <shaderMaterial
                    ref={waterMaterialRef}
                    vertexShader={WaterShader.vertexShader}
                    fragmentShader={WaterShader.fragmentShader}
                    uniforms={uniforms}
                    transparent={true}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Sunset Sun Disk & Atmospheric Halo */}
            <SunsetSun />

            {/* Distant Coastline Island */}
            <DistantCoastline />

            {/* Floating Vessels */}
            <ResearchVessel position={[-16, 0, -35]} delay={0} />
            <Sailboat position={[18, 0, -50]} delay={2.5} />
            <FishingBoat position={[-6, 0, -65]} delay={1.2} />



            {/* Shallow Coral Reef & Seabed */}
            <ShallowCoralReef cameraY={cameraY} />

            {/* Dynamic Baitball Ecosystem (Depth-distributed) */}
            <BaitballEcosystem />

            {/* Underwater Floating Plankton */}
            <UnderwaterParticles />
        </>
    );
}

export default function OceanBackgroundCanvas() {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <Canvas
                shadows
                camera={{ position: [0, 1.5, 8], fov: 48, near: 0.1, far: 300 }}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
                <SceneManager scrollY={scrollY} />
            </Canvas>
        </div>
    );
}
