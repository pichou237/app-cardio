
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { HeartPulse, Download, FileText } from "lucide-react";
import jsPDF from "jspdf";

interface RiskFactorsProps {
  factors: string[];
  patientData?: {
    name?: string;
    age?: number;
    gender?: string;
  };
  inputData?: any;
  riskScore?: number;
  riskLevel?: string;
}

const RiskFactors: React.FC<RiskFactorsProps> = ({ factors, patientData, inputData, riskScore, riskLevel }) => {
  const generatePDFReport = () => {
    const currentTime = new Date().toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Créer un nouveau document PDF
    const doc = new jsPDF();
    
    // Titre
    doc.setFontSize(20);
    doc.text('RAPPORT D\'ANALYSE CARDIOPREDICT', 20, 20);
    
    // Ligne de séparation
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    
    let yPosition = 40;
    
    // Informations du patient
    doc.setFontSize(16);
    doc.text('Informations Patient:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    doc.text(`Nom: ${patientData?.name || 'Non spécifié'}`, 25, yPosition);
    yPosition += 7;
    doc.text(`Âge: ${patientData?.age || 'Non spécifié'} ans`, 25, yPosition);
    yPosition += 7;
    doc.text(`Genre: ${patientData?.gender || 'Non spécifié'}`, 25, yPosition);
    yPosition += 7;
    doc.text(`Date et heure: ${currentTime}`, 25, yPosition);
    yPosition += 15;
    
    // Score de risque
    if (riskScore !== undefined) {
      doc.setFontSize(16);
      doc.text('Résultat de l\'Analyse:', 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      doc.text(`Score de risque: ${riskScore}%`, 25, yPosition);
      yPosition += 7;
      doc.text(`Niveau de risque: ${riskLevel || 'Non déterminé'}`, 25, yPosition);
      yPosition += 15;
    }
    
    // Données médicales saisies
    doc.setFontSize(16);
    doc.text('Données Médicales Saisies:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    if (inputData) {
      const medicalData = Object.entries(inputData)
        .filter(([key, value]) => value !== null && value !== undefined && value !== '');
      
      medicalData.forEach(([key, value]) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${key}: ${value}`, 25, yPosition);
        yPosition += 5;
      });
    } else {
      doc.text('• Données non disponibles', 25, yPosition);
      yPosition += 5;
    }
    
    yPosition += 10;
    
    // Facteurs de risque
    doc.setFontSize(16);
    doc.text('Facteurs de Risque Identifiés:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    if (factors.length > 0) {
      factors.forEach(factor => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }
        doc.text(`• ${factor}`, 25, yPosition);
        yPosition += 7;
      });
    } else {
      doc.text('• Aucun facteur de risque majeur identifié', 25, yPosition);
      yPosition += 7;
    }
    
    yPosition += 15;
    
    // Recommandations
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(16);
    doc.text('Recommandations:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(12);
    const recommendations = [
      'Consultez un professionnel de la santé pour discuter de ces résultats',
      'Maintenez un mode de vie sain avec une alimentation équilibrée',
      'Pratiquez une activité physique régulière adaptée à votre condition',
      'Surveillez régulièrement votre tension artérielle',
      'Évitez le tabac et limitez la consommation d\'alcool',
      'Gérez le stress par des techniques de relaxation'
    ];
    
    recommendations.forEach(rec => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(`• ${rec}`, 25, yPosition);
      yPosition += 7;
    });
    
    // Note importante
    yPosition += 15;
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFontSize(14);
    doc.text('Note importante:', 20, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    const noteText = 'Ce rapport ne remplace pas une consultation médicale. Les résultats doivent être interprétés par un professionnel de santé qualifié.';
    const splitNote = doc.splitTextToSize(noteText, 170);
    doc.text(splitNote, 20, yPosition);
    
    // Pied de page
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text(`Généré par CardioPredict - ${currentTime}`, 20, 290);
      doc.text(`Page ${i} sur ${pageCount}`, 170, 290);
    }
    
    // Télécharger le PDF
    doc.save(`rapport-cardiopredict-${new Date().toISOString().split('T')[0]}.pdf`);
    
    console.log('Rapport PDF généré avec:', {
      patientData,
      inputData,
      factors,
      riskScore,
      riskLevel,
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
