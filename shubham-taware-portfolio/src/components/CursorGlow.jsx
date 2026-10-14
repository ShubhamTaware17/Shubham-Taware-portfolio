import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

const SIZE = 420;

/** A soft light that follows the pointer. Only on fine pointers, and never with reduced motion. */
export default function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  );

  const x = useMotionValue(-SIZE);
  const y = useMotionValue(-SIZE);
  const smoothX = useSpring(x, { stiffness: 140, damping: 26, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 140, damping: 26, mass: 0.5 });
  const left = useTransform(smoothX, (value) => value - SIZE / 2);
  const top = useTransform(smoothY, (value) => value - SIZE / 2);

  useEffect(() => {
    if (!enabled || reduceMotion) return undefined;
    const handleMove = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [enabled, reduceMotion, x, y]);

  if (!enabled || reduceMotion) return null;

  return (
    <motion.div
      className="cursor-glow"
      aria-hidden="true"
      style={{ x: left, y: top, width: SIZE, height: SIZE }}
    />
  );
}
