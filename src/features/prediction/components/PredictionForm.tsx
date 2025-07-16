// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { newPredictionSchema, NewPredictionFormData } from "../schemas/newPredictionSchema";
// import { useNewPredictionForm } from "../hooks/useNewPredictionForm";
// import Step1PersonalInfo from "./Step1PersonalInfo";
// import Step2HealthHabits from "./Step2HealthHabits";
// import { toast } from "sonner";

// const PredictionForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const { isLoading, onSubmit } = useNewPredictionForm();

//   const form = useForm<NewPredictionFormData>({
//     resolver: zodResolver(newPredictionSchema),
//     defaultValues: {
//       age: "",
//       sexe: "M",
//       poids: "",
//       taille: "",
//       ville: "Douala",
//       environnement: "metropole",
//       antecedents_familiaux: "Non",
//       diabete_connu: "Non",
//       symptomes_diabete: "Non",
//       tabac: "Non",
//       alcool: "Non",
//       activite_physique: "Non",
//       sedentarite: "Non",
//       stress: "Non",
//       sommeil_moins_6h: "Non",
//       sommeil_mauvaise_qualite: "Non",
//       alimentation_grasse: "Non",
//       fruits_legumes: "Non",
//       maux_tete: "Non",
//       essoufflement: "Non",
//       douleurs_poitrine: "Non",
//     },
//   });

//   const totalSteps = 2;
//   const progress = (currentStep / totalSteps) * 100;

//   const nextStep = async () => {
//     const fieldsToValidate = currentStep === 1 
//       ? ["age", "sexe", "poids", "taille", "ville", "environnement", "antecedents_familiaux", "diabete_connu", "symptomes_diabete"] 
//       : ["tabac", "alcool", "activite_physique", "sedentarite", "stress", "sommeil_moins_6h", "sommeil_mauvaise_qualite", "alimentation_grasse", "fruits_legumes", "maux_tete", "essoufflement", "douleurs_poitrine"];
    
//     if (fieldsToValidate.length > 0) {
//       const isValid = await form.trigger(fieldsToValidate as any);
//       if (!isValid) {
//         toast.error("Veuillez corriger les erreurs avant de continuer");
//         return;
//       }
//     }
    
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//       toast.success(`Étape ${currentStep + 1} sur ${totalSteps}`);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = form.handleSubmit(async (data) => {
//     try {
//       await onSubmit(data);
//       toast.success("Prédiction réalisée avec succès");
//     } catch (error) {
//       toast.error("Une erreur est survenue lors de la prédiction");
//     }
//   });

//   return (
//     <div className="w-full max-w-4xl mx-auto">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between">
//             <span>Prédiction de risque cardiaque</span>
//             <span className="text-sm font-normal text-muted-foreground">
//               Étape {currentStep} sur {totalSteps}
//             </span>
//           </CardTitle>
//           <Progress value={progress} className="w-full" />
//         </CardHeader>
        
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {currentStep === 1 && <Step1PersonalInfo control={form.control} />}
//               {currentStep === 2 && <Step2HealthHabits control={form.control} />}
              
//               <div className="flex justify-between pt-6">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={currentStep === 1}
//                   className="flex items-center gap-2"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   Précédent
//                 </Button>
                
//                 {currentStep < totalSteps ? (
//                   <Button
//                     type="button"
//                     onClick={nextStep}
//                     className="flex items-center gap-2"
//                   >
//                     Suivant
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="submit" 
//                     disabled={isLoading}
//                     className="flex items-center gap-2"
//                   >
//                     {isLoading ? "Analyse en cours..." : "Obtenir ma prédiction"}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PredictionForm;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { newPredictionSchema, NewPredictionFormData } from "../schemas/newPredictionSchema";
// import { useNewPredictionForm } from "../hooks/useNewPredictionForm";
// import Step1PersonalInfo from "./Step1PersonalInfo";
// import Step2HealthHabits from "./Step2HealthHabits";
// import { toast } from "sonner";

// const PredictionForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const { isLoading, onSubmit } = useNewPredictionForm();

//   const form = useForm<NewPredictionFormData>({
//     resolver: zodResolver(newPredictionSchema),
//     defaultValues: {
//       age: "",
//       sexe: "M",
//       poids: "",
//       taille: "",
//       ville: "Douala",
//       environnement: "metropole",
//       antecedents_familiaux: "Non",
//       diabete_connu: "Non",
//       symptomes_diabete: "Non",
//       tabac: "Non",
//       alcool: "Non",
//       activite_physique: "Non",
//       sedentarite: "Non",
//       stress: "Non",
//       sommeil_moins_6h: "Non",
//       sommeil_mauvaise_qualite: "Non",
//       alimentation_grasse: "Non",
//       fruits_legumes: "Non",
//       maux_tete: "Non",
//       essoufflement: "Non",
//       douleurs_poitrine: "Non",
//     },
//   });

//   const totalSteps = 2;
//   const progress = (currentStep / totalSteps) * 100;

//   // Définition des champs à valider pour chaque étape
//   const stepValidationFields = {
//     1: ["age", "sexe", "poids", "taille", "ville", "environnement", "antecedents_familiaux", "diabete_connu", "symptomes_diabete"],
//     2: ["tabac", "alcool", "activite_physique", "sedentarite", "stress", "sommeil_moins_6h", "sommeil_mauvaise_qualite", "alimentation_grasse", "fruits_legumes", "maux_tete", "essoufflement", "douleurs_poitrine"]
//   };

//   const nextStep = async () => {
//     const fields = stepValidationFields[currentStep as keyof typeof stepValidationFields];
//     const isValid = await form.trigger(fields as any);
    
//     if (!isValid) {
//       toast.error("Veuillez corriger les erreurs avant de continuer");
//       return;
//     }
    
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//       toast.success(`Étape ${currentStep + 1} sur ${totalSteps}`);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   const handleSubmit = form.handleSubmit(async (data) => {
//     try {
//       await onSubmit(data);
//       toast.success("Prédiction réalisée avec succès");
//     } catch (error) {
//       toast.error("Une erreur est survenue lors de la prédiction");
//       console.error("Erreur de prédiction:", error);
//     }
//   });

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <div className="flex flex-col space-y-2">
//             <CardTitle className="text-xl font-bold">Prédiction de risque cardiaque</CardTitle>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">
//                 Étape {currentStep} sur {totalSteps}
//               </span>
//               <div className="flex space-x-2">
//                 {Array.from({ length: totalSteps }).map((_, index) => (
//                   <div 
//                     key={index} 
//                     className={`h-2 w-2 rounded-full ${
//                       currentStep > index ? 'bg-primary' : 'bg-muted'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//           <Progress value={progress} className="w-full h-2" />
//         </CardHeader>
        
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {currentStep === 1 && <Step1PersonalInfo control={form.control} />}
//               {currentStep === 2 && <Step2HealthHabits control={form.control} />}
              
//               <div className="flex justify-between pt-6">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={currentStep === 1 || isLoading}
//                   className="flex items-center gap-2"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   Précédent
//                 </Button>
                
//                 {currentStep < totalSteps ? (
//                   <Button
//                     type="button"
//                     onClick={nextStep}
//                     className="flex items-center gap-2"
//                   >
//                     Suivant
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="submit" 
//                     disabled={isLoading}
//                     className="flex items-center gap-2 bg-primary hover:bg-primary-dark"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         <span>Analyse en cours...</span>
//                       </>
//                     ) : (
//                       "Obtenir ma prédiction"
//                     )}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // export default PredictionForm;
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import { Button } from "@/components/ui/button";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Progress } from "@/components/ui/progress";
// import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
// import { newPredictionSchema, NewPredictionFormData } from "../schemas/newPredictionSchema";
// import { useNewPredictionForm } from "../hooks/useNewPredictionForm";
// import Step1PersonalInfo from "./Step1PersonalInfo";
// import Step2HealthHabits from "./Step2HealthHabits";
// import { toast } from "sonner";

// const PredictionForm: React.FC = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const { isLoading, onSubmit } = useNewPredictionForm();

//   const form = useForm<NewPredictionFormData>({
//     resolver: zodResolver(newPredictionSchema),
//     defaultValues: {
//       age: "",
//       sexe: "M",
//       poids: "",
//       taille: "",
//       ville: "Douala",
//       environnement: "metropole",
//       antecedents_familiaux: "Non",
//       diabete_connu: "Non",
//       symptomes_diabete: "Non",
//       tabac: "Non",
//       alcool: "Non",
//       activite_physique: "Non",
//       sedentarite: "Non",
//       stress: "Non",
//       sommeil_moins_6h: "Non",
//       sommeil_mauvaise_qualite: "Non",
//       alimentation_grasse: "Non",
//       fruits_legumes: "Non",
//       maux_tete: "Non",
//       essoufflement: "Non",
//       douleurs_poitrine: "Non",
//     },
//   });

//   const totalSteps = 2;
//   const progress = (currentStep / totalSteps) * 100;

//   const stepValidationFields = {
//     1: ["age", "sexe", "poids", "taille", "ville", "environnement", "antecedents_familiaux", "diabete_connu", "symptomes_diabete"],
//     2: ["tabac", "alcool", "activite_physique", "sedentarite", "stress", "sommeil_moins_6h", "sommeil_mauvaise_qualite", "alimentation_grasse", "fruits_legumes", "maux_tete", "essoufflement", "douleurs_poitrine"]
//   };

//   const nextStep = async () => {
//     const fields = stepValidationFields[currentStep as keyof typeof stepValidationFields];
//     const isValid = await form.trigger(fields);
    
//     if (!isValid) {
//       toast.error("Veuillez remplir tous les champs requis");
//       return;
//     }
    
//     setCurrentStep(prev => {
//       const nextStep = prev + 1;
//       if (nextStep <= totalSteps) {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         toast.success(`Étape ${nextStep}/${totalSteps}`);
//       }
//       return nextStep;
//     });
//   };

//   const prevStep = () => {
//     setCurrentStep(prev => {
//       const prevStep = prev - 1;
//       if (prevStep >= 1) {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//       }
//       return prevStep;
//     });
//   };

//   const handleFormSubmit = form.handleSubmit(async (data) => {
//     try {
//       await onSubmit(data);
//     } catch (error) {
//       // L'erreur est déjà gérée dans le hook useNewPredictionForm
//       console.error("Submission error:", error);
//     }
//   });

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <Card>
//         <CardHeader>
//           <div className="flex flex-col space-y-2">
//             <CardTitle className="text-xl font-bold">Prédiction de risque cardiaque</CardTitle>
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">
//                 Étape {currentStep} sur {totalSteps}
//               </span>
//               <div className="flex space-x-2">
//                 {Array.from({ length: totalSteps }).map((_, index) => (
//                   <div 
//                     key={index} 
//                     className={`h-2 w-2 rounded-full ${
//                       currentStep > index ? 'bg-primary' : 'bg-muted'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//           <Progress value={progress} className="w-full h-2" />
//         </CardHeader>
        
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={handleFormSubmit} className="space-y-6">
//               {currentStep === 1 && <Step1PersonalInfo control={form.control} />}
//               {currentStep === 2 && <Step2HealthHabits control={form.control} />}
              
//               <div className="flex justify-between pt-6">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   onClick={prevStep}
//                   disabled={currentStep === 1 || isLoading}
//                   className="gap-2"
//                 >
//                   <ChevronLeft className="h-4 w-4" />
//                   Précédent
//                 </Button>
                
//                 {currentStep < totalSteps ? (
//                   <Button
//                     type="button"
//                     onClick={nextStep}
//                     disabled={isLoading}
//                     className="gap-2"
//                   >
//                     Suivant
//                     <ChevronRight className="h-4 w-4" />
//                   </Button>
//                 ) : (
//                   <Button 
//                     type="submit" 
//                     disabled={isLoading}
//                     className="bg-primary hover:bg-primary-dark gap-2"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="h-4 w-4 animate-spin" />
//                         Analyse en cours...
//                       </>
//                     ) : "Obtenir ma prédiction"}
//                   </Button>
//                 )}
//               </div>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default PredictionForm;

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { newPredictionSchema, NewPredictionFormData } from "../schemas/newPredictionSchema";
import { useNewPredictionForm } from "../hooks/useNewPredictionForm";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2HealthHabits from "./Step2HealthHabits";
import { toast } from "sonner";

const PredictionForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const { isLoading, onSubmit } = useNewPredictionForm();

  const form = useForm<NewPredictionFormData>({
    resolver: zodResolver(newPredictionSchema),
    defaultValues: {
      age: "",
      sexe: "M",
      poids: "",
      taille: "",
      ville: "Douala",
      environnement: "metropole",
      antecedents_familiaux: "Non",
      diabete_connu: "Non",
      symptomes_diabete: "Non",
      tabac: "Non",
      alcool: "Non",
      activite_physique: "Non",
      sedentarite: "Non",
      stress: "Non",
      sommeil_moins_6h: "Non",
      sommeil_mauvaise_qualite: "Non",
      alimentation_grasse: "Non",
      fruits_legumes: "Non",
      maux_tete: "Non",
      essoufflement: "Non",
      douleurs_poitrine: "Non",
    },
  });

  const progress = (currentStep / totalSteps) * 100;

  const stepValidationFields = {
    1: ["age", "sexe", "poids", "taille", "ville", "environnement", "antecedents_familiaux", "diabete_connu", "symptomes_diabete"],
    2: ["tabac", "alcool", "activite_physique", "sedentarite", "stress", "sommeil_moins_6h", "sommeil_mauvaise_qualite", "alimentation_grasse", "fruits_legumes", "maux_tete", "essoufflement", "douleurs_poitrine"]
  };

  const nextStep = async () => {
    const fields = stepValidationFields[currentStep as keyof typeof stepValidationFields];
    const isValid = await form.trigger(fields);

    if (!isValid) {
      toast.error("Veuillez corriger les erreurs avant de continuer");
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast.success(`Étape ${currentStep + 1}/${totalSteps}`);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // const handleFormSubmit = form.handleSubmit(async (data) => {
  //   console.log("data form:",data);
  //   try {
  //     await onSubmit(data);
  //     toast.success("Prédiction réalisée avec succès");
  //   } catch (error) {
  //     toast.error("Une erreur est survenue lors de la prédiction");
  //     console.error("Erreur de soumission :", error);
  //   }
  // });

  const handleFormSubmit = form.handleSubmit(async (data) => {
  try {
    // Calcul IMC
    const poids = Number(data.poids);
    const taille = Number(data.taille) / 100; // conversion en mètres
    const imc = poids / (taille * taille);

    // Calcul age_risk (exemple : 1 si âge > 60, sinon 0)
    const age_risk = Number(data.age) > 60 ? 1 : 0;

    // Calcul imc_risk (exemple : 1 si IMC > 30, sinon 0)
    const imc_risk = imc > 30 ? 1 : 0;

    // Calcul risk_factor_count (exemple avec quelques facteurs)
    const riskFactors = [
      data.tabac === "Oui",
      data.alcool === "Oui",
      data.diabete_connu === "Oui",
      data.stress === "Oui",
      data.sedentarite === "Oui",
    ];
    const risk_factor_count = riskFactors.filter(Boolean).length;

    // On prépare les données complètes à envoyer
    const dataWithComputedFields = {
      ...data,
      imc,
      age_risk,
      imc_risk,
      risk_factor_count,
    };

    console.log("Données envoyées avec champs calculés:", dataWithComputedFields);

    await onSubmit(dataWithComputedFields);
    toast.success("Prédiction réalisée avec succès");
    navigate("/results")
  } catch (error) {
    toast.error("Une erreur est survenue lors de la prédiction");
    console.error("Erreur de soumission :", error);
  }
});



  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-2">
            <CardTitle className="text-xl font-bold">Prédiction de risque cardiaque</CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Étape {currentStep} sur {totalSteps}
              </span>
              <div className="flex space-x-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      currentStep > index ? "bg-primary" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {currentStep === 1 && <Step1PersonalInfo control={form.control} />}
              {currentStep === 2 && <Step2HealthHabits control={form.control} />}

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={(e) => {
                    e.preventDefault();
                    prevStep();
                  }}
                  disabled={currentStep === 1 || isLoading}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault(); // ← empêche le comportement par défaut
                      nextStep();
                    }}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    Suivant
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary-dark gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      "Obtenir ma prédiction"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionForm;
