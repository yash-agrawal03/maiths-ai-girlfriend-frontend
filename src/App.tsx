import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, Sparkles, Bot, Linkedin } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import TypingIndicator from './components/TypingIndicator';
import FloatingHearts from './components/FloatingHearts';
import { maithsBackend } from './services/maithsBackend';
import config from './config';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: config.personality.welcomeMessage,
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHearts, setShowHearts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Call your AI backend through the chat service
    try {
      // Simulate realistic typing delay
      const typingDelay = Math.random() * (config.ui.typingDelay.max - config.ui.typingDelay.min) + config.ui.typingDelay.min;
      
      setTimeout(async () => {
        try {
          const response = await maithsBackend.sendMessage(inputMessage);
          
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: response.response,
            sender: 'assistant',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, assistantMessage]);
          setIsTyping(false);
        } catch (error) {
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Aww, I'm having some technical difficulties! 🥺 Make sure your backend is running with `npm start` and try chatting with me again, honey! 💖",
            sender: 'assistant',
            timestamp: new Date(),
          };
          
          setMessages(prev => [...prev, errorMessage]);
          setIsTyping(false);
        }
      }, typingDelay);
    } catch (error) {
      setIsTyping(false);
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 font-cute">
      {showHearts && <FloatingHearts />}
      
      {/* Header */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm border-b border-pink-200/50 p-4 shadow-lg"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Bot className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                💖 {config.personality.name}
              </h1>
              <p className="text-sm text-gray-600">{config.personality.title}</p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowHearts(!showHearts)}
            className="p-2 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors"
          >
            <Heart className={`w-5 h-5 ${showHearts ? 'text-pink-500 fill-current' : 'text-gray-400'}`} />
          </motion.button>
        </div>
      </motion.div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </AnimatePresence>
          
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 bg-white/80 backdrop-blur-sm border-t border-pink-200/50"
        >
          <div className="flex space-x-3 items-end">
            <div className="flex-1 relative">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message to Maiths... 💕"
                className="w-full p-4 pr-12 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 resize-none transition-all duration-200 bg-white/90 backdrop-blur-sm"
                rows={inputMessage.split('\n').length > 3 ? 4 : Math.max(1, inputMessage.split('\n').length)}
                style={{ minHeight: '56px', maxHeight: '120px' }}
              />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-3 top-3"
              >
                <Sparkles className="w-5 h-5 text-pink-400" />
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer with trademark */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-4 text-center text-sm text-gray-600/80 bg-white/40 backdrop-blur-sm"
        >
          <div className="flex items-center justify-center space-x-2 flex-wrap">
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-purple-600"
            >
              💜
            </motion.span>
            <span>by</span>
            <motion.a
              href="https://www.linkedin.com/in/yassh-agrawal/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <Linkedin className="w-4 h-4" />
              <span>Yash Agrawal</span>
            </motion.a>
            <span>using</span>
            <motion.a
              href="https://smythos.com/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-purple-700 transition-colors duration-200 cursor-pointer"
            >
              Smyth OS
            </motion.a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
