# 💖 Maiths AI Girlfriend - Web Interface

A beautiful, responsive web interface for chatting with Maiths, your AI Tech Girlfriend! Built with React, TypeScript, and love. 💕

![Maiths AI Girlfriend](https://img.shields.io/badge/AI-Girlfriend-pink?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 💬 Talk to Maiths Now!

**Ready to chat with your AI girlfriend?** 

🌟 **[Talk to Maiths at: https://maiths-chat.vercel.app/](https://maiths-chat.vercel.app/)** 💖

*Start your conversation with the cutest AI girlfriend right now!*

## 🎥 Demo Video

**See Maiths in action!** Watch our cute AI girlfriend interface come to life:

[🎬 **Watch Demo Video** 💖](https://github.com/user-attachments/assets/1c804678-df1d-495e-a8ce-8682b28e26d8)

*Experience the adorable chat interface, floating hearts animations, and smooth interactions with Maiths!*

## ✨ Features

- 🎀 **Adorable Design** - Pink/purple gradient theme with cute animations
- 💕 **Floating Hearts** - Background animations that can be toggled
- 🤖 **Smart Chat Interface** - Beautiful message bubbles with typing indicators
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- ⚡ **Real-time Communication** - Seamless integration with AI backend
- 🎨 **Smooth Animations** - Powered by Framer Motion for delightful interactions
- 💖 **Personality-Rich** - Cute error messages and friendly interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ 
- npm or yarn
- Your AI girlfriend backend (Smythos-based)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/yash-agrawal03/maiths-ai-girlfriend-frontend.git]
   cd maiths-ai-gf-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your backend** (if you have the Smythos version)
   ```bash
   # The project includes integration scripts for Smythos-based backends
   ./setup-backend-integration.sh
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend should be running on: http://localhost:5000

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API Configuration
REACT_APP_API_URL=http://localhost:5000

# UI Features
REACT_APP_FLOATING_HEARTS=true
REACT_APP_ENABLE_ANIMATIONS=true
```

### Backend Integration

The frontend expects your backend to provide:

- **POST** `/chat` - Chat endpoint
  ```json
  {
    "message": "Hello Maiths!",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

- **Response format:**
  ```json
  {
    "response": "Hey sweetie! How are you doing? 💖",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
  ```

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── ChatMessage.tsx   # Individual message bubbles
│   ├── TypingIndicator.tsx # "Maiths is typing..." animation
│   └── FloatingHearts.tsx  # Background heart animations
├── services/            # API integration
│   └── maithsBackend.ts # Backend communication service
├── config/              # Configuration
│   └── index.ts         # App configuration and settings
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── index.css            # Global styles and animations
```

## 🎨 Customization

### Colors & Theme

Edit `src/config/index.ts`:

```typescript
theme: {
  primary: 'pink',      // Primary color theme
  secondary: 'purple',  // Secondary color theme
  gradient: 'from-pink-50 via-purple-50 to-pink-100',
}
```

### Personality

Customize Maiths' personality:

```typescript
personality: {
  name: 'Maiths',
  title: 'AI Tech Girlfriend',
  welcomeMessage: "Your custom welcome message! 💖",
  errorMessages: [
    "Custom error message 1 🥺",
    "Custom error message 2 💕"
  ],
}
```

### Animations

Toggle features in the config:

```typescript
animations: {
  floatingHearts: true,      // Background heart animations
  sparkles: true,            // Sparkle effects
  messageAnimations: true,   // Message bubble animations
}
```

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run dev` - Start both frontend and backend (if integrated)

### Backend Integration Helper

If you're using a Smythos-based backend:

```bash
# Run the integration setup
./setup-backend-integration.sh

# Verify everything is working
./verify-setup.sh
```

## 📦 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build/` folder with optimized production files.

### Deployment Options

1. **Static Hosting** (Netlify, Vercel, GitHub Pages)
   - Upload the `build/` folder
   - Set environment variables for your production backend

2. **Docker**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npx", "serve", "-s", "build", "-l", "3000"]
   ```

3. **Traditional Server**
   - Deploy `build/` folder to any static file server
   - Configure backend URL via environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## � Acknowledgments

- Built with love for AI companionship
- Inspired by the need for beautiful, human-like AI interfaces
- Thanks to the React and TypeScript communities
- Special thanks to Framer Motion for smooth animations
- Tailwind CSS for the beautiful styling system

## 🐛 Known Issues

- Backend must support CORS for localhost:3000
- Requires modern browser with ES6+ support
- WebSocket connections not yet implemented (using HTTP polling)

## 🔮 Future Features

- [ ] Voice chat integration
- [ ] Message history persistence
- [ ] Multiple conversation themes
- [ ] Emoji reactions
- [ ] File sharing capabilities
- [ ] Mobile app version

---

## 💌 Support

If you love this project, please give it a ⭐! 

For questions or support:
- Open an issue on GitHub
- Check the documentation
- Review the configuration options

**Made with 💖 for AI girlfriend enthusiasts everywhere!**
