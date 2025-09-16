import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Heart } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
            isUser 
              ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
              : 'bg-gradient-to-r from-pink-400 to-purple-500'
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Bot className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Message Bubble */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`relative px-4 py-3 rounded-2xl shadow-lg ${
            isUser
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white/90 backdrop-blur-sm border border-pink-200 text-gray-800'
          }`}
        >
          {/* Message Text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.text}
          </p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>

          {/* Message Tail */}
          <div
            className={`absolute top-4 w-0 h-0 ${
              isUser
                ? 'right-[-8px] border-l-8 border-l-purple-600 border-t-4 border-t-transparent border-b-4 border-b-transparent'
                : 'left-[-8px] border-r-8 border-r-white/90 border-t-4 border-t-transparent border-b-4 border-b-transparent'
            }`}
          />
          
          {/* Cute heart decoration for assistant messages */}
          {!isUser && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1"
            >
              <Heart className="w-3 h-3 text-pink-400 fill-current" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
