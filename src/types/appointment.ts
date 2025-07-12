
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
  
  // Informations professionnelles détaillées
  licenseNumber: string; // Numéro d'ordre du médecin
  graduationYear: number;
  university: string;
  certifications: string[];
  languages: string[]; // Langues parlées
  
  // Informations administratives
  status: 'active' | 'inactive' | 'suspended';
  contractType: 'permanent' | 'consultant' | 'temporary';
  joinDate: string;
  
  // Informations de localisation
  address: string;
  city: string;
  region: string;
  country: string;
  
  // Informations financières
  consultationFee: number;
  currency: string;
  acceptsInsurance: boolean;
  
  // Statistiques
  totalPatients: number;
  totalAppointments: number;
  averageRating: number;
  totalReviews: number;
  
  // Paramètres de disponibilité
  maxAppointmentsPerDay: number;
  appointmentDuration: number; // en minutes
  breakDuration: number; // en minutes
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

export interface DoctorAvailability {
  day: string;
  timeSlots: string[];
  isAvailable: boolean;
  specialNotes?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show';
  predictionReport?: PredictionReport;
  notes?: string;
  createdAt: string;
  
  // Informations supplémentaires pour les rendez-vous
  appointmentType: 'consultation' | 'follow-up' | 'emergency' | 'screening';
  duration: number; // en minutes
  consultationFee: number;
  paymentStatus: 'pending' | 'paid' | 'cancelled' | 'refunded';
  
  // Données médicales du rendez-vous
  symptoms?: string[];
  vitalSigns?: {
    bloodPressure?: string;
    heartRate?: number;
    temperature?: number;
    weight?: number;
    height?: number;
  };
  
  // Communication
  reminderSent: boolean;
  confirmationSent: boolean;
  
  // Métadonnées
  updatedAt: string;
  cancelledAt?: string;
  cancelReason?: string;
  completedAt?: string;
}

export interface PredictionReport {
  id: string;
  patientId: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
  factors: string[];
  recommendations: string[];
  date: string;
  
  // Données détaillées de la prédiction
  algorithmVersion: string;
  inputData: {
    demographics: any;
    healthMetrics: any;
    cardiacDetails: any;
    symptoms: any;
    ecgResults: any;
  };
  
  // Analyse détaillée
  riskFactors: {
    modifiable: string[];
    nonModifiable: string[];
  };
  
  // Recommandations spécifiques
  urgencyLevel: 'immediate' | 'urgent' | 'routine' | 'monitoring';
  followUpRecommended: boolean;
  specialistReferral: boolean;
  
  // Métadonnées
  createdAt: string;
  reviewedBy?: string; // ID du médecin qui a revu le rapport
  reviewDate?: string;
  reviewNotes?: string;
}

export interface NotificationTemplate {
  subject: string;
  body: string;
  type: 'confirmation' | 'reminder' | 'cancellation' | 'follow-up';
}

// Types supplémentaires pour la gestion des médecins
export interface DoctorStats {
  totalAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
  averageRating: number;
  totalRevenue: number;
  monthlyStats: {
    month: string;
    appointments: number;
    revenue: number;
  }[];
}

export interface DoctorReview {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  verified: boolean;
}
