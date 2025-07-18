// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import RiskChart from "@/features/results/components/RiskChart";
// import RiskFactors from "@/features/results/components/RiskFactors";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";

// interface PredictionResult {
//   risk: number;
//   factors: string[];
// }

// const ResultsPage: React.FC = () => {
//   const [result, setResult] = useState<PredictionResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Récupérer les données du patient depuis le localStorage ou la session
//   const getPatientData = () => {
//     try {
//       const userData = JSON.parse(localStorage.getItem('userData') || '{}');
//       const formData = JSON.parse(sessionStorage.getItem('predictionFormData') || '{}');
      
//       return {
//         name: userData.name || formData.name || 'Patient',
//         age: formData.age || userData.age,
//         gender: formData.gender || userData.gender,
//       };
//     } catch (error) {
//       return { name: 'Patient' };
//     }
//   };

//   const getInputData = () => {
//     try {
//       return JSON.parse(sessionStorage.getItem('predictionFormData') || '{}');
//     } catch (error) {
//       return {};
//     }
//   };

//   useEffect(() => {
//     // Récupérer les résultats stockés temporairement
//     const storedResult = sessionStorage.getItem("predictionResult");
//     toast.success("donnee charge avec succes")
    
//     if (storedResult) {
//       try {
//         setResult(JSON.parse(storedResult));
//       } catch (error) {
//         console.error("Erreur lors de la récupération des résultats:", error);
//         toast.error("Impossible de charger les résultats de l'analyse.");
//       }
//     } else {
//       // Rediriger si aucun résultat n'est disponible
//       navigate("/prediction");
//       toast.error("Veuillez d'abord effectuer une prédiction.");
//     }
    
//     setLoading(false);
//   }, [navigate]);

//   if (loading) {
//     return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Navbar isAuthenticated={true} />
//       <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
//         <div className="mx-auto max-w-5xl">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold">Résultats de l'analyse</h1>
//             <p className="text-muted-foreground">
//               Voici le résultat de votre analyse de risque cardiaque
//             </p>
//           </div>
          
//           {result ? (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <Card>
//                 <CardContent className="p-6">
//                   <RiskChart riskScore={result.risk} />
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardContent className="p-6">
//                   <RiskFactors 
//                     factors={result.factors} 
//                     patientData={getPatientData()}
//                     inputData={getInputData()}
//                     riskScore={result.risk}
//                     riskLevel={result.risk >= 70 ? "Élevé" : result.risk >= 40 ? "Modéré" : "Faible"}
//                   />
//                 </CardContent>
//               </Card>
              
//               <div className="lg:col-span-2 flex justify-center space-x-4 mt-4">
//                 <Button asChild>
//                   <a href="#" onClick={() => window.print()}>Télécharger le rapport</a>
//                 </Button>
//                 <Button variant="outline" asChild>
//                   <a href="/dashboard">Retour au tableau de bord</a>
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <p>Aucun résultat à afficher. Veuillez effectuer une nouvelle prédiction.</p>
//               <Button className="mt-4" asChild>
//                 <a href="/prediction">Nouvelle prédiction</a>
//               </Button>
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default ResultsPage;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RiskChart from "@/features/results/components/RiskChart";
import RiskFactors from "@/features/results/components/RiskFactors";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { toast } from "sonner";

interface PredictionResult {
  risk: number;
  factors: string[];
}

const ResultsPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les résultats stockés temporairement
    const storedResult = localStorage.getItem("predictionResult");
    const predictionData = storedResult ? JSON.parse(storedResult) : null;
    console.log("result resul:",predictionData)
    toast.success("donnee charge avec succes")
    
    if (storedResult) {
      try {
        // setResult(JSON.parse(storedResult));
        setResult(predictionData);

        console.log("result2:",predictionData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
        toast.error("Impossible de charger les résultats de l'analyse.");
      }
      // console.log("result resul:",result)
    } else {
      // Rediriger si aucun résultat n'est disponible
      navigate("/prediction");
      toast.error("Veuillez d'abord effectuer une prédiction.");
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow px-4 py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Résultats de l'analyse</h1>
            <p className="text-muted-foreground">
              Voici le résultat de votre analyse de risque cardiaque
            </p>
          </div>
          
          {result ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-6">
                  <RiskChart riskScore={result.prediction} />
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <RiskFactors factors={result.riskFactors} />
                </CardContent>
              </Card>
              
              <div className="lg:col-span-2 flex justify-center space-x-4 mt-4">
                <Button 
                  onClick={() => {
                    toast.success("Impression en cours - Ouverture de la fenêtre d'impression");
                    window.print();
                  }}
                  className="flex items-center gap-2"
                >
                  <Printer className="h-4 w-4" />
                  Imprimer le rapport
                </Button>
                <Button variant="outline" asChild>
                  <a href="/dashboard">Retour au tableau de bord</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p>Aucun résultat à afficher. Veuillez effectuer une nouvelle prédiction.</p>
              <Button className="mt-4" asChild>
                <a href="/prediction">Nouvelle prédiction</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResultsPage;
