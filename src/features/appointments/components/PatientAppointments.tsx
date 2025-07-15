
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, FileText, X } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { Appointment, Doctor } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';
import HospitalAppointments from './HospitalAppointments';

const PatientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Record<string, Doctor>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const patientId = localStorage.getItem('username') || 'current-user';
      const appointmentsList = await AppointmentService.getPatientAppointments(patientId);
      setAppointments(appointmentsList);

      // Charger les informations des médecins
      const doctorsData: Record<string, Doctor> = {};
      for (const appointment of appointmentsList) {
        if (!doctorsData[appointment.doctorId]) {
          const doctor = await AppointmentService.getDoctorById(appointment.doctorId);
          if (doctor) {
            doctorsData[appointment.doctorId] = doctor;
          }
        }
      }
      setDoctors(doctorsData);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      toast.error('Erreur lors du chargement des rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir annuler ce rendez-vous ?')) {
      return;
    }

    try {
      await AppointmentService.cancelAppointment(appointmentId);
      toast.success('Rendez-vous annulé');
      loadAppointments();
    } catch (error) {
      console.error('Erreur lors de l\'annulation:', error);
      toast.error('Erreur lors de l\'annulation');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmé</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Terminé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement de vos rendez-vous...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Mes Rendez-vous</h2>
        <p className="text-muted-foreground">Consultez et gérez vos rendez-vous médicaux</p>
      </div>

      <Tabs defaultValue="doctors" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="doctors">Rendez-vous Médecins</TabsTrigger>
          <TabsTrigger value="hospitals">Rendez-vous Hôpitaux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="doctors" className="space-y-4">
          {appointments.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Aucun rendez-vous médecin</h3>
                <p className="text-muted-foreground">Vous n'avez pas encore de rendez-vous programmés avec nos médecins.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {appointments.map((appointment) => {
                const doctor = doctors[appointment.doctorId];
                return (
                  <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {doctor?.name || 'Médecin inconnu'}
                            </CardTitle>
                            <CardDescription>{doctor?.profession}</CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(appointment.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>
                            {format(new Date(appointment.date), 'EEEE dd MMMM yyyy', { locale: fr })}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm">
                          <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{appointment.time}</span>
                        </div>
                        
                        {doctor && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{doctor.medicalCenter}</span>
                          </div>
                        )}
                      </div>

                      {appointment.predictionReport && (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="font-medium text-sm">Rapport CardioPredict transmis</span>
                          </div>
                          <div className="text-sm">
                            <span>Risque: </span>
                            <span className={`font-medium ${getRiskLevelColor(appointment.predictionReport.riskLevel)}`}>
                              {appointment.predictionReport.riskLevel === 'low' && 'Faible'}
                              {appointment.predictionReport.riskLevel === 'medium' && 'Modéré'}
                              {appointment.predictionReport.riskLevel === 'high' && 'Élevé'}
                            </span>
                            <span> ({appointment.predictionReport.riskPercentage}%)</span>
                          </div>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="font-medium text-sm mb-1">Notes:</div>
                          <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                        </div>
                      )}

                      {appointment.status === 'pending' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Annuler le rendez-vous
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="hospitals" className="space-y-4">
          <HospitalAppointments />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientAppointments;
