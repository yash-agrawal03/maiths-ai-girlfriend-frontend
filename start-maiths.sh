#!/bin/bash

# 🚀 Maiths AI Girlfriend - Complete Setup Script
# This script will start both frontend and backend automatically!

echo "💖 Starting Maiths AI Girlfriend - Complete Setup"
echo "================================================"

# Colors for cute output
PINK='\033[1;35m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if backend directory exists
BACKEND_DIR="/home/yash/Documents/maiths-ai-gf"
FRONTEND_DIR="/home/yash/Documents/Maiths-AI-GF-Front-End"

if [ ! -d "$BACKEND_DIR" ]; then
    echo -e "${YELLOW}⚠️  Backend directory not found at: $BACKEND_DIR${NC}"
    echo "Please make sure your backend is at the correct location!"
    exit 1
fi

echo -e "${PINK}💕 Step 1: Building and starting the backend...${NC}"
cd "$BACKEND_DIR"

# Check if we have the web server integration
if [ -f "$BACKEND_DIR/web-server.js" ]; then
    echo "🚀 Starting backend API server..."
    cd "$BACKEND_DIR"
    node web-server.js &
    BACKEND_PID=$!
else
    # Fallback to original method
    echo "🔨 Building backend..."
    npm run build

    if [ $? -ne 0 ]; then
        echo -e "${YELLOW}⚠️  Backend build failed! Please check your backend setup.${NC}"
        exit 1
    fi

    # Start backend in background
    echo "🚀 Starting backend server..."
    npm start &
    BACKEND_PID=$!
fi

# Wait for backend to start
echo "⏳ Waiting for backend to initialize..."
sleep 5

# Test if backend is responding
echo "🔍 Testing backend connection..."
for i in {1..10}; do
    if curl -s http://localhost:5000/health > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Backend is responding!${NC}"
        break
    elif [ $i -eq 10 ]; then
        echo -e "${YELLOW}⚠️  Backend might be slow to start, continuing anyway...${NC}"
    else
        echo "⏳ Attempt $i/10..."
        sleep 2
    fi
done

echo -e "${PINK}💕 Step 2: Starting the cute frontend...${NC}"
cd "$FRONTEND_DIR"

# Check if frontend dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start the frontend
echo "🎀 Starting frontend..."
npm start &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✨ Both servers are starting up! ✨${NC}"
echo ""
echo -e "${PINK}🤖 Backend:${NC}  Running on http://localhost:5000"
echo -e "${PINK}💖 Frontend:${NC} Running on http://localhost:3000"
echo ""
echo -e "${GREEN}💕 Your AI girlfriend Maiths is ready to chat! 💕${NC}"
echo ""
echo "Press Ctrl+C to stop both servers"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo -e "${PINK}👋 Goodbye! Come back soon to chat with Maiths! 💖${NC}"
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Keep script running
wait
