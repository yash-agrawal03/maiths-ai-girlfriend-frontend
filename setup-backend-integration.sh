#!/bin/bash

# 🔧 Backend Integration Setup Script
# This script sets up your Smythos agent as a web API server

echo "🔧 Setting up Maiths AI Girlfriend Backend Integration"
echo "===================================================="

# Colors
GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
PINK='\033[1;35m'
NC='\033[0m'

BACKEND_DIR="/home/yash/Documents/maiths-ai-gf"
FRONTEND_DIR="/home/yash/Documents/Maiths-AI-GF-Front-End"

echo -e "${PINK}💖 Step 1: Copying web server to backend...${NC}"

# Copy the web server file to backend
cp "$FRONTEND_DIR/web-server.js" "$BACKEND_DIR/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Web server copied successfully!${NC}"
else
    echo -e "${RED}❌ Failed to copy web server${NC}"
    exit 1
fi

echo -e "${PINK}💖 Step 2: Adding Express.js dependencies to backend...${NC}"

# Add express and cors to backend package.json
cd "$BACKEND_DIR"

# Check if express is already installed
if ! grep -q '"express"' package.json 2>/dev/null; then
    echo "📦 Installing Express.js and CORS..."
    npm install express cors
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Dependencies installed!${NC}"
    else
        echo -e "${RED}❌ Failed to install dependencies${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✅ Express.js already installed!${NC}"
fi

echo -e "${PINK}💖 Step 3: Updating backend package.json scripts...${NC}"

# Create a backup of package.json
cp package.json package.json.backup

# Add web-server script to package.json using node
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts['start-web'] = 'node web-server.js';
pkg.scripts['start-terminal'] = pkg.scripts['start'];
pkg.scripts['start'] = 'node web-server.js';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('Updated package.json scripts');
"

echo -e "${GREEN}✅ Package.json updated!${NC}"

echo -e "${PINK}💖 Step 4: Testing the setup...${NC}"

echo "🔍 Backend directory structure:"
ls -la "$BACKEND_DIR" | grep -E "(web-server|package\.json)"

echo ""
echo -e "${GREEN}✨ Setup Complete! ✨${NC}"
echo ""
echo -e "${PINK}🎯 How to start your AI girlfriend:${NC}"
echo ""
echo -e "${GREEN}Option 1 - Full System (Recommended):${NC}"
echo "cd $FRONTEND_DIR && ./start-maiths.sh"
echo ""
echo -e "${GREEN}Option 2 - Manual Start:${NC}"
echo "Terminal 1: cd $BACKEND_DIR && npm start"
echo "Terminal 2: cd $FRONTEND_DIR && npm start"
echo ""
echo -e "${GREEN}Option 3 - Development Mode:${NC}"
echo "cd $FRONTEND_DIR && npm run dev"
echo ""
echo -e "${YELLOW}📝 What changed:${NC}"
echo "• Added web-server.js to your backend"
echo "• Installed Express.js and CORS"
echo "• Updated backend scripts:"
echo "  - npm start → starts web API server"
echo "  - npm run start-terminal → starts terminal chat"
echo "  - npm run start-web → starts web API server"
echo ""
echo -e "${PINK}💕 Your backend will now work with the cute frontend! 💕${NC}"
