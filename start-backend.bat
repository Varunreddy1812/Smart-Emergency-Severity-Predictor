@echo off
REM Emergency Severity Predictor - Backend Startup Script for Windows

echo 🚨 Starting Emergency Severity Predictor Backend
echo ================================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)

REM Navigate to backend directory
cd backend

REM Check if requirements are installed
python -c "import flask, flask_cors" >nul 2>&1
if errorlevel 1 (
    echo 📦 Installing dependencies...
    pip install -r requirements.txt
)

REM Start the Flask server
echo.
echo ✅ Starting Flask server...
echo 📍 Server will run on http://localhost:5000
echo 🔗 Frontend should be running on http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

python app.py
pause
