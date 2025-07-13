
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatisticsDashboard from "@/features/statistics/components/StatisticsDashboard";
import { 
  Users, 
  UserCheck, 
  Stethoscope, 
  Calendar, 
  TrendingUp, 
  Shield,
  Settings,
  Database,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const AdminPage: React.FC = () => {
  const adminStats = {
    totalUsers: 1247,
    activeDoctors: 23,
    totalAppointments: 456,
    todayAppointments: 12,
    riskPredictions: 892,
    highRiskPatients: 45
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          {/* En-tête */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Tableau de bord administrateur</h1>
                <p className="text-muted-foreground">Gestion et supervision de la plateforme CardioPredict</p>
              </div>
            </div>
            
            {/* Indicateurs de statut */}
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <CheckCircle className="h-3 w-3 mr-1" />
                Système opérationnel
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Activity className="h-3 w-3 mr-1" />
                {adminStats.totalUsers} utilisateurs actifs
              </Badge>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs totaux</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% ce mois-ci</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Médecins actifs</CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.activeDoctors}</div>
                <p className="text-xs text-muted-foreground">+3 nouveaux ce mois</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rendez-vous</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.totalAppointments}</div>
                <p className="text-xs text-muted-foreground">{adminStats.todayAppointments} aujourd'hui</p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Prédictions</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{adminStats.riskPredictions}</div>
                <p className="text-xs text-muted-foreground">{adminStats.highRiskPatients} à risque élevé</p>
              </CardContent>
            </Card>
          </div>

          {/* Onglets de gestion */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Vue d'ensemble
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="doctors" className="flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Médecins
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Système
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Paramètres
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="space-y-6">
                {/* Alertes importantes */}
                <Card className="border-l-4 border-l-red-500 bg-red-50/50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <CardTitle className="text-red-800">Alertes importantes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">45 patients à risque élevé nécessitent un suivi</span>
                      <Button size="sm" variant="outline">Voir détails</Button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white rounded border">
                      <span className="text-sm">3 médecins en attente de validation</span>
                      <Button size="sm" variant="outline">Traiter</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistiques détaillées */}
                <StatisticsDashboard />
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Administrer les comptes patients</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Utilisateurs actifs</span>
                      <Badge>{adminStats.totalUsers}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Nouveaux cette semaine</span>
                      <Badge variant="secondary">47</Badge>
                    </div>
                    <Button className="w-full">Gérer les utilisateurs</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>Dernières actions des utilisateurs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Nouvelles prédictions</span>
                        <span className="text-muted-foreground">24 aujourd'hui</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendez-vous pris</span>
                        <span className="text-muted-foreground">12 aujourd'hui</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comptes créés</span>
                        <span className="text-muted-foreground">8 aujourd'hui</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Médecins partenaires</CardTitle>
                    <CardDescription>Gestion des comptes médecins</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>Médecins actifs</span>
                      <Badge>{adminStats.activeDoctors}</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
                      <span>En attente de validation</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <Button className="w-full">Gérer les médecins</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance médecins</CardTitle>
                    <CardDescription>Statistiques des consultations</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Consultations ce mois</span>
                        <span className="text-muted-foreground">234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Note moyenne</span>
                        <span className="text-muted-foreground">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taux de satisfaction</span>
                        <span className="text-muted-foreground">96%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="system" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>État du système</CardTitle>
                    <CardDescription>Monitoring en temps réel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Serveur</span>
                      <Badge className="bg-green-100 text-green-800">En ligne</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Base de données</span>
                      <Badge className="bg-green-100 text-green-800">Opérationnelle</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">IA de prédiction</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performances</CardTitle>
                    <CardDescription>Métriques système</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Temps de réponse</span>
                        <span className="text-muted-foreground">120ms</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Disponibilité</span>
                        <span className="text-muted-foreground">99.9%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Requêtes/min</span>
                        <span className="text-muted-foreground">1,234</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sauvegardes</CardTitle>
                    <CardDescription>État des données</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Dernière sauvegarde</span>
                        <span className="text-muted-foreground">2h ago</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Statut</span>
                        <Badge className="bg-green-100 text-green-800">Réussie</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">Nouvelle sauvegarde</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration générale</CardTitle>
                    <CardDescription>Paramètres de la plateforme</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" size="sm">Paramètres utilisateurs</Button>
                    <Button variant="outline" size="sm">Configuration IA</Button>
                    <Button variant="outline" size="sm">Notifications</Button>
                    <Button variant="outline" size="sm">Sécurité</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Logs et audit</CardTitle>
                    <CardDescription>Traçabilité des actions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" size="sm">Logs système</Button>
                    <Button variant="outline" size="sm">Audit utilisateurs</Button>
                    <Button variant="outline" size="sm">Historique admin</Button>
                    <Button variant="outline" size="sm">Rapports</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
