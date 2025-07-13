
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Award, Star, Clock, Eye } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  region: string;
  rating: number;
  reviews: number;
  availability: string;
  experience: number;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
  onViewDetails: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  onBookAppointment, 
  onViewDetails 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <CardDescription>{doctor.specialty}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(doctor)}
            className="text-primary hover:text-primary/80"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {doctor.hospital}, {doctor.city}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Award className="h-4 w-4 mr-2" />
            {doctor.experience} ans d'expérience
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-2" />
            {doctor.rating}/5 ({doctor.reviews} avis)
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            {doctor.availability}
          </div>
        </div>

        <div>
          <Badge variant="secondary" className="text-xs">
            {doctor.specialty}
          </Badge>
        </div>

        <Button 
          onClick={() => onBookAppointment(doctor)} 
          className="w-full"
        >
          <Clock className="h-4 w-4 mr-2" />
          Prendre rendez-vous
        </Button>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
