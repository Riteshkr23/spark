'use client';

import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Fragment {
  mesh: THREE.Mesh;
  originalPos: THREE.Vector3;
  originalRot: THREE.Euler;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
  rotOffsetX: number;
  rotOffsetY: number;
  rotOffsetZ: number;
}

const CoffeeModel = () => {
  const groupRef = useRef<THREE.Group>(null);
  const fragmentsRef = useRef<Fragment[]>([]);
  const timeRef = useRef(0);

  const { cupMesh, handleMesh, coffeeMesh } = useMemo(() => {
    const cupGeometry = new THREE.CylinderGeometry(0.6, 0.5, 1.2, 32, 32);
    const cupMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f5,
      metalness: 0.1,
      roughness: 0.3,
      clearcoat: 0.1,
      clearcoatRoughness: 0.2,
    });
    const cup = new THREE.Mesh(cupGeometry, cupMaterial);
    cup.castShadow = true;
    cup.receiveShadow = true;

    const handleGeometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100, 0, Math.PI);
    const handleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f5,
      metalness: 0.1,
      roughness: 0.3,
    });
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(0.7, 0.1, 0);
    handle.rotation.z = Math.PI / 2;
    handle.castShadow = true;
    handle.receiveShadow = true;

    const coffeeGeometry = new THREE.CylinderGeometry(0.55, 0.48, 0.8, 32, 32);
    const coffeeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3d2817,
      metalness: 0.2,
      roughness: 0.4,
      transparent: true,
      opacity: 0.9,
    });
    const coffee = new THREE.Mesh(coffeeGeometry, coffeeMaterial);
    coffee.position.y = -0.15;
    coffee.castShadow = true;
    coffee.receiveShadow = true;

    return { cupMesh: cup, handleMesh: handle, coffeeMesh: coffee };
  }, []);

  useEffect(() => {
    if (!groupRef.current) return;

    fragmentsRef.current = [];

    const frag1Geom = new THREE.CylinderGeometry(0.6, 0.55, 0.6, 32, 16);
    const frag1 = new THREE.Mesh(frag1Geom, cupMesh.material);
    frag1.position.y = 0.3;
    frag1.castShadow = true;
    groupRef.current.add(frag1);

    fragmentsRef.current.push({
      mesh: frag1,
      originalPos: new THREE.Vector3(0, 0.3, 0),
      originalRot: new THREE.Euler(0, 0, 0),
      offsetX: (Math.random() - 0.5) * 2,
      offsetY: (Math.random() - 0.5) * 2,
      offsetZ: (Math.random() - 0.5) * 2,
      rotOffsetX: (Math.random() - 0.5) * Math.PI,
      rotOffsetY: (Math.random() - 0.5) * Math.PI,
      rotOffsetZ: (Math.random() - 0.5) * Math.PI,
    });

    const frag2Geom = new THREE.CylinderGeometry(0.55, 0.5, 0.6, 32, 16);
    const frag2 = new THREE.Mesh(frag2Geom, cupMesh.material);
    frag2.position.y = -0.2;
    frag2.castShadow = true;
    groupRef.current.add(frag2);

    fragmentsRef.current.push({
      mesh: frag2,
      originalPos: new THREE.Vector3(0, -0.2, 0),
      originalRot: new THREE.Euler(0, 0, 0),
      offsetX: (Math.random() - 0.5) * 2,
      offsetY: (Math.random() - 0.5) * 2,
      offsetZ: (Math.random() - 0.5) * 2,
      rotOffsetX: (Math.random() - 0.5) * Math.PI,
      rotOffsetY: (Math.random() - 0.5) * Math.PI,
      rotOffsetZ: (Math.random() - 0.5) * Math.PI,
    });

    const handleClone = handleMesh.clone();
    handleClone.castShadow = true;
    groupRef.current.add(handleClone);

    fragmentsRef.current.push({
      mesh: handleClone,
      originalPos: new THREE.Vector3(0.7, 0.1, 0),
      originalRot: new THREE.Euler(0, 0, Math.PI / 2),
      offsetX: (Math.random() - 0.5) * 2.5,
      offsetY: (Math.random() - 0.5) * 2.5,
      offsetZ: (Math.random() - 0.5) * 2.5,
      rotOffsetX: (Math.random() - 0.5) * Math.PI,
      rotOffsetY: (Math.random() - 0.5) * Math.PI,
      rotOffsetZ: (Math.random() - 0.5) * Math.PI,
    });

    coffeeMesh.castShadow = true;
    groupRef.current.add(coffeeMesh);

    (window as any).__fragments = fragmentsRef.current;
  }, [handleMesh, cupMesh, coffeeMesh]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    timeRef.current = clock.getElapsedTime();
    groupRef.current.rotation.y = Math.sin(timeRef.current * 0.3) * 0.3;
    groupRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.1;

    fragmentsRef.current.forEach((fragment, index) => {
      fragment.mesh.rotation.x += 0.002 * (index + 1);
      fragment.mesh.rotation.y += 0.003 * (index + 1);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]} castShadow receiveShadow />
  );
};

export default CoffeeModel;
