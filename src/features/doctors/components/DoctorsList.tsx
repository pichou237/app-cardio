import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Doctor } from '@/types/appointment';
import { AppointmentService } from '@/services/appointment-service';
import BookingModal from './BookingModal';
import DoctorDetailsModal from './DoctorDetailsModal';
import DoctorCard from './DoctorCard';
import DoctorListItem from './DoctorListItem';
import DoctorsFilters from './DoctorsFilters';
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
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    loadDoctors();
  }, []);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm, selectedRegion, selectedCity, doctors]);

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
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.medicalCenter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        doctor.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par région
    if (selectedRegion) {
      const region = cameroonRegions.find(r => r.value === selectedRegion);
      if (region && region.cities) {
        filtered = filtered.filter(doctor => 
          region.cities.some(city => 
            doctor.city.toLowerCase().includes(city.toLowerCase())
          )
        );
      }
    }

    // Filtrage par ville
    if (selectedCity) {
      filtered = filtered.filter(doctor => 
        doctor.city.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
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

  const cameroonRegions = [
    { name: 'Toutes les régions', value: '' },
    { name: 'Centre', value: 'centre', cities: ['Yaoundé', 'Mbalmayo', 'Obala', 'Monatélé'] },
    { name: 'Littoral', value: 'littoral', cities: ['Douala', 'Edéa', 'Nkongsamba', 'Kribi'] },
    { name: 'Ouest', value: 'ouest', cities: ['Bafoussam', 'Dschang', 'Mbouda', 'Bandjoun'] },
    { name: 'Nord-Ouest', value: 'nord-ouest', cities: ['Bamenda', 'Kumbo', 'Wum', 'Ndop'] },
    { name: 'Sud-Ouest', value: 'sud-ouest', cities: ['Buea', 'Limbe', 'Kumba', 'Mamfe'] },
    { name: 'Sud', value: 'sud', cities: ['Ebolowa', 'Sangmélima', 'Ambam', 'Djoum'] },
    { name: 'Est', value: 'est', cities: ['Bertoua', 'Batouri', 'Yokadouma', 'Abong-Mbang'] },
    { name: 'Adamaoua', value: 'adamaoua', cities: ['Ngaoundéré', 'Tibati', 'Tignère', 'Banyo'] },
    { name: 'Nord', value: 'nord', cities: ['Garoua', 'Maroua', 'Guidiguis', 'Yagoua'] },
    { name: 'Extrême-Nord', value: 'extreme-nord', cities: ['Maroua', 'Mokolo', 'Kousséri', 'Yagoua'] }
  ];

  const getAvailableCities = () => {
    if (!selectedRegion) return [];
    const region = cameroonRegions.find(r => r.value === selectedRegion);
    return region?.cities || [];
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

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Médecins Partenaires</h2>
        <p className="text-muted-foreground">Consultez nos cardiologues partenaires et prenez rendez-vous</p>
      </div>

      <DoctorsFilters
        searchTerm={searchTerm}
        selectedRegion={selectedRegion}
        selectedCity={selectedCity}
        viewMode={viewMode}
        onSearchChange={setSearchTerm}
        onRegionChange={setSelectedRegion}
        onCityChange={setSelectedCity}
        onViewModeChange={setViewMode}
      />

      <div className="text-sm text-muted-foreground">
        {filteredDoctors.length} médecin(s) trouvé(s)
        {searchTerm && ` pour "${searchTerm}"`}
        {selectedRegion && ` dans la région ${cameroonRegions.find(r => r.value === selectedRegion)?.name}`}
        {selectedCity && ` à ${selectedCity}`}
      </div>

      {currentDoctors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun médecin trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentDoctors.map((doctor) => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {currentDoctors.map((doctor) => (
                <DoctorListItem 
                  key={doctor.id} 
                  doctor={doctor}
                  onBookAppointment={handleBookAppointment}
                  onViewDetails={handleViewDetails}
                />
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
