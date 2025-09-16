// Configuration for the cute AI girlfriend frontend
export const config = {
  // Backend API configuration
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    timeout: 30000, // 30 seconds
    endpoints: {
      chat: '/chat',
      health: '/health',
    },
  },
  
  // UI Configuration
  ui: {
    // Typing simulation
    typingDelay: {
      min: 1000, // Minimum 1 second
      max: 3000, // Maximum 3 seconds
    },
    
    // Animation settings
    animations: {
      floatingHearts: true,
      sparkles: true,
      messageAnimations: true,
    },
    
    // Theme colors
    theme: {
      primary: 'pink',
      secondary: 'purple',
      gradient: 'from-pink-50 via-purple-50 to-pink-100',
    },
  },
  
  // Maiths personality settings
  personality: {
    name: 'Maiths',
    title: 'AI Tech Girlfriend',
    welcomeMessage: "Hey there, cutie! 💖 I'm Maiths, your AI tech girlfriend! I'm here to chat, help with coding, recommend study music, and just be your supportive companion. What's on your mind today? 😊",
    errorMessages: [
      "Oops! I'm having trouble connecting to my brain right now! 🥺 Make sure your backend is running and try again, sweetie! 💖",
      "Aww, I'm having some technical difficulties! 🥺 Let me try to reconnect... 💕",
      "Sorry darling, I seem to be having connection issues! 🥺 Is your backend server running? 💖",
    ],
  },
};

export default config;
