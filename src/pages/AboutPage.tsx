
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Award, Target } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-primary mb-6">À propos de CardioPredict</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Notre mission est de révolutionner la prévention des maladies cardiaques grâce à l'intelligence artificielle, 
                en rendant les prédictions de santé accessibles à tous.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
                  <CardTitle>Santé d'abord</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    La santé de nos utilisateurs est notre priorité absolue dans tout ce que nous développons.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <CardTitle>Accessibilité</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Rendre les outils de prédiction médicale accessibles à tous, partout dans le monde.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Award className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <CardTitle>Excellence</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Nous nous engageons à fournir des prédictions de la plus haute qualité et précision.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <Target className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Utiliser les dernières avancées en IA pour améliorer continuellement nos services.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-center text-muted-foreground mb-8">
                Notre équipe multidisciplinaire combine expertise médicale, intelligence artificielle et développement technologique 
                pour créer des solutions innovantes en santé préventive.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DR</span>
                  </div>
                  <h3 className="font-semibold">Équipe Médicale</h3>
                  <p className="text-muted-foreground">Cardiologues et médecins spécialisés</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">AI</span>
                  </div>
                  <h3 className="font-semibold">Experts IA</h3>
                  <p className="text-muted-foreground">Ingénieurs en machine learning</p>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">DEV</span>
                  </div>
                  <h3 className="font-semibold">Développeurs</h3>
                  <p className="text-muted-foreground">Experts en développement web et mobile</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
