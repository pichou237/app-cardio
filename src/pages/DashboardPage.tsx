import React, { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

import PredictionHistory from "@/features/prediction/components/PredictionHistory";

import StatisticsDashboard from "@/features/statistics/components/StatisticsDashboard";
import HistoryStats from "@/features/prediction/components/HistoryStats";
import HospitalsList from "@/features/hospitals/components/HospitalsList";
import PatientAppointments from "@/features/appointments/components/PatientAppointments";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { Calendar, UserCircle, BarChart3, Users, Building2,Heart } from "lucide-react";

const DashboardPage: React.FC = () => {
  const { role, isAuthenticated, isOfflineMode } = useCurrentUser();
  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Bienvenue sur votre tableau de bord CardioPredict</p>
            {isOfflineMode && (
              <div className="mt-2 p-2 bg-amber-50 border border-amber-300 rounded-md text-amber-800 text-sm">
                Mode hors ligne activé. Fonctionnalités limitées disponibles.
              </div>
            )}
          </div>
          
          {/* Actions rapides */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Nouvelle analyse</CardTitle>
                <CardDescription>Effectuez une nouvelle prédiction de risque cardiaque</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Remplissez le formulaire avec vos données médicales pour obtenir une analyse personnalisée.</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link to="/prediction">Commencer une analyse</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Historique</CardTitle>
                <CardDescription>Consultez vos analyses précédentes</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Visualisez et comparez vos analyses précédentes pour suivre votre état de santé.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/results">Voir l'historique</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Profil médical</CardTitle>
                <CardDescription>Gérez vos informations médicales</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Complétez votre profil médical pour des analyses plus précises.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/profile">Gérer mon profil</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Onglets des fonctionnalités */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={`grid w-full ${isAdmin || isDoctor ? 'grid-cols-5' : 'grid-cols-4'}`}>
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                Aperçu
              </TabsTrigger>
              <TabsTrigger value="hospitals" className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                Hôpitaux
              </TabsTrigger>
              <TabsTrigger value="appointments" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Rendez-vous
              </TabsTrigger>
              
              <TabsTrigger value="history" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Historique
                </TabsTrigger>

              {isDoctor && (
                <TabsTrigger value="doctor-space" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Espace médecin
                </TabsTrigger>
              )}
              {isAdmin && (
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  Admin
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="mt-6">
              {/* Statistiques section - Uniquement les stats globales pour l'admin */}
              {!isOfflineMode && isAdmin && <StatisticsDashboard />}
              
              {/* Historique et statistiques personnelles - Pour tous les utilisateurs */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Vos statistiques personnelles</h2>
                <HistoryStats />
              </div>
            </TabsContent>
            
            <TabsContent value="hospitals" className="mt-6">
              <HospitalsList />
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-6">
              <PatientAppointments />
            </TabsContent>

              <TabsContent value="history" className="mt-6">
                <PredictionHistory />
              </TabsContent>
            
            {isDoctor && (
              <TabsContent value="doctor-space" className="mt-6">
                <Card className="bg-blue-50 border-blue-200">
                  <CardHeader>
                    <CardTitle>Espace Médecin</CardTitle>
                    <CardDescription>Accédez à votre tableau de bord médecin complet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>En tant que médecin, vous pouvez accéder à vos rendez-vous, gérer vos patients et consulter les rapports de prédiction.</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" asChild>
                      <Link to="/doctor-dashboard">Tableau de bord médecin</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
            
            {isAdmin && (
              <TabsContent value="admin" className="mt-6">
                <Card className="bg-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle>Administration</CardTitle>
                    <CardDescription>Accédez au tableau de bord administrateur complet</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>En tant qu'administrateur, vous pouvez accéder aux statistiques détaillées et à la gestion des utilisateurs.</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/admin">Tableau de bord administrateur</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;
