import React, { useState ,useEffect} from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StatisticsDashboard from "@/features/statistics/components/StatisticsDashboard";
import { StatisticsService } from "@/services/statistics-service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3, Users, TrendingUp, Edit, Trash2, Plus, Stethoscope, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Doctor } from "@/types/appointment";
import { AppointmentService } from "@/services/appointment-service";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Données fictives pour les graphiques
const usersData = [
  { month: 'Jan', users: 65 },
  { month: 'Fév', users: 78 },
  { month: 'Mar', users: 90 },
  { month: 'Avr', users: 81 },
  { month: 'Mai', users: 156 },
  { month: 'Juin', users: 135 },
  { month: 'Juil', users: 188 },
  { month: 'Août', users: 195 },
];

const predictionData = [
  { month: 'Jan', predictions: 25 },
  { month: 'Fév', predictions: 35 },
  { month: 'Mar', predictions: 45 },
  { month: 'Avr', predictions: 40 },
  { month: 'Mai', predictions: 80 },
  { month: 'Juin', predictions: 65 },
  { month: 'Juil', predictions: 90 },
  { month: 'Août', predictions: 100 },
];

const riskDistributionData = [
  { name: "Risque faible", value: 230, color: "#22c55e" },
  { name: "Risque modéré", value: 130, color: "#eab308" },
  { name: "Risque élevé", value: 90, color: "#ef4444" },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

interface User {
  id: number;
  name: string;
  email: string;
  date: string;
  role: "admin" | "user";
}

interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_activity: string;
  role: "admin" | "user";
}

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F' | 'Autre';
  address: string;
  emergencyContact: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  registrationDate: string;
}

// Mock User Data
const initialUsersData: User[] = [
  { id: 1, name: "Sophie Martin", email: "sophie.martin@exemple.com", date: "10/05/2025", role: "user" },
  { id: 2, name: "Thomas Bernard", email: "thomas.bernard@exemple.com", date: "09/05/2025", role: "user" },
  { id: 3, name: "Camille Dubois", email: "camille.dubois@exemple.com", date: "08/05/2025", role: "user" },
  { id: 4, name: "Lucas Petit", email: "lucas.petit@exemple.com", date: "07/05/2025", role: "user" },
  { id: 5, name: "Emma Leroy", email: "emma.leroy@exemple.com", date: "06/05/2025", role: "user" },
  { id: 6, name: "Admin", email: "admin@admin.com", date: "01/01/2025", role: "admin" }
];

// Mock prediction data
interface Prediction {
  id: number;
  userId: number;
  userName: string;
  date: string;
  risk: "Faible" | "Modéré" | "Élevé";
}

const initialPredictionsData: Prediction[] = [
  { id: 1, userId: 1, userName: "Sophie Martin", date: "10/05/2025", risk: "Faible" },
  { id: 2, userId: 2, userName: "Thomas Bernard", date: "09/05/2025", risk: "Modéré" },
  { id: 3, userId: 3, userName: "Camille Dubois", date: "08/05/2025", risk: "Élevé" },
  { id: 4, userId: 4, userName: "Lucas Petit", date: "07/05/2025", risk: "Faible" },
  { id: 5, userId: 5, userName: "Emma Leroy", date: "06/05/2025", risk: "Modéré" }
];

