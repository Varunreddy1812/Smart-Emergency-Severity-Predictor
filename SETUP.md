# 🚀 Quick Setup Guide

Follow these steps to get the Emergency Severity Predictor running locally.

## ⚡ 5-Minute Quick Start

### Step 1: Start the Backend (Terminal 1)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

Expected output:
```
🚨 Emergency Severity Predictor Backend
Server running at http://localhost:5000
CORS enabled for frontend connections
```

### Step 2: Start the Frontend (Terminal 2)

```bash
npm install
npm run dev
```

Expected output:
```
- Local:        http://localhost:3000
```

### Step 3: Open Browser

Visit: **http://localhost:3000**

### Step 4: Test

Enter symptoms: **"chest pain and breathing difficulty"**

You should see a **High** severity result.

---

## 📋 Detailed Setup Instructions

### For Windows Users

**Backend Setup:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

**Frontend Setup (new terminal):**
```bash
npm install
npm run dev
```

### For macOS/Linux Users

**Backend Setup:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**Frontend Setup (new terminal):**
```bash
npm install
npm run dev
```

---

## ✅ Verification Checklist

After starting both servers, verify:

- [ ] Backend running at `http://localhost:5000`
- [ ] Frontend running at `http://localhost:3000`
- [ ] Can see the Emergency Predictor UI
- [ ] Can enter symptoms
- [ ] Results display correctly

### Test API Directly

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": "fever"}'
```

Response should be:
```json
{
  "severity_score": 5,
  "level": "Medium",
  "advice": "Consult a doctor"
}
```

---

## 🧪 Example Test Cases

Try these symptoms to test all severity levels:

### High Severity (Red)
- `chest pain and breathing difficulty` → Score: 9
- `severe chest pain and difficulty breathing` → Score: 9

### Medium Severity (Yellow)
- `fever` → Score: 5
- `fever and headache` → Score: 5
- `dizziness and nausea` → Score: 4 (default)

### Low Severity (Green)
- `cut` → Score: 3
- `cut on arm` → Score: 3
- `injury` → Score: 3

---

## 🐛 Common Issues

### Issue: "Cannot find module 'flask'"
**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Issue: "Port 5000 already in use"
**Solution:** Kill the existing process or change port in `backend/app.py`

### Issue: "Cannot find module in frontend"
**Solution:**
```bash
npm install
```

### Issue: "Connection refused" when submitting form
**Solution:** Make sure backend Flask server is running:
```bash
cd backend
python app.py
```

---

## 🎯 Project Files

Key files you might want to customize:

- **`backend/app.py`** - Backend logic and prediction rules
- **`app/page.tsx`** - Main page
- **`components/EmergencyForm.tsx`** - Form UI
- **`components/ResultCard.tsx`** - Results display
- **`app/globals.css`** - Global styles

---

## 📝 Next Steps

After setup:

1. **Explore the code** - Read comments in each file
2. **Customize rules** - Edit prediction logic in `backend/app.py`
3. **Modify UI** - Change colors and styles in components
4. **Add features** - Integrate with real medical APIs
5. **Deploy** - Push to Vercel (frontend) and your preferred host (backend)

---

## 🆘 Need Help?

1. Check the main **README.md** for detailed documentation
2. Review error messages in the terminal
3. Verify both servers are running on correct ports
4. Check the troubleshooting section in README.md

---

**You're all set! Enjoy building! 🚀**
