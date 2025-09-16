import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex justify-start mb-4"
    >
      <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
        {/* Avatar */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <Bot className="w-4 h-4 text-white" />
        </motion.div>

        {/* Typing Bubble */}
        <div className="bg-white/90 backdrop-blur-sm border border-pink-200 px-4 py-3 rounded-2xl shadow-lg relative">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
              />
            ))}
          </div>
          
          {/* Message Tail */}
          <div className="absolute top-4 left-[-8px] w-0 h-0 border-r-8 border-r-white/90 border-t-4 border-t-transparent border-b-4 border-b-transparent" />
        </div>
      </div>
      
      {/* Cute typing text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="ml-3 self-end pb-3"
      >
        <span className="text-xs text-pink-500 font-medium">
          Maiths is typing... 💕
        </span>
      </motion.div>
    </motion.div>
  );
};

export default TypingIndicator;
