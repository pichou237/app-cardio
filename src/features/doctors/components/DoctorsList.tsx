
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Phone, Mail, User, Award } from 'lucide-react';
import { Doctor } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';
import BookingModal from './BookingModal';

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const doctorsList = await AppointmentService.getDoctors();
      setDoctors(doctorsList);
    } catch (error) {
      console.error('Erreur lors du chargement des médecins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement des médecins partenaires...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Médecins Partenaires</h2>
        <p className="text-muted-foreground">Consultez nos cardiologues partenaires et prenez rendez-vous</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{doctor.name}</CardTitle>
                  <CardDescription>{doctor.profession}</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.medicalCenter}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Award className="h-4 w-4 mr-2" />
                  {doctor.yearsOfExperience} ans d'expérience
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-2" />
                  {doctor.phone}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2" />
                  {doctor.email}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Spécialités</h4>
                <div className="flex flex-wrap gap-1">
                  {doctor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Disponibilités
                </h4>
                <div className="space-y-1">
                  {doctor.availability.slice(0, 2).map((availability, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      <span className="font-medium">{availability.day}:</span> {availability.timeSlots.slice(0, 3).join(', ')}
                      {availability.timeSlots.length > 3 && '...'}
                    </div>
                  ))}
                  {doctor.availability.length > 2 && (
                    <div className="text-sm text-muted-foreground">
                      +{doctor.availability.length - 2} autres jours
                    </div>
                  )}
                </div>
              </div>

              <Button 
                onClick={() => handleBookAppointment(doctor)} 
                className="w-full"
              >
                <Clock className="h-4 w-4 mr-2" />
                Prendre rendez-vous
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedDoctor(null);
          }}
        />
      )}
    </div>
  );
};

export default DoctorsList;