// Mock patients data
const initialPatientsData: Patient[] = [
  {
    id: 1,
    name: "Sophie Martin",
    email: "sophie.martin@exemple.com",
    phone: "+33 6 12 34 56 78",
    dateOfBirth: "1985-03-15",
    gender: 'F',
    address: "123 Rue de la Paix, 75001 Paris",
    emergencyContact: "+33 6 98 76 54 32",
    medicalHistory: "Hypertension, Diabète type 2",
    allergies: "Pénicilline",
    currentMedications: "Lisinopril, Metformine",
    registrationDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Thomas Bernard",
    email: "thomas.bernard@exemple.com",
    phone: "+33 6 23 45 67 89",
    dateOfBirth: "1978-07-22",
    gender: 'M',
    address: "456 Avenue des Champs, 69001 Lyon",
    emergencyContact: "+33 6 87 65 43 21",
    medicalHistory: "Arythmie cardiaque",
    allergies: "Aucune connue",
    currentMedications: "Bisoprolol",
    registrationDate: "2024-02-10"
  }
];

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsersData);
  const [predictions, setPredictions] = useState<Prediction[]>(initialPredictionsData);
  const [patients, setPatients] = useState<Patient[]>(initialPatientsData);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDoctorDialogOpen, setIsDoctorDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentDoctor, setCurrentDoctor] = useState<Doctor | null>(null);
  const [userFormData, setUserFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "user"
  });
  const [doctorFormData, setDoctorFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "Cardiologue",
    medicalCenter: "",
    yearsOfExperience: 0,
    specialties: ""
  });
  const [usersAll, setUsersAll] = useState<ApiUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await StatisticsService.getAllUsers();
        setUsersAll(Array.isArray(fetchedUsers) ? fetchedUsers : []);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        setUsersAll([]);
      }
    };

    const fetchDoctors = async () => {
      try {
        const fetchedDoctors = await AppointmentService.getDoctors();
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Erreur lors de la récupération des médecins:", error);
      }
    };

    fetchUsers();
    fetchDoctors();
  }, []);

  // Fonction pour convertir ApiUser vers User
  const convertApiUserToUser = (apiUser: ApiUser): User => {
    return {
      id: apiUser.id,
      name: apiUser.username,
      email: apiUser.email,
      date: apiUser.first_activity,
      role: apiUser.role
    };
  };

  // Filtrage et pagination des médecins
  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.medicalCenter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
  const paginatedDoctors = filteredDoctors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle doctor form input change
  const handleDoctorFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDoctorFormData({ 
      ...doctorFormData, 
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value 
    });
  };

  // Open dialog for adding a new doctor
  const handleAddDoctor = () => {
    setCurrentDoctor(null);
    setDoctorFormData({
      name: "",
      email: "",
      phone: "",
      profession: "Cardiologue",
      medicalCenter: "",
      yearsOfExperience: 0,
      specialties: ""
    });
    setIsDoctorDialogOpen(true);
  };

  // Open dialog for editing an existing doctor
  const handleEditDoctor = (doctor: Doctor) => {
    setCurrentDoctor(doctor);
    setDoctorFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      profession: doctor.profession,
      medicalCenter: doctor.medicalCenter,
      yearsOfExperience: doctor.yearsOfExperience,
      specialties: doctor.specialties.join(', ')
    });
    setIsDoctorDialogOpen(true);
  };

  // Save doctor (create or update)
  const handleSaveDoctor = () => {
    if (!doctorFormData.name || !doctorFormData.email || !doctorFormData.phone) {
      toast.error("Tous les champs obligatoires doivent être remplis");
      return;
    }

    const doctorData = {
      ...doctorFormData,
      id: currentDoctor?.id || Date.now().toString(),
      age: 40, // Default value
      availability: currentDoctor?.availability || [],
      specialties: doctorFormData.specialties.split(',').map(s => s.trim()).filter(s => s)
    };

    if (currentDoctor) {
      // Update existing doctor
      const updatedDoctors = doctors.map(doctor => 
        doctor.id === currentDoctor.id ? { ...doctor, ...doctorData } : doctor
      );
      setDoctors(updatedDoctors);
      toast.success("Médecin mis à jour avec succès");
    } else {
      // Create new doctor
      setDoctors([...doctors, doctorData as Doctor]);
      toast.success("Médecin créé avec succès");
    }
    
    setIsDoctorDialogOpen(false);
  };

  // Handle user form input change
  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Open dialog for creating a new user
  const handleAddUser = () => {
    setCurrentUser(null);
    setUserFormData({ name: "", email: "", role: "user" });
    setIsUserDialogOpen(true);
  };

  // Open dialog for editing an existing user
  const handleEditUser = (apiUser: ApiUser) => {
    const user = convertApiUserToUser(apiUser);
    setCurrentUser(user);
    setUserFormData({
      name: user.name,
      email: user.email,
      role: user.role
    });
    setIsUserDialogOpen(true);
  };

  // Open dialog for deleting a user
  const handleDeleteUserConfirm = (apiUser: ApiUser) => {
    const user = convertApiUserToUser(apiUser);
    setCurrentUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Save user (create or update)
  const handleSaveUser = () => {
    if (!userFormData.name || !userFormData.email) {
      toast.error("Tous les champs sont obligatoires");
      return;
    }

    if (currentUser) {
      // Update existing user
      const updatedUsers = users.map(user => 
        user.id === currentUser.id ? { 
          ...user, 
          name: userFormData.name,
          email: userFormData.email,
          role: userFormData.role
        } : user
      );
      setUsers(updatedUsers);
      toast.success("Utilisateur mis à jour avec succès");
    } else {
      // Create new user
      const newUser: User = {
        id: Math.max(0, ...users.map(u => u.id)) + 1,
        name: userFormData.name,
        email: userFormData.email,
        date: new Date().toLocaleDateString('fr-FR'),
        role: userFormData.role
      };
      setUsers([...users, newUser]);
      toast.success("Utilisateur créé avec succès");
    }
    
    setIsUserDialogOpen(false);
  };

  // Delete user
  const handleDeleteUser = () => {
    if (!currentUser) return;
    
    // Prevent deleting the main admin account
    if (currentUser.email === "admin@admin.com") {
      toast.error("Vous ne pouvez pas supprimer le compte administrateur principal");
      setIsDeleteDialogOpen(false);
      return;
    }
    
    // Filter out the user to delete
    setUsers(users.filter(user => user.id !== currentUser.id));
    // Also remove any predictions associated with this user
    setPredictions(predictions.filter(pred => pred.userId !== currentUser.id));
    
    toast.success("Utilisateur supprimé avec succès");
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
            <p className="text-muted-foreground">Bienvenue sur le tableau de bord d'administration</p>
          </div>
          
          {/* statisque personnalise */}
          <div className="grid mb-5">
              <StatisticsDashboard />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usersAll.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+12%</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Médecins</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{doctors.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+2</span> ce mois-ci
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{patients.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+5</span> cette semaine
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Prédictions totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{predictions.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+8%</span> depuis le mois dernier
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Prédictions aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-emerald-500">+3</span> par rapport à hier
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="stats">
            <TabsList className="grid w-full grid-cols-5 mb-6 md:w-auto md:inline-flex">
              <TabsTrigger value="stats">
                <BarChart3 className="mr-2 h-4 w-4" />
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="users">
                <Users className="mr-2 h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="doctors">
                <Stethoscope className="mr-2 h-4 w-4" />
                Médecins
              </TabsTrigger>
              <TabsTrigger value="patients">
                <UserCheck className="mr-2 h-4 w-4" />
                Patients
              </TabsTrigger>
              <TabsTrigger value="predictions">
                <TrendingUp className="mr-2 h-4 w-4" />
                Prédictions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nouveaux utilisateurs</CardTitle>
                    <CardDescription>Évolution mensuelle des inscriptions</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          users: { color: "#7E69AB" },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={usersData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Legend />
                            <Bar dataKey="users" name="Utilisateurs" fill="var(--color-users)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Prédictions effectuées</CardTitle>
                    <CardDescription>Évolution mensuelle des analyses</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          predictions: { color: "#1EAEDB" },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={predictionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip
                              content={<ChartTooltipContent />}
                            />
                            <Legend />
                            <Bar dataKey="predictions" name="Prédictions" fill="var(--color-predictions)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Distribution des risques</CardTitle>
                    <CardDescription>Répartition des niveaux de risque détectés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {riskDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} personnes`, null]} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Liste des utilisateurs enregistrés</CardDescription>
                  </div>
                  <Button onClick={handleAddUser} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                        <TableHead>Rôle</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersAll.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.id}</TableCell>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.first_activity}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role === 'admin' ? 'Admin' : 'Utilisateur'}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeleteUserConfirm(user)}
                                disabled={user.email === 'admin@admin.com'}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des utilisateurs inscrits sur la plateforme.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="doctors" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Gestion des médecins</CardTitle>
                    <CardDescription>Liste des médecins partenaires</CardDescription>
                  </div>
                  <Button onClick={handleAddDoctor} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Ajouter
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <Input
                      placeholder="Rechercher un médecin..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Centre médical</TableHead>
                        <TableHead>Expérience</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedDoctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell className="font-medium">{doctor.name}</TableCell>
                          <TableCell>{doctor.email}</TableCell>
                          <TableCell>{doctor.phone}</TableCell>
                          <TableCell>{doctor.medicalCenter}</TableCell>
                          <TableCell>{doctor.yearsOfExperience} ans</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleEditDoctor(doctor)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des médecins partenaires de la plateforme.</TableCaption>
                  </Table>

                  {totalPages > 1 && (
                    <Pagination className="mt-4">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => setCurrentPage(page)}
                              isActive={page === currentPage}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des patients</CardTitle>
                  <CardDescription>Liste des patients enregistrés</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nom</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Téléphone</TableHead>
                        <TableHead>Date de naissance</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>Date d'inscription</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell className="font-medium">{patient.name}</TableCell>
                          <TableCell>{patient.email}</TableCell>
                          <TableCell>{patient.phone}</TableCell>
                          <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString('fr-FR')}</TableCell>
                          <TableCell>{patient.gender}</TableCell>
                          <TableCell>{new Date(patient.registrationDate).toLocaleDateString('fr-FR')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des patients enregistrés sur la plateforme.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="predictions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Prédictions récentes</CardTitle>
                  <CardDescription>Liste des dernières analyses effectuées</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Utilisateur</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Risque</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {predictions.map((prediction) => (
                        <TableRow key={prediction.id}>
                          <TableCell className="font-medium">{prediction.id}</TableCell>
                          <TableCell>{prediction.userName}</TableCell>
                          <TableCell>{prediction.date}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              prediction.risk === 'Faible'
                                ? 'bg-green-100 text-green-800'
                                : prediction.risk === 'Modéré'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}>
                              {prediction.risk}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableCaption>Liste des prédictions effectuées.</TableCaption>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />

      {/* User Dialog for Create/Edit */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentUser ? "Modifier l'utilisateur" : "Créer un utilisateur"}</DialogTitle>
            <DialogDescription>
              {currentUser 
                ? "Modifier les informations de l'utilisateur." 
                : "Ajouter un nouvel utilisateur à la plateforme."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                name="name"
                value={userFormData.name}
                onChange={handleUserFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={userFormData.email}
                onChange={handleUserFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Rôle
              </Label>
              <div className="col-span-3 flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="user-role"
                    name="role"
                    value="user"
                    checked={userFormData.role === "user"}
                    onChange={() => setUserFormData({ ...userFormData, role: "user" })}
                    className="mr-2"
                  />
                  <Label htmlFor="user-role">Utilisateur</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="admin-role"
                    name="role"
                    value="admin"
                    checked={userFormData.role === "admin"}
                    onChange={() => setUserFormData({ ...userFormData, role: "admin" })}
                    className="mr-2"
                  />
                  <Label htmlFor="admin-role">Admin</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleSaveUser}>
              {currentUser ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Doctor Dialog for Create/Edit */}
      <Dialog open={isDoctorDialogOpen} onOpenChange={setIsDoctorDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDoctor ? "Modifier le médecin" : "Créer un médecin"}</DialogTitle>
            <DialogDescription>
              {currentDoctor 
                ? "Modifier les informations du médecin." 
                : "Ajouter un nouveau médecin à la plateforme."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nom</Label>
              <Input
                id="name"
                name="name"
                value={doctorFormData.name}
                onChange={handleDoctorFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">Email</Label>
              <Input
                id="email"
                name="email"
                value={doctorFormData.email}
                onChange={handleDoctorFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                value={doctorFormData.phone}
                onChange={handleDoctorFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="medicalCenter" className="text-right">Centre médical</Label>
              <Input
                id="medicalCenter"
                name="medicalCenter"
                value={doctorFormData.medicalCenter}
                onChange={handleDoctorFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="yearsOfExperience" className="text-right">Expérience (années)</Label>
              <Input
                id="yearsOfExperience"
                name="yearsOfExperience"
                type="number"
                value={doctorFormData.yearsOfExperience}
                onChange={handleDoctorFormChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="specialties" className="text-right">Spécialités</Label>
              <Input
                id="specialties"
                name="specialties"
                value={doctorFormData.specialties}
                onChange={handleDoctorFormChange}
                placeholder="Séparées par des virgules"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDoctorDialogOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" onClick={handleSaveDoctor}>
              {currentDoctor ? "Mettre à jour" : "Créer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
