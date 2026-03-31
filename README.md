# 🚨 Smart Emergency Severity Predictor

A full-stack web application that helps users assess emergency severity based on their symptoms using AI-powered rule-based prediction.

## 📋 Overview

A modern web application that helps users assess emergency severity based on their symptoms using rule-based AI prediction. Built with Next.js and fully functional with a single npm command.

Users input symptoms and receive:
- **Severity Level**: Low, Medium, or High
- **Severity Score**: 1–10 scale
- **Recommended Action**: Specific advice based on symptoms
- **Instant Results**: No external dependencies required

## ✨ Features

- Clean, modern UI with dark mode support
- Real-time severity prediction
- Color-coded severity levels (Red for High, Yellow for Medium, Green for Low)
- Loading states and error handling
- Example symptoms for quick testing
- Responsive design
- Rule-based AI simulation backend
- **Location-based hospital recommendations**
  - Auto-detect user location via browser Geolocation API
  - Manual city/location input as fallback
  - Dynamic hospital suggestions based on user location
  - Supports major Indian cities (Guntur, Hyderabad, Bangalore, Mumbai, Delhi, etc.)
- CORS-enabled API

## 🛠️ Tech Stack

- **Next.js 14+** - React framework with built-in API routes
- **React 18+** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Optional**: Python Flask backend (for extended deployment scenarios)

## 📁 Project Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Main page
│   ├── globals.css             # Global styles
│   └── api/
│       └── predict/
│           └── route.ts        # API endpoint for predictions
├── components/
│   ├── Header.tsx              # Header component
│   ├── EmergencyForm.tsx        # Symptom input form
│   ├── LocationInput.tsx        # Location detection and input
│   ├── ResultCard.tsx          # Results display
│   └── Footer.tsx              # Footer component
├── hooks/
│   └── useLocation.ts          # Custom hook for geolocation
├── backend/                    # Optional Python Flask backend
│   ├── app.py                  # Flask application
│   └── requirements.txt        # Python dependencies
└── README.md                   # This file
```

## 🚀 Quick Start (1 minute)

### Simply run:
```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser and start predicting!

**That's it!** The app works fully with just one command. The prediction logic runs directly in Next.js API routes.

### Prerequisites

- **Node.js 18+**
- **npm** or **pnpm**

## 🧪 Testing

### Test the Application

1. Make sure both servers are running (Flask on 5000, Next.js on 3000)
2. Open the application in your browser
3. Try these example symptoms:
   - **"chest pain and breathing difficulty"** → High severity
   - **"fever and headache"** → Medium severity
   - **"cut on arm"** → Low severity
   - **"dizziness"** → Medium severity (default)

### API Endpoint Test

You can test the backend directly:

```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"symptoms": "chest pain and breathing difficulty"}'
```

Expected response:
```json
{
  "severity_score": 9,
  "level": "High",
  "advice": "Call ambulance immediately",
  "medication": "Aspirin (only if prescribed by doctor)",
  "medication_disclaimer": "Seek immediate medical attention. Do not self-medicate.",
  "hospitals": ["Emergency Cardiac Care Unit, Guntur", "Ramesh Hospitals, Guntur"],
  "location": "Guntur"
}
```

### With Location Data

You can pass location to get location-based hospital recommendations:

**Option 1: City name**
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "fever",
    "location": "Guntur"
  }'
```

**Option 2: Coordinates**
```bash
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "symptoms": "fever",
    "latitude": 16.3067,
    "longitude": 80.4365
  }'
```

## 🌍 Location-Based Recommendations

The app supports two methods to detect user location:

1. **Auto-Detection (Preferred)**
   - Uses browser Geolocation API
   - Requires user permission
   - Provides precise coordinates

2. **Manual Input (Fallback)**
   - User enters city/location name manually
   - Works without permission
   - Supported cities: Guntur, Hyderabad, Bangalore, Mumbai, Delhi, Chennai, Jaipur, Pune, Kolkata, etc.

Hospitals are dynamically recommended based on the detected location.

## 🤖 Prediction Rules

The backend uses the following rule-based logic:

| Condition | Severity | Score | Advice |
|-----------|----------|-------|--------|
| Chest pain AND breathing difficulty | High | 9 | Call ambulance immediately |
| Fever | Medium | 5 | Consult a doctor |
| Cut or injury | Low | 3 | Apply first aid |
| Other symptoms | Medium | 4 | Monitor condition |

## 🎨 UI Customization

### Color Scheme

The application uses Tailwind CSS with a clean design system:
- **Primary**: Blue (`bg-blue-600`)
- **Success**: Green (for Low severity)
- **Warning**: Yellow (for Medium severity)
- **Danger**: Red (for High severity)
- **Background**: Light gray to dark slate (responsive to dark mode)

### Modifying Styles

Edit component files in `/components/` to customize:
- `Header.tsx` - Header styling
- `EmergencyForm.tsx` - Form styling
- `ResultCard.tsx` - Results styling
- `globals.css` - Global styles

## 🔧 Configuration

### Backend Configuration

Edit `/backend/app.py` to modify:
- **Port**: Change `port=5000` in the `app.run()` call
- **Host**: Change `host='0.0.0.0'` to restrict access
- **Debug mode**: Change `debug=True` to `debug=False` for production

### Frontend Configuration

The frontend is configured to connect to `http://localhost:5000/predict` by default. To change the backend URL, edit the fetch call in `/app/page.tsx`:

```typescript
const response = await fetch('http://localhost:5000/predict', {
  // ...
});
```

## 📦 Dependencies

### Frontend
```json
{
  "react": "^18.0.0",
  "next": "^14.0.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.0.0"
}
```

### Backend
```
Flask==2.3.3
Flask-CORS==4.0.0
Werkzeug==2.3.7
```

## 🐛 Troubleshooting

### App not loading
- **Cause**: Port 3000 is already in use
- **Solution**: 
  ```bash
  # Kill the process using port 3000
  lsof -i :3000 (Mac/Linux)
  netstat -ano | findstr :3000 (Windows)
  
  # Then restart
  npm run dev
  ```

### Getting an error when clicking "Predict Severity"
- **Cause**: Usually a temporary issue
- **Solution**:
  1. Check browser console (F12) for error details
  2. Try refreshing the page (Ctrl+R or Cmd+R)
  3. Restart the dev server: Stop with Ctrl+C, then run `npm run dev` again

### Nothing happens after entering symptoms
- **Solution**: Make sure you clicked the "Predict Severity" button or pressed Enter
- The form requires non-empty symptoms to work

## 📝 Code Quality

The codebase follows best practices:
- **Frontend**: Functional components with hooks, TypeScript typing
- **Backend**: Type hints, error handling, CORS security
- **Comments**: Clear comments explaining logic
- **Structure**: Modular, maintainable architecture

## ⚖️ Disclaimer

This is an **educational simulation tool** for demonstration purposes only. It is NOT a substitute for professional medical advice. 

**For actual emergencies**, always call emergency services immediately:
- 🇺🇸 USA: 911
- 🇬🇧 UK: 999
- 🇦🇺 Australia: 000
- 🇪🇺 EU: 112

## 🚀 Deployment

### Deploy to Vercel (Frontend)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable:
   ```
   NEXT_PUBLIC_API_URL=<your-backend-url>
   ```
4. Update fetch URL in `app/page.tsx`

### Deploy Backend

Options:
- **Heroku**: `heroku create` and `git push heroku main`
- **Railway**: Connect GitHub repository
- **PythonAnywhere**: Upload files and configure
- **AWS/GCP/Azure**: Use their respective deployment tools

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 💡 Future Enhancements

- Integration with real medical AI models (TensorFlow, scikit-learn)
- User authentication and history tracking
- Multi-language support
- Mobile app version
- Real-time symptom severity scoring
- Integration with healthcare APIs

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Test with example symptoms first

---

**Created with ❤️ for emergency preparedness education**
