import React from "react";
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Activity } from "lucide-react";

interface EnhancedRiskChartProps {
  riskScore: number;
}

const EnhancedRiskChart: React.FC<EnhancedRiskChartProps> = ({ riskScore }) => {
  const normalizedRiskScore = Math.min(1, Math.max(0, riskScore));
  
  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { label: "Faible", variant: "secondary" as const, color: "text-green-600" };
    if (score < 0.6) return { label: "Modéré", variant: "default" as const, color: "text-yellow-600" };
    return { label: "Élevé", variant: "destructive" as const, color: "text-red-600" };
  };

  const riskLevel = getRiskLevel(normalizedRiskScore);

  // Données d'évolution simulée
  const evolutionData = [
    { month: 'Jan', risk: 45 },
    { month: 'Fév', risk: 38 },
    { month: 'Mar', risk: 42 },
    { month: 'Avr', risk: normalizedRiskScore * 100 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Score principal simplifié */}
      <Card className="lg:col-span-2">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Heart className="h-6 w-6" />
            Votre score de risque cardiaque
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className={`text-6xl font-bold mb-4 ${riskLevel.color}`}>
            {(normalizedRiskScore * 100).toFixed(0)}%
          </div>
          <Badge variant={riskLevel.variant} className="text-lg px-4 py-2 mb-4">
            Risque {riskLevel.label}
          </Badge>
          <p className="text-muted-foreground">
            Basé sur vos données personnelles et facteurs de santé
          </p>
        </CardContent>
      </Card>

      {/* Évolution temporelle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Évolution récente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={evolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Risque']}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <Area 
                type="monotone" 
                dataKey="risk" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Indicateurs de santé */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Indicateurs clés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Tension artérielle</span>
            <Badge variant="outline">Normal</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Cholestérol</span>
            <Badge variant="secondary">À surveiller</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Activité physique</span>
            <Badge variant="destructive">Insuffisant</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">IMC</span>
            <Badge variant="outline">Normal</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedRiskChart;