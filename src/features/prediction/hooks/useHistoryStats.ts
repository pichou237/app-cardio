
// import { useState, useEffect } from "react";
// import { usePredictionHistory } from "./usePredictionHistory";

// interface MonthlyStats {
//   month: string;
//   count: number;
// }

// interface RiskDistribution {
//   lowRisk: number;
//   mediumRisk: number;
//   highRisk: number;
// }

// export const useHistoryStats = () => {
//   const { historyData, isLoading, error } = usePredictionHistory();
//   const history = usePredictionHistory().history;
//   console.log("history:",history);
//   const [monthlyStats, setMonthlyStats] = useState<MonthlyStats[]>([]);
//   const [riskDistribution, setRiskDistribution] = useState<RiskDistribution>({
//     lowRisk: 0,
//     mediumRisk: 0,
//     highRisk: 0,
//   });

//   useEffect(() => {
//     if (!isLoading && !error && history.length > 0) {
//       // Process monthly data
//       const monthlyData: { [key: string]: number } = {};
      
//       // Process risk distribution
//       let lowRisk = 0;
//       let mediumRisk = 0;
//       let highRisk = 0;
      
//       history.forEach((entry) => {
//         // Format date for monthly stats
//         const date = new Date(entry.timestamp);
//         const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        
//         if (monthlyData[monthYear]) {
//           monthlyData[monthYear]++;
//         } else {
//           monthlyData[monthYear] = 1;
//         }
        
//         // Calculate risk distribution
//         if (entry.prediction < 30) {
//           lowRisk++;
//         } else if (entry.prediction < 70) {
//           mediumRisk++;
//         } else {
//           highRisk++;
//         }
//       });
      
//       // Convert monthly data to array format for charts
//       const formattedMonthlyStats = Object.entries(monthlyData).map(([month, count]) => ({
//         month,
//         count,
//       }));
      
//       setMonthlyStats(formattedMonthlyStats);
//       setRiskDistribution({ lowRisk, mediumRisk, highRisk });
//     }
//   }, [history, isLoading, error]);
  
//   return {
//     monthlyStats,
//     riskDistribution,
//     isLoading,
//     error,
//   };
// };


import { useState, useEffect } from "react";
import { usePredictionHistory } from "./usePredictionHistory";

interface DailyStats {
  day: string;
  count: number;
}

interface RiskDistribution {
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
}

export const useHistoryStats = () => {
  const { historyData, isLoading, error } = usePredictionHistory();
  const history = usePredictionHistory().history;
  console.log("history:", history);
  
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
  const [riskDistribution, setRiskDistribution] = useState<RiskDistribution>({
    lowRisk: 0,
    mediumRisk: 0,
    highRisk: 0,
  });

  useEffect(() => {
    if (!isLoading && !error && history.length > 0) {
      // Process daily data
      const dailyData: { [key: string]: number } = {};
      
      // Process risk distribution
      let lowRisk = 0;
      let mediumRisk = 0;
      let highRisk = 0;
      
      history.forEach((entry) => {
        // Format date for daily stats (YYYY-MM-DD format)
        const date = new Date(entry.timestamp);
        const dayKey = date.toISOString().split('T')[0];
        
        if (dailyData[dayKey]) {
          dailyData[dayKey]++;
        } else {
          dailyData[dayKey] = 1;
        }
        
        // Calculate risk distribution
        if (entry.prediction < 30) {
          lowRisk++;
        } else if (entry.prediction < 70) {
          mediumRisk++;
        } else {
          highRisk++;
        }
      });
      
      // Convert daily data to array format for charts
      const formattedDailyStats = Object.entries(dailyData)
        .map(([day, count]) => ({
          day,
          count,
        }))
        // Sort by date (most recent first)
        .sort((a, b) => new Date(b.day).getTime() - new Date(a.day).getTime());
      
      setDailyStats(formattedDailyStats);
      setRiskDistribution({ lowRisk, mediumRisk, highRisk });
    }
  }, [history, isLoading, error]);
  
  return {
    dailyStats,
    riskDistribution,
    isLoading,
    error,
  };
};