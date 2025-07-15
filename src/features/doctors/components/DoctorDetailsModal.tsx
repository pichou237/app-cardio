
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  GraduationCap, 
  Languages, 
  Building2, 
  CreditCard, 
  Star, 
  Calendar,
  Clock,
  Users,
  Shield,
  Briefcase
} from 'lucide-react';
import { Doctor } from '@/types/appointment';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface DoctorDetailsModalProps {
  doctor: Doctor;
  onClose: () => void;
  onBookAppointment: () => void;
}

const DoctorDetailsModal: React.FC<DoctorDetailsModalProps> = ({
  doctor,
  onClose,
  onBookAppointment
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: doctor.currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactif</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspendu</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getContractTypeBadge = (type: string) => {
    switch (type) {
      case 'permanent':
        return <Badge variant="default">Permanent</Badge>;
      case 'consultant':
        return <Badge variant="outline">Consultant</Badge>;
      case 'temporary':
        return <Badge variant="secondary">Temporaire</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">{doctor.name}</span>
                {getStatusBadge(doctor.status)}
              </div>
              <p className="text-sm text-muted-foreground font-normal">
                {doctor.profession} • {doctor.medicalCenter}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informations générales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations Générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{doctor.yearsOfExperience}</strong> ans d'expérience
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm">
                  <strong>{doctor.age}</strong> ans
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{doctor.averageRating}/5</strong> ({doctor.totalReviews} avis)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{doctor.totalPatients}</strong> patients suivis
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  <strong>{doctor.totalAppointments}</strong> consultations réalisées
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{doctor.email}</span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <div>{doctor.address}</div>
                  <div>{doctor.city}, {doctor.region}</div>
                  <div>{doctor.country}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Formation & Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Université</p>
                <p className="text-sm text-muted-foreground">{doctor.university}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Diplômé en</p>
                <p className="text-sm text-muted-foreground">{doctor.graduationYear}</p>
              </div>

              <div>
                <p className="text-sm font-medium">Numéro d'ordre</p>
                <p className="text-sm text-muted-foreground">{doctor.licenseNumber}</p>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.certifications.map((cert, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spécialités & Langues */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Spécialités & Langues
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Spécialités</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Langues parlées</p>
                <div className="flex flex-wrap gap-1">
                  {doctor.languages.map((language, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations professionnelles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Informations Professionnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Statut</p>
                <div className="mt-1">{getStatusBadge(doctor.status)}</div>
              </div>
              
              <div>
                <p className="text-sm font-medium">Type de contrat</p>
                <div className="mt-1">{getContractTypeBadge(doctor.contractType)}</div>
              </div>

              <div>
                <p className="text-sm font-medium">Date d'entrée</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(doctor.joinDate), 'dd MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Consultation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Consultation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Tarif de consultation</p>
                <p className="text-lg font-semibold text-primary">
                  {formatCurrency(doctor.consultationFee)}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium">Assurance acceptée</p>
                <Badge variant={doctor.acceptsInsurance ? "default" : "secondary"}>
                  {doctor.acceptsInsurance ? "Oui" : "Non"}
                </Badge>
              </div>

              <div>
                <p className="text-sm font-medium">Durée moyenne</p>
                <p className="text-sm text-muted-foreground">
                  {doctor.appointmentDuration} minutes
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Consultations max/jour</p>
                <p className="text-sm text-muted-foreground">
                  {doctor.maxAppointmentsPerDay} rendez-vous
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Disponibilités */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Disponibilités
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {doctor.availability.map((availability, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="font-medium text-sm mb-2">{availability.day}</div>
                  {availability.isAvailable ? (
                    <div className="space-y-1">
                      {availability.timeSlots.map((slot, slotIndex) => (
                        <Badge key={slotIndex} variant="outline" className="text-xs mr-1">
                          {slot}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Non disponible
                    </Badge>
                  )}
                  {availability.specialNotes && (
                    <p className="text-xs text-muted-foreground mt-2">
                      {availability.specialNotes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button onClick={onBookAppointment}>
            <Calendar className="h-4 w-4 mr-2" />
            Prendre rendez-vous
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDetailsModal;
