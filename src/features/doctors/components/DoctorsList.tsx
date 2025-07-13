import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Star, Clock, Grid, List, ChevronLeft, ChevronRight } from "lucide-react";
import DoctorDetailsModal from './DoctorDetailsModal';
import BookingModal from './BookingModal';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  city: string;
  region: string;
  image: string;
  rating: number;
  reviews: number;
  availability: string;
  experience: number;
}

const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Marie Ngo Bell",
    specialty: "Cardiologue",
    hospital: "Hôpital Général de Douala",
    city: "Douala",
    region: "Littoral",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    rating: 4.8,
    reviews: 120,
    availability: "Lun-Ven, 8h-17h",
    experience: 15
  },
  {
    id: "2",
    name: "Dr. Paul Mbarga Essomba",
    specialty: "Cardiologue Interventionnel",
    hospital: "Centre Hospitalier d'Essos",
    city: "Yaoundé",
    region: "Centre",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    rating: 4.5,
    reviews: 95,
    availability: "Mar-Sam, 9h-16h",
    experience: 20
  },
  {
    id: "3",
    name: "Dr. Aminata Oumarou",
    specialty: "Médecin Interniste",
    hospital: "Hôpital Régional de Garoua",
    city: "Garoua",
    region: "Nord",
    image: "https://images.unsplash.com/photo-1594824278271-d0c4cce3c9c8?w=300&h=300&fit=crop&crop=face",
    rating: 4.2,
    reviews: 78,
    availability: "Lun-Mer, 10h-15h",
    experience: 12
  },
  {
    id: "4",
    name: "Dr. Sylvie Kamga",
    specialty: "Médecin généraliste",
    hospital: "Centre Médical de Bonamoussadi",
    city: "Douala",
    region: "Littoral",
    image: "https://images.unsplash.com/photo-1588335746339-99c98a926c03?w=300&h=300&fit=crop&crop=face",
    rating: 4.9,
    reviews: 150,
    availability: "Lun-Ven, 9h-18h",
    experience: 10
  },
  {
    id: "5",
    name: "Dr. Jean-Pierre Fotsing",
    specialty: "Cardiologue",
    hospital: "Polyclinique de l'Avenue Kennedy",
    city: "Yaoundé",
    region: "Centre",
    image: "https://images.unsplash.com/photo-1573497019940-1c2c2248f92f?w=300&h=300&fit=crop&crop=face",
    rating: 4.6,
    reviews: 110,
    availability: "Mar-Jeu, 8h-16h",
    experience: 18
  },
  {
    id: "6",
    name: "Dr. Aissatou Mbaye",
    specialty: "Médecin généraliste",
    hospital: "Centre de Santé Intégré de Maroua",
    city: "Maroua",
    region: "Extrême-Nord",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&crop=face",
    rating: 4.3,
    reviews: 85,
    availability: "Lun-Ven, 7h-14h",
    experience: 9
  },
  {
    id: "7",
    name: "Dr. Luc Owona",
    specialty: "Cardiologue interventionnel",
    hospital: "Hôpital Catholique de Bangangté",
    city: "Bangangté",
    region: "Ouest",
    image: "https://images.unsplash.com/photo-1589156280132-a593b11e6257?w=300&h=300&fit=crop&crop=face",
    rating: 4.7,
    reviews: 130,
    availability: "Mer-Ven, 10h-17h",
    experience: 14
  },
  {
    id: "8",
    name: "Dr. Estelle Nomo",
    specialty: "Interniste",
    hospital: "Clinique du Plateau",
    city: "Yaoundé",
    region: "Centre",
    image: "https://images.unsplash.com/photo-1628568913317-10907b35c01e?w=300&h=300&fit=crop&crop=face",
    rating: 4.4,
    reviews: 100,
    availability: "Lun-Sam, 9h-15h",
    experience: 11
  },
  {
    id: "9",
    name: "Dr. Idriss Yaya",
    specialty: "Médecin généraliste",
    hospital: "Centre de Santé de Kousseri",
    city: "Kousseri",
    region: "Extrême-Nord",
    image: "https://images.unsplash.com/photo-1598257054084-a84923923912?w=300&h=300&fit=crop&crop=face",
    rating: 4.1,
    reviews: 70,
    availability: "Lun-Jeu, 8h-13h",
    experience: 8
  }
];

const cameroonRegions = [
  {
    name: "Adamaoua",
    cities: ["Ngaoundéré", "Tibati", "Meiganga"]
  },
  {
    name: "Centre",
    cities: ["Yaoundé", "Bafia", "Mbalmayo"]
  },
  {
    name: "Est",
    cities: ["Bertoua", "Batouri", "Yokadouma"]
  },
  {
    name: "Extrême-Nord",
    cities: ["Maroua", "Kousseri", "Mora"]
  },
  {
    name: "Littoral",
    cities: ["Douala", "Edéa", "Nkongsamba"]
  },
  {
    name: "Nord",
    cities: ["Garoua", "Poli", "Touboro"]
  },
  {
    name: "Nord-Ouest",
    cities: ["Bamenda", "Wum", "Kumbo"]
  },
  {
    name: "Ouest",
    cities: ["Bafoussam", "Dschang", "Bangangté"]
  },
  {
    name: "Sud",
    cities: ["Ebolowa", "Kribi", "Sangmélima"]
  },
  {
    name: "Sud-Ouest",
    cities: ["Buéa", "Limbe", "Kumba"]
  }
];

const DoctorsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const doctorsPerPage = 6;

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion === "all" || doctor.region === selectedRegion;
      const matchesCity = selectedCity === "all" || doctor.city === selectedCity;
      const matchesSpecialty = selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
      
      return matchesSearch && matchesRegion && matchesCity && matchesSpecialty;
    });
  }, [searchTerm, selectedRegion, selectedCity, selectedSpecialty]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const startIndex = (currentPage - 1) * doctorsPerPage;
  const endIndex = startIndex + doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const handleBookAppointment = (doctor: Doctor) => {
    setBookingDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
  };

  const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <Avatar className="w-full h-48">
          <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
          <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute top-2 right-2">
          <Badge variant="secondary">
            <Star className="h-3 w-3 mr-1 inline-block" />
            {doctor.rating} ({doctor.reviews})
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold">{doctor.name}</CardTitle>
        <CardDescription className="text-gray-500">
          {doctor.specialty}
        </CardDescription>
        <div className="flex items-center mt-2 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          {doctor.hospital}, {doctor.city}
        </div>
        <div className="flex items-center mt-1 text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          {doctor.availability}
        </div>
      </CardContent>
      <div className="flex justify-between p-4 border-t border-gray-200">
        <Button variant="outline" size="sm" onClick={() => handleViewDetails(doctor)}>
          Voir Détails
        </Button>
        <Button size="sm" onClick={() => handleBookAppointment(doctor)}>
          Prendre RDV
        </Button>
      </div>
    </Card>
  );

  const DoctorListItem: React.FC<{ doctor: Doctor }> = ({ doctor }) => (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardContent className="grid grid-cols-3 gap-4 p-4">
        <div className="col-span-1">
          <Avatar className="w-24 h-24">
            <AvatarImage src={doctor.image} alt={doctor.name} className="object-cover" />
            <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="col-span-2">
          <CardTitle className="text-lg font-semibold">{doctor.name}</CardTitle>
          <CardDescription className="text-gray-500">
            {doctor.specialty} - {doctor.hospital}, {doctor.city}
          </CardDescription>
          <div className="flex items-center mt-2 text-gray-600">
            <Star className="h-4 w-4 mr-1" />
            {doctor.rating} ({doctor.reviews} avis)
          </div>
          <div className="flex items-center mt-1 text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            Disponibilité: {doctor.availability}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => handleViewDetails(doctor)}>
              Voir Détails
            </Button>
            <Button size="sm" onClick={() => handleBookAppointment(doctor)}>
              Prendre RDV
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Trouver un médecin</CardTitle>
          <CardDescription>
            Recherchez parmi {mockDoctors.length} médecins disponibles au Cameroun
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Input
              placeholder="Rechercher par nom, spécialité, hôpital..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            
            <Select value={selectedRegion} onValueChange={(value) => {
              setSelectedRegion(value);
              setSelectedCity("all");
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les régions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {cameroonRegions.map(region => (
                  <SelectItem key={region.name} value={region.name}>
                    {region.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={(value) => {
              setSelectedCity(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les villes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {selectedRegion !== "all" && 
                  cameroonRegions
                    .find(r => r.name === selectedRegion)
                    ?.cities.map(city => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))
                }
              </SelectContent>
            </Select>

            <Select value={selectedSpecialty} onValueChange={(value) => {
              setSelectedSpecialty(value);
              setCurrentPage(1);
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Toutes les spécialités" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les spécialités</SelectItem>
                <SelectItem value="Cardiologue">Cardiologue</SelectItem>
                <SelectItem value="Médecin généraliste">Médecin généraliste</SelectItem>
                <SelectItem value="Interniste">Interniste</SelectItem>
                <SelectItem value="Cardiologue interventionnel">Cardiologue interventionnel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredDoctors.length} médecin(s) trouvé(s)
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {currentDoctors.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Aucun médecin trouvé avec ces critères.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {viewMode === "grid" ? (
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
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Précédent
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-10"
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Suivant
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Modals */}
      {selectedDoctor && (
        <DoctorDetailsModal
          doctor={selectedDoctor}
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookAppointment={() => {
            setBookingDoctor(selectedDoctor);
            setSelectedDoctor(null);
            setShowBookingModal(true);
          }}
        />
      )}

      {bookingDoctor && (
        <BookingModal
          doctor={bookingDoctor}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setBookingDoctor(null);
          }}
        />
      )}
    </div>
  );
};

export default DoctorsList;
