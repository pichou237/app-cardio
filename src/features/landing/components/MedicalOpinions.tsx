
import React, { useEffect, useState } from "react";
import { Stethoscope, Heart } from "lucide-react";
import { motion } from "framer-motion";
import OpinionCard from './OpinionCard';
import MedicalStatistics from './MedicalStatistics';

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
    doctorName: "Dr. Marie Ngo Bell",
    specialty: "Cardiologue",
    hospital: "Hôpital Général de Douala",
    city: "Douala",
    opinion: "Au Cameroun, l'hypertension artérielle reste la première cause des maladies cardiaques. Elle est souvent liée à nos habitudes alimentaires riches en sel et à la sédentarité croissante dans nos villes.",
    mainCause: "Hypertension & Alimentation",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
    experience: 15
  },
  {
    id: "2",
    doctorName: "Dr. Paul Mbarga Essomba",
    specialty: "Cardiologue Interventionnel",
    hospital: "Centre Hospitalier d'Essos",
    city: "Yaoundé",
    opinion: "Le diabète de type 2 est en augmentation constante au Cameroun, particulièrement en milieu urbain. Cette pathologie, combinée au stress professionnel, crée un terrain favorable aux pathologies cardiovasculaires.",
    mainCause: "Diabète & Urbanisation",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
    experience: 20
  },
  {
    id: "3",
    doctorName: "Dr. Aminata Oumarou",
    specialty: "Médecin Interniste",
    hospital: "Hôpital Régional de Garoua",
    city: "Garoua",
    opinion: "Dans le Nord-Cameroun, nous observons une forte corrélation entre les maladies cardiaques et les facteurs génétiques combinés aux changements climatiques et à la déshydratation chronique.",
    mainCause: "Facteurs Génétiques & Climat",
    image: "https://images.unsplash.com/photo-1594824278271-d0c4cce3c9c8?w=300&h=300&fit=crop&crop=face",
    experience: 12
  }
];

const MedicalOpinions: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % medicalOpinions.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Stethoscope className="h-6 w-6 text-primary" />
            <Heart className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl mb-3">
            Avis d'Experts Médicaux
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Découvrez les analyses de nos spécialistes sur les principales causes des maladies cardiaques au Cameroun
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              animate={{ x: `-${currentIndex * 100}%` }}
            >
              {medicalOpinions.map((opinion) => (
                <OpinionCard key={opinion.id} opinion={opinion} />
              ))}
            </motion.div>
          </div>

          {/* Indicateurs de progression */}
          <div className="flex justify-center mt-6 gap-2">
            {medicalOpinions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-6 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-primary' 
                    : 'bg-primary/20 hover:bg-primary/40'
                }`}
              />
            ))}
          </div>
        </div>

        <MedicalStatistics />
      </div>
    </section>
  );
};

export default MedicalOpinions;
