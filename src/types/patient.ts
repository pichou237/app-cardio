
export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Autre';
  address: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  bloodType?: string;
  height?: number; // en cm
  weight?: number; // en kg
  chronicConditions?: string[];
  previousSurgeries?: string;
  familyMedicalHistory?: string;
  smokingStatus: 'Non-fumeur' | 'Fumeur occasionnel' | 'Fumeur régulier' | 'Ex-fumeur';
  alcoholConsumption: 'Jamais' | 'Occasionnel' | 'Modéré' | 'Fréquent';
  exerciseFrequency: 'Sédentaire' | 'Léger' | 'Modéré' | 'Intense';
  registrationDate: string;
  lastUpdateDate: string;
  isActive: boolean;
}

export interface PatientMedicalProfile {
  patientId: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
    date: string;
  };
  heartRate?: {
    bpm: number;
    date: string;
  };
  cholesterol?: {
    total: number;
    hdl: number;
    ldl: number;
    triglycerides: number;
    date: string;
  };
  bloodSugar?: {
    glucose: number;
    hba1c?: number;
    date: string;
  };
  bmi?: {
    value: number;
    category: 'Sous-poids' | 'Normal' | 'Surpoids' | 'Obésité';
    date: string;
  };
}
