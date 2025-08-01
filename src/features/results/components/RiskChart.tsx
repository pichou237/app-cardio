
// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// interface RiskChartProps {
//   riskScore: number;
// }

// const RiskChart: React.FC<RiskChartProps> = ({ riskScore }) => {
//   // Assurer que le riskScore est entre 0 et 1
//   // const normalizedRiskScore = Math.min(1, Math.max(0, riskScore));
//     const normalizedRiskScore = riskScore;

//   const data = [
//     { name: "Risque", value: normalizedRiskScore },
//     { name: "Sécurité", value: 100 - normalizedRiskScore },
//   ];

//   // Couleurs pour les segments - utilisation de couleurs médicales
//   const COLORS = ["#ef4444", "#10b981"];

//   // Détermine le niveau de risque
//   const getRiskLevel = (score: number) => {
//     if (score < 30) return "Faible";
//     if (score < 60) return "Modéré";
//     return "Élevé";
//   };

//   // Obtenir la couleur principale basée sur le niveau de risque
//   const getRiskColor = (score: number) => {
//     if (score < 30) return "#10b981"; // vert
//     if (score < 60) return "#f59e0b"; // orange
//     return "#ef4444"; // rouge
//   };

//   return (
//     <div className="w-full h-96 bg-white rounded-lg p-4 border shadow-md">
//       <h3 className="text-xl font-semibold mb-4 text-center text-primary">Niveau de risque cardiaque</h3>
//       <div className="text-center mb-6">
//         <span className="text-4xl font-bold" style={{ color: getRiskColor(normalizedRiskScore) }}>
//           {(normalizedRiskScore).toFixed(2)}%
//         </span>
//         <p className="text-lg font-medium text-muted-foreground">
//           Risque {getRiskLevel(normalizedRiskScore)}
//         </p>
//       </div>
//       <ResponsiveContainer width="100%" height="60%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >
//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(1)}%`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RiskChart;

// import React from "react";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// interface RiskChartProps {
//   riskScore: number;   // Exemple : 72
//   riskLevel: "Faible" | "Modéré" | "Élevé";
// }

// const RiskChart: React.FC<RiskChartProps> = ({ riskScore, riskLevel }) => {
//   // Conserver le score tel quel (entre 0 et 100)
//   const normalizedRiskScore = riskScore;

//   // Définir la couleur en fonction du niveau de risque
//   const getRiskColor = (level: string) => {
//     switch (level) {
//       case "Faible":
//         return "#10b981"; // vert
//       case "Modéré":
//         return "#f59e0b"; // orange
//       case "Élevé":
//         return "#ef4444"; // rouge
//       default:
//         return "#6b7280"; // gris par défaut
//     }
//   };

//   const data = [
//     { name: "Risque", value: 100 -normalizedRiskScore },
//     { name: "Sécurité", value: normalizedRiskScore },
//   ];

//   const COLORS = [getRiskColor(riskLevel), "#e5e7eb"]; // Couleur du risque, puis fond gris clair

//   return (
//     <div className="w-full h-96 bg-white rounded-lg p-4 border shadow-md">
//       <h3 className="text-xl font-semibold mb-4 text-center text-primary">
//         Niveau de risque cardiaque
//       </h3>
//       <div className="text-center mb-6">
//         <span className="text-4xl font-bold" style={{ color: getRiskColor(riskLevel) }}>
//           {normalizedRiskScore.toFixed(2)}%
//         </span>
//         <p className="text-lg font-medium text-muted-foreground">
//           Risque {riskLevel}
//         </p>
//       </div>
//       <ResponsiveContainer width="100%" height="60%">
//         <PieChart>
//           <Pie
//             data={data}
//             cx="50%"
//             cy="50%"
//             labelLine={false}
//             label={({ name, value }) => `${name}: ${value.toFixed(0)}%`}
//             outerRadius={80}
//             fill="#8884d8"
//             dataKey="value"
//           >

//             {data.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default RiskChart;


import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface RiskChartProps {
  riskScore: number;   // Exemple : 72
  riskLevel: "Faible" | "Modéré" | "Élevé";
}

const RiskChart: React.FC<RiskChartProps> = ({ riskScore, riskLevel }) => {
  const normalizedRiskScore = riskScore;

  const getRiskColor = (level: string) => {
    switch (level) {
      case "Faible":
        return "#10b981"; // vert
      case "Modéré":
        return "#f59e0b"; // orange
      case "Élevé":
        return "#ef4444"; // rouge
      default:
        return "#6b7280"; // gris
    }
  };

  const data = [
    { name: "Sécurité", value: 100 - normalizedRiskScore },
    { name: "Risque", value:  normalizedRiskScore },
  ];

  const COLORS = ["#1f64efff", getRiskColor(riskLevel)]; // gris pour sécurité, couleur dynamique pour risque

  return (
    <div className="w-full h-96 bg-white rounded-lg p-4 border shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-center text-primary">
        Niveau de risque cardiaque
      </h3>

      <div className="text-center mb-6">
        <span className="text-4xl font-bold" style={{ color: getRiskColor(riskLevel) }}>
          {normalizedRiskScore.toFixed(2)}%
        </span>
        <p className="text-lg font-medium text-muted-foreground">
          Risque {riskLevel}
        </p>
      </div>

      <ResponsiveContainer width="100%" height="60%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskChart;
