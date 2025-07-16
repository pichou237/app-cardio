
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, MapPin, Phone, Mail, User, Award, Search, Grid3X3, List, Eye, GraduationCap, Languages, Building2, CreditCard, Star } from 'lucide-react';
import { Doctor } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';
import BookingModal from './BookingModal';
import DoctorDetailsModal from './DoctorDetailsModal';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, doctors]);

  const loadDoctors = async () => {
    try {
      const doctorsList = await AppointmentService.getDoctors();
      setDoctors(doctorsList);
      setFilteredDoctors(doctorsList);
    } catch (error) {
      console.error('Erreur lors du chargement des médecins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDoctors = () => {
    if (!searchTerm) {
      setFilteredDoctors(doctors);
      setCurrentPage(1);
      return;
    }

    const filtered = doctors.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.medicalCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      doctor.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredDoctors(filtered);
    setCurrentPage(1);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsModal(true);
  };

  // Pagination
  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const generatePaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          items.push(i);
        }
        items.push('ellipsis');
        items.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        items.push(1);
        items.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          items.push(i);
        }
      } else {
        items.push(1);
        items.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          items.push(i);
        }
        items.push('ellipsis');
        items.push(totalPages);
      }
    }
    
    return items;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement des médecins partenaires...</div>
      </div>
    );
  }

  const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{doctor.name}</CardTitle>
            <CardDescription>{doctor.profession}</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewDetails(doctor)}
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
            {doctor.medicalCenter}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Award className="h-4 w-4 mr-2" />
            {doctor.yearsOfExperience} ans d'expérience
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Star className="h-4 w-4 mr-2" />
            {doctor.averageRating}/5 ({doctor.totalReviews} avis)
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Spécialités</h4>
          <div className="flex flex-wrap gap-1">
            {doctor.specialties.slice(0, 2).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {doctor.specialties.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{doctor.specialties.length - 2}
              </Badge>
            )}
          </div>
        </div>

        <Button 
          onClick={() => handleBookAppointment(doctor)} 
          className="w-full"
        >
          <Clock className="h-4 w-4 mr-2" />
          Prendre rendez-vous
        </Button>
      </CardContent>
    </Card>
  );

  const DoctorListItem = ({ doctor }: { doctor: Doctor }) => (
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
                  {doctor.medicalCenter}
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
              onClick={() => handleViewDetails(doctor)}
              className="text-primary hover:text-primary/80"
            >
              <Eye className="h-4 w-4 mr-1" />
              Détails
            </Button>
            <Button onClick={() => handleBookAppointment(doctor)}>
              <Clock className="h-4 w-4 mr-2" />
              Rendez-vous
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Médecins Partenaires</h2>
        <p className="text-muted-foreground">Consultez nos cardiologues partenaires et prenez rendez-vous</p>
      </div>

      {/* Barre de recherche et contrôles */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un médecin, spécialité, ville..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Résultats */}
      <div className="text-sm text-muted-foreground">
        {filteredDoctors.length} médecin(s) trouvé(s)
        {searchTerm && ` pour "${searchTerm}"`}
      </div>

      {/* Liste des médecins */}
      {currentDoctors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun médecin trouvé</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? "Essayez avec d'autres termes de recherche"
                : "Aucun médecin disponible pour le moment"
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentDoctors.map((doctor) => (
                <DoctorListItem key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
                
                {generatePaginationItems().map((item, index) => (
                  <PaginationItem key={index}>
                    {item === 'ellipsis' ? (
                      <PaginationEllipsis />
                    ) : (
                      <PaginationLink
                        onClick={() => setCurrentPage(item as number)}
                        isActive={currentPage === item}
                        className="cursor-pointer"
                      >
                        {item}
                      </PaginationLink>
                    )}
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}

      {/* Modales */}
      {showBookingModal && selectedDoctor && (
        <BookingModal
          doctor={selectedDoctor}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedDoctor(null);
          }}
        />
      )}

      {showDetailsModal && selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedDoctor(null);
          }}
          onBookAppointment={() => {
            setShowDetailsModal(false);
            setShowBookingModal(true);
          }}
        />
      )}
    </div>
  );
};

export default DoctorsList;
