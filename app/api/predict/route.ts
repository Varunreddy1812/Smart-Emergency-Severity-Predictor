import { NextRequest, NextResponse } from 'next/server';

interface PredictionResult {
  severity_score: number;
  level: 'Low' | 'Medium' | 'High';
  advice: string;
  color: string;
  medication: string;
  medication_disclaimer: string;
  hospitals: string[];
  location?: string;
}

// City-based hospital mapping
const HOSPITAL_DATABASE: Record<string, string[]> = {
  guntur: [
    'Government General Hospital, Guntur',
    'Ramesh Hospitals, Guntur',
    'Dr. Pinnamaneni Siddhartha Institute of Medical Sciences',
  ],
  hyderabad: [
    'Apollo Hospitals, Hyderabad',
    'Yashoda Hospitals, Hyderabad',
    'CARE Hospital, Hyderabad',
    'Maxcure Hospitals, Hyderabad',
  ],
  bangalore: [
    'Apollo Hospitals, Bangalore',
    'Manipal Hospital, Bangalore',
    'St. Johns Medical College Hospital, Bangalore',
    'Fortis Hospital, Bangalore',
  ],
  delhi: [
    'All India Institute of Medical Sciences (AIIMS), Delhi',
    'Apollo Hospitals, Delhi',
    'Max Healthcare, Delhi',
    'Sir Ganga Ram Hospital, Delhi',
  ],
  mumbai: [
    'Lilavati Hospital, Mumbai',
    'Hinduja Hospital, Mumbai',
    'Breach Candy Hospital, Mumbai',
    'Apollo Hospitals, Mumbai',
  ],
  bangalore: [
    'Apollo Hospitals, Bangalore',
    'Manipal Hospital, Bangalore',
    'St. Johns Medical College Hospital, Bangalore',
  ],
  pune: [
    'Deenanath Mangeshkar Hospital, Pune',
    'Ruby Hall Clinic, Pune',
    'Inlaks & Budhrani Hospital, Pune',
  ],
  kolkata: [
    'AMRI Hospitals, Kolkata',
    'Peerless Hospital, Kolkata',
    'Fortis Hospital, Kolkata',
  ],
  chennai: [
    'Apollo Hospitals, Chennai',
    'Fortis Hospitals, Chennai',
    'Sri Ramakrishna Hospital, Chennai',
  ],
  jaipur: [
    'Max Hospital, Jaipur',
    'Fortis Escorts Hospital, Jaipur',
    'SMS Medical College, Jaipur',
  ],
};

