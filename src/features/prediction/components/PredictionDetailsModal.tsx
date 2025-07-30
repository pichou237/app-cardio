import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Heart, AlertTriangle, CheckCircle, FileText } from "lucide-react";

interface PredictionRecord {
  id: string;
  date: Date;
  riskScore: number;
  factors: string[];
  notes?: string;
  recommendations?: string[];
  patientData?: any;
}

interface PredictionDetailsModalProps {
  prediction: PredictionRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

const PredictionDetailsModal: React.FC<PredictionDetailsModalProps> = ({
  prediction,
  isOpen,
  onClose,
}) => {
  if (!prediction) return null;

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { label: "Faible", variant: "secondary" as const, color: "text-green-600" };
    if (score < 0.6) return { label: "Modéré", variant: "default" as const, color: "text-yellow-600" };
    return { label: "Élevé", variant: "destructive" as const, color: "text-red-600" };
  };

  const riskLevel = getRiskLevel(prediction.riskScore);

  const defaultRecommendations = [
    "Consulter un cardiologue dans les 30 jours",
    "Maintenir une activité physique régulière",
    "Adopter une alimentation équilibrée",
    "Surveiller la tension artérielle",
    "Éviter le tabac et l'alcool"
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Heart className="h-6 w-6 text-primary" />
            Détails de l'analyse cardiaque
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* En-tête avec informations principales */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">
                    {format(prediction.date, "dd MMMM yyyy", { locale: fr })}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Analyse effectuée à {format(prediction.date, "HH:mm", { locale: fr })}
                  </p>
                </div>
                <Badge variant={riskLevel.variant} className="text-lg px-4 py-2">
                  {riskLevel.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center">
                  <div className={`text-4xl font-bold ${riskLevel.color}`}>
                    {(prediction.riskScore * 100).toFixed(1)}%
                  </div>
                  <p className="text-muted-foreground">Score de risque cardiaque</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-semibold">
                    {prediction.factors.length}
                  </div>
                  <p className="text-muted-foreground">Facteurs de risque identifiés</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Facteurs de risque */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Facteurs de risque identifiés
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {prediction.factors.map((factor, index) => (
                  <Badge key={index} variant="outline" className="justify-center p-2">
                    {factor}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommandations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Recommandations médicales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {(prediction.recommendations || defaultRecommendations).map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Notes additionnelles */}
          {prediction.notes && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Notes de l'analyse
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{prediction.notes}</p>
              </CardContent>
            </Card>
          )}

          {/* Données du patient (si disponibles) */}
          {prediction.patientData && (
            <Card>
              <CardHeader>
                <CardTitle>Données utilisées pour l'analyse</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Âge:</span> {prediction.patientData.age} ans
                  </div>
                  <div>
                    <span className="font-medium">Sexe:</span> {prediction.patientData.sexe === "M" ? "Masculin" : "Féminin"}
                  </div>
                  {prediction.patientData.poids && (
                    <div>
                      <span className="font-medium">Poids:</span> {prediction.patientData.poids} kg
                    </div>
                  )}
                  {prediction.patientData.taille && (
                    <div>
                      <span className="font-medium">Taille:</span> {prediction.patientData.taille} cm
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PredictionDetailsModal;