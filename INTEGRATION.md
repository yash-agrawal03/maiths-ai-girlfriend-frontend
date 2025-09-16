# 🔗 Frontend-Backend Integration Guide

## 🚀 Quick Start (Easiest Way)

### Option 1: One-Command Start (Recommended)
```bash
# Navigate to the frontend directory
cd /home/yash/Documents/Maiths-AI-GF-Front-End

# Run the magic script that starts both backend and frontend
./start-maiths.sh
```

This script will:
1. Build and start your backend at `http://localhost:5000`
2. Start the frontend at `http://localhost:3000`
3. Keep both running until you press Ctrl+C

### Option 2: Manual Start
```bash
# Terminal 1: Start Backend
cd /home/yash/Documents/maiths-ai-gf
npm run build
npm start

# Terminal 2: Start Frontend
cd /home/yash/Documents/Maiths-AI-GF-Front-End
npm start
```

## 🔧 How the Integration Works

### Backend Requirements
Your backend at `/home/yash/Documents/maiths-ai-gf` should expose:

**Primary Endpoint:**
- `POST http://localhost:5000/chat`
- Request body: `{"message": "user message", "timestamp": "ISO date"}`
- Response: `{"response": "AI response"}` (or any format with response text)

**Optional Endpoints the frontend will try:**
- `/chat` (primary)
- `/api/chat`
- `/message`
- `/ask`

### Frontend Auto-Detection
The frontend will automatically:
1. Try multiple endpoints to find your chat API
2. Handle different response formats (`response`, `message`, `content`, `reply`, `text`)
3. Show helpful error messages if connection fails
4. Retry connection with fallback endpoints

## 📡 Backend Integration Details

### Supported Response Formats
Your backend can return any of these formats:

```javascript
// Format 1 (Recommended)
{ "response": "Hi there! 💖" }

// Format 2
{ "message": "Hi there! 💖" }

// Format 3
{ "content": "Hi there! 💖" }

// Format 4
{ "reply": "Hi there! 💖" }

// Format 5 (Direct string)
"Hi there! 💖"
```

### CORS Configuration (Important!)
Add this to your backend code:

```javascript
// If using Express.js
const cors = require('cors');
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// If using a different framework, ensure CORS is enabled for localhost:3000
```

### Example Backend Integration

If your backend uses Express.js, here's what it should look like:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

// Main chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Your AI processing logic here
    const aiResponse = await processWithAI(message);
    
    // Return in the expected format
    res.json({
      response: aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      response: "Sorry, I'm having technical difficulties! 🥺"
    });
  }
});

// Health check endpoint (optional)
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(5000, () => {
  console.log('🤖 Maiths backend running on port 5000');
});
```

## 🛠️ Troubleshooting

### Frontend won't connect to backend
1. **Check if backend is running:**
   ```bash
   curl http://localhost:5000/health
   # or
   curl -X POST http://localhost:5000/chat -H "Content-Type: application/json" -d '{"message":"test"}'
   ```

2. **Check the browser console** (F12) for error messages

3. **Verify CORS is enabled** in your backend

4. **Check port conflicts** - make sure nothing else is using port 5000

### Backend is running but frontend shows errors
1. **Check response format** - ensure your backend returns one of the supported formats
2. **Check endpoint path** - the frontend tries `/chat`, `/api/chat`, `/message`, `/ask`
3. **Check HTTP method** - should be POST for chat endpoint

### Custom Configuration
Create a `.env` file in the frontend directory:
```bash
# Copy the example file
cp .env.example .env

# Edit with your settings
REACT_APP_API_URL=http://localhost:5000  # Change port if needed
```

## 📱 Development Tips

### Running in Development Mode
```bash
# Install concurrently for easier development
npm install --save-dev concurrently

# Start both servers with one command
npm run dev
```

### Backend Health Check
```bash
# Check if your backend is responding
npm run check-backend
```

### Debug Mode
Set `REACT_APP_SHOW_DEBUG_INFO=true` in your `.env` file to see:
- API requests/responses in console
- Connection status
- Backend endpoint attempts

---

## 🎉 You're All Set!

Once both servers are running:
1. Frontend: `http://localhost:3000` 
2. Backend: `http://localhost:5000`
3. Start chatting with your AI girlfriend Maiths! 💖

The integration will automatically handle the communication between them. Just make sure your backend responds to POST requests at `/chat` with a JSON object containing the AI's response!
