import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";

function TitanGLBModel() {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF("/models/Submarine 1.glb");

    // Clone scene to preserve original Blender materials while enabling shadows
    const clonedScene = useMemo(() => {
        const clone = scene.clone(true);
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        return clone;
    }, [scene]);

    // Compute bounding box and center/scale automatically using THREE.Box3
    const { center, scale } = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const c = box.getCenter(new THREE.Vector3());
        const s = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(s.x, s.y, s.z);
        // Scale model so it fits camera view comfortably without clipping
        const targetScale = maxDim > 0 ? 3.6 / maxDim : 1;
        return { center: c, scale: targetScale };
    }, [clonedScene]);

    // Heavy underwater floating motion (8-10s duration, +-0.08 units vertical, +-2 deg rotation)
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.7) * 0.08;
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.035; // ~2 degrees
            groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.02;
        }
    });

    return (
        <group ref={groupRef}>
            <primitive
                object={clonedScene}
                position={[-center.x * scale, -center.y * scale, -center.z * scale]}
                scale={[scale, scale, scale]}
            />
        </group>
    );
}

useGLTF.preload("/models/Submarine 1.glb");

export default function TitanSubmarineCanvas() {
    return (
        <div className="w-full h-[320px] sm:h-[420px] lg:h-[520px] relative bg-transparent">
            <Canvas
                shadows
                camera={{ position: [0, 0.5, 4.2], fov: 45 }}
                style={{ background: "transparent" }}
            >
                {/* Studio Lighting Setup */}
                <ambientLight intensity={0.6} />
                <hemisphereLight
                    color="#E3F2FD"
                    groundColor="#0A192F"
                    intensity={0.8}
                />
                <directionalLight
                    position={[8, 12, 8]}
                    intensity={1.5}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    shadow-bias={-0.0001}
                />
                <pointLight position={[-8, 6, -8]} intensity={1.2} color="#00D2FC" />
                <spotLight
                    position={[0, -5, 5]}
                    intensity={0.4}
                    color="#00D2FC"
                />

                <Suspense fallback={null}>
                    <TitanGLBModel />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={0.35}
                    minPolarAngle={Math.PI / 2}
                    maxPolarAngle={Math.PI / 2}
                />
            </Canvas>
        </div>
    );
}
