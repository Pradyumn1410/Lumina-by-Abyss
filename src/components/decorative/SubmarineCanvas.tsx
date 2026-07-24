import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface SubmarineModelProps {
    type: "titan" | "nautilus" | "voyager";
}

function SubmarineGLBModel({ type }: SubmarineModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    
    const url = type === "titan" 
        ? "/models/Submarine 1.glb" 
        : type === "voyager" 
            ? "/models/Submarine 2.glb" 
            : "/models/Submarine 3.glb";

    const { scene } = useGLTF(url);

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

    // Subtle floating and rotating motion
    // user wants: slow continuous Y-axis rotation (autoRotate), gentle floating motion, very small vertical oscillation (±0.05-0.1 units)
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
useGLTF.preload("/models/Submarine 2.glb");
useGLTF.preload("/models/Submarine 3.glb");

export default function SubmarineCanvas({ type }: SubmarineModelProps) {
    return (
        <div style={{ width: "100%", height: "100%", minHeight: "260px", position: "relative" }}>
            <Canvas
                shadows
                camera={{ position: [0, 0.8, 3.2], fov: 45 }}
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight
                    position={[5, 10, 5]}
                    intensity={1.2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#00D2FC" />
                <spotLight
                    position={[0, 5, 2]}
                    intensity={0.8}
                    angle={0.6}
                    penumbra={1}
                    color="#00D2FC"
                />

                <Suspense fallback={null}>
                    <SubmarineGLBModel type={type} />
                </Suspense>

                <OrbitControls 
                    enableZoom={false} 
                    enablePan={false} 
                    autoRotate 
                    autoRotateSpeed={0.35} 
                />
            </Canvas>
        </div>
    );
}
