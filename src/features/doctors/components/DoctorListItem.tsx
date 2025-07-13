
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, MapPin, Award, Star, Clock, Eye } from 'lucide-react';
import { Doctor } from '@/types/appointment';

interface DoctorListItemProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
  onViewDetails: (doctor: Doctor) => void;
}

const DoctorListItem: React.FC<DoctorListItemProps> = ({ 
  doctor, 
  onBookAppointment, 
  onViewDetails 
}) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                <Badge variant="secondary">{doctor.profession}</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                <span className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {doctor.medicalCenter}, {doctor.city}
                </span>
                <span className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  {doctor.yearsOfExperience} ans
                </span>
                <span className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  {doctor.averageRating}/5
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {doctor.specialties.slice(0, 3).map((specialty, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
                {doctor.specialties.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{doctor.specialties.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(doctor)}
              className="text-primary hover:text-primary/80"
            >
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button onClick={() => onBookAppointment(doctor)}>
              <Clock className="h-4 w-4 mr-2" />
              Rendez-vous
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorListItem;
