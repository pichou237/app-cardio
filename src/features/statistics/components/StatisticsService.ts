export const StatisticsService = {
  async getPredictionStatsByUser(apiKey: string) {
    const response = await fetch(`https://api-appcardio-predict.onrender.com/api/statistics/user?api_key=${apiKey}`);
    if (!response.ok) throw new Error("Erreur statistiques utilisateur");
    return response.json();
  }
};
