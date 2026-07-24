import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DynamicBaitballProps {
    position: [number, number, number];
    count?: number;
    color?: string;
    opacity?: number;
    speedMultiplier?: number;
    scale?: number;
}

const HISTORY_LENGTH = 180;

export default function DynamicBaitball({
    position,
    count = 1000,
    color = '#00e5ff',
    opacity = 1.0,
    speedMultiplier = 1.0,
    scale = 1.0,
}: DynamicBaitballProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    
    // Shared geometry and material
    const geometry = useMemo(() => {
        // A much smaller low-poly shape representing a distant fish
        const geom = new THREE.ConeGeometry(0.015 * scale, 0.08 * scale, 4);
        geom.rotateX(Math.PI / 2); // Point forward along Z
        return geom;
    }, [scale]);

    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            roughness: 0.4,
            metalness: 0.6,
            transparent: opacity < 1.0,
            opacity: opacity,
        });
    }, [color, opacity]);

    // Fish boid state
    const { fishData, pathHistory, params } = useMemo(() => {
        const history = Array(HISTORY_LENGTH).fill(new THREE.Vector3(0, 0, 0));
        
        const data = Array.from({ length: count }, () => {
            return {
                position: new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
                velocity: new THREE.Vector3(0, 0, 0),
                followIndex: Math.floor(Math.random() * HISTORY_LENGTH),
                baseAngle: Math.random() * Math.PI * 2,
                baseRadius: Math.random() * 2.0, // max spread in 3D
                baseZOffset: (Math.random() - 0.5) * 2.0, // Depth spread
                speedLimit: (0.04 + Math.random() * 0.02) * speedMultiplier,
                wobbleSpeed: 0.2 + Math.random() * 0.2,
                phase: Math.random() * Math.PI * 2,
            };
        });

        return { 
            fishData: data, 
            pathHistory: history,
            params: {
                f1: 1, f2: 1.5, f3: 2, f4: 0.5,
                targetF1: 1, targetF2: 1.5, targetF3: 2, targetF4: 0.5,
                shapeTime: 0
            }
        };
    }, [count, speedMultiplier]);

    // Pre-allocate objects for useFrame loop (performance)
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const targetVec = useMemo(() => new THREE.Vector3(), []);
    const driftOffset = useRef(new THREE.Vector3(0, 0, 0));
    const localCamPos = useMemo(() => new THREE.Vector3(), []);
    
    useFrame((state) => {
        if (!meshRef.current) return;
        
        const globalTime = state.clock.getElapsedTime();

        // 1. Calculate dynamic density breathing
        let densityFactor = 1.2 + 0.9 * Math.sin(globalTime * 0.3) + 0.6 * Math.cos(globalTime * 0.7);
        densityFactor = Math.max(0.1, densityFactor);

        // 2. Plot new path (Parametric Knot)
        if (Math.random() < 0.01) {
            params.targetF1 = Math.random() * 4 - 2;
            params.targetF2 = Math.random() * 4 - 2;
            params.targetF3 = Math.random() * 4 - 2;
            params.targetF4 = Math.random() * 4 - 2;
        }

        params.f1 += (params.targetF1 - params.f1) * 0.005;
        params.f2 += (params.targetF2 - params.f2) * 0.005;
        params.f3 += (params.targetF3 - params.f3) * 0.005;
        params.f4 += (params.targetF4 - params.f4) * 0.005;

        // Leader parametric movement (scaled down for WebGL space)
        const R = 3.5;
        
        // --- CAMERA EXCLUSION ZONE ---
        // Push the entire school's centroid away if it gets too close to the camera
        localCamPos.copy(state.camera.position).sub(new THREE.Vector3(...position));
        const dist = driftOffset.current.distanceTo(localCamPos);
        const MIN_DIST = 20.0; // Enforce a 20-unit minimum distance
        if (dist < MIN_DIST) {
            const repelDir = driftOffset.current.clone().sub(localCamPos).normalize();
            const pushStrength = (MIN_DIST - dist) * 0.05; // Smooth exponential push
            driftOffset.current.add(repelDir.multiplyScalar(pushStrength));
        }

        const leaderX = R * Math.sin(params.shapeTime * params.f1) * Math.cos(params.shapeTime * params.f2) + driftOffset.current.x;
        const leaderY = R * Math.sin(params.shapeTime * params.f3) * Math.cos(params.shapeTime * params.f4) + driftOffset.current.y;
        const leaderZ = R * 0.5 * Math.sin(params.shapeTime * 0.5) + driftOffset.current.z; // Add slow Z depth to knot
        
        params.shapeTime += 0.01 * speedMultiplier;

        // Update path history
        pathHistory.unshift(new THREE.Vector3(leaderX, leaderY, leaderZ));
        if (pathHistory.length > HISTORY_LENGTH) pathHistory.pop();

        // 3. Update fish swarm
        for (let i = 0; i < count; i++) {
            const fish = fishData[i];
            const target = pathHistory[fish.followIndex];

            // Apply dynamic density to offset
            const offsetX = Math.cos(fish.baseAngle) * (fish.baseRadius * densityFactor);
            const offsetY = Math.sin(fish.baseAngle) * (fish.baseRadius * densityFactor);
            const offsetZ = fish.baseZOffset * densityFactor;

            targetVec.set(target.x + offsetX, target.y + offsetY, target.z + offsetZ);

            // Steer
            const dx = targetVec.x - fish.position.x;
            const dy = targetVec.y - fish.position.y;
            const dz = targetVec.z - fish.position.z;

            fish.velocity.x += dx * 0.015;
            fish.velocity.y += dy * 0.015;
            fish.velocity.z += dz * 0.015;

            // Enforce limits
            const speed = fish.velocity.length();
            if (speed > fish.speedLimit) {
                fish.velocity.multiplyScalar(fish.speedLimit / speed);
            }

            fish.position.add(fish.velocity);

            // Update instance transform
            dummy.position.copy(fish.position);
            
            // Look along velocity vector
            const lookAtTarget = dummy.position.clone().add(fish.velocity);
            dummy.lookAt(lookAtTarget);

            // Add swimming wag
            const wag = Math.sin(globalTime * 15 * fish.wobbleSpeed + fish.phase) * 0.3;
            dummy.rotateY(wag);

            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group position={position}>
            <instancedMesh ref={meshRef} args={[geometry, material, count]}>
            </instancedMesh>
        </group>
    );
}
