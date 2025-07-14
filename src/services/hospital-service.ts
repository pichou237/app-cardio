
import { Hospital } from "@/types/hospital";

// Données mockées des hôpitaux camerounais
const mockHospitals: Hospital[] = [
  {
    id: "1",
    name: "Hôpital Central de Yaoundé",
    type: "Hôpital universitaire",
    medicalCenter: "CHU de Yaoundé",
    address: "Avenue Kennedy, Bastos",
    city: "Yaoundé",
    region: "Centre",
    country: "Cameroun",
    phone: "+237 222 23 40 20",
    email: "contact@chu-yaounde.cm",
    services: ["Cardiologie", "Urgences", "Chirurgie cardiaque", "Soins intensifs"],
    specialties: ["Cardiologie interventionnelle", "Échocardiographie", "Électrophysiologie"],
    status: 'active',
    licenseNumber: "HOP-CM-001-2000",
    totalPatients: 15000,
    averageRating: 4.7,
    totalReviews: 245,
    operatingHours: {
      "Lundi": { open: "06:00", close: "22:00", isOpen: true },
      "Mardi": { open: "06:00", close: "22:00", isOpen: true },
      "Mercredi": { open: "06:00", close: "22:00", isOpen: true },
      "Jeudi": { open: "06:00", close: "22:00", isOpen: true },
      "Vendredi": { open: "06:00", close: "22:00", isOpen: true },
      "Samedi": { open: "08:00", close: "18:00", isOpen: true },
      "Dimanche": { open: "08:00", close: "18:00", isOpen: true }
    },
    equipment: ["IRM", "Scanner", "Cathétérisme cardiaque", "Échocardiographe"],
    capacity: 350,
    description: "Hôpital universitaire de référence avec plateau technique de pointe pour les urgences cardiologiques.",
    emergencyServices: true,
    createdAt: "2000-01-15T00:00:00Z",
    updatedAt: "2024-12-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Hôpital Général de Douala",
    type: "Hôpital général",
    medicalCenter: "HGD",
    address: "Boulevard de la Liberté, Akwa",
    city: "Douala",
    region: "Littoral",
    country: "Cameroun",
    phone: "+237 233 42 34 56",
    email: "contact@hgd-douala.cm",
    services: ["Cardiologie", "Urgences", "Médecine interne", "Pédiatrie"],
    specialties: ["Cardiologie pédiatrique", "Insuffisance cardiaque", "Hypertension"],
    status: 'active',
    licenseNumber: "HOP-CM-002-1995",
    totalPatients: 12000,
    averageRating: 4.5,
    totalReviews: 189,
    operatingHours: {
      "Lundi": { open: "07:00", close: "20:00", isOpen: true },
      "Mardi": { open: "07:00", close: "20:00", isOpen: true },
      "Mercredi": { open: "07:00", close: "20:00", isOpen: true },
      "Jeudi": { open: "07:00", close: "20:00", isOpen: true },
      "Vendredi": { open: "07:00", close: "20:00", isOpen: true },
      "Samedi": { open: "08:00", close: "16:00", isOpen: true },
      "Dimanche": { open: "08:00", close: "16:00", isOpen: true }
    },
    equipment: ["Scanner", "Radiologie", "Laboratoire", "Échocardiographe"],
    capacity: 250,
    description: "Hôpital général moderne équipé pour les urgences cardiologiques et la cardiologie pédiatrique.",
    emergencyServices: true,
    createdAt: "1995-06-10T00:00:00Z",
    updatedAt: "2024-12-15T09:45:00Z"
  },
  {
    id: "3",
    name: "Clinique des Spécialités de Bafoussam",
    type: "Clinique privée",
    medicalCenter: "CSB",
    address: "Avenue des Martyrs",
    city: "Bafoussam",
    region: "Ouest",
    country: "Cameroun",
    phone: "+237 233 44 28 93",
    email: "contact@csb-bafoussam.cm",
    services: ["Cardiologie", "Consultation", "Imagerie médicale"],
    specialties: ["Échocardiographie", "Cardiologie du sport", "Prévention"],
    status: 'active',
    licenseNumber: "HOP-CM-003-2010",
    totalPatients: 5000,
    averageRating: 4.6,
    totalReviews: 87,
    operatingHours: {
      "Lundi": { open: "08:00", close: "18:00", isOpen: true },
      "Mardi": { open: "08:00", close: "18:00", isOpen: true },
      "Mercredi": { open: "08:00", close: "18:00", isOpen: true },
      "Jeudi": { open: "08:00", close: "18:00", isOpen: true },
      "Vendredi": { open: "08:00", close: "18:00", isOpen: true },
      "Samedi": { open: "08:00", close: "14:00", isOpen: true },
      "Dimanche": { open: "00:00", close: "00:00", isOpen: false }
    },
    equipment: ["Échocardiographe", "ECG", "Holter", "Test d'effort"],
    capacity: 80,
    description: "Clinique privée spécialisée en cardiologie avec équipement de diagnostic moderne.",
    emergencyServices: false,
    createdAt: "2010-03-20T00:00:00Z",
    updatedAt: "2024-12-15T11:20:00Z"
  },
  {
    id: "4",
    name: "Hôpital de District de Garoua",
    type: "Hôpital de district",
    medicalCenter: "HDG",
    address: "Quartier Plateau",
    city: "Garoua",
    region: "Nord",
    country: "Cameroun",
    phone: "+237 222 27 18 45",
    email: "contact@hd-garoua.cm",
    services: ["Médecine générale", "Cardiologie", "Urgences"],
    specialties: ["Hypertension artérielle", "Cardiologie préventive"],
    status: 'active',
    licenseNumber: "HOP-CM-004-2005",
    totalPatients: 8000,
    averageRating: 4.3,
    totalReviews: 134,
    operatingHours: {
      "Lundi": { open: "07:00", close: "19:00", isOpen: true },
      "Mardi": { open: "07:00", close: "19:00", isOpen: true },
      "Mercredi": { open: "07:00", close: "19:00", isOpen: true },
      "Jeudi": { open: "07:00", close: "19:00", isOpen: true },
      "Vendredi": { open: "07:00", close: "19:00", isOpen: true },
      "Samedi": { open: "08:00", close: "15:00", isOpen: true },
      "Dimanche": { open: "08:00", close: "15:00", isOpen: true }
    },
    equipment: ["ECG", "Radiologie", "Laboratoire"],
    capacity: 120,
    description: "Hôpital de district offrant des services de cardiologie préventive et de médecine générale.",
    emergencyServices: true,
    createdAt: "2005-08-15T00:00:00Z",
    updatedAt: "2024-12-15T08:30:00Z"
  },
  {
    id: "5",
    name: "Centre Médical d'Excellence de Bertoua",
    type: "Centre médical",
    medicalCenter: "CME Bertoua",
    address: "Quartier Commercial",
    city: "Bertoua",
    region: "Est",
    country: "Cameroun",
    phone: "+237 222 24 35 67",
    email: "contact@cme-bertoua.cm",
    services: ["Cardiologie", "Consultation", "Prévention"],
    specialties: ["Dépistage cardiovasculaire", "Éducation thérapeutique"],
    status: 'active',
    licenseNumber: "HOP-CM-005-2015",
    totalPatients: 3500,
    averageRating: 4.4,
    totalReviews: 56,
    operatingHours: {
      "Lundi": { open: "08:00", close: "17:00", isOpen: true },
      "Mardi": { open: "08:00", close: "17:00", isOpen: true },
      "Mercredi": { open: "08:00", close: "17:00", isOpen: true },
      "Jeudi": { open: "08:00", close: "17:00", isOpen: true },
      "Vendredi": { open: "08:00", close: "17:00", isOpen: true },
      "Samedi": { open: "08:00", close: "12:00", isOpen: true },
      "Dimanche": { open: "00:00", close: "00:00", isOpen: false }
    },
    equipment: ["ECG", "Tensiomètres", "Glucomètres"],
    capacity: 50,
    description: "Centre médical moderne spécialisé dans la prévention et le dépistage cardiovasculaire.",
    emergencyServices: false,
    createdAt: "2015-11-10T00:00:00Z",
    updatedAt: "2024-12-15T07:15:00Z"
  }
];

export const HospitalService = {
  // Récupérer tous les hôpitaux
  getHospitals: async (): Promise<Hospital[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockHospitals), 500);
    });
  },

  // Récupérer un hôpital par ID
  getHospitalById: async (hospitalId: string): Promise<Hospital | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const hospital = mockHospitals.find(h => h.id === hospitalId);
        resolve(hospital || null);
      }, 300);
    });
  },

  // Récupérer les régions disponibles
  getRegions: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const regions = [...new Set(mockHospitals.map(h => h.region))];
        resolve(regions);
      }, 200);
    });
  },

  // Récupérer les villes par région
  getCitiesByRegion: async (region: string): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cities = mockHospitals
          .filter(h => h.region === region)
          .map(h => h.city);
        resolve([...new Set(cities)]);
      }, 200);
    });
  },

  // Récupérer toutes les villes
  getCities: async (): Promise<string[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cities = [...new Set(mockHospitals.map(h => h.city))];
        resolve(cities);
      }, 200);
    });
  }
};