function getHospitalsByLocation(
  location?: string,
  latitude?: number,
  longitude?: number
): string[] {
  // If city is provided, use city-based mapping
  if (location) {
    const cityKey = location.toLowerCase().trim();
    const hospitals = HOSPITAL_DATABASE[cityKey];
    if (hospitals) {
      return hospitals;
    }
    // If city not in database, return generic suggestions with city name
    return [
      `Government Hospital, ${location}`,
      `City Medical Center, ${location}`,
      `Private Clinic, ${location}`,
    ];
  }

  // If latitude/longitude provided, simulate nearby hospitals based on coords
  if (latitude !== undefined && longitude !== undefined) {
    // Simple mock: return hospitals based on coordinate proximity
    // In a real app, you'd use a geocoding API
    const mockHospitals = [
      `Nearby Hospital (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
      `Emergency Care Center (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
      `District Medical Hospital (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
    ];
    return mockHospitals;
  }

  // Default fallback
  return ['General Hospital', 'City Medical Center', 'Health Clinic'];
}

function predictSeverity(
  symptoms: string,
  location?: string,
  latitude?: number,
  longitude?: number
): PredictionResult {
  const symptomsLower = symptoms.toLowerCase();

  // Rule 1: Chest pain AND breathing difficulty = High severity
  if (
    (symptomsLower.includes('chest pain') || symptomsLower.includes('chest')) &&
    (symptomsLower.includes('breathing') ||
      symptomsLower.includes('breath') ||
      symptomsLower.includes('difficulty'))
  ) {
    return {
      severity_score: 9,
      level: 'High',
      advice: 'Call ambulance immediately. Do not delay - this could be a cardiac emergency.',
      color: 'red',
      medication: 'Aspirin (only if prescribed by doctor)',
      medication_disclaimer: 'Seek immediate medical attention. Do not self-medicate. Consult a doctor immediately.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Rule 2: Chest pain alone = High severity
  if (symptomsLower.includes('chest pain') || symptomsLower.includes('chest')) {
    return {
      severity_score: 8,
      level: 'High',
      advice: 'Seek emergency care immediately',
      color: 'red',
      medication: 'Aspirin (only if prescribed)',
      medication_disclaimer: 'Seek immediate medical attention. Do not self-medicate. Consult a doctor immediately.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Rule 3: Severe symptoms = High severity
  if (
    [
      'stroke',
      'loss of consciousness',
      'severe bleeding',
      'choking',
      'allergic reaction',
    ].some((word) => symptomsLower.includes(word))
  ) {
    return {
      severity_score: 9,
      level: 'High',
      advice: 'Call emergency services immediately',
      color: 'red',
      medication: 'Emergency treatment required',
      medication_disclaimer: 'Seek immediate medical attention. Do not delay. Call emergency services now.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Rule 4: Fever = Medium severity
  if (symptomsLower.includes('fever')) {
    return {
      severity_score: 5,
      level: 'Medium',
      advice: 'Consult a doctor. Monitor temperature regularly.',
      color: 'yellow',
      medication: 'Paracetamol or Ibuprofen',
      medication_disclaimer: 'Follow dosage instructions on packaging. Consult a pharmacist or doctor if symptoms persist.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Rule 5: Cut or injury = Low-Medium severity
  if (
    symptomsLower.includes('cut') ||
    symptomsLower.includes('injury') ||
    symptomsLower.includes('wound') ||
    symptomsLower.includes('bleed')
  ) {
    const isSevere = symptomsLower.includes('severe') || symptomsLower.includes('heavy');
    return {
      severity_score: isSevere ? 6 : 3,
      level: isSevere ? 'Medium' : 'Low',
      advice: 'Apply first aid. Clean and bandage the wound.',
      color: isSevere ? 'yellow' : 'green',
      medication: 'Antiseptic cream and sterile bandages',
      medication_disclaimer: 'Clean wound before applying. Consult a doctor if bleeding is heavy or wound is deep.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Rule 6: Mild symptoms = Low severity
  if (
    [
      'headache',
      'cold',
      'cough',
      'sore throat',
      'minor pain',
    ].some((word) => symptomsLower.includes(word))
  ) {
    return {
      severity_score: 2,
      level: 'Low',
      advice: 'Rest and monitor. Over-the-counter medication may help.',
      color: 'green',
      medication: 'Acetaminophen or throat lozenges',
      medication_disclaimer: 'Follow package directions. Consult a pharmacist if symptoms persist beyond 3 days.',
      hospitals: getHospitalsByLocation(location, latitude, longitude),
      location,
    };
  }

  // Default: Medium severity
  return {
    severity_score: 4,
    level: 'Medium',
    advice: 'Monitor your condition. Seek medical advice if symptoms persist.',
    color: 'yellow',
    medication: 'Consult a pharmacist for recommendation',
    medication_disclaimer: 'Do not self-medicate without professional advice. Visit a clinic or pharmacy for guidance.',
    hospitals: getHospitalsByLocation(location, latitude, longitude),
    location,
  };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data || !data.symptoms) {
      return NextResponse.json(
        { error: "Missing 'symptoms' field" },
        { status: 400 }
      );
    }

    const symptoms = data.symptoms.trim();

    if (!symptoms) {
      return NextResponse.json(
        { error: 'Symptoms cannot be empty' },
        { status: 400 }
      );
    }

    if (symptoms.length > 500) {
      return NextResponse.json(
        { error: 'Symptom description is too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Extract location data
    const location = data.location || data.city;
    const latitude = data.latitude ? parseFloat(data.latitude) : undefined;
    const longitude = data.longitude ? parseFloat(data.longitude) : undefined;

    const result = predictSeverity(symptoms, location, latitude, longitude);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('[ERROR] Prediction failed:', error);
    return NextResponse.json(
      { error: 'Server error: Failed to process prediction' },
      { status: 500 }
    );
  }
}
