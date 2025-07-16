
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, FileText, Check, X, Mail } from "lucide-react";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { toast } from 'sonner';
import { Appointment, Doctor } from "@/types/appointment";
import { AppointmentService } from "@/services/appointment-service";

const DoctorDashboardPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [doctorInfo] = useState<Doctor>({
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
    specialties: ["Cardiologie interventionnelle", "Électrophysiologie"],
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
  });

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const appointmentsList = await AppointmentService.getDoctorAppointments(doctorInfo.id);
      setAppointments(appointmentsList);
    } catch (error) {
      console.error('Erreur lors du chargement des rendez-vous:', error);
      toast.error('Erreur lors du chargement des rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAppointment = async (appointmentId: string) => {
    try {
      await AppointmentService.confirmAppointment(appointmentId);
      toast.success('Rendez-vous confirmé');
      loadAppointments();
    } catch (error) {
      console.error('Erreur lors de la confirmation:', error);
      toast.error('Erreur lors de la confirmation');
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

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const totalAppointments = appointments.length;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord - Médecin</h1>
            <p className="text-muted-foreground">Bienvenue Dr. {doctorInfo.name}</p>
          </div>
          
          {/* Statistiques */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Rendez-vous</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalAppointments}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">En attente</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{pendingAppointments.length}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Confirmés</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{confirmedAppointments.length}</div>
              </CardContent>
            </Card>
          </div>

          {/* Liste des rendez-vous */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Rendez-vous à traiter</h2>
              
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="text-lg">Chargement des rendez-vous...</div>
                </div>
              ) : appointments.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Aucun rendez-vous</h3>
                    <p className="text-muted-foreground">Vous n'avez pas de rendez-vous programmés.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {appointments.map((appointment) => (
                    <Card key={appointment.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">Patient #{appointment.patientId}</CardTitle>
                              <CardDescription>
                                Demande de rendez-vous
                              </CardDescription>
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
                        </div>

                        {appointment.predictionReport && (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-3">
                              <FileText className="h-4 w-4 mr-2" />
                              <span className="font-medium">Rapport CardioPredict</span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Niveau de risque:</span>
                                <span className={`font-medium ${getRiskLevelColor(appointment.predictionReport.riskLevel)}`}>
                                  {appointment.predictionReport.riskLevel === 'low' && 'Faible'}
                                  {appointment.predictionReport.riskLevel === 'medium' && 'Modéré'}
                                  {appointment.predictionReport.riskLevel === 'high' && 'Élevé'}
                                  ({appointment.predictionReport.riskPercentage}%)
                                </span>
                              </div>
                              
                              <div>
                                <div className="text-sm font-medium mb-1">Facteurs de risque:</div>
                                <div className="text-sm text-muted-foreground">
                                  {appointment.predictionReport.factors.join(', ')}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {appointment.notes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <div className="font-medium text-sm mb-1">Notes du patient:</div>
                            <div className="text-sm text-muted-foreground">{appointment.notes}</div>
                          </div>
                        )}

                        {appointment.status === 'pending' && (
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleConfirmAppointment(appointment.id)}
                              className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Confirmer
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Refuser
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboardPage;
