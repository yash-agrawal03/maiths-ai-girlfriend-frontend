# 🚀 Deployment Guide

## Development

The app is already running on `http://localhost:3000`! 

## Production Build

To create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with production-ready files.

## Environment Variables

Create a `.env` file in the root directory to customize settings:

```bash
# Backend API URL (change this to your deployed backend)
REACT_APP_API_URL=http://localhost:5000

# Enable/disable features
REACT_APP_FLOATING_HEARTS=true
REACT_APP_ENABLE_ANIMATIONS=true
```

## Deployment Options

### 1. Static Hosting (Netlify, Vercel, GitHub Pages)
```bash
npm run build
# Deploy the build/ folder
```

### 2. Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

### 3. Traditional Server
```bash
npm run build
# Serve the build folder with any static file server
```

## Backend Integration

Make sure your AI girlfriend backend supports CORS for the frontend domain:

```javascript
// In your backend
app.use(cors({
  origin: ['http://localhost:3000', 'your-frontend-domain.com']
}));
```

The frontend expects a POST endpoint at `/chat` that accepts:
```json
{
  "message": "user message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

And returns:
```json
{
  "response": "AI response",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
