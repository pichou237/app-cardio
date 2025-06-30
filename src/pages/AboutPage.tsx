
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, GraduationCap, Building2, Award, Heart, Code, Shield } from "lucide-react";

const AboutPage: React.FC = () => {
  const teamLeaders = [
    {
      name: "Chouboue Stephanie",
      role: "Chef de Projet",
      image: "https://media.istockphoto.com/id/2195083051/photo/beautiful-young-woman-relaxing-at-home-and-using-her-smartphone.jpg?s=1024x1024&w=is&k=20&c=eX7TcWznQe2wa5iF4QZbKOaeb9xsnnPub8MLQm6mTSE=",
      description: "Supervision générale du projet et coordination des équipes pluridisciplinaires"
    },
    {
      name: "Banemb Stephane", 
      role: "Adjoint & Développeur Principal",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Architecture technique et développement de l'application CardioPredict"
    }
  ];

  const departments = [
    {
      name: "Licence Génie Logiciel",
      icon: <Code className="h-8 w-8" />,
      members: 3,
      color: "bg-blue-500",
      description: "Développement d'applications web modernes, architecture logicielle et conception de systèmes informatiques robustes"
    },
    {
      name: "Licence Génie Réseau et Télécom",
      icon: <Building2 className="h-8 w-8" />,
      members: 1,
      color: "bg-green-500",
      description: "Infrastructure réseau, télécommunications et intégration des systèmes de communication"
    },
    {
      name: "Licence Administration Sécurité Réseau",
      icon: <Shield className="h-8 w-8" />,
      members: 3,
      color: "bg-purple-500",
      description: "Administration système, sécurité informatique et protection des données sensibles"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Heart className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              CardioPredict
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-justify">
              Une application innovante de prédiction des risques cardiovasculaires, développée avec passion et expertise 
              dans le cadre d'un projet tutoré au sein de l'Institut Universitaire de Technologie de Douala. Cette solution 
              technologique représente l'aboutissement du travail collaboratif d'étudiants talentueux issus de différentes 
              filières du département de Génie Informatique.
            </p>
          </div>

          {/* IUT Douala Section */}
          <div className="mb-16">
            <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-r from-primary/5 to-accent/5">
              <CardHeader className="bg-gradient-to-r from-primary to-accent text-white">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Building2 className="h-8 w-8" />
                  Institut Universitaire de Technologie de Douala
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  <div className="order-2 lg:order-1">
                    <img 
                      src="public\image.png" 
                      alt="IUT Douala - Campus universitaire" 
                      className="rounded-xl shadow-lg w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-6 order-1 lg:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <GraduationCap className="h-8 w-8 text-primary" />
                      <h3 className="text-3xl font-bold text-foreground">Excellence Académique</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                      L'Institut Universitaire de Technologie de Douala constitue un pilier de l'enseignement supérieur 
                      technologique au Cameroun. Reconnu pour son excellence pédagogique et son approche pratique de 
                      l'enseignement, l'IUT forme des techniciens supérieurs hautement qualifiés dans diverses spécialités 
                      technologiques et informatiques.
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                      Le département de Génie Informatique, berceau de ce projet, se distingue par sa capacité à allier 
                      théorie académique rigoureuse et applications pratiques innovantes, préparant ainsi les étudiants 
                      aux défis technologiques contemporains.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">Formation d'Excellence</Badge>
                      <Badge className="bg-accent/10 text-accent hover:bg-accent/20">Innovation Technologique</Badge>
                      <Badge className="bg-secondary/10 text-secondary-foreground hover:bg-secondary/20">Expertise Pratique</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Project Context */}
          <div className="mb-16">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
                  <Award className="h-8 w-8 text-accent" />
                  Contexte et Objectifs du Projet
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6 text-justify">
                    CardioPredict représente bien plus qu'un simple projet académique : c'est une initiative ambitieuse 
                    portée par une équipe pluridisciplinaire d'étudiants passionnés et déterminés à faire la différence 
                    dans le domaine de la santé cardiovasculaire. Ce projet tutoré s'inscrit dans une démarche d'innovation 
                    sociale et technologique, visant à développer une solution accessible et fiable pour la prédiction 
                    des risques cardiovasculaires.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg mb-6 text-justify">
                    L'objectif principal de cette application est de démocratiser l'accès aux outils de prévention 
                    cardiovasculaire en combinant les dernières avancées technologiques avec une interface intuitive 
                    et accessible. Grâce aux compétences complémentaires de nos équipes en développement logiciel, 
                    réseaux et sécurité informatique, nous avons créé une plateforme robuste et sécurisée.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                    Cette initiative témoigne de l'engagement de l'IUT de Douala à former des professionnels capables 
                    de répondre aux enjeux sociétaux contemporains tout en maîtrisant les technologies de pointe.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Leaders */}
          <div className="mb-16">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  Direction et Leadership
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-2 gap-10">
                  {teamLeaders.map((leader, index) => (
                    <div key={index} className="text-center group">
                      <div className="relative mb-6">
                        <div className="w-40 h-40 mx-auto relative">
                          <img 
                            src={leader.image} 
                            alt={leader.name}
                            className="w-full h-full rounded-full object-cover shadow-xl border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                          />
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1 text-sm">
                              Leader
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground">{leader.name}</h3>
                      <p className="text-primary font-semibold mb-4 text-lg">{leader.role}</p>
                      <p className="text-muted-foreground leading-relaxed text-justify">
                        {leader.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Departments */}
          <div className="mb-16">
            <Card className="shadow-xl border-0">
              <CardHeader className="text-center pb-2">
                <CardTitle className="flex items-center justify-center gap-3 text-3xl mb-4">
                  <GraduationCap className="h-8 w-8 text-accent" />
                  Équipes Pluridisciplinaires
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {departments.map((dept, index) => (
                    <div key={index} className="group">
                      <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/20">
                        <CardHeader className="text-center pb-4">
                          <div className={`w-16 h-16 ${dept.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                            {dept.icon}
                          </div>
                          <CardTitle className="text-xl font-bold">{dept.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-muted-foreground mb-4 text-justify leading-relaxed">
                            {dept.description}
                          </p>
                          <Badge variant="secondary" className="text-sm font-semibold">
                            {dept.members} étudiants contributeurs
                          </Badge>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Découvrez CardioPredict
                </h3>
                <p className="text-muted-foreground mb-6 text-lg text-justify max-w-3xl mx-auto">
                  Rejoignez-nous dans cette aventure technologique dédiée à la prévention cardiovasculaire. 
                  CardioPredict représente l'union parfaite entre innovation académique et impact social positif.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
