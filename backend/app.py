from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# Configure CORS to allow requests from the frontend
CORS(app, resources={
    r"/predict": {"origins": ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"]},
    r"/health": {"origins": "*"}
})

def predict_severity(symptoms):
    """
    Rule-based AI simulation for emergency severity prediction.
    Analyzes symptoms and returns severity level, score, and advice.
    """
    symptoms_lower = symptoms.lower()
    
    # Rule 1: Chest pain AND breathing difficulty = High severity
    if ("chest pain" in symptoms_lower or "chest" in symptoms_lower) and ("breathing" in symptoms_lower or "breath" in symptoms_lower or "difficulty" in symptoms_lower):
        return {
            "severity_score": 9,
            "level": "High",
            "advice": "Call ambulance immediately. Do not delay - this could be a cardiac emergency.",
            "color": "red"
        }
    
    # Rule 2: Chest pain alone = High severity
    if "chest pain" in symptoms_lower or "chest" in symptoms_lower:
        return {
            "severity_score": 8,
            "level": "High",
            "advice": "Seek emergency care immediately",
            "color": "red"
        }
    
    # Rule 3: Severe symptoms = High severity
    if any(word in symptoms_lower for word in ["stroke", "loss of consciousness", "severe bleeding", "choking", "allergic reaction"]):
        return {
            "severity_score": 9,
            "level": "High",
            "advice": "Call emergency services immediately",
            "color": "red"
        }
    
    # Rule 4: Fever = Medium severity
    if "fever" in symptoms_lower:
        return {
            "severity_score": 5,
            "level": "Medium",
            "advice": "Consult a doctor. Monitor temperature regularly.",
            "color": "yellow"
        }
    
    # Rule 5: Cut or injury = Low-Medium severity
    if "cut" in symptoms_lower or "injury" in symptoms_lower or "wound" in symptoms_lower or "bleed" in symptoms_lower:
        return {
            "severity_score": 4,
            "level": "Medium" if "severe" in symptoms_lower or "heavy" in symptoms_lower else "Low",
            "advice": "Apply first aid. Clean and bandage the wound.",
            "color": "yellow" if "severe" in symptoms_lower or "heavy" in symptoms_lower else "green"
        }
    
    # Rule 6: Mild symptoms = Low severity
    if any(word in symptoms_lower for word in ["headache", "cold", "cough", "sore throat", "minor pain"]):
        return {
            "severity_score": 2,
            "level": "Low",
            "advice": "Rest and monitor. Over-the-counter medication may help.",
            "color": "green"
        }
    
    # Default: Medium severity
    return {
        "severity_score": 4,
        "level": "Medium",
        "advice": "Monitor your condition. Seek medical advice if symptoms persist.",
        "color": "yellow"
    }

@app.route('/predict', methods=['POST', 'OPTIONS'])
def predict():
    """
    API endpoint for emergency severity prediction.
    Expects JSON: { "symptoms": "user symptoms description" }
    """
    if request.method == 'OPTIONS':
        return '', 200
    
    try:
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({"error": "Missing 'symptoms' field"}), 400
        
        symptoms = data['symptoms'].strip()
        
        if not symptoms:
            return jsonify({"error": "Symptoms cannot be empty"}), 400
        
        if len(symptoms) > 500:
            return jsonify({"error": "Symptom description is too long (max 500 characters)"}), 400
        
        result = predict_severity(symptoms)
        return jsonify(result), 200
    
    except Exception as e:
        print(f"[ERROR] Prediction failed: {str(e)}")
        return jsonify({"error": f"Server error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({"status": "ok", "service": "Emergency Severity Predictor Backend"}), 200

@app.before_request
def log_request():
    """Log incoming requests"""
    print(f"[{request.method}] {request.path}")
    if request.method == 'POST':
        print(f"Body: {request.get_json()}")

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({"error": "Endpoint not found. Available endpoints: /predict (POST), /health (GET)"}), 404

@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print("\n" + "="*60)
    print("🚨 Emergency Severity Predictor Backend")
    print("="*60)
    print(f"Server running at http://0.0.0.0:{port}")
    print(f"Available endpoints:")
    print(f"  - POST http://localhost:{port}/predict")
    print(f"  - GET  http://localhost:{port}/health")
    print(f"CORS enabled for localhost:3000 and localhost:5173")
    print("="*60 + "\n")
    app.run(debug=True, host='0.0.0.0', port=port, use_reloader=True)
