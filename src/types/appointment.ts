
export interface Doctor {
  id: string;
  name: string;
  profession: string;
  medicalCenter: string;
  age: number;
  yearsOfExperience: number;
  availability: DoctorAvailability[];
  specialties: string[];
  email: string;
  phone: string;
  profileImage?: string;
}

export interface DoctorAvailability {
  day: string;
  timeSlots: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  predictionReport?: PredictionReport;
  notes?: string;
  createdAt: string;
}

export interface PredictionReport {
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
  factors: string[];
  recommendations: string[];
  date: string;
}

export interface NotificationTemplate {
  subject: string;
  body: string;
  type: 'confirmation' | 'reminder' | 'cancellation';
}
