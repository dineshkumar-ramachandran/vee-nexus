import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Pause, Play, RotateCcw } from 'lucide-react';

/** A continuous laminated paper ribbon. Rendering owns no page layout or text. */
export default function PaperScene() {
  const host = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resetRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    element.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0, 10.6);
    scene.add(new THREE.HemisphereLight(0xfffbee, 0x425b39, 2.5));
    const key = new THREE.DirectionalLight(0xfff3dc, 4.8);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xecf6dd, 2.8);
    rim.position.set(4, -1, -2);
    scene.add(rim);
    const form = new THREE.Group();
    scene.add(form);
    const resources: (THREE.BufferGeometry | THREE.Material)[] = [];

    for (let layer = 0; layer < 13; layer++) {
      const geometry = new THREE.BufferGeometry();
      const vertices: number[] = [];
      const indices: number[] = [];
      const sections = 128;
      const across = 5;
      for (let i = 0; i <= sections; i++) {
        const t = (i / sections) * Math.PI * 2;
        for (let j = 0; j <= across; j++) {
          const v = (j / across - 0.5) * 1.6;
          const radius = 1.83 + v * Math.cos(t / 2) * 0.85 + layer * 0.014;
          vertices.push(radius * Math.cos(t), radius * Math.sin(t), v * Math.sin(t / 2) + layer * 0.043 - 0.26);
          if (i < sections && j < across) {
            const a = i * (across + 1) + j;
            indices.push(a, a + across + 1, a + 1, a + 1, a + across + 1, a + across + 2);
          }
        }
      }
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      const material = new THREE.MeshStandardMaterial({
        color: layer === 12 ? '#f0e8d7' : layer % 3 === 0 ? '#b59b70' : '#ddd0b5',
        roughness: 0.85, metalness: 0, side: THREE.DoubleSide,
      });
      form.add(new THREE.Mesh(geometry, material));
      resources.push(geometry, material);
    }

    let frame = 0;
    let visible = true;
    let pointerX = 0;
    let pointerY = 0;
    let angle = 0;
    let lastTime = 0;
    form.rotation.set(0.25, -0.4, -0.4);
    const render = () => renderer.render(scene, camera);
    const size = () => {
      const { width, height } = element.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      render();
    };
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden) return;
      if (time - lastTime < 33) { frame = requestAnimationFrame(tick); return; }
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;
      if (!pausedRef.current && !reduced.matches) {
        angle += delta * 0.055;
        form.rotation.y += (-0.4 + pointerX * 0.28 + Math.sin(angle) * 0.18 - form.rotation.y) * 0.035;
        form.rotation.x += (0.25 + pointerY * 0.18 - form.rotation.x) * 0.035;
        form.rotation.z = -0.4 + Math.sin(angle * 0.7) * 0.08;
        render();
      }
      if (!reduced.matches && !pausedRef.current) frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick); };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || reduced.matches) return;
      const rect = element.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      start();
    };
    const leave = () => { pointerX = pointerY = 0; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    observer.observe(element);
    const resize = new ResizeObserver(size);
    resize.observe(element);
    const motionChange = () => { if (reduced.matches) { cancelAnimationFrame(frame); frame = 0; render(); } else start(); };
    const pauseChange = () => { render(); start(); };
    const contextLost = (event: Event) => { event.preventDefault(); setAvailable(false); cancelAnimationFrame(frame); };
    resetRef.current = () => { pointerX = pointerY = angle = 0; form.rotation.set(.25, -.4, -.4); render(); };
    element.addEventListener('pointermove', pointer);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('paper-motion-change', pauseChange);
    renderer.domElement.addEventListener('webglcontextlost', contextLost);
    document.addEventListener('visibilitychange', start);
    reduced.addEventListener('change', motionChange);
    size();
    setAvailable(true);
    start();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect(); observer.disconnect();
      element.removeEventListener('pointermove', pointer);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('paper-motion-change', pauseChange);
      document.removeEventListener('visibilitychange', start);
      reduced.removeEventListener('change', motionChange);
      renderer.domElement.removeEventListener('webglcontextlost', contextLost);
      resources.forEach(resource => resource.dispose());
      renderer.dispose(); renderer.domElement.remove();
    };
  }, []);

  const toggle = () => {
    pausedRef.current = !paused;
    setPaused(!paused);
    host.current?.dispatchEvent(new Event('paper-motion-change'));
  };
  return <div className={`paper-scene ${available ? 'is-ready' : ''}`}>
    <img className="paper-scene-fallback scene-poster" src="/paper-sculpture.webp" alt="Layers of recovered corrugated paper" />
    <div ref={host} className="paper-canvas" />
    {available && <div className="scene-controls">
      <button onClick={toggle} aria-label={paused ? 'Play motion' : 'Pause motion'} aria-pressed={paused}>{paused ? <Play size={14}/> : <Pause size={14}/>}<span>{paused ? 'Play motion' : 'Pause motion'}</span></button>
      <button onClick={() => resetRef.current()} aria-label="Reset paper sculpture"><RotateCcw size={14}/></button>
    </div>}
  </div>;
}


