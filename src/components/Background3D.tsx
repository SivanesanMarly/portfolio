// src/components/Background3D.tsx

"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    let animationId = 0;
    let isDestroyed = false;

    const isWebGLAvailable = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!isWebGLAvailable()) {
      console.warn("WebGL not supported, skipping 3D background");
      return;
    }

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      });
    } catch (error) {
      console.error("WebGL unavailable:", error);
      return;
    }

    const isMobile = window.innerWidth < 768;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 1.5));
    renderer.domElement.classList.add("background-3d-canvas");
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 100);
    camera.position.z = isMobile ? 24 : 28; // Pulled closer on mobile so shapes read clearly

    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshBasicMaterial({
      color: isMobile ? 0x6e8cff : 0x5b7cff,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.45 : 0.3, // Bumped up — was getting lost on mobile
    });
    const tealMaterial = new THREE.MeshBasicMaterial({ color: 0x22d3b6, wireframe: true, transparent: true, opacity: isMobile ? 0.4 : 0.28 });
    const violetMaterial = new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: isMobile ? 0.35 : 0.24 });

    const knotGeometry = new THREE.TorusKnotGeometry(
      isMobile ? 5.5 : 7,
      isMobile ? 0.28 : 0.35,
      isMobile ? 48 : 96,
      isMobile ? 6 : 12
    );
    const knot = new THREE.Mesh(knotGeometry, material);
    group.add(knot);

    const icoGeometry = new THREE.IcosahedronGeometry(isMobile ? 2.6 : 4, 0);
    const ico = new THREE.Mesh(icoGeometry, tealMaterial);
    ico.position.set(isMobile ? 4.5 : 13, isMobile ? 3.5 : 8, -3);
    group.add(ico);

    const octaGeometry = new THREE.OctahedronGeometry(isMobile ? 3 : 4.5, 0);
    const octa = new THREE.Mesh(octaGeometry, violetMaterial);
    octa.position.set(isMobile ? -4.5 : -13, isMobile ? -4 : -9, -2);
    group.add(octa);

    const orbitGeometry = new THREE.TorusGeometry(isMobile ? 7.8 : 10.5, isMobile ? 0.025 : 0.035, 6, isMobile ? 48 : 80);
    const orbitA = new THREE.Mesh(orbitGeometry, tealMaterial);
    orbitA.rotation.set(0.9, 0.3, -0.45);
    group.add(orbitA);
    const orbitB = new THREE.Mesh(orbitGeometry, violetMaterial);
    orbitB.scale.setScalar(0.72);
    orbitB.rotation.set(-0.75, 0.45, 0.8);
    group.add(orbitB);

    const count = isMobile ? 150 : 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < positions.length; i++) {
      positions[i] = (Math.random() - 0.5) * (isMobile ? 40 : 70);
    }
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color().setHSL(0.53 + Math.random() * 0.28, 0.82, 0.72);
      colors.set([color.r, color.g, color.b], i * 3);
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.18 : 0.12,
      transparent: true,
      opacity: isMobile ? 0.65 : 0.55,
      sizeAttenuation: true,
      vertexColors: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Size strictly off the container's actual box, not window.innerWidth/Height.
    // This is the key mobile fix: window dimensions at mount time (before the
    // address bar collapses / dvh settles) don't reliably match the real
    // container box, which can leave the canvas mis-sized or effectively
    // invisible on phones.
    const applySize = (width: number, height: number) => {
      if (isDestroyed || width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const measureAndApply = () => {
      const rect = container.getBoundingClientRect();
      applySize(rect.width || window.innerWidth, rect.height || window.innerHeight);
    };

    // Initial size, deferred a frame so mobile layout has settled
    requestAnimationFrame(measureAndApply);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => measureAndApply())
        : null;
    resizeObserver?.observe(container);

    // Fallback for browsers without ResizeObserver, and orientation changes
    window.addEventListener("resize", measureAndApply);
    window.addEventListener("orientationchange", measureAndApply);

    let isPageVisible = true;
    const handleVisibilityChange = () => { isPageVisible = !document.hidden; };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (time = 0) => {
      if (isDestroyed) return;
      animationId = requestAnimationFrame(animate);

      if (!isPageVisible) return;

      if (!reduceMotion) {
        knot.rotation.x += isMobile ? 0.0015 : 0.003;
        knot.rotation.y += isMobile ? 0.0025 : 0.004;

        ico.rotation.x += 0.002;
        ico.rotation.y += 0.003;

        octa.rotation.x -= 0.002;
        octa.rotation.y += 0.002;

        particles.rotation.y += 0.0004;
        orbitA.rotation.z += 0.0012;
        orbitB.rotation.z -= 0.0009;
        group.position.y = Math.sin(time * 0.00035) * 0.65;
      }

      camera.position.x += (mouseX * 4 - camera.position.x) * 0.015;
      camera.position.y += (-mouseY * 4 - camera.position.y) * 0.015;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationId);

      resizeObserver?.disconnect();
      window.removeEventListener("resize", measureAndApply);
      window.removeEventListener("orientationchange", measureAndApply);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      knotGeometry.dispose();
      icoGeometry.dispose();
      octaGeometry.dispose();
      orbitGeometry.dispose();
      particleGeometry.dispose();

      material.dispose();
      tealMaterial.dispose();
      violetMaterial.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="background-3d-layer"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
