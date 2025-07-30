import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, TrendingDown, Eye, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import PredictionDetailsModal from "./PredictionDetailsModal";
import { useHistoryStats } from "../hooks/useHistoryStats";

interface PredictionRecord {
  id: string;
  date: Date;
  riskScore: number;
  factors: string[];
  notes?: string;
  recommendations?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patientData?: any;
}

const PredictionHistory: React.FC = () => {
  const [predictions, setPredictions] = useState<PredictionRecord[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<PredictionRecord | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { dailyStats, riskDistribution, isLoading, error } = useHistoryStats();
  

  useEffect(() => {
    // Simuler des données d'historique
    const mockHistory: PredictionRecord[] = [
      {
        id: "1",
        date: new Date(2025, 10, 15),
        riskScore: 0.35,
        factors: ["Hypertension", "Cholestérol élevé", "Âge avancé"],
        notes: "Première évaluation cardiaque",
        recommendations: [
          "Consulter un cardiologue dans les 15 jours",
          "Réduire la consommation de sel",
          "Pratiquer 30 minutes d'exercice par jour"
        ],
        patientData: { age: "65", sexe: "M", poids: "85", taille: "175" }
      },
      {
        id: "2", 
        date: new Date(2025, 1, 20),
        riskScore: 0.28,
        factors: ["Hypertension", "Stress"],
        notes: "Amélioration du cholestérol grâce au traitement",
        recommendations: [
          "Continuer le traitement actuel",
          "Surveillance mensuelle de la tension",
          "Techniques de gestion du stress"
        ],
        patientData: { age: "65", sexe: "M", poids: "83", taille: "175" }
      },
      {
        id: "3",
        date: new Date(2025, 2, 10),
        riskScore: 0.32,
        factors: ["Hypertension", "Stress", "Sédentarité"],
        notes: "Période de stress au travail, diminution de l'activité physique",
        recommendations: [
          "Reprendre une activité physique progressive",
          "Consultation avec un psychologue pour le stress",
          "Ajustement du traitement antihypertenseur"
        ],
        patientData: { age: "65", sexe: "M", poids: "85", taille: "175" }
      }
    ];
    
    setPredictions(mockHistory.sort((a, b) => b.date.getTime() - a.date.getTime()));
  }, []);

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { label: "Faible", variant: "secondary" as const };
    if (score < 0.6) return { label: "Modéré", variant: "default" as const };
    return { label: "Élevé", variant: "destructive" as const };
  };

  const getTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: "text-red-500" };
    if (current < previous) return { icon: TrendingDown, color: "text-green-500" };
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Historique des prédictions</h2>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      {predictions.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">Aucune prédiction dans l'historique</p>
            <Button className="mt-4" asChild>
              <a href="/prediction">Effectuer une première analyse</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {predictions.map((prediction, index) => {
            const riskLevel = getRiskLevel(prediction.riskScore);
            const previousPrediction = predictions[index + 1];
            const trend = previousPrediction ? getTrend(prediction.riskScore, previousPrediction.riskScore) : null;
            
            return (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">
                          {format(prediction.date, "dd MMMM yyyy", { locale: fr })}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {format(prediction.date, "HH:mm", { locale: fr })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {trend && (
                        <trend.icon className={`h-5 w-5 ${trend.color}`} />
                      )}
                      <Badge variant={riskLevel.variant}>
                        {riskLevel.label}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Score de risque</p>
                      <p className="text-2xl font-bold text-primary">
                        {(prediction.riskScore * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Facteurs identifiés</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {prediction.factors.map((factor, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-end justify-end">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedPrediction(prediction);
                          setIsModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Voir détails
                      </Button>
                    </div>
                  </div>
                  {prediction.notes && (
                    <div className="mt-3 p-3 bg-muted/50 rounded-md">
                      <p className="text-sm text-muted-foreground">{prediction.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <PredictionDetailsModal
        prediction={selectedPrediction}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPrediction(null);
        }}
      />
    </div>
  );
};

export default PredictionHistory;