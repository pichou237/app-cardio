
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Quote, Heart, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

interface MedicalOpinion {
  id: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  city: string;
  opinion: string;
  mainCause: string;
  image: string;
  experience: number;
}

const medicalOpinions: MedicalOpinion[] = [
  {
    id: "1",
    doctorName: "Dr. TIMA serges",
    specialty: "spécialiste en traumatologie",
    hospital: "Hôpital  Saint jean de Dieu de Yassa",
    city: "Douala",
    opinion: "Au Cameroun, les maladies cardiovasculaires sont souvent découvertes trop tard, faute de dépistage précoce. Les principaux facteurs de risque dans notre contexte sont l'hypertension, le diabète, le stress, l'alcool, la sédentarité et la mauvaise alimentation. Une application simple et accessible permettant aux patients d'évaluer eux-mêmes leur risque, en fonction de leurs habitudes et symptômes, serait un excellent outil de prévention et d'orientation médicale et nous permettra à nous médecins de nous alléger la tâche.",
    mainCause: "Hypertension & Alimentation",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    experience: 15
  },
  {
    id: "2",
    doctorName: "Dr.  MONKAM",
    specialty: "Cardiologue Interventionnel",
    hospital: "cabinet médical calvaincoeur ",
    city: "Douala",
    opinion: "Dans notre pratique quotidienne, nous rencontrons beaucoup de patients hypertendus qui ignorent leur état. Cette hypertension non détectée est la première cause des complications cardiaques graves, notamment les infarctus et les AVC. La prévention et le dépistage précoce sont essentiels, surtout dans les milieux urbains où le stress et la sédentarité augmentent les risques",
    mainCause: "Diabète & Urbanisation",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    // image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    experience: 20
  },
  {
    id: "3",
    doctorName: "Dr.  André Michel Yomba",
    specialty: "Cardiologue",
    hospital: "Hôpital central de Yaoundé",
    city: "Yaounde",
    opinion: "Dans le Nord-Cameroun, nous observons une forte corrélation entre les maladies cardiaques et les facteurs génétiques combinés aux changements climatiques. La déshydratation chronique et les infections récurrentes fragilisent le système cardiovasculaire de nos populations.",
    mainCause: "Facteurs Génétiques & Climat",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
    experience: 12
  }
];

const MedicalOpinions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % medicalOpinions.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
            <Heart className="h-6 w-6 text-red-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Avis d'Experts Médicaux
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez les analyses de nos spécialistes sur les principales causes des maladies cardiaques au Cameroun
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {medicalOpinions.map((opinion, index) => (
                <CarouselItem key={opinion.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-1"
                  >
                    <Card className="relative overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/50 to-purple-50/50">
                      <CardContent className="p-8 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                          {/* Photo et informations du médecin */}
                          <div className="lg:col-span-1 text-center lg:text-left">
                            <div className="relative inline-block mb-6">
                              <img
                                src={opinion.image}
                                alt={opinion.doctorName}
                                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                              />
                              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                                <Stethoscope className="h-5 w-5" />
                              </div>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                              {opinion.doctorName}
                            </h3>
                            <Badge variant="secondary" className="mb-2">
                              {opinion.specialty}
                            </Badge>
                            <p className="text-sm text-muted-foreground mb-1">
                              {opinion.hospital}
                            </p>
                            <p className="text-sm text-muted-foreground mb-2">
                              {opinion.city}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {opinion.experience} ans d'expérience
                            </p>
                          </div>

                          {/* Citation et avis */}
                          <div className="lg:col-span-2">
                            <div className="relative">
                              <Quote className="h-12 w-12 text-primary/20 absolute -top-2 -left-2" />
                              <blockquote className="text-lg leading-relaxed text-foreground pl-8 mb-6">
                                "{opinion.opinion}"
                              </blockquote>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant="outline" 
                                className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 text-red-700"
                              >
                                Cause Principale: {opinion.mainCause}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        {/* Indicateurs de progression */}
                        <div className="flex justify-center mt-8 gap-2">
                          {medicalOpinions.map((_, index) => (
                            <div
                              key={index}
                              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                  ? 'bg-primary' 
                                  : 'bg-primary/20'
                              }`}
                            />
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 bg-white/80 hover:bg-white" />
          </Carousel>
        </div>

        {/* Statistiques en bas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-2xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">des cas liés à l'hypertension</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-2xl font-bold text-primary mb-2">60%</div>
            <div className="text-sm text-muted-foreground">évitables par la prévention</div>
          </div>
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="text-2xl font-bold text-primary mb-2">40%</div>
            <div className="text-sm text-muted-foreground">d'augmentation en milieu urbain</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MedicalOpinions;
