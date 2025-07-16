import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Building2, Calendar, Clock, Phone, MapPin, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface HospitalAppointment {
  id: string;
  hospitalId: string;
  hospitalName: string;
  date: string;
  time: string;
  service: string;
  patientName: string;
  patientPhone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

const HospitalAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<HospitalAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = () => {
    try {
      const storedAppointments = localStorage.getItem('hospitalAppointments');
      if (storedAppointments) {
        const appointmentsList: HospitalAppointment[] = JSON.parse(storedAppointments);
        setAppointments(appointmentsList);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      toast.error('Erreur lors du chargement des rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      return;
    }

    try {
      const updatedAppointments = appointments.map(appointment =>
        appointment.id === appointmentId
          ? { ...appointment, status: 'cancelled' as const }
          : appointment
      );
      
      setAppointments(updatedAppointments);
      localStorage.setItem('hospitalAppointments', JSON.stringify(updatedAppointments));
      toast.success('Rendez-vous annulé');
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error('Erreur lors de l\'annulation');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Confirmé</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">En attente</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Annulé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-lg">Chargement de vos rendez-vous...</div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Aucun rendez-vous d'hôpital</h3>
          <p className="text-muted-foreground">Vous n'avez pas encore de rendez-vous programmés avec nos hôpitaux partenaires.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Rendez-vous Hôpitaux</h3>
        <p className="text-muted-foreground">Vos rendez-vous avec nos établissements partenaires</p>
      </div>

      {appointments.map((appointment) => (
        <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{appointment.hospitalName}</CardTitle>
                  <CardDescription>Service: {appointment.service}</CardDescription>
                </div>
              </div>
              {getStatusBadge(appointment.status)}
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="font-medium">
                    {format(new Date(appointment.date), 'EEEE dd MMMM yyyy', { locale: fr })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{appointment.patientPhone}</span>
              </div>
            </div>

            {appointment.notes && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <h4 className="font-medium text-blue-900 mb-1">Notes</h4>
                <div className="text-sm text-blue-800">{appointment.notes}</div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h4 className="font-medium text-gray-900 mb-2">Informations importantes</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Arrivez 15 minutes avant votre rendez-vous</li>
                <li>• Apportez votre carte d'identité et carte vitale</li>
                <li>• En cas d'empêchement, prévenez l'hôpital 24h à l'avance</li>
              </ul>
            </div>

            {appointment.status === 'pending' && (
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelAppointment(appointment.id)}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Annuler le rendez-vous
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HospitalAppointments;