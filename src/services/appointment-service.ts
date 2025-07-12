
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
      { day: "Lundi", timeSlots: ["08:00", "09:00", "14:00", "15:00"] },
      { day: "Mercredi", timeSlots: ["08:00", "10:00", "14:00", "16:00"] },
      { day: "Vendredi", timeSlots: ["07:30", "08:30", "09:30", "10:30"] }
    ],
    specialties: ["Cardiologie interventionnelle", "Échocardiographie"],
    email: "marie.ngobell@chu-yaounde.cm",
    phone: "+237 6 75 43 21 89",
    profileImage: undefined
  },
  {
    id: "2",
    name: "Dr. Paul Mbarga Essomba",
    profession: "Cardiologue",
    medicalCenter: "Hôpital Général de Douala",
    age: 52,
    yearsOfExperience: 25,
    availability: [
      { day: "Mardi", timeSlots: ["08:00", "09:00", "10:00", "15:00"] },
      { day: "Jeudi", timeSlots: ["07:30", "08:30", "14:00", "15:00"] },
      { day: "Samedi", timeSlots: ["08:00", "09:00", "10:00"] }
    ],
    specialties: ["Cardiologie pédiatrique", "Insuffisance cardiaque"],
    email: "paul.mbarga@hgd-douala.cm",
    phone: "+237 6 94 56 78 12"
  },
  {
    id: "3",
    name: "Dr. Aminatou Fouda",
    profession: "Cardiologue",
    medicalCenter: "Clinique des Spécialités de Yaoundé",
    age: 38,
    yearsOfExperience: 12,
    availability: [
      { day: "Lundi", timeSlots: ["07:30", "08:30", "09:30", "16:00"] },
      { day: "Mardi", timeSlots: ["14:00", "15:00", "16:00", "17:00"] },
      { day: "Jeudi", timeSlots: ["08:00", "09:00", "10:00", "15:00"] }
    ],
    specialties: ["Échocardiographie", "Cardiologie du sport"],
    email: "aminatou.fouda@clinique-specialites.cm",
    phone: "+237 6 82 35 67 94"
  },
  {
    id: "4",
    name: "Dr. Jean-Baptiste Owona",
    profession: "Cardiologue",
    medicalCenter: "Centre Médical d'Excellence de Bafoussam",
    age: 47,
    yearsOfExperience: 20,
    availability: [
      { day: "Mercredi", timeSlots: ["08:00", "09:00", "14:00", "15:00"] },
      { day: "Vendredi", timeSlots: ["07:30", "08:30", "09:30", "16:00"] },
      { day: "Samedi", timeSlots: ["08:00", "09:00", "10:00"] }
    ],
    specialties: ["Électrophysiologie cardiaque", "Stimulation cardiaque"],
    email: "jb.owona@cme-bafoussam.cm",
    phone: "+237 6 77 89 43 56"
  },
  {
    id: "5",
    name: "Dr. Françoise Tchounke",
    profession: "Cardiologue",
    medicalCenter: "Hôpital de District de Garoua",
    age: 41,
    yearsOfExperience: 15,
    availability: [
      { day: "Lundi", timeSlots: ["08:00", "09:00", "15:00", "16:00"] },
      { day: "Mercredi", timeSlots: ["07:30", "08:30", "14:30", "15:30"] },
      { day: "Vendredi", timeSlots: ["08:00", "09:00", "10:00", "16:00"] }
    ],
    specialties: ["Cardiologie préventive", "Hypertension artérielle"],
    email: "francoise.tchounke@hd-garoua.cm",
    phone: "+237 6 95 32 78 41"
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
