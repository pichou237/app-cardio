import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PricingCards: React.FC = () => {
  const plans = [
    {
      name: "Gratuit",
      price: "0€",
      period: "toujours",
      description: "Parfait pour commencer",
      features: [
        "1 prédiction par mois",
        "Analyse de base",
        "Rapport PDF simple",
        "Support par email"
      ],
      buttonText: "Commencer gratuitement",
      buttonVariant: "outline" as const,
      popular: false,
      color: "border-gray-200"
    },
    {
      name: "Mensuel",
      price: "19€",
      period: "par mois",
      description: "Pour un suivi régulier",
      features: [
        "Prédictions illimitées",
        "Analyse approfondie",
        "Rapports PDF détaillés",
        "Suivi personnalisé",
        "Graphiques interactifs",
        "Support prioritaire",
        "Alertes personnalisées"
      ],
      buttonText: "S'abonner maintenant",
      buttonVariant: "default" as const,
      popular: true,
      color: "border-primary"
    },
    {
      name: "Annuel",
      price: "179€",
      period: "par an",
      originalPrice: "228€",
      savings: "Économisez 49€",
      description: "Le meilleur rapport qualité-prix",
      features: [
        "Tout du forfait mensuel",
        "Consultation médicale virtuelle",
        "Plan de prévention personnalisé",
        "Accès prioritaire aux nouvelles fonctionnalités",
        "Support téléphonique 24/7",
        "Backup de données sécurisé",
        "API d'intégration"
      ],
      buttonText: "Économiser maintenant",
      buttonVariant: "default" as const,
      popular: false,
      color: "border-green-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="bg-gradient-to-b from-purple-50/50 to-blue-50/50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Choisissez votre forfait
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Commencez gratuitement ou choisissez un forfait premium pour accéder à toutes nos fonctionnalités avancées
          </motion.p>
        </div>

        <motion.div 
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 xl:gap-x-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`relative h-full flex flex-col justify-between transition-all hover:shadow-xl hover:scale-105 ${plan.color} ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    Plus populaire
                  </Badge>
                )}
                
                <div>
                  <CardHeader className="pb-8 pt-6">
                    <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline">
                        <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                        <span className="ml-1 text-sm font-semibold text-muted-foreground">/{plan.period}</span>
                      </div>
                      
                      {plan.originalPrice && (
                        <div className="mt-2">
                          <span className="text-sm text-muted-foreground line-through">{plan.originalPrice}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {plan.savings}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>

                <div className="p-6 pt-0">
                  <Button 
                    asChild 
                    variant={plan.buttonVariant} 
                    size="lg" 
                    className="w-full"
                  >
                    <Link to="/register">
                      {plan.buttonText}
                    </Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            Tous les forfaits incluent un cryptage de niveau militaire et sont conformes aux normes RGPD.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Annulation possible à tout moment • Support client réactif • Garantie de remboursement 30 jours
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingCards;
