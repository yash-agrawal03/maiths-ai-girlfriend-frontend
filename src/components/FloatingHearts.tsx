import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts: React.FC = () => {
  const hearts = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            y: -100,
            scale: [0, Math.random() * 0.5 + 0.3, 0],
            rotate: Math.random() * 360,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: Math.random() * 10 + 15,
            repeat: Infinity,
            repeatType: 'loop',
            delay: Math.random() * 20,
            ease: 'linear',
          }}
        >
          <Heart 
            className={`text-pink-300 fill-current ${
              Math.random() > 0.5 ? 'opacity-20' : 'opacity-10'
            }`}
            size={Math.random() * 20 + 10}
          />
        </motion.div>
      ))}
      
      {/* Sparkles */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'loop',
            delay: Math.random() * 5,
          }}
        >
          <div className="w-1 h-1 bg-purple-300 rounded-full relative">
            <div className="absolute inset-0 bg-purple-300 rounded-full animate-ping" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
