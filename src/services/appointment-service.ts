
import { Doctor, Appointment, NotificationTemplate } from "@/types/appointment";

// Données mockées des médecins partenaires camerounais
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Marie Ngo Bell",
    profession: "Cardiologue",
    medicalCenter: "Hôpital Central de Yaoundé",
    age: 45,
    yearsOfExperience: 18,
    availability: [
      { day: "Lundi", timeSlots: ["08:00", "09:00", "14:00", "15:00"], isAvailable: true },
      { day: "Mercredi", timeSlots: ["08:00", "10:00", "14:00", "16:00"], isAvailable: true },
      { day: "Vendredi", timeSlots: ["07:30", "08:30", "09:30", "10:30"], isAvailable: true }
    ],
    specialties: ["Cardiologie interventionnelle", "Échocardiographie"],
    email: "marie.ngobell@chu-yaounde.cm",
    phone: "+237 6 75 43 21 89",
    profileImage: undefined,
    licenseNumber: "ORD-CM-001-2005",
    graduationYear: 2005,
    university: "Université de Yaoundé I",
    certifications: ["Cardiologie interventionnelle", "Échocardiographie doppler"],
    languages: ["Français", "Anglais", "Ewondo"],
    status: 'active',
    contractType: 'permanent',
    joinDate: "2008-03-15",
    address: "Avenue Kennedy, Bastos",
    city: "Yaoundé",
    region: "Centre",
    country: "Cameroun",
    consultationFee: 25000,
    currency: "XAF",
    acceptsInsurance: true,
    totalPatients: 1250,
    totalAppointments: 3200,
    averageRating: 4.8,
    totalReviews: 142,
    maxAppointmentsPerDay: 12,
    appointmentDuration: 30,
    breakDuration: 15,
    createdAt: "2008-03-15T00:00:00Z",
    updatedAt: "2024-12-15T10:30:00Z",
    lastLoginAt: "2024-12-15T08:00:00Z"
  },
  {
    id: "2",
    name: "Dr. Paul Mbarga Essomba",
    profession: "Cardiologue",
    medicalCenter: "Hôpital Général de Douala",
    age: 52,
    yearsOfExperience: 25,
    availability: [
      { day: "Mardi", timeSlots: ["08:00", "09:00", "10:00", "15:00"], isAvailable: true },
      { day: "Jeudi", timeSlots: ["07:30", "08:30", "14:00", "15:00"], isAvailable: true },
      { day: "Samedi", timeSlots: ["08:00", "09:00", "10:00"], isAvailable: true }
    ],
    specialties: ["Cardiologie pédiatrique", "Insuffisance cardiaque"],
    email: "paul.mbarga@hgd-douala.cm",
    phone: "+237 6 94 56 78 12",
    profileImage: undefined,
    licenseNumber: "ORD-CM-002-1999",
    graduationYear: 1999,
    university: "Université de Douala",
    certifications: ["Cardiologie pédiatrique", "Insuffisance cardiaque avancée"],
    languages: ["Français", "Anglais", "Duala"],
    status: 'active',
    contractType: 'permanent',
    joinDate: "2002-09-10",
    address: "Boulevard de la Liberté, Akwa",
    city: "Douala",
    region: "Littoral",
    country: "Cameroun",
    consultationFee: 30000,
    currency: "XAF",
    acceptsInsurance: true,
    totalPatients: 1800,
    totalAppointments: 4500,
    averageRating: 4.9,
    totalReviews: 203,
    maxAppointmentsPerDay: 10,
    appointmentDuration: 45,
    breakDuration: 15,
    createdAt: "2002-09-10T00:00:00Z",
    updatedAt: "2024-12-15T09:15:00Z",
    lastLoginAt: "2024-12-14T17:30:00Z"
  },
  {
    id: "3",
    name: "Dr. Aminatou Fouda",
    profession: "Cardiologue",
    medicalCenter: "Clinique des Spécialités de Yaoundé",
    age: 38,
    yearsOfExperience: 12,
    availability: [
      { day: "Lundi", timeSlots: ["07:30", "08:30", "09:30", "16:00"], isAvailable: true },
      { day: "Mardi", timeSlots: ["14:00", "15:00", "16:00", "17:00"], isAvailable: true },
      { day: "Jeudi", timeSlots: ["08:00", "09:00", "10:00", "15:00"], isAvailable: true }
    ],
    specialties: ["Échocardiographie", "Cardiologie du sport"],
    email: "aminatou.fouda@clinique-specialites.cm",
    phone: "+237 6 82 35 67 94",
    profileImage: undefined,
    licenseNumber: "ORD-CM-003-2012",
    graduationYear: 2012,
    university: "Université de Yaoundé I",
    certifications: ["Échocardiographie 3D", "Cardiologie du sport"],
    languages: ["Français", "Anglais", "Haoussa"],
    status: 'active',
    contractType: 'permanent',
    joinDate: "2015-01-20",
    address: "Quartier Melen, Yaoundé",
    city: "Yaoundé",
    region: "Centre",
    country: "Cameroun",
    consultationFee: 22000,
    currency: "XAF",
    acceptsInsurance: true,
    totalPatients: 890,
    totalAppointments: 2100,
    averageRating: 4.7,
    totalReviews: 89,
    maxAppointmentsPerDay: 14,
    appointmentDuration: 25,
    breakDuration: 10,
    createdAt: "2015-01-20T00:00:00Z",
    updatedAt: "2024-12-15T11:00:00Z",
    lastLoginAt: "2024-12-15T07:45:00Z"
  },
  {
    id: "4",
    name: "Dr. Jean-Baptiste Owona",
    profession: "Cardiologue",
    medicalCenter: "Centre Médical d'Excellence de Bafoussam",
    age: 47,
    yearsOfExperience: 20,
    availability: [
      { day: "Mercredi", timeSlots: ["08:00", "09:00", "14:00", "15:00"], isAvailable: true },
      { day: "Vendredi", timeSlots: ["07:30", "08:30", "09:30", "16:00"], isAvailable: true },
      { day: "Samedi", timeSlots: ["08:00", "09:00", "10:00"], isAvailable: true }
    ],
    specialties: ["Électrophysiologie cardiaque", "Stimulation cardiaque"],
    email: "jb.owona@cme-bafoussam.cm",
    phone: "+237 6 77 89 43 56",
    profileImage: undefined,
    licenseNumber: "ORD-CM-004-2004",
    graduationYear: 2004,
    university: "Université de Dschang",
    certifications: ["Électrophysiologie interventionnelle", "Pacemaker et défibrillateurs"],
    languages: ["Français", "Anglais", "Bamiléké"],
    status: 'active',
    contractType: 'permanent',
    joinDate: "2007-06-15",
    address: "Avenue des Martyrs, Bafoussam",
    city: "Bafoussam",
    region: "Ouest",
    country: "Cameroun",
    consultationFee: 28000,
    currency: "XAF",
    acceptsInsurance: true,
    totalPatients: 1100,
    totalAppointments: 2800,
    averageRating: 4.6,
    totalReviews: 115,
    maxAppointmentsPerDay: 8,
    appointmentDuration: 40,
    breakDuration: 20,
    createdAt: "2007-06-15T00:00:00Z",
    updatedAt: "2024-12-15T10:15:00Z",
    lastLoginAt: "2024-12-15T08:30:00Z"
  },
  {
    id: "5",
    name: "Dr. Françoise Tchounke",
    profession: "Cardiologue",
    medicalCenter: "Hôpital de District de Garoua",
    age: 41,
    yearsOfExperience: 15,
    availability: [
      { day: "Lundi", timeSlots: ["08:00", "09:00", "15:00", "16:00"], isAvailable: true },
      { day: "Mercredi", timeSlots: ["07:30", "08:30", "14:30", "15:30"], isAvailable: true },
      { day: "Vendredi", timeSlots: ["08:00", "09:00", "10:00", "16:00"], isAvailable: true }
    ],
    specialties: ["Cardiologie préventive", "Hypertension artérielle"],
    email: "francoise.tchounke@hd-garoua.cm",
    phone: "+237 6 95 32 78 41",
    profileImage: undefined,
    licenseNumber: "ORD-CM-005-2009",
    graduationYear: 2009,
    university: "Université de Ngaoundéré",
    certifications: ["Hypertension artérielle", "Prévention cardiovasculaire"],
    languages: ["Français", "Anglais", "Fulfulde"],
    status: 'active',
    contractType: 'permanent',
    joinDate: "2012-08-01",
    address: "Quartier Plateau, Garoua",
    city: "Garoua",
    region: "Nord",
    country: "Cameroun",
    consultationFee: 20000,
    currency: "XAF",
    acceptsInsurance: true,
    totalPatients: 750,
    totalAppointments: 1900,
    averageRating: 4.5,
    totalReviews: 67,
    maxAppointmentsPerDay: 16,
    appointmentDuration: 20,
    breakDuration: 10,
    createdAt: "2012-08-01T00:00:00Z",
    updatedAt: "2024-12-15T09:45:00Z",
    lastLoginAt: "2024-12-15T07:20:00Z"
  }
];

// Templates de notifications
const notificationTemplates: Record<string, NotificationTemplate> = {
  confirmation: {
    subject: "Confirmation de votre rendez-vous CardioPredict",
    body: `Bonjour {patientName},

Votre rendez-vous avec {doctorName} a été confirmé pour le {date} à {time}.

Détails du rendez-vous :
- Médecin : {doctorName}
- Centre médical : {medicalCenter}
- Date : {date}
- Heure : {time}

Votre rapport de prédiction CardioPredict a été transmis au médecin pour analyse préalable.

En cas d'empêchement, merci de nous contacter au moins 24h à l'avance.

Cordialement,
L'équipe CardioPredict`,
    type: 'confirmation'
  },
  reminder: {
    subject: "Rappel - Rendez-vous CardioPredict demain",
    body: `Bonjour {patientName},

Nous vous rappelons votre rendez-vous prévu demain :

- Médecin : {doctorName}
- Centre médical : {medicalCenter}
- Date : {date}
- Heure : {time}

N'oubliez pas d'apporter :
- Votre carte d'identité
- Votre carte vitale
- Vos derniers examens cardiaques (si disponibles)

Votre rapport CardioPredict est déjà disponible pour le médecin.

À bientôt,
L'équipe CardioPredict`,
    type: 'reminder'
  },
  cancellation: {
    subject: "Annulation de votre rendez-vous CardioPredict",
    body: `Bonjour {patientName},

Nous vous informons que votre rendez-vous du {date} à {time} avec {doctorName} a été annulé.

Vous pouvez reprendre rendez-vous directement sur notre plateforme ou nous contacter.

Nous nous excusons pour ce désagrément.

Cordialement,
L'équipe CardioPredict`,
    type: 'cancellation'
  }
};

