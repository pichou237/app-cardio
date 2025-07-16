// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { NewPredictionFormData } from "../schemas/newPredictionSchema";
// import { toast } from "sonner";

// export const useNewPredictionForm = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data: NewPredictionFormData) => {
//     setIsLoading(true);
    
//     try {
//       // Appel à la route /predict du backend
//       const response = await fetch('/api/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error('Erreur lors de la prédiction');
//       }

//       const result = await response.json();
      
//       // Stocker les résultats dans localStorage pour la page de résultats
//       localStorage.setItem('predictionResult', JSON.stringify({
//         ...result,
//         patientData: data,
//         timestamp: new Date().toISOString(),
//       }));

//       toast.success("Votre analyse cardiaque a été réalisée avec succès");

//       // Rediriger vers la page de résultats
//       navigate('/results');
      
//     } catch (error) {
//       console.error('Erreur lors de la prédiction:', error);
      
//       // Simulation de données en cas d'erreur pour la démonstration
//       const simulatedResult = {
//         prediction: Math.floor(Math.random() * 100),
//         risk: Math.random() > 0.5,
//         risk_factors: getSimulatedRiskFactors(data),
//         recommendations: getSimulatedRecommendations(data),
//       };
      
//       localStorage.setItem('predictionResult', JSON.stringify({
//         ...simulatedResult,
//         patientData: data,
//         timestamp: new Date().toISOString(),
//       }));

//       toast.warning("Utilisation de données simulées pour la démonstration");

//       navigate('/results');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, onSubmit };
// };

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewPredictionFormData } from "../schemas/newPredictionSchema";
import { toast } from "sonner";

export const useNewPredictionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: NewPredictionFormData) => {
    setIsLoading(true);
    
    try {
      // Simulation de délai pour le chargement
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Appel API réel (remplacez par votre implémentation)
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(data),
        body: JSON.stringify({
          api_key: localStorage.getItem("api_key"),   // Vérifie que cette valeur est bien présente
          data: data         // Un tableau de 10 valeurs numériques
        }),
      });

      console.log({
        api_key: localStorage.getItem("api_key"),
        data: data
      });


      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur serveur");
      }

      const result = await response.json();
      console.log(result),
      
      // Stockage des résultats
      localStorage.setItem('predictionResult', JSON.stringify({
        prediction: result.prediction,
        riskLevel: result.riskLevel,
        recommendations: getSimulatedRecommendations(data),  // Ajouté
        riskFactors: getSimulatedRiskFactors(data),          // Ajouté
        patientData: data,
        timestamp: new Date().toISOString()
      }));


      console.log("predictionResult:",localStorage.getItem("predictionResult"))

      // Redirection
      navigate('/results');
      
    } catch (error) {
      console.error('Prediction error:', error);
      
      // Gestion des erreurs avec message utilisateur
      const message = error instanceof Error 
        ? error.message 
        : "Une erreur technique est survenue";
      
      toast.error(message);
      
      // Réaffectation pour que le composant puisse le capturer
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
};

function getSimulatedRiskFactors(data: NewPredictionFormData): string[] {
  const factors: string[] = [];
  
  const age = parseInt(data.age);
  if (age > 55) factors.push("Âge avancé");
  if (data.sexe === "M") factors.push("Sexe masculin");
  if (data.tabac === "Oui") factors.push("Tabagisme");
  if (data.diabete_connu === "Oui") factors.push("Diabète");
  if (data.antecedents_familiaux === "Oui") factors.push("Antécédents familiaux");
  if (data.stress === "Oui") factors.push("Stress");
  if (data.sedentarite === "Oui") factors.push("Sédentarité");
  if (data.alimentation_grasse === "Oui") factors.push("Alimentation grasse");
  if (data.sommeil_moins_6h === "Oui") factors.push("Manque de sommeil");
  if (data.douleurs_poitrine === "Oui") factors.push("Douleurs thoraciques");
  
  return factors.length > 0 ? factors : ["Aucun facteur de risque majeur identifié"];
}

function getSimulatedRecommendations(data: NewPredictionFormData): string[] {
  const recommendations: string[] = [];
  
  if (data.tabac === "Oui") {
    recommendations.push("Arrêter de fumer immédiatement");
  }
  if (data.activite_physique === "Non") {
    recommendations.push("Pratiquer une activité physique régulière (30 min/jour)");
  }
  if (data.alimentation_grasse === "Oui") {
    recommendations.push("Adopter une alimentation équilibrée, riche en fruits et légumes");
  }
  if (data.stress === "Oui") {
    recommendations.push("Gérer le stress par des techniques de relaxation");
  }
  if (data.sommeil_moins_6h === "Oui") {
    recommendations.push("Améliorer la qualité et la durée du sommeil (7-8h/nuit)");
  }
  
  recommendations.push("Consulter un médecin pour un suivi cardiologique");
  recommendations.push("Maintenir un poids santé");
  recommendations.push("Surveiller régulièrement la tension artérielle");
  
  return recommendations;
}