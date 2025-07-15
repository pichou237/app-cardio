import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Shield, 
  Users, 
  Stethoscope,
  Car,
  Wifi,
  Coffee
} from 'lucide-react';
import { Hospital } from '@/types/hospital';

interface HospitalDetailsModalProps {
  hospital: Hospital;
  isOpen: boolean;
  onClose: () => void;
  onBookAppointment: () => void;
}

const HospitalDetailsModal: React.FC<HospitalDetailsModalProps> = ({
  hospital,
  isOpen,
  onClose,
  onBookAppointment
}) => {
  const facilities = [
    { icon: Car, label: 'Parking gratuit', available: true },
    { icon: Wifi, label: 'WiFi gratuit', available: true },
    { icon: Coffee, label: 'Cafétéria', available: true },
    { icon: Shield, label: 'Accès handicapés', available: true }
  ];

  const openingHours = [
    { day: 'Lundi - Vendredi', hours: '08:00 - 18:00' },
    { day: 'Samedi', hours: '09:00 - 16:00' },
    { day: 'Dimanche', hours: 'Fermé' },
    { day: 'Urgences', hours: '24h/24, 7j/7' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{hospital.name}</h2>
              <p className="text-muted-foreground">{hospital.type}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informations générales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Informations de contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{hospital.address}</p>
                      <p className="text-sm text-muted-foreground">{hospital.city}, {hospital.region}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <p>{hospital.phone}</p>
                  </div>
                  
                  {hospital.email && (
                    <div className="flex items-center gap-3">
                      <span className="h-5 w-5 text-muted-foreground">@</span>
                      <p>{hospital.email}</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Évaluation</h3>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium">{hospital.averageRating}/5</span>
                  <span className="text-muted-foreground">({hospital.totalReviews} avis)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Horaires d'ouverture</h3>
                <div className="space-y-2">
                  {openingHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-muted-foreground">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {hospital.emergencyServices && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <Clock className="h-5 w-5" />
                    <span className="font-medium">Services d'urgence 24h/24</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Services disponibles</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {hospital.services.map((service, index) => (
                <Badge key={index} variant="secondary" className="justify-center py-2">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  {service}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Équipements */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Équipements et services</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {facilities.map((facility, index) => {
                const Icon = facility.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <span className="text-sm">{facility.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Capacité */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{hospital.capacity || 100}</div>
              <div className="text-sm text-blue-700">Lits disponibles</div>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Stethoscope className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{hospital.services.length}</div>
              <div className="text-sm text-green-700">Services médicaux</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-purple-700">Disponibilité urgences</div>
            </div>
          </div>

          {/* Description */}
          {hospital.description && (
            <>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold mb-3">À propos</h3>
                <p className="text-muted-foreground leading-relaxed">{hospital.description}</p>
              </div>
            </>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Fermer
            </Button>
            <Button onClick={onBookAppointment} className="flex-1">
              <Stethoscope className="h-4 w-4 mr-2" />
              Prendre rendez-vous
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalDetailsModal;