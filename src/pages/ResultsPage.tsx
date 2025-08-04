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



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import RiskChart from "@/features/results/components/RiskChart";
// import RiskFactors from "@/features/results/components/RiskFactors";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Printer, FileText, Calendar, Activity, Heart, AlertTriangle } from "lucide-react";
// import { toast } from "sonner";
// import HospitalsList from "@/features/hospitals/components/HospitalsList";

// interface PredictionResult {
//   risk: number;
//   factors: string[];
// }

// const ResultsPage: React.FC = () => {
//   const [result, setResult] = useState<PredictionResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Récupérer les résultats stockés temporairement
//     const storedResult = localStorage.getItem("predictionResult");
//     const predictionData = storedResult ? JSON.parse(storedResult) : null;
//     console.log("result resul:",predictionData)
//     toast.success("donnee charge avec succes")
    
//     if (storedResult) {
//       try {
//         // setResult(JSON.parse(storedResult));
//         setResult(predictionData);

//         console.log("result2:",predictionData);
//       } catch (error) {
//         console.error("Erreur lors de la récupération des résultats:", error);
//         toast.error("Impossible de charger les résultats de l'analyse.");
//       }
//       // console.log("result resul:",result)
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

//             <div className="space-y-8">
//               {/* Score principal avec badge */}
//               <Card className="border-l-4 border-l-primary">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Heart className="h-5 w-5 text-red-500" />
//                     Résultat de l'analyse cardiaque
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="text-4xl font-bold text-primary">
//                         {(result.risk * 100).toFixed(1)}%
//                       </span>
//                       <p className="text-lg text-muted-foreground">Niveau de risque</p>
//                     </div>
//                     <Badge 
//                       variant={result.risk < 0.3 ? "secondary" : result.risk < 0.6 ? "default" : "destructive"}
//                       className="text-lg px-4 py-2"
//                     >
//                       {result.risk < 0.3 ? "Faible" : result.risk < 0.6 ? "Modéré" : "Élevé"}
//                     </Badge>
//                   </div>
//                 </CardContent>
//               </Card>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               <Card>
//                 <CardContent className="p-6">
//                   <RiskChart riskScore={result.prediction} />
//                 </CardContent>
//               </Card>
              
//               <Card>
//                 <CardContent className="p-6">
//                   <RiskFactors factors={result.riskFactors} />
//                 </CardContent>
//               </Card>
              
//               {/* Recommandations détaillées */}
//               <Card className="bg-secondary/10">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <FileText className="h-5 w-5 text-blue-500" />
//                     Recommandations médicales
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h4 className="font-semibold mb-3 text-green-600">Recommandations préventives</h4>
//                       <ul className="space-y-2 text-sm">
//                         <li>• Consultez votre médecin traitant dans les 15 jours</li>
//                         <li>• Maintenez une activité physique régulière (30min/jour)</li>
//                         <li>• Adoptez une alimentation équilibrée pauvre en sel</li>
//                         <li>• Surveillez régulièrement votre tension artérielle</li>
//                       </ul>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-3 text-blue-600">Examens conseillés</h4>
//                       <ul className="space-y-2 text-sm">
//                         <li>• Électrocardiogramme (ECG) de repos</li>
//                         <li>• Bilan lipidique complet</li>
//                         <li>• Test d'effort si recommandé</li>
//                         <li>• Échocardiographie si nécessaire</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </CardContent>

//               <div className="lg:col-span-2 flex justify-center space-x-4 mt-4">
//                 <Button 
//                   onClick={() => {
//                     toast.success("Impression en cours - Ouverture de la fenêtre d'impression");
//                     window.print();
//                   }}
//                   className="flex items-center gap-2"
//                 >
//                   <Printer className="h-4 w-4" />
//                   Imprimer le rapport
//                 </Button>
//                 <Button variant="outline" asChild>
//                   <a href="/dashboard">Retour au tableau de bord</a>
//                 </Button>

//                 <Button 
//                   variant="secondary"
//                   onClick={() => {
//                     // Scroll vers la section hôpitaux
//                     document.getElementById('hospitals-section')?.scrollIntoView({ behavior: 'smooth' });
//                   }}
//                   className="flex items-center gap-2"
//                 >
//                   <Calendar className="h-4 w-4" />
//                   Prendre rendez-vous
//                 </Button>

//               </div>

//               {/* Section hôpitaux pour prise de rendez-vous */}
//               <div id="hospitals-section" className="mt-12">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <Calendar className="h-5 w-5" />
//                       Prendre un rendez-vous médical
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <HospitalsList />
//                   </CardContent>
//                 </Card>
//               </div>

//             </div>
//           </div>
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


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Printer, FileText, Calendar, Heart } from "lucide-react";
// import { toast } from "sonner";

// import Navbar from "@/components/layout/Navbar";
// import Footer from "@/components/layout/Footer";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";

// import RiskChart from "@/features/results/components/RiskChart";
// import RiskFactors from "@/features/results/components/RiskFactors";
// import HospitalsList from "@/features/hospitals/components/HospitalsList";

// interface PredictionResult {
//   risk: number;
//   factors: string[];
//   prediction?: number;
//   riskFactors?: string[];
//   recommendations?: {
//     preventive: string[];
//     exams: string[];
//   };
// }

// const ResultsPage: React.FC = () => {
//   const [result, setResult] = useState<PredictionResult | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedResult = localStorage.getItem("predictionResult");
//     const predictionData = storedResult ? JSON.parse(storedResult) : null;
    
//     if (storedResult) {
//       try {
//         setResult(predictionData);
//         toast.success("Données chargées avec succès");
//       } catch (error) {
//         console.error("Erreur lors de la récupération des résultats:", error);
//         toast.error("Impossible de charger les résultats de l'analyse.");
//       }
//     } else {
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
//             <div className="space-y-8">
//               <Card className="border-l-4 border-l-primary">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Heart className="h-5 w-5 text-red-500" />
//                     Résultat de l'analyse cardiaque
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="text-4xl font-bold text-primary">
//                         {(result.risk * 100).toFixed(1)}%
//                       </span>
//                       <p className="text-lg text-muted-foreground">Niveau de risque</p>
//                     </div>
//                     <Badge 
//                       variant={result.risk < 0.3 ? "secondary" : result.risk < 0.6 ? "default" : "destructive"}
//                       className="text-lg px-4 py-2"
//                     >
//                       {result.risk < 0.3 ? "Faible" : result.risk < 0.6 ? "Modéré" : "Élevé"}
//                     </Badge>
//                   </div>
//                 </CardContent>
//               </Card>

//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 <Card>
//                   <CardContent className="p-6">
//                     <RiskChart riskScore={result.prediction} />
//                   </CardContent>
//                 </Card>
                
//                 <Card>
//                   <CardContent className="p-6">
//                     <RiskFactors factors={result.riskFactors || []} />
//                   </CardContent>
//                 </Card>
                
//                 <Card className="bg-secondary/10 lg:col-span-2">
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2">
//                       <FileText className="h-5 w-5 text-blue-500" />
//                       Recommandations médicales
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <h4 className="font-semibold mb-3 text-green-600">Recommandations préventives</h4>
//                         <ul className="space-y-2 text-sm">
//                           {result.recommendations?.preventive?.map((item, index) => (
//                             <li key={`preventive-${index}`}>• {item}</li>
//                           ))}
//                         </ul>
//                       </div>
//                       <div>
//                         <h4 className="font-semibold mb-3 text-blue-600">Examens conseillés</h4>
//                         <ul className="space-y-2 text-sm">
//                           {result.recommendations?.exams?.map((item, index) => (
//                             <li key={`exam-${index}`}>• {item}</li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>

//                 <div className="lg:col-span-2 flex justify-center space-x-4 mt-4">
//                   <Button 
//                     onClick={() => {
//                       toast.success("Impression en cours - Ouverture de la fenêtre d'impression");
//                       window.print();
//                     }}
//                     className="flex items-center gap-2"
//                   >
//                     <Printer className="h-4 w-4" />
//                     Imprimer le rapport
//                   </Button>
//                   <Button variant="outline" asChild>
//                     <a href="/dashboard">Retour au tableau de bord</a>
//                   </Button>

//                   <Button 
//                     variant="secondary"
//                     onClick={() => {
//                       document.getElementById('hospitals-section')?.scrollIntoView({ behavior: 'smooth' });
//                     }}
//                     className="flex items-center gap-2"
//                   >
//                     <Calendar className="h-4 w-4" />
//                     Prendre rendez-vous
//                   </Button>
//                 </div>

//                 <div id="hospitals-section" className="lg:col-span-2 mt-12">
//                   <Card>
//                     <CardHeader>
//                       <CardTitle className="flex items-center gap-2">
//                         <Calendar className="h-5 w-5" />
//                         Prendre un rendez-vous médical
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <HospitalsList />
//                     </CardContent>
//                   </Card>
//                 </div>
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
import { Printer, FileText, Calendar, Heart, Activity, Stethoscope } from "lucide-react";
import { toast } from "sonner";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import RiskChart from "@/features/results/components/RiskChart";
import RiskFactors from "@/features/results/components/RiskFactors";
import HospitalsList from "@/features/hospitals/components/HospitalsList";

interface MedicalExam {
  lastDate: string;
  status: "recent" | "outdated" | "missing";
  recommendation: string;
}

interface PredictionResult {
  riskLevel: ReactNode;
  risk: number;
  factors: string[];
  prediction?: number;
  probabilities?: number[];
  riskFactors?: string[];
  recommendations?: {
    preventive: string[];
    exams: string[];
  };
  medicalExams?: {
    bloodTest: MedicalExam;
    ecg: MedicalExam;
    stressTest: MedicalExam;
    echocardio: MedicalExam;
  };
  patientData?: {
    age: number;
    sexe: string;
  };
}

