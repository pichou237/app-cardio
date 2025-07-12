
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Doctor, PredictionReport } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';

interface BookingModalProps {
  doctor: Doctor;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [predictionReport, setPredictionReport] = useState<PredictionReport | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger le dernier rapport de prédiction du patient
    loadLatestPredictionReport();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      updateAvailableTimeSlots();
    }
  }, [selectedDate]);

  const loadLatestPredictionReport = () => {
    // Simulation - récupérer le dernier rapport de prédiction
    const mockReport: PredictionReport = {
      riskLevel: 'medium',
      riskPercentage: 65,
      factors: ['Hypertension', 'Taux de cholestérol élevé', 'Sédentarité'],
      recommendations: ['Activité physique régulière', 'Régime pauvre en sel', 'Suivi médical'],
      date: new Date().toISOString()
    };
    setPredictionReport(mockReport);
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

    setLoading(true);
    try {
      const patientId = localStorage.getItem('username') || 'current-user';
      
      await AppointmentService.bookAppointment({
        patientId,
        doctorId: doctor.id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        predictionReport,
        notes: notes.trim() || undefined
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

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Prendre rendez-vous avec {doctor.name}</DialogTitle>
          <DialogDescription>
            {doctor.profession} - {doctor.medicalCenter}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Colonne gauche - Sélection date/heure */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Sélectionner une date</h3>
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
                <h3 className="font-medium mb-3">Sélectionner une heure</h3>
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

          {/* Colonne droite - Rapport de prédiction */}
          <div className="space-y-4">
            {predictionReport && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Votre rapport CardioPredict</CardTitle>
                  <CardDescription>
                    Ce rapport sera transmis au médecin avant votre rendez-vous
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Niveau de risque</span>
                      <Badge className={getRiskLevelColor(predictionReport.riskLevel)}>
                        {predictionReport.riskLevel === 'low' && 'Faible'}
                        {predictionReport.riskLevel === 'medium' && 'Modéré'}
                        {predictionReport.riskLevel === 'high' && 'Élevé'}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {predictionReport.riskPercentage}%
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Facteurs de risque identifiés</h4>
                    <div className="space-y-1">
                      {predictionReport.factors.map((factor, index) => (
                        <div key={index} className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded">
                          • {factor}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Recommandations</h4>
                    <div className="space-y-1">
                      {predictionReport.recommendations.map((rec, index) => (
                        <div key={index} className="text-sm bg-blue-50 text-blue-700 px-2 py-1 rounded">
                          • {rec}
                        </div>
                      ))}
                    </div>
                  </div>
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
