
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, FileText, Brain, Stethoscope, CheckCircle, ArrowRight } from "lucide-react";

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      icon: <UserPlus className="h-12 w-12 text-blue-500" />,
      title: "1. Inscription",
      description: "Créez votre compte en quelques minutes avec vos informations de base.",
      details: "Inscription simple et sécurisée avec validation par email."
    },
    {
      icon: <FileText className="h-12 w-12 text-green-500" />,
      title: "2. Saisie des données",
      description: "Remplissez le questionnaire médical avec vos antécédents et symptômes actuels.",
      details: "Formulaire complet couvrant tous les facteurs de risque cardiovasculaires."
    },
    {
      icon: <Brain className="h-12 w-12 text-purple-500" />,
      title: "3. Analyse IA",
      description: "Notre intelligence artificielle analyse vos données pour calculer votre risque cardiaque.",
      details: "Algorithmes avancés basés sur les dernières recherches médicales."
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500" />,
      title: "4. Résultats",
      description: "Obtenez votre rapport détaillé avec recommandations personnalisées.",
      details: "Rapport complet avec visualisations et conseils adaptés à votre profil."
    },
    {
      icon: <Stethoscope className="h-12 w-12 text-red-500" />,
      title: "5. Consultation médicale",
      description: "Consultez un professionnel de santé pour une analyse approfondie.",
      details: "Prise de rendez-vous facilitée avec des cardiologues partenaires."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">Comment ça fonctionne</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez le processus simple et efficace pour évaluer vos risques cardiovasculaires 
              en 5 étapes avec CardioPredict.
            </p>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-24 w-0.5 h-16 bg-gray-300 hidden md:block transform -translate-x-1/2"></div>
                  )}
                  
                  <div className={`flex flex-col md:flex-row items-center gap-8 mb-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    <div className="flex-1">
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center md:text-left">
                          <div className="mx-auto md:mx-0 mb-4 w-fit">
                            {step.icon}
                          </div>
                          <CardTitle className="text-2xl">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-lg mb-4">{step.description}</p>
                          <p className="text-muted-foreground">{step.details}</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="hidden md:flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white font-bold text-2xl">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 hidden md:block">
                      {index % 2 === 0 && (
                        <div className="text-center">
                          <img 
                            src={`https://images.unsplash.com/photo-${
                              index === 0 ? '1516549655813-0de249288f58' :
                              index === 1 ? '1576091160399-112ba8d25d1d' :
                              index === 2 ? '1559757148-5c350d9d1b3b' :
                              index === 3 ? '1551601651-2a8555f1a136' :
                              '1582750433449-648ed127bb54'
                            }?q=80&w=400&auto=format&fit=crop`}
                            alt={step.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Notre Technologie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Machine Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Algorithmes d'apprentissage automatique entraînés sur des milliers de cas cliniques 
                    pour une précision maximale.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Validation Médicale</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Chaque prédiction est validée selon les standards médicaux internationaux 
                    et les recommandations cardiologiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Données Sécurisées</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Toutes vos données sont cryptées et protégées selon les normes 
                    de sécurité médicale les plus strictes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Prêt à commencer ?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui ont déjà pris le contrôle de leur santé cardiaque.
            </p>
            <a 
              href="/register" 
              className="inline-flex items-center bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Commencer maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
