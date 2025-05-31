
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const TestimonialsPage: React.FC = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      age: 45,
      role: "Enseignante",
      content: "CardioPredict m'a aidée à identifier des facteurs de risque que je n'avais pas remarqués. Grâce à cette plateforme, j'ai pu consulter mon médecin à temps et adapter mon mode de vie.",
      rating: 5,
      image: "MD"
    },
    {
      name: "Jean Martin",
      age: 52,
      role: "Ingénieur",
      content: "L'interface est très intuitive et les résultats sont clairs. J'utilise maintenant CardioPredict pour suivre régulièrement mon état de santé cardiaque.",
      rating: 5,
      image: "JM"
    },
    {
      name: "Sophie Laurent",
      age: 38,
      role: "Médecin généraliste",
      content: "En tant que professionnel de santé, je recommande CardioPredict à mes patients. C'est un excellent outil de prévention qui complète parfaitement le suivi médical traditionnel.",
      rating: 5,
      image: "SL"
    },
    {
      name: "Pierre Moreau",
      age: 60,
      role: "Retraité",
      content: "Après avoir utilisé CardioPredict, j'ai découvert que j'avais un risque élevé. Mon médecin a confirmé et nous avons pu agir rapidement. Cette plateforme m'a probablement sauvé la vie.",
      rating: 5,
      image: "PM"
    },
    {
      name: "Emma Rousseau",
      age: 29,
      role: "Pharmacienne",
      content: "Même jeune, il est important de surveiller sa santé cardiaque. CardioPredict m'aide à rester vigilante et à maintenir de bonnes habitudes de vie.",
      rating: 5,
      image: "ER"
    },
    {
      name: "Dr. Michel Bertrand",
      age: 55,
      role: "Cardiologue",
      content: "CardioPredict utilise des algorithmes sophistiqués qui correspondent aux standards médicaux actuels. C'est un outil précieux pour la prévention primaire.",
      rating: 5,
      image: "MB"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-primary mb-6">Témoignages</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Découvrez comment CardioPredict a aidé nos utilisateurs à prendre soin de leur santé cardiaque 
              et à prévenir les risques cardiovasculaires.
            </p>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Utilisateurs satisfaits</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Précision des prédictions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                <div className="text-muted-foreground">Note moyenne</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Support disponible</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Ce que disent nos utilisateurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.image}
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.age} ans</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground italic pl-4">
                        {testimonial.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Rejoignez nos utilisateurs satisfaits</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Commencez dès aujourd'hui votre parcours vers une meilleure santé cardiaque avec CardioPredict.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Commencer gratuitement
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors">
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
