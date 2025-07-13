
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote, Stethoscope } from 'lucide-react';

interface MedicalOpinion {
  id: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  city: string;
  opinion: string;
  mainCause: string;
  image: string;
  experience: number;
}

interface OpinionCardProps {
  opinion: MedicalOpinion;
}

const OpinionCard: React.FC<OpinionCardProps> = ({ opinion }) => {
  return (
    <div className="w-full flex-shrink-0 px-2">
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 h-80">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 h-full">
            {/* Photo et informations du médecin */}
            <div className="flex-shrink-0 text-center">
              <div className="relative inline-block mb-3">
                <img
                  src={opinion.image}
                  alt={opinion.doctorName}
                  className="w-20 h-20 rounded-full object-cover border-3 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-1">
                  <Stethoscope className="h-3 w-3" />
                </div>
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">
                {opinion.doctorName}
              </h3>
              <Badge variant="secondary" className="text-xs mb-1">
                {opinion.specialty}
              </Badge>
              <p className="text-xs text-muted-foreground mb-1">
                {opinion.hospital}
              </p>
              <p className="text-xs text-muted-foreground">
                {opinion.city}
              </p>
            </div>

            {/* Citation et avis */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-4">
                <Quote className="h-8 w-8 text-primary/20 absolute -top-1 -left-1" />
                <blockquote className="text-sm leading-relaxed text-foreground pl-6">
                  "{opinion.opinion}"
                </blockquote>
              </div>
              
              <div className="flex items-center justify-between">
                <Badge 
                  variant="outline" 
                  className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-700 text-xs"
                >
                  {opinion.mainCause}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {opinion.experience} ans d'expérience
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpinionCard;