export const AppointmentService = {
  // Récupérer tous les médecins partenaires
  getDoctors: async (): Promise<Doctor[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockDoctors), 500);
    });
  },

  // Récupérer un médecin par ID
  getDoctorById: async (doctorId: string): Promise<Doctor | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const doctor = mockDoctors.find(d => d.id === doctorId);
        resolve(doctor || null);
      }, 300);
    });
  },

  // Prendre rendez-vous
  bookAppointment: async (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'status'>): Promise<Appointment> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointment: Appointment = {
          ...appointmentData,
          id: Date.now().toString(),
          status: 'pending',
          createdAt: new Date().toISOString()
        };
        
        // Sauvegarder en localStorage (simulation)
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        appointments.push(appointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        
        resolve(appointment);
      }, 800);
    });
  },

  // Récupérer les rendez-vous d'un patient
  getPatientAppointments: async (patientId: string): Promise<Appointment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const patientAppointments = appointments.filter((apt: Appointment) => apt.patientId === patientId);
        resolve(patientAppointments);
      }, 300);
    });
  },

  // Récupérer les rendez-vous d'un médecin
  getDoctorAppointments: async (doctorId: string): Promise<Appointment[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const doctorAppointments = appointments.filter((apt: Appointment) => apt.doctorId === doctorId);
        resolve(doctorAppointments);
      }, 300);
    });
  },

  // Confirmer un rendez-vous (médecin)
  confirmAppointment: async (appointmentId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const appointmentIndex = appointments.findIndex((apt: Appointment) => apt.id === appointmentId);
        if (appointmentIndex !== -1) {
          appointments[appointmentIndex].status = 'confirmed';
          localStorage.setItem('appointments', JSON.stringify(appointments));
        }
        resolve();
      }, 500);
    });
  },

  // Annuler un rendez-vous
  cancelAppointment: async (appointmentId: string): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
        const appointmentIndex = appointments.findIndex((apt: Appointment) => apt.id === appointmentId);
        if (appointmentIndex !== -1) {
          appointments[appointmentIndex].status = 'cancelled';
          localStorage.setItem('appointments', JSON.stringify(appointments));
        }
        resolve();
      }, 500);
    });
  },

  // Envoyer notification (simulation)
  sendNotification: async (type: 'confirmation' | 'reminder' | 'cancellation', appointment: Appointment, doctor: Doctor): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const template = notificationTemplates[type];
        console.log(`Notification envoyée - ${template.subject}`, {
          appointment,
          doctor,
          template
        });
        resolve();
      }, 300);
    });
  }
};
