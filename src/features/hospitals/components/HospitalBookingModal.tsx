import React, { useState } from 'react';
import { format, addDays, startOfDay, isBefore } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, User, Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { Hospital } from '@/types/hospital';

interface HospitalBookingModalProps {
  hospital: Hospital;
  isOpen: boolean;
  onClose: () => void;
}

const HospitalBookingModal: React.FC<HospitalBookingModalProps> = ({
  hospital,
  isOpen,
  onClose
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Horaires disponibles (8h-18h)
  const availableTimes = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService || !patientName || !patientPhone) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setLoading(true);
    
    try {
      // Simuler l'envoi de la demande de rendez-vous
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stocker le rendez-vous dans le localStorage pour la démonstration
      const appointment = {
        id: Date.now().toString(),
        hospitalId: hospital.id,
        hospitalName: hospital.name,
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedTime,
        service: selectedService,
        patientName,
        patientPhone,
        notes,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const existingAppointments = JSON.parse(localStorage.getItem('hospitalAppointments') || '[]');
      existingAppointments.push(appointment);
      localStorage.setItem('hospitalAppointments', JSON.stringify(existingAppointments));

      toast.success('Demande de rendez-vous envoyée avec succès!');
      onClose();
      
      // Reset form
      setSelectedDate(undefined);
      setSelectedTime('');
      setSelectedService('');
      setPatientName('');
      setPatientPhone('');
      setNotes('');
    } catch (error) {
      console.error('Erreur lors de la prise de rendez-vous:', error);
      toast.error('Erreur lors de la prise de rendez-vous');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-primary" />
            Prendre rendez-vous à {hospital.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations du patient */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informations du patient</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Nom complet *</Label>
                <Input
                  id="patientName"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Votre nom complet"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patientPhone">Téléphone *</Label>
                <Input
                  id="patientPhone"
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="Votre numéro de téléphone"
                  required
                />
              </div>
            </div>
          </div>

          {/* Service */}
          <div className="space-y-2">
            <Label>Service demandé *</Label>
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un service" />
              </SelectTrigger>
              <SelectContent>
                {hospital.services.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label>Date du rendez-vous *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr })
                  ) : (
                    <span>Sélectionner une date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => 
                    isBefore(date, startOfDay(new Date())) || 
                    date.getDay() === 0 || // Dimanche
                    date.getDay() === 6    // Samedi
                  }
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Heure */}
          <div className="space-y-2">
            <Label>Heure du rendez-vous *</Label>
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une heure" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes ou demandes particulières</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Décrivez votre demande ou ajoutez des informations importantes..."
              rows={3}
            />
          </div>

          {/* Informations importantes */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Informations importantes</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Cette demande sera transmise à l'hôpital</li>
              <li>• Vous recevrez une confirmation par téléphone</li>
              <li>• En cas d'urgence, contactez directement l'hôpital</li>
              <li>• Annulation possible jusqu'à 24h avant le rendez-vous</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? 'Demande en cours...' : 'Demander le rendez-vous'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HospitalBookingModal;