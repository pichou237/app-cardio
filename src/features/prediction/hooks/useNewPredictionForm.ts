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
//       // Simulation de délai pour le chargement
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Appel API réel (remplacez par votre implémentation)
//       const response = await fetch('https://api-appcardio-predict-1.onrender.com/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         // body: JSON.stringify(data),
//         body: JSON.stringify({
//           api_key: localStorage.getItem("api_key"),   // Vérifie que cette valeur est bien présente
//           data: data         // Un tableau de 10 valeurs numériques
//         }),
//       });

//       console.log({
//         api_key: localStorage.getItem("api_key"),
//         data: data
//       });


//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Erreur serveur");
//       }

//       const result = await response.json();
//       console.log(result),
      
//       // Stockage des résultats
//       localStorage.setItem('predictionResult', JSON.stringify({
//         prediction: result.prediction,
//         riskLevel: result.riskLevel,
//         recommendations: getSimulatedRecommendations(data),  // Ajouté
//         riskFactors: getSimulatedRiskFactors(data),          // Ajouté
//         patientData: data,
//         timestamp: new Date().toISOString()
//       }));


//       console.log("predictionResult:",localStorage.getItem("predictionResult"))

//       // Redirection
//       navigate('/results');
      
//     } catch (error) {
//       console.error('Prediction error:', error);
      
//       // Gestion des erreurs avec message utilisateur
//       const message = error instanceof Error 
//         ? error.message 
//         : "Une erreur technique est survenue";
      
//       toast.error(message);
      
//       // Réaffectation pour que le composant puisse le capturer
//       throw error;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, onSubmit };
// };

// function getSimulatedRiskFactors(data: NewPredictionFormData): string[] {
//   const factors: string[] = [];
  
//   const age = parseInt(data.age);
//   if (age > 55) factors.push("Âge avancé");
//   if (data.sexe === "M") factors.push("Sexe masculin");
//   if (data.tabac === "Oui") factors.push("Tabagisme");
//   if (data.diabete_connu === "Oui") factors.push("Diabète");
//   if (data.antecedents_familiaux === "Oui") factors.push("Antécédents familiaux");
//   if (data.stress === "Oui") factors.push("Stress");
//   if (data.sedentarite === "Oui") factors.push("Sédentarité");
//   if (data.alimentation_grasse === "Oui") factors.push("Alimentation grasse");
//   if (data.sommeil_moins_6h === "Oui") factors.push("Manque de sommeil");
//   if (data.douleurs_poitrine === "Oui") factors.push("Douleurs thoraciques");
  
//   return factors.length > 0 ? factors : ["Aucun facteur de risque majeur identifié"];
// }

// function getSimulatedRecommendations(data: NewPredictionFormData): string[] {
//   const recommendations: string[] = [];
  
//   if (data.tabac === "Oui") {
//     recommendations.push("Arrêter de fumer immédiatement");
//   }
//   if (data.activite_physique === "Non") {
//     recommendations.push("Pratiquer une activité physique régulière (30 min/jour)");
//   }
//   if (data.alimentation_grasse === "Oui") {
//     recommendations.push("Adopter une alimentation équilibrée, riche en fruits et légumes");
//   }
//   if (data.stress === "Oui") {
//     recommendations.push("Gérer le stress par des techniques de relaxation");
//   }
//   if (data.sommeil_moins_6h === "Oui") {
//     recommendations.push("Améliorer la qualité et la durée du sommeil (7-8h/nuit)");
//   }
  
//   recommendations.push("Consulter un médecin pour un suivi cardiologique");
//   recommendations.push("Maintenir un poids santé");
//   recommendations.push("Surveiller régulièrement la tension artérielle");
  
//   return recommendations;
// }


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
      
      // Appel API réel
      const response = await fetch('https://api-appcardio-predict.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: localStorage.getItem("api_key"),
          data: data
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erreur serveur");
      }

      const result = await response.json();
      // console.log("resultdata:",result.risk_level);
      // Stockage des résultats avec les examens
      localStorage.setItem('predictionResult', JSON.stringify({
        prediction: result.prediction,
        riskLevel: result.risk_level,
        probabilities : result.probabilities,
        recommendations: getSimulatedRecommendations(data),
        riskFactors: getSimulatedRiskFactors(data),
        medicalExams: getMedicalExamsStatus(data), // Nouvelle section pour les examens
        patientData: data,
        timestamp: new Date().toISOString()
      }));

      // Redirection
      navigate('/results');
      
    } catch (error) {
      console.error('Prediction error:', error);
      const message = error instanceof Error 
        ? error.message 
        : "Une erreur technique est survenue";
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, onSubmit };
};

