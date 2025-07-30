
// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useHistoryStats } from "../hooks/useHistoryStats";
// import EnhancedRiskChart from "@/features/results/components/EnhancedRiskChart";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// const HistoryStats: React.FC = () => {
//   const { monthlyStats, riskDistribution, isLoading, error } = useHistoryStats();

//   const pieData = [
//     { name: "Risque faible", value: riskDistribution.lowRisk, color: "#22c55e" },
//     { name: "Risque moyen", value: riskDistribution.mediumRisk, color: "#f59e0b" },
//     { name: "Risque élevé", value: riskDistribution.highRisk, color: "#ef4444" },
//   ].filter((item) => item.value > 0);

//   if (isLoading) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Chargement des données...</CardDescription>
//         </CardHeader>
//         <CardContent className="h-80 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Impossible de charger les données</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-red-500">{error}</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (monthlyStats.length === 0) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Vos statistiques d'analyse cardiaque</CardDescription>
//         </CardHeader>
//         <CardContent className="h-80 flex flex-col items-center justify-center">
//           <p className="text-muted-foreground text-center mb-4">
//             Pas encore de données disponibles
//           </p>
//           <p className="text-sm text-center">
//             Commencez à utiliser l'outil de prédiction pour voir vos statistiques
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2">
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Analyses mensuelles</CardTitle>
//           <CardDescription>Nombre d'analyses par mois</CardDescription>
//         </CardHeader>
//         <CardContent className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart data={monthlyStats}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Distribution des risques</CardTitle>
//           <CardDescription>Répartition des niveaux de risque</CardDescription>
//         </CardHeader>
//         <CardContent className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle>Évolution du risque cardiaque</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <EnhancedRiskChart riskScore={0.35} />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default HistoryStats;



// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { useHistoryStats } from "../hooks/useHistoryStats";
// import EnhancedRiskChart from "@/features/results/components/EnhancedRiskChart";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "recharts";

// const HistoryStats: React.FC = () => {
//   const { dailyStats, riskDistribution, isLoading, error } = useHistoryStats();

//   const pieData = [
//     { name: "Risque faible", value: riskDistribution.lowRisk, color: "#22c55e" },
//     { name: "Risque moyen", value: riskDistribution.mediumRisk, color: "#f59e0b" },
//     { name: "Risque élevé", value: riskDistribution.highRisk, color: "#ef4444" },
//   ].filter((item) => item.value > 0);

//   // Formatage des dates pour l'affichage
//   const formattedDailyStats = dailyStats.map(stat => ({
//     ...stat,
//     formattedDay: new Date(stat.day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
//   }));

//   if (isLoading) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Chargement des données...</CardDescription>
//         </CardHeader>
//         <CardContent className="min-h-80 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (error) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Impossible de charger les données</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <p className="text-red-500">{error}</p>
//         </CardContent>
//       </Card>
//     );
//   }

//   if (dailyStats.length === 0) {
//     return (
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Statistiques d'historique</CardTitle>
//           <CardDescription>Vos statistiques d'analyse cardiaque</CardDescription>
//         </CardHeader>
//         <CardContent className="min-h-80 flex flex-col items-center justify-center">
//           <p className="text-muted-foreground text-center mb-4">
//             Pas encore de données disponibles
//           </p>
//           <p className="text-sm text-center">
//             Commencez à utiliser l'outil de prédiction pour voir vos statistiques
//           </p>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <div className="grid gap-6">
//       {/* Carte Évolution du risque cardiaque en premier */}
//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>Évolution du risque cardiaque</CardTitle>
//         </CardHeader>
//         <CardContent className="h-[400px]">
//           <EnhancedRiskChart riskScore={0.35} />
//         </CardContent>
//       </Card>

//       {/* Les deux cartes suivantes côte à côte sur écran md+ */}
//       <div className="grid gap-6 md:grid-cols-2">
//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle>Analyses quotidiennes</CardTitle>
//             <CardDescription>Nombre d'analyses par jour</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={formattedDailyStats}
//                 margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
//               >
//                 <XAxis 
//                   dataKey="formattedDay" 
//                   angle={-45} 
//                   textAnchor="end"
//                   height={70}
//                 />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar 
//                   dataKey="count" 
//                   fill="#3b82f6" 
//                   name="Analyses"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>

//         <Card className="w-full">
//           <CardHeader>
//             <CardTitle>Distribution des risques</CardTitle>
//             <CardDescription>Répartition des niveaux de risque</CardDescription>
//           </CardHeader>
//           <CardContent className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={80}
//                   innerRadius={40}
//                   paddingAngle={5}
//                   dataKey="value"
//                   label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default HistoryStats;


import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHistoryStats } from "../hooks/useHistoryStats";
import EnhancedRiskChart from "@/features/results/components/EnhancedRiskChart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const HistoryStats: React.FC = () => {
  const { dailyStats, riskDistribution, isLoading, error } = useHistoryStats();

  const pieData = [
    { name: "Risque faible", value: riskDistribution.lowRisk, color: "#22c55e" },
    { name: "Risque moyen", value: riskDistribution.mediumRisk, color: "#f59e0b" },
    { name: "Risque élevé", value: riskDistribution.highRisk, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  // Formatage des dates pour l'affichage
  const formattedDailyStats = dailyStats.map(stat => ({
    ...stat,
    formattedDay: new Date(stat.day).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
  }));

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Chargement des données...</CardDescription>
        </CardHeader>
        <CardContent className="min-h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Impossible de charger les données</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (dailyStats.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Statistiques d'historique</CardTitle>
          <CardDescription>Vos statistiques d'analyse cardiaque</CardDescription>
        </CardHeader>
        <CardContent className="min-h-80 flex flex-col items-center justify-center">
          <p className="text-muted-foreground text-center mb-4">
            Pas encore de données disponibles
          </p>
          <p className="text-sm text-center">
            Commencez à utiliser l'outil de prédiction pour voir vos statistiques
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Carte Évolution du risque cardiaque */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Évolution du risque cardiaque</CardTitle>
        </CardHeader>
        <CardContent className="">
          <EnhancedRiskChart riskScore={0.35} />
        </CardContent>
      </Card>

      {/* Les deux diagrammes côte à côte */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Diagramme en barres */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Analyses quotidiennes</CardTitle>
            <CardDescription>Nombre d'analyses par jour</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedDailyStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <XAxis 
                  dataKey="formattedDay" 
                  angle={-45} 
                  textAnchor="end"
                  height={70}
                />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="count" 
                  fill="#3b82f6" 
                  name="Analyses"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Diagramme circulaire */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Distribution des risques</CardTitle>
            <CardDescription>Répartition des niveaux de risque</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={40}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HistoryStats;