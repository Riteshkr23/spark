'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function ScrollAnimations() {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const setupScrollTimeline = () => {
      const fragments = (window as any).__fragments || [];
      const cameraRef = (window as any).__cameraRef;

      if (fragments.length === 0 || !cameraRef) {
        requestAnimationFrame(setupScrollTimeline);
        return;
      }

      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      timelineRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            if (cameraRef.current) {
              cameraRef.current.position.y = -self.getVelocity() * 0.0001;
              cameraRef.current.position.z = 5 + self.progress * 1;
            }
          },
        },
      });

      fragments.forEach((fragment: Fragment) => {
        timelineRef.current!.to(
          fragment.mesh.position,
          {
            x: fragment.originalPos.x,
            y: fragment.originalPos.y,
            z: fragment.originalPos.z,
            duration: 1,
          },
          0
        );

        timelineRef.current!.to(
          fragment.mesh.rotation,
          {
            x: fragment.originalRot.x,
            y: fragment.originalRot.y,
            z: fragment.originalRot.z,
            duration: 1,
          },
          0
        );

        timelineRef.current!.to(
          fragment.mesh.position,
          {
            x: fragment.offsetX * 3,
            y: fragment.offsetY * 3,
            z: fragment.offsetZ * 3,
            duration: 2.5,
            ease: 'power3.inOut',
          },
          0.3
        );

        timelineRef.current!.to(
          fragment.mesh.rotation,
          {
            x: fragment.rotOffsetX * 2,
            y: fragment.rotOffsetY * 2,
            z: fragment.rotOffsetZ * 2,
            duration: 2.5,
            ease: 'power3.inOut',
          },
          0.3
        );

        timelineRef.current!.to(
          fragment.mesh.position,
          {
            x: fragment.originalPos.x,
            y: fragment.originalPos.y,
            z: fragment.originalPos.z,
            duration: 2,
            ease: 'power3.inOut',
          },
          2.8
        );

        timelineRef.current!.to(
          fragment.mesh.rotation,
          {
            x: fragment.originalRot.x,
            y: fragment.originalRot.y,
            z: fragment.originalRot.z,
            duration: 2,
            ease: 'power3.inOut',
          },
          2.8
        );
      });

      const lightRef = (window as any).__lightRef;
      if (lightRef && lightRef.current) {
        timelineRef.current!.to(
          lightRef.current,
          {
            intensity: 1.2,
            duration: 2.5,
            ease: 'power1.inOut',
          },
          0.3
        );

        timelineRef.current!.to(
          lightRef.current,
          {
            intensity: 1,
            duration: 2,
            ease: 'power1.inOut',
          },
          2.8
        );
      }

      const titleEl = document.querySelector('[data-title="hero"]');
      const subtitleEl = document.querySelector('[data-subtitle="hero"]');

      if (titleEl && subtitleEl) {
        timelineRef.current!.to(
          titleEl,
          {
            opacity: 0,
            y: -50,
            duration: 1,
          },
          '0%'
        );

        timelineRef.current!.to(
          subtitleEl,
          {
            opacity: 0,
            y: 30,
            duration: 1,
          },
          '0%'
        );
      }
    };

    const timer = setTimeout(setupScrollTimeline, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return null;
}
