
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Doctor, PredictionReport } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';
import { FileText, Calendar as CalendarIcon, Clock, AlertTriangle } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

interface PredictionHistory {
  id: string;
  date: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskPercentage: number;
  factors: string[];
  recommendations: string[];
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [predictionHistory, setPredictionHistory] = useState<PredictionHistory[]>([]);
  const [selectedPredictionId, setSelectedPredictionId] = useState<string>('');
  const [includePredictionReport, setIncludePredictionReport] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPredictionHistory();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      updateAvailableTimeSlots();
    }
  }, [selectedDate]);

  const loadPredictionHistory = () => {
    // Simulation - récupérer l'historique des prédictions
    const mockHistory: PredictionHistory[] = [
      {
        id: '1',
        date: '2024-12-15',
        riskLevel: 'medium',
        riskPercentage: 65,
        factors: ['Hypertension', 'Taux de cholestérol élevé', 'Sédentarité'],
        recommendations: ['Activité physique régulière', 'Régime pauvre en sel', 'Suivi médical']
      },
      {
        id: '2',
        date: '2024-11-20',
        riskLevel: 'high',
        riskPercentage: 78,
        factors: ['Hypertension sévère', 'Diabète type 2', 'Antécédents familiaux'],
        recommendations: ['Consultation cardiologique urgente', 'Ajustement médicamenteux', 'Surveillance rapprochée']
      },
      {
        id: '3',
        date: '2024-10-10',
        riskLevel: 'low',
        riskPercentage: 25,
        factors: ['Légère élévation du cholestérol'],
        recommendations: ['Maintenir une alimentation équilibrée', 'Exercice régulier']
      }
    ];
    
    setPredictionHistory(mockHistory);
    // Sélectionner automatiquement la prédiction la plus récente
    if (mockHistory.length > 0) {
      setSelectedPredictionId(mockHistory[0].id);
    }
  };

  const updateAvailableTimeSlots = () => {
    if (!selectedDate) return;

    const dayName = format(selectedDate, 'EEEE', { locale: fr });
    const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
    
    const availability = doctor.availability.find(
      avail => avail.day.toLowerCase() === dayNameCapitalized.toLowerCase()
    );
    
    setAvailableTimeSlots(availability?.timeSlots || []);
    setSelectedTime('');
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Veuillez sélectionner une date et une heure');
      return;
    }

    if (includePredictionReport && !selectedPredictionId) {
      toast.error('Veuillez sélectionner un rapport de prédiction');
      return;
    }

    setLoading(true);
    try {
      const patientId = localStorage.getItem('username') || 'current-user';
      
      let predictionReport: PredictionReport | undefined;
      
      if (includePredictionReport) {
        const selectedPrediction = predictionHistory.find(p => p.id === selectedPredictionId);
        if (selectedPrediction) {
          predictionReport = {
            id: selectedPrediction.id,
            patientId: patientId,
            riskLevel: selectedPrediction.riskLevel,
            riskPercentage: selectedPrediction.riskPercentage,
            factors: selectedPrediction.factors,
            recommendations: selectedPrediction.recommendations,
            date: selectedPrediction.date,
            algorithmVersion: "v2.1.0",
            inputData: {
              demographics: {},
              healthMetrics: {},
              cardiacDetails: {},
              symptoms: {},
              ecgResults: {}
            },
            riskFactors: {
              modifiable: selectedPrediction.factors,
              nonModifiable: []
            },
            urgencyLevel: selectedPrediction.riskLevel === 'high' ? 'urgent' : 
                         selectedPrediction.riskLevel === 'medium' ? 'routine' : 'monitoring',
            followUpRecommended: true,
            specialistReferral: selectedPrediction.riskLevel === 'high',
            createdAt: selectedPrediction.date,
            reviewedBy: undefined,
            reviewDate: undefined,
            reviewNotes: undefined
          };
        }
      }

      await AppointmentService.bookAppointment({
        patientId,
        doctorId: doctor.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        predictionReport,
        notes: notes.trim() || undefined,
        appointmentType: 'consultation',
        duration: doctor.appointmentDuration,
        consultationFee: doctor.consultationFee,
        paymentStatus: 'pending',
        reminderSent: false,
        confirmationSent: false,
        updatedAt: new Date().toISOString()
      });

      toast.success('Rendez-vous demandé avec succès! Vous recevrez une confirmation par email.');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la prise de rendez-vous:', error);
      toast.error('Erreur lors de la prise de rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelText = (level: string) => {
    switch (level) {
      case 'low': return 'Faible';
      case 'medium': return 'Modéré';
      case 'high': return 'Élevé';
      default: return 'Inconnu';
    }
  };

  const selectedPrediction = predictionHistory.find(p => p.id === selectedPredictionId);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Prendre rendez-vous avec {doctor.name}
          </DialogTitle>
          <DialogDescription>
            {doctor.profession} - {doctor.medicalCenter}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Sélection date/heure */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Sélectionner une date
              </h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  const dayName = format(date, 'EEEE', { locale: fr });
                  const dayNameCapitalized = dayName.charAt(0).toUpperCase() + dayName.slice(1);
                  const isAvailable = doctor.availability.some(
                    avail => avail.day.toLowerCase() === dayNameCapitalized.toLowerCase()
                  );
                  return date < new Date() || !isAvailable;
                }}
                className="rounded-md border"
              />
            </div>

            {selectedDate && availableTimeSlots.length > 0 && (
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Sélectionner une heure
                </h3>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir un créneau" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-3">Notes (optionnel)</h3>
              <Textarea
                placeholder="Décrivez vos symptômes ou questions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Colonne centrale - Sélection du rapport */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includePrediction"
                checked={includePredictionReport}
                onCheckedChange={(checked) => {
                  setIncludePredictionReport(checked === true);
                }}
              />
              <label htmlFor="includePrediction" className="font-medium">
                Inclure un rapport de prédiction
              </label>
            </div>

            {includePredictionReport && (
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Sélectionner un rapport
                </h3>
                <div className="space-y-2">
                  {predictionHistory.map((prediction) => (
                    <Card 
                      key={prediction.id} 
                      className={`cursor-pointer transition-colors ${
                        selectedPredictionId === prediction.id 
                          ? 'border-primary bg-primary/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedPredictionId(prediction.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">
                            {format(new Date(prediction.date), 'dd/MM/yyyy', { locale: fr })}
                          </span>
                          <Badge className={getRiskLevelColor(prediction.riskLevel)}>
                            {getRiskLevelText(prediction.riskLevel)}
                          </Badge>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          {prediction.riskPercentage}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {prediction.factors.slice(0, 2).join(', ')}
                          {prediction.factors.length > 2 && '...'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {predictionHistory.length === 0 && (
                  <div className="text-center py-4 text-muted-foreground">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                    <p>Aucun rapport de prédiction disponible</p>
                    <p className="text-sm">Effectuez d'abord une analyse CardioPredict</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Colonne droite - Aperçu du rapport sélectionné */}
          <div className="space-y-4">
            {includePredictionReport && selectedPrediction && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Rapport sélectionné
                  </CardTitle>
                  <CardDescription>
                    Ce rapport sera transmis au médecin avant votre rendez-vous
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Niveau de risque</span>
                      <Badge className={getRiskLevelColor(selectedPrediction.riskLevel)}>
                        {getRiskLevelText(selectedPrediction.riskLevel)}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {selectedPrediction.riskPercentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Analyse du {format(new Date(selectedPrediction.date), 'dd/MM/yyyy', { locale: fr })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Facteurs de risque identifiés</h4>
                    <div className="space-y-1">
                      {selectedPrediction.factors.map((factor, index) => (
                        <div key={index} className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded">
                          • {factor}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recommandations</h4>
                    <div className="space-y-1">
                      {selectedPrediction.recommendations.map((rec, index) => (
                        <div key={index} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!includePredictionReport && (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Aucun rapport ne sera transmis</p>
                  <p className="text-sm">Le médecin n'aura pas accès à vos données de prédiction</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            onClick={handleBooking} 
            disabled={!selectedDate || !selectedTime || loading}
          >
            {loading ? 'Demande en cours...' : 'Demander le rendez-vous'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
