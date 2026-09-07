import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // C shape — torus arc with gap, low-poly faceted
    const group = new THREE.Group();

    // Main C: torus with arc < 2π to leave the opening
    // arc = ~5.0 rad leaves a gap on the right side
    const cGeo = new THREE.TorusGeometry(2.0, 0.7, 6, 24, 5.0);
    const cMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.25,
      flatShading: true,
    });
    const cMesh = new THREE.Mesh(cGeo, cMat);
    // Rotate so the gap faces right
    cMesh.rotation.z = -(5.0 / 2) - 0.3; // center the gap on +X
    group.add(cMesh);

    // Golden wireframe edges
    const edges = new THREE.EdgesGeometry(cGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0xfee96d, transparent: true, opacity: 0.75 });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    wireframe.rotation.z = cMesh.rotation.z;
    group.add(wireframe);

    // Floating small faceted shapes around the C
    const smallShapes = [];
    for (let i = 0; i < 5; i++) {
      const geo = new THREE.OctahedronGeometry(0.18, 0);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.7,
        roughness: 0.35,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 5) * Math.PI * 2;
      const radius = 3.2;
      mesh.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 1.4, Math.sin(angle) * radius * 0.4);
      mesh.userData = { angle, radius, speed: 0.3 + Math.random() * 0.4 };
      group.add(mesh);
      smallShapes.push(mesh);

      const smallEdges = new THREE.EdgesGeometry(geo);
      const smallLine = new THREE.LineSegments(smallEdges, new THREE.LineBasicMaterial({ color: 0xfee96d, transparent: true, opacity: 0.35 }));
      mesh.add(smallLine);
    }

    scene.add(group);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xfee96d, 1.5);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0xfee96d, 0.8, 15);
    fillLight.position.set(0, -3, 2);
    scene.add(fillLight);

    // Mouse tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotX = y * 0.5;
      targetRotY = x * 0.5;
    };
    mount.addEventListener("mousemove", onMouseMove);

    let raf;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReduced) {
        // Continuous slow Y rotation
        group.rotation.y += 0.005;
        // Subtle X oscillation
        group.rotation.x = Math.sin(elapsed * 0.3) * 0.12;
        // Mouse follow (additive on top of base rotation)
        group.rotation.x += (targetRotX - (group.rotation.x - Math.sin(elapsed * 0.3) * 0.12)) * 0.03;

        smallShapes.forEach((s) => {
          const a = s.userData.angle + elapsed * s.userData.speed * 0.3;
          s.position.x = Math.cos(a) * s.userData.radius;
          s.position.z = Math.sin(a) * s.userData.radius;
          s.position.y = Math.sin(a * 1.3 + elapsed) * 1.4;
          s.rotation.x += 0.01;
          s.rotation.y += 0.015;
        });
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      cGeo.dispose();
      cMat.dispose();
      edges.dispose();
      lineMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full min-h-[400px]" />;
}