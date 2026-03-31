# Emergency Severity Predictor - Quick Start Guide

## ⚡ Fastest Way to Get Running (5 Minutes)

### Step 1: Start Backend

**Mac/Linux:**
```bash
chmod +x start-backend.sh
./start-backend.sh
```

**Windows:**
```bash
start-backend.bat
```

**Expected output:**
```
🚨 Emergency Severity Predictor Backend
================================================
Server running at http://0.0.0.0:5000
Available endpoints:
  - POST http://localhost:5000/predict
  - GET  http://localhost:5000/health
CORS enabled for localhost:3000 and localhost:5173
```

### Step 2: Start Frontend (New Terminal)

```bash
npm install
npm run dev
```

**Expected output:**
```
> next dev
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### Step 3: Test It

1. Open browser to `http://localhost:3000`
2. Type: **"fever and headache"**
3. Click **"Predict Severity"**
4. You should see: **Medium Severity** ✓

---

## 🧪 Test Symptoms

| Input | Expected Result | Severity |
|-------|-----------------|----------|
| `chest pain and breathing difficulty` | High severity, call ambulance | 🔴 High |
| `fever and headache` | Medium, consult doctor | 🟡 Medium |
| `cut on arm` | Low, apply first aid | 🟢 Low |
| `chest pain` | High severity | 🔴 High |
| anything else | Medium (default) | 🟡 Medium |

---

## ⚠️ Common Issues & Fixes

### Issue: "Failed to fetch"
**Solution:** Backend not running
```bash
cd backend
python app.py
```

### Issue: Port 5000 already in use
**Solution:** Kill the process
```bash
# Mac/Linux
lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Python modules not found
**Solution:** Install dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Issue: Nothing happens after clicking "Predict Severity"
**Solution:** Check browser console (F12)
- If error about `http://localhost:5000`: Backend not running
- If CORS error: Kill and restart backend
- If other error: Check terminal where Flask is running

---

## 📋 Checklist Before Testing

- [ ] Backend terminal open and running Flask
- [ ] Frontend terminal open and running Next.js
- [ ] Can see `http://localhost:3000` in browser
- [ ] Can see "Emergency Severity Predictor" title
- [ ] Input field is visible and empty

---

## 🔧 Manual Setup (If Scripts Don't Work)

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
npm install
npm run dev
```

---

## 📞 Still Having Issues?

1. **Check Flask server is running:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status":"ok","service":"Emergency Severity Predictor Backend"}`

2. **Check Node.js version:**
   ```bash
   node --version  # Should be 18+
   ```

3. **Check Python version:**
   ```bash
   python --version  # Should be 3.8+
   ```

4. **Look at the error message carefully:**
   - "Failed to fetch" = Backend not running
   - "Cannot connect" = Ports wrong or firewall blocked
   - "Module error" = Missing Python package

---

## 🎉 Success!

Once everything is working, you'll see:
1. Clean UI with "Describe Your Symptoms" header
2. Can type symptoms in the textarea
3. "Predict Severity" button works
4. Results show with color (Red/Yellow/Green) and advice

That's it! The app is fully functional.

---

**Need help?** Check the main README.md for detailed information.
