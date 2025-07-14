
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { HeartPulse, Download, FileText } from "lucide-react";

interface RiskFactorsProps {
  factors: string[];
  patientData?: {
    name?: string;
    age?: number;
    gender?: string;
  };
  inputData?: any;
}

const RiskFactors: React.FC<RiskFactorsProps> = ({ factors, patientData, inputData }) => {
  const generatePDFReport = () => {
    const currentTime = new Date().toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Créer le contenu du rapport
    const reportContent = `
RAPPORT D'ANALYSE CARDIOPREDICT
===============================

Informations Patient:
• Nom: ${patientData?.name || 'Non spécifié'}
• Âge: ${patientData?.age || 'Non spécifié'} ans
• Genre: ${patientData?.gender || 'Non spécifié'}
• Date et heure de l'analyse: ${currentTime}

Données Médicales Saisies:
${inputData ? Object.entries(inputData)
  .filter(([key, value]) => value !== null && value !== undefined && value !== '')
  .map(([key, value]) => `• ${key}: ${value}`)
  .join('\n') : '• Données non disponibles'}

Facteurs de Risque Identifiés:
${factors.length > 0 ? factors.map(factor => `• ${factor}`).join('\n') : '• Aucun facteur de risque majeur identifié'}

Recommandations:
• Consultez un professionnel de la santé pour discuter de ces résultats
• Maintenez un mode de vie sain avec une alimentation équilibrée
• Pratiquez une activité physique régulière adaptée à votre condition
• Surveillez régulièrement votre tension artérielle
• Évitez le tabac et limitez la consommation d'alcool
• Gérez le stress par des techniques de relaxation

Note importante:
Ce rapport ne remplace pas une consultation médicale. Les résultats doivent être 
interprétés par un professionnel de santé qualifié.

---
Généré par CardioPredict - ${currentTime}
    `;

    // Créer et télécharger le fichier
    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `rapport-cardiopredict-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('Rapport PDF généré avec:', {
      patientData,
      inputData,
      factors,
      timestamp: currentTime
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Principaux facteurs de risque</h3>
        <Button onClick={generatePDFReport} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Télécharger le rapport
        </Button>
      </div>
      
      {/* Informations du patient */}
      {patientData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Informations du patient
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sm text-blue-800">
            <div>Nom: {patientData.name || 'Non spécifié'}</div>
            <div>Âge: {patientData.age || 'Non spécifié'} ans</div>
            <div>Genre: {patientData.gender || 'Non spécifié'}</div>
            <div>Date: {new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </div>
      )}
      
      {factors.length > 0 ? (
        <div className="space-y-2">
          {factors.map((factor, index) => (
            <Alert key={index} className="border-l-4 border-l-primary">
              <HeartPulse className="h-4 w-4 text-primary" />
              <AlertTitle>Facteur: {factor}</AlertTitle>
              <AlertDescription>
                Ce facteur contribue significativement à votre niveau de risque cardiaque.
              </AlertDescription>
            </Alert>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Aucun facteur de risque majeur n'a été identifié.</p>
      )}
      
      <div className="mt-6 bg-secondary/10 p-4 rounded-lg border border-secondary/30">
        <h4 className="text-lg font-medium text-primary">Recommandations</h4>
        <div className="mt-2 space-y-1 text-muted-foreground">
          <p>• Consultez un professionnel de la santé pour discuter de ces résultats</p>
          <p>• Maintenez un mode de vie sain avec une alimentation équilibrée</p>
          <p>• Pratiquez une activité physique régulière adaptée à votre condition</p>
          <p>• Surveillez régulièrement votre tension artérielle</p>
          <p>• Évitez le tabac et limitez la consommation d'alcool</p>
        </div>
      </div>
    </div>
  );
};

export default RiskFactors;
