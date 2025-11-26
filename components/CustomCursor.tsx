import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Point } from '../types';

const EMOJIS = ['❤️', '✨', '🌸', '🇰🇷', '✈️', '💖'];

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<Point>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; emoji: string }[]>([]);
  const requestRef = useRef<number>();
  const trailIdCounter = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add trail logic
      if (Math.random() > 0.8) {
        const id = trailIdCounter.current++;
        const emoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        setTrails(prev => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY, emoji }]);
        
        setTimeout(() => {
          setTrails(prev => prev.filter(t => t.id !== id));
        }, 1000);
      }
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-rose-400 mix-blend-multiply filter blur-sm opacity-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : 1.2,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-rose-600"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50 }}
      />

      {/* Floating Trail */}
      <AnimatePresence>
        {trails.map((trail) => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 1, scale: 0.5, x: trail.x, y: trail.y }}
            animate={{ opacity: 0, scale: 1.5, y: trail.y - 50 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed text-xl pointer-events-none select-none"
          >
            {trail.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomCursor;
