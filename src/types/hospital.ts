
export interface Hospital {
  id: string;
  name: string;
  type: string; // Type d'hôpital (Centre hospitalier, Clinique, etc.)
  medicalCenter: string;
  address: string;
  city: string;
  region: string;
  country: string;
  phone: string;
  email: string;
  
  // Services disponibles
  services: string[];
  specialties: string[];
  
  // Informations administratives
  status: 'active' | 'inactive' | 'maintenance';
  licenseNumber: string;
  
  // Statistiques
  totalPatients: number;
  averageRating: number;
  totalReviews: number;
  
  // Horaires
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  
  // Équipements
  equipment: string[];
  capacity: number;
  description?: string;
  emergencyServices: boolean;
  
  // Métadonnées
  createdAt: string;
  updatedAt: string;
}

export interface HospitalFilters {
  city: string;
  region: string;
  service: string;
  search: string;
}