const ResultsPage: React.FC = () => {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedResult = localStorage.getItem("predictionResult");
    const predictionData = storedResult ? JSON.parse(storedResult) : null;
    
    if (storedResult) {
      try {
        setResult(predictionData);
        toast.success("Données chargées avec succès");
        console.log(predictionData);
      } catch (error) {
        console.error("Erreur lors de la récupération des résultats:", error);
        toast.error("Impossible de charger les résultats de l'analyse.");
      }
    } else {
      navigate("/prediction");
      toast.error("Veuillez d'abord effectuer une prédiction.");
    }
    
    setLoading(false);
  }, [navigate]);

  const getExamStatusBadge = (status: string) => {
    switch (status) {
      case "recent":
        return <Badge variant="default">À jour</Badge>;
      case "outdated":
        return <Badge variant="destructive">Périmé</Badge>;
      default:
        return <Badge variant="secondary">Manquant</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar isAuthenticated={true} />
      <main className="flex-grow py-8 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Résultats de l'analyse</h1>
            <p className="text-muted-foreground">
              Voici le résultat complet de votre analyse de risque cardiaque
            </p>
          </div>
          
          {result ? (
            <div className="space-y-8">
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Résultat de l'analyse cardiaque
                  </CardTitle>
                </CardHeader>
                {/* <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-4xl font-bold text-primary">
                        {(result.prediction).toFixed(2)}%
                      </span>
                      <p className="text-lg text-muted-foreground">Niveau de risque</p>
                    </div>
                    <Badge 
                      variant={result.risk_level == "Modére" ? "secondary" : result.risk_level == "l" ? "default" : "destructive"}
                      className="text-lg px-4 py-2"
                    >
                      {result.risk_level < 30 ? "Faible" : result.risk_level < 60 ? "Modéré" : "Élevé"}
                    </Badge>
                  </div>
                </CardContent> */}

                <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-4xl font-bold text-primary">
                          {result.prediction.toFixed(2)}%
                        </span>
                        <p className="text-lg text-muted-foreground">Niveau de risque</p>
                      </div>
                      <Badge
                        variant={
                          result.riskLevel === "Modéré"
                            ? "secondary"
                            : result.riskLevel === "Faible"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-lg px-4 py-2"
                      >
                        {result.riskLevel}
                      </Badge>
                    </div>
                  </CardContent>

              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <RiskChart riskScore={result.prediction} riskLevel={result.riskLevel} probabilities={result.probabilities ||[75.4, 22.9, 1.7]} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <RiskFactors factors={result.riskFactors || []} />
                  </CardContent>
                </Card>
                
                {/* Section des examens médicaux */}
                {result.medicalExams && (
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-purple-500" />
                        État de vos examens médicaux
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            Bilan sanguin
                          </h4>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dernier: {result.medicalExams.bloodTest.lastDate || "Non renseigné"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {getExamStatusBadge(result.medicalExams.bloodTest.status)}
                              <span className="text-sm">{result.medicalExams.bloodTest.recommendation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Électrocardiogramme
                          </h4>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dernier: {result.medicalExams.ecg.lastDate || "Non renseigné"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {getExamStatusBadge(result.medicalExams.ecg.status)}
                              <span className="text-sm">{result.medicalExams.ecg.recommendation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Test d'effort
                          </h4>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dernier: {result.medicalExams.stressTest.lastDate || "Non renseigné"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {getExamStatusBadge(result.medicalExams.stressTest.status)}
                              <span className="text-sm">{result.medicalExams.stressTest.recommendation}</span>
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Échocardiographie
                          </h4>
                          <div className="mt-2">
                            <p className="text-sm text-muted-foreground">
                              Dernier: {result.medicalExams.echocardio.lastDate || "Non renseigné"}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {getExamStatusBadge(result.medicalExams.echocardio.status)}
                              <span className="text-sm">{result.medicalExams.echocardio.recommendation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                {/* Recommandations médicales */}
                <Card className="bg-secondary/10 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Recommandations médicales
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Recommandations préventives</h4>
                        <ul className="space-y-2 text-sm">
                          {result.recommendations?.preventive?.map((item, index) => (
                            <li key={`preventive-${index}`}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-600">Examens conseillés</h4>
                        <ul className="space-y-2 text-sm">
                          {result.recommendations?.exams?.map((item, index) => (
                            <li key={`exam-${index}`}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
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

                  <Button 
                    variant="secondary"
                    onClick={() => {
                      document.getElementById('hospitals-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Prendre rendez-vous
                  </Button>
                </div>

                <div id="hospitals-section" className="lg:col-span-2 mt-12">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Prendre un rendez-vous médical
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <HospitalsList />
                    </CardContent>
                  </Card>
                </div>
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