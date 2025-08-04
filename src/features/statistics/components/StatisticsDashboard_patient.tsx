import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatisticsService } from "./StatisticsService";

const StatisticsDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [predictionStats, setPredictionStats] = useState({
    totalPredictions: 0,
    monthlyPredictions: 0,
    dailyPredictions: 0,
    averageRisk: 0,
    lastPrediction: null,
    lastPredictionTime: null,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const apiKey = localStorage.getItem("api_key");
        if (!apiKey) throw new Error("Clé API non trouvée");

        const predictions = await StatisticsService.getPredictionStatsByUser(apiKey);
        setPredictionStats(predictions);
        console.log("predictions:",predictions);
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-bold"></h2>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-5 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Prédictions Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.totalPredictions}</div>
              <p className="text-xs text-muted-foreground">
                Analyses effectuées depuis le lancement
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Prédictions ce mois
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.monthlyPredictions}</div>
              <div className="mt-2">
                <Progress
                  value={Math.min((predictionStats.monthlyPredictions / 100) * 100, 100)}
                  className="h-2"
                />
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                {predictionStats.dailyPredictions} aujourd&apos;hui
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Risque Moyen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{predictionStats.averageRisk}%</div>
              <div className="mt-2">
                <Progress
                  value={predictionStats.averageRisk}
                  className={`h-2 ${predictionStats.averageRisk > 50 ? "bg-red-500" : "bg-amber-500"}`}
                />
              </div>
              <p className="text-xs mt-1 text-muted-foreground">
                Moyenne des prédictions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Dernière Prédiction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {predictionStats.lastPrediction !== null ? `${predictionStats.lastPrediction}%` : "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                {predictionStats.lastPredictionTime
                  ? `Le ${new Date(predictionStats.lastPredictionTime).toLocaleString("fr-FR")}`
                  : "Aucune prédiction"}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StatisticsDashboard;
