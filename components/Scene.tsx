'use client';

import React, { useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import CoffeeModel from './CoffeeModel';

function SceneContent() {
  const { camera } = useThree();
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const targetCameraX = useRef(0);
  const targetCameraY = useRef(0);
  const rimLightRef = useRef<THREE.Light>(null);
  const fillLightRef = useRef<THREE.Light>(null);

  useEffect(() => {
    (window as any).__cameraRef = { current: camera };
    (window as any).__lightRef = rimLightRef;
  }, [camera]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY.current = -(e.clientY / window.innerHeight) * 2 + 1;
      targetCameraX.current = mouseX.current * 0.5;
      targetCameraY.current = mouseY.current * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const animationLoop = setInterval(() => {
      camera.position.x += (targetCameraX.current - camera.position.x) * 0.1;
      camera.position.y += (targetCameraY.current - camera.position.y) * 0.1;
      camera.lookAt(0, 0, 0);
    }, 16);

    return () => clearInterval(animationLoop);
  }, [camera]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        ref={rimLightRef as any}
        position={[3, 2, 2]}
        intensity={1}
        color="#ff6a00"
        castShadow
      />
      <directionalLight
        ref={fillLightRef as any}
        position={[-2, 1, 3]}
        intensity={0.5}
        color="#88ccff"
      />
      <directionalLight position={[0, -1, -5]} intensity={0.3} color="#ffffff" />
      <Environment preset="studio" />
      <CoffeeModel />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.8} />
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} />
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </>
  );
}

const Scene = () => {
  return (
    <Canvas
      className="canvas-container"
      shadows
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }}
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  );
};

export default Scene;
