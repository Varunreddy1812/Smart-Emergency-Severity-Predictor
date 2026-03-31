#!/bin/bash

# Emergency Severity Predictor - Backend Startup Script

echo "🚨 Starting Emergency Severity Predictor Backend"
echo "================================================"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Navigate to backend directory
cd backend

# Check if requirements are installed
if ! python3 -c "import flask, flask_cors" 2>/dev/null; then
    echo "📦 Installing dependencies..."
    pip3 install -r requirements.txt
fi

# Start the Flask server
echo ""
echo "✅ Starting Flask server..."
echo "📍 Server will run on http://localhost:5000"
echo "🔗 Frontend should be running on http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 app.py
