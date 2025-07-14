
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hospital, HospitalFilters } from '@/types/hospital';
import { HospitalService } from '@/services/hospital-service';
import { Building2, MapPin, Phone, Mail, Clock, Star, Search, Filter } from 'lucide-react';

const HospitalsList: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<HospitalFilters>({
    city: 'all',
    region: 'all',
    service: 'all',
    search: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterHospitals();
  }, [filters, hospitals]);

  const loadData = async () => {
    try {
      const [hospitalsList, regionsList, citiesList] = await Promise.all([
        HospitalService.getHospitals(),
        HospitalService.getRegions(),
        HospitalService.getCities()
      ]);
      
      setHospitals(hospitalsList);
      setFilteredHospitals(hospitalsList);
      setRegions(regionsList);
      setCities(citiesList);
    } catch (error) {
      console.error('Erreur lors du chargement des hôpitaux:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHospitals = () => {
    let filtered = hospitals;

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter(hospital => 
        hospital.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        hospital.city.toLowerCase().includes(filters.search.toLowerCase()) ||
        hospital.region.toLowerCase().includes(filters.search.toLowerCase()) ||
        hospital.services.some(service => 
          service.toLowerCase().includes(filters.search.toLowerCase())
        )
      );
    }

    // Filtre par région
    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(hospital => hospital.region === filters.region);
    }

    // Filtre par ville
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(hospital => hospital.city === filters.city);
    }

    // Filtre par service
    if (filters.service && filters.service !== 'all') {
      filtered = filtered.filter(hospital => 
        hospital.services.some(service => 
          service.toLowerCase().includes(filters.service.toLowerCase())
        )
      );
    }

    setFilteredHospitals(filtered);
  };

  const handleFilterChange = (key: keyof HospitalFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    
    // Reset city when region changes
    if (key === 'region') {
      setFilters(prev => ({ ...prev, city: 'all' }));
    }
  };

  const clearFilters = () => {
    setFilters({
      city: 'all',
      region: 'all',
      service: 'all',
      search: ''
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement des hôpitaux partenaires...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hôpitaux Partenaires</h2>
        <p className="text-muted-foreground">Consultez nos établissements de santé partenaires spécialisés en cardiologie</p>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres de recherche
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filters.region} onValueChange={(value) => handleFilterChange('region', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les régions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={filters.city} onValueChange={(value) => handleFilterChange('city', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner la ville" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les villes</SelectItem>
                {cities
                  .filter(city => !filters.region || filters.region === 'all' || hospitals.some(h => h.city === city && h.region === filters.region))
                  .map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Select value={filters.service} onValueChange={(value) => handleFilterChange('service', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les services</SelectItem>
                  <SelectItem value="cardiologie">Cardiologie</SelectItem>
                  <SelectItem value="urgences">Urgences</SelectItem>
                  <SelectItem value="chirurgie">Chirurgie cardiaque</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={clearFilters}>
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Résultats */}
      <div className="text-sm text-muted-foreground">
        {filteredHospitals.length} hôpital(s) trouvé(s)
      </div>

      {/* Liste des hôpitaux */}
      {filteredHospitals.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Aucun hôpital trouvé</h3>
            <p className="text-muted-foreground">
              Essayez de modifier vos critères de recherche
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{hospital.name}</CardTitle>
                    <CardDescription>{hospital.type}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {hospital.city}, {hospital.region}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2" />
                    {hospital.phone}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="h-4 w-4 mr-2" />
                    {hospital.averageRating}/5 ({hospital.totalReviews} avis)
                  </div>
                  
                  {hospital.emergencyServices && (
                    <div className="flex items-center text-sm text-green-600">
                      <Clock className="h-4 w-4 mr-2" />
                      Services d'urgence 24h/24
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2">Services disponibles</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.services.slice(0, 3).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                    {hospital.services.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{hospital.services.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Phone className="h-4 w-4 mr-2" />
                    Contacter
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    Itinéraire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalsList;