// Fonction pour évaluer l'état des examens médicaux
function getMedicalExamsStatus(data: NewPredictionFormData) {
  const now = new Date();
  const oneYearAgo = new Date(now.setFullYear(now.getFullYear() - 1)).toISOString();
  const twoYearsAgo = new Date(now.setFullYear(now.getFullYear() - 2)).toISOString();

  return {
    bloodTest: {
      lastDate: data.derniere_prise_sang,
      status: !data.derniere_prise_sang ? "missing" 
             : data.derniere_prise_sang > oneYearAgo ? "recent" 
             : "outdated",
      recommendation: !data.derniere_prise_sang ? "Bilan sanguin recommandé" 
                     : data.derniere_prise_sang > oneYearAgo ? "Bilan sanguin à jour" 
                     : "Bilan sanguin à refaire"
    },
    ecg: {
      lastDate: data.dernier_electrocardiogramme,
      status: !data.dernier_electrocardiogramme ? "missing" 
             : data.dernier_electrocardiogramme > oneYearAgo ? "recent" 
             : "outdated",
      recommendation: !data.dernier_electrocardiogramme ? "ECG recommandé" 
                     : data.dernier_electrocardiogramme > oneYearAgo ? "ECG récent" 
                     : "Nouvel ECG recommandé"
    },
    stressTest: {
      lastDate: data.dernier_test_effort,
      status: !data.dernier_test_effort ? "missing" 
             : data.dernier_test_effort > twoYearsAgo ? "recent" 
             : "outdated",
      recommendation: !data.dernier_test_effort ? "Test d'effort à considérer" 
                     : data.dernier_test_effort > twoYearsAgo ? "Test d'effort récent" 
                     : "Nouveau test d'effort recommandé"
    },
    echocardio: {
      lastDate: data.dernier_echocardiographie,
      status: !data.dernier_echocardiographie ? "missing" 
             : data.dernier_echocardiographie > twoYearsAgo ? "recent" 
             : "outdated",
      recommendation: !data.dernier_echocardiographie ? "Échocardiographie à considérer" 
                     : data.dernier_echocardiographie > twoYearsAgo ? "Échocardiographie récente" 
                     : "Nouvelle échocardiographie recommandée"
    }
  };
}

function getSimulatedRiskFactors(data: NewPredictionFormData): string[] {
  const factors: string[] = [];
  
  // Facteurs de risque standards
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
  
  // Facteurs basés sur les examens
  const examsStatus = getMedicalExamsStatus(data);
  if (examsStatus.bloodTest.status === "outdated") factors.push("Bilan sanguin périmé");
  if (examsStatus.ecg.status === "missing") factors.push("ECG manquant");
  if (examsStatus.stressTest.status === "outdated") factors.push("Test d'effort périmé");
  
  return factors.length > 0 ? factors : ["Aucun facteur de risque majeur identifié"];
}

function getSimulatedRecommendations(data: NewPredictionFormData): { preventive: string[]; exams: string[] } {
  const preventive: string[] = [];
  const exams: string[] = [];
  
  // Recommandations préventives
  if (data.tabac === "Oui") {
    preventive.push("Arrêter de fumer immédiatement");
  }
  if (data.activite_physique === "Non") {
    preventive.push("Pratiquer une activité physique régulière (30 min/jour)");
  }
  if (data.alimentation_grasse === "Oui") {
    preventive.push("Adopter une alimentation équilibrée, riche en fruits et légumes");
  }
  if (data.stress === "Oui") {
    preventive.push("Gérer le stress par des techniques de relaxation");
  }
  if (data.sommeil_moins_6h === "Oui") {
    preventive.push("Améliorer la qualité et la durée du sommeil (7-8h/nuit)");
  }
  
  preventive.push("Consulter un médecin pour un suivi cardiologique");
  preventive.push("Maintenir un poids santé");
  preventive.push("Surveiller régulièrement la tension artérielle");

  // Recommandations d'examens basées sur les dates
  const examsStatus = getMedicalExamsStatus(data);
  
  if (examsStatus.bloodTest.status !== "recent") {
    exams.push(examsStatus.bloodTest.recommendation);
  }
  if (examsStatus.ecg.status !== "recent") {
    exams.push(examsStatus.ecg.recommendation);
  }
  if (data.age > 50 && examsStatus.stressTest.status !== "recent") {
    exams.push(examsStatus.stressTest.recommendation);
  }
  if (data.age > 60 && examsStatus.echocardio.status !== "recent") {
    exams.push(examsStatus.echocardio.recommendation);
  }

  // Examens de base recommandés pour tous
  exams.push("Mesure de la pression artérielle");
  exams.push("Bilan lipidique complet");

  return { preventive, exams };
}