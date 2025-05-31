
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, UserCheck, Brain, FileText, Stethoscope, CheckCircle } from "lucide-react";

const PatientJourney: React.FC = () => {
  const journeySteps = [
    {
      icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
      title: "Symptômes détectés",
      description: "Le patient ressent des douleurs thoraciques, de la fatigue, et des palpitations",
      time: "Jour 1",
      color: "bg-red-50 border-red-200"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-blue-500" />,
      title: "Inscription sur la plateforme",
      description: "Création du compte et accès à l'interface CardioPredict",
      time: "Jour 2",
      color: "bg-blue-50 border-blue-200"
    },
    {
      icon: <FileText className="h-8 w-8 text-purple-500" />,
      title: "Saisie des données médicales",
      description: "Remplissage du questionnaire détaillé sur les antécédents, symptômes et facteurs de risque",
      time: "Jour 2",
      color: "bg-purple-50 border-purple-200"
    },
    {
      icon: <Brain className="h-8 w-8 text-green-500" />,
      title: "Analyse par IA",
      description: "L'intelligence artificielle traite les données et calcule le niveau de risque cardiovasculaire",
      time: "Immédiat",
      color: "bg-green-50 border-green-200"
    },
    {
      icon: <FileText className="h-8 w-8 text-orange-500" />,
      title: "Réception des résultats",
      description: "Rapport détaillé avec évaluation du risque et recommandations personnalisées",
      time: "Immédiat",
      color: "bg-orange-50 border-orange-200"
    },
    {
      icon: <Stethoscope className="h-8 w-8 text-indigo-500" />,
      title: "Consultation médicale",
      description: "Rendez-vous avec un cardiologue pour analyse approfondie et plan de traitement",
      time: "Jour 5-7",
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-teal-500" />,
      title: "Prise en charge",
      description: "Mise en place du traitement préventif et suivi médical régulier",
      time: "Suivi continu",
      color: "bg-teal-50 border-teal-200"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Parcours Patient</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez comment CardioPredict accompagne un patient de la détection des premiers symptômes 
            jusqu'à la prise en charge médicale complète.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-red-200 via-blue-200 to-teal-200 hidden lg:block"></div>

            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Timeline Point */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-primary rounded-full z-10 hidden lg:block"></div>

                {/* Content Card */}
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                  <Card className={`${step.color} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          {step.icon}
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{step.title}</h3>
                            <span className="text-sm font-medium text-muted-foreground bg-white px-2 py-1 rounded">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mobile Timeline Number */}
                <div className="lg:hidden absolute -left-4 top-6 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <motion.div
          className="mt-16 bg-white rounded-2xl p-8 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-center mb-8">Résultats de notre approche</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">85%</div>
              <div className="text-muted-foreground">de détection précoce</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">72h</div>
              <div className="text-muted-foreground">délai moyen de prise en charge</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">de satisfaction patient</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">60%</div>
              <div className="text-muted-foreground">de réduction des complications</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PatientJourney;
