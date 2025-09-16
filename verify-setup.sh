#!/bin/bash

# 🔍 Maiths AI Girlfriend - Setup Verification Script
# This script checks if everything is properly configured

echo "🔍 Maiths AI Girlfriend - Setup Verification"
echo "=============================================="

# Colors
GREEN='\033[1;32m'
RED='\033[1;31m'
YELLOW='\033[1;33m'
PINK='\033[1;35m'
NC='\033[0m'

# Directories
BACKEND_DIR="/home/yash/Documents/maiths-ai-gf"
FRONTEND_DIR="/home/yash/Documents/Maiths-AI-GF-Front-End"

echo -e "${PINK}💖 Checking setup...${NC}"
echo ""

# Check backend directory
echo -n "🤖 Backend directory exists... "
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    echo -e "${RED}Backend not found at: $BACKEND_DIR${NC}"
    exit 1
fi

# Check backend package.json
echo -n "📦 Backend package.json exists... "
if [ -f "$BACKEND_DIR/package.json" ]; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    echo -e "${RED}package.json not found in backend directory${NC}"
fi

# Check backend scripts
echo -n "🔨 Backend build script exists... "
if grep -q '"build"' "$BACKEND_DIR/package.json" 2>/dev/null; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${YELLOW}⚠️  Build script not found in backend package.json${NC}"
fi

echo -n "🚀 Backend start script exists... "
if grep -q '"start"' "$BACKEND_DIR/package.json" 2>/dev/null; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    echo -e "${RED}Start script not found in backend package.json${NC}"
fi

# Check frontend setup
echo -n "💖 Frontend directory exists... "
if [ -d "$FRONTEND_DIR" ]; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${RED}❌${NC}"
    exit 1
fi

echo -n "📦 Frontend dependencies installed... "
if [ -d "$FRONTEND_DIR/node_modules" ]; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${YELLOW}⚠️  Dependencies not installed${NC}"
    echo "   Run: cd $FRONTEND_DIR && npm install"
fi

# Check if start script is executable
echo -n "🚀 Start script is executable... "
if [ -x "$FRONTEND_DIR/start-maiths.sh" ]; then
    echo -e "${GREEN}✅${NC}"
else
    echo -e "${YELLOW}⚠️  Making start script executable...${NC}"
    chmod +x "$FRONTEND_DIR/start-maiths.sh"
    echo -e "${GREEN}✅ Fixed!${NC}"
fi

echo ""
echo -e "${PINK}🎯 Quick Start Options:${NC}"
echo ""
echo -e "${GREEN}Option 1 - One Command (Recommended):${NC}"
echo "cd $FRONTEND_DIR && ./start-maiths.sh"
echo ""
echo -e "${GREEN}Option 2 - Manual Start:${NC}"
echo "Terminal 1: cd $BACKEND_DIR && npm run build && npm start"
echo "Terminal 2: cd $FRONTEND_DIR && npm start"
echo ""
echo -e "${GREEN}Option 3 - Development Mode:${NC}"
echo "cd $FRONTEND_DIR && npm run dev"
echo ""

# Try to detect what kind of backend this might be
echo -e "${PINK}🔍 Backend Analysis:${NC}"
if [ -f "$BACKEND_DIR/package.json" ]; then
    if grep -q "express" "$BACKEND_DIR/package.json" 2>/dev/null; then
        echo "  📡 Detected: Express.js backend"
    fi
    if grep -q "fastify" "$BACKEND_DIR/package.json" 2>/dev/null; then
        echo "  📡 Detected: Fastify backend"
    fi
    if grep -q "nest" "$BACKEND_DIR/package.json" 2>/dev/null; then
        echo "  📡 Detected: NestJS backend"
    fi
fi

echo ""
echo -e "${GREEN}✨ Setup verification complete! ✨${NC}"
echo -e "${PINK}💕 Ready to start chatting with Maiths! 💕${NC}"
