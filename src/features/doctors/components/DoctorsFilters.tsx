
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Grid3X3, List } from 'lucide-react';

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

interface DoctorsFiltersProps {
  searchTerm: string;
  selectedRegion: string;
  selectedCity: string;
  viewMode: 'grid' | 'list';
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onCityChange: (value: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

const DoctorsFilters: React.FC<DoctorsFiltersProps> = ({
  searchTerm,
  selectedRegion,
  selectedCity,
  viewMode,
  onSearchChange,
  onRegionChange,
  onCityChange,
  onViewModeChange,
}) => {
  const getAvailableCities = () => {
    if (!selectedRegion) return [];
    const region = cameroonRegions.find(r => r.value === selectedRegion);
    return region?.cities || [];
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      {/* Recherche */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un médecin..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Filtre par région */}
      <Select value={selectedRegion} onValueChange={onRegionChange}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une région" />
        </SelectTrigger>
        <SelectContent>
          {cameroonRegions.map((region) => (
            <SelectItem key={region.value} value={region.value}>
              {region.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtre par ville */}
      <Select value={selectedCity} onValueChange={onCityChange} disabled={!selectedRegion}>
        <SelectTrigger>
          <SelectValue placeholder="Sélectionner une ville" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">Toutes les villes</SelectItem>
          {getAvailableCities().map((city) => (
            <SelectItem key={city} value={city.toLowerCase()}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Mode d'affichage */}
      <div className="flex items-center gap-2">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
        >
          <Grid3X3 className="h-4 w-4" />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewModeChange('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DoctorsFilters;
