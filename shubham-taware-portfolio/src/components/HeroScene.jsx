import { useEffect, useRef } from 'react';
import {
  AmbientLight,
  BufferAttribute,
  BufferGeometry,
  DirectionalLight,
  Group,
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Scene,
  TorusGeometry,
  WebGLRenderer,
} from 'three';

const PARTICLE_COUNT = 240;
const MAX_PIXEL_RATIO = 1.75;

/** Deterministic pseudo-random positions on a shell, so every render looks the same. */
function buildParticles(count) {
  const positions = new Float32Array(count * 3);
  let seed = 42;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < count; i += 1) {
    const radius = 2.4 + random() * 1.8;
    const theta = random() * Math.PI * 2;
    const phi = Math.acos(2 * random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
}

/**
 * A small, self-contained Three.js scene: a faceted core with a wireframe shell,
 * two orbit rings and a particle field. It leans toward the pointer.
 *
 * Performance: the loop runs only while the scene is on screen, the pixel ratio is
 * capped, and everything is disposed on unmount. With reduced motion it renders one still frame.
 */
export default function HeroScene({ reduced }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const renderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    scene.add(new AmbientLight(0xffffff, 0.6));

    const key = new DirectionalLight(0xffffff, 1.6);
    key.position.set(3, 4, 5);
    scene.add(key);

    const violetLight = new PointLight(0x8b7bff, 22, 12, 2);
    violetLight.position.set(-3, -1.5, 2.5);
    scene.add(violetLight);

    const tealLight = new PointLight(0x3fe0d0, 16, 12, 2);
    tealLight.position.set(3, -2, -1.5);
    scene.add(tealLight);

    // `tilt` follows the pointer; `spin` rotates continuously inside it.
    const tilt = new Group();
    const spin = new Group();
    tilt.add(spin);
    scene.add(tilt);

    spin.add(
      new Mesh(
        new IcosahedronGeometry(1.2, 1),
        new MeshStandardMaterial({
          color: 0x16182b,
          emissive: 0x2b2770,
          emissiveIntensity: 0.55,
          // Smooth shading with a broad, soft highlight. Flat faces caught the light as a
          // crisp triangle that read like a play button.
          metalness: 0.55,
          roughness: 0.55,
        }),
      ),
    );

    const shell = new Mesh(
      new IcosahedronGeometry(1.2, 2),
      new MeshBasicMaterial({ color: 0x8b7bff, wireframe: true, transparent: true, opacity: 0.32 }),
    );
    shell.scale.setScalar(1.012);
    spin.add(shell);

    const ringInner = new Mesh(
      new TorusGeometry(1.9, 0.01, 12, 200),
      new MeshBasicMaterial({ color: 0x3fe0d0, transparent: true, opacity: 0.8 }),
    );
    ringInner.rotation.set(Math.PI / 2.6, 0.2, 0);
    tilt.add(ringInner);

    const ringOuter = new Mesh(
      new TorusGeometry(2.35, 0.006, 12, 220),
      new MeshBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.6 }),
    );
    ringOuter.rotation.set(Math.PI / 4, -0.5, Math.PI / 6);
    tilt.add(ringOuter);

    const particleGeometry = new BufferGeometry();
    particleGeometry.setAttribute('position', new BufferAttribute(buildParticles(PARTICLE_COUNT), 3));
    const particles = new Points(
      particleGeometry,
      new PointsMaterial({
        color: 0xffffff,
        size: 0.02,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
      }),
    );
    tilt.add(particles);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // Pointer position in the range -1..1 across the scene. Zeroed when the pointer leaves.
    const pointer = { x: 0, y: 0 };
    const handleMove = (event) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    const handleLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    container.addEventListener('pointermove', handleMove, { passive: true });
    container.addEventListener('pointerleave', handleLeave);

    let frameId = 0;
    let lastTime = 0;
    let elapsed = 0;

    const renderFrame = (time) => {
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      elapsed += delta;

      // Lerp toward the pointer so the object leans gently instead of snapping.
      const ease = Math.min(1, delta * 4);
      tilt.rotation.x += (-pointer.y * 0.35 - tilt.rotation.x) * ease;
      tilt.rotation.y += (pointer.x * 0.5 - tilt.rotation.y) * ease;
      spin.rotation.y = elapsed * 0.18;
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(renderFrame);
    };

    const start = () => {
      if (frameId) return;
      lastTime = 0;
      frameId = requestAnimationFrame(renderFrame);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    // Only animate while the scene is near the viewport.
    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !reduced) start();
        else stop();
      },
      { rootMargin: '120px' },
    );
    visibility.observe(container);

    const sizing = new ResizeObserver(() => {
      resize();
      if (reduced) renderer.render(scene, camera);
    });
    sizing.observe(container);

    resize();
    if (reduced) renderer.render(scene, camera);

    return () => {
      stop();
      visibility.disconnect();
      sizing.disconnect();
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerleave', handleLeave);
      scene.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, [reduced]);

  return <div ref={containerRef} className="hero-scene" />;
}
