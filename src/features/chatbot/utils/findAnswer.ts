
import { healthKnowledgeBase } from "../types";

export const findAnswer = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  // Score chaque élément de la base de connaissances
  const scoredItems = healthKnowledgeBase.map(item => {
    let score = 0;
    
    // Vérifier les mots-clés exacts
    for (const keyword of item.keywords) {
      if (lowerQuery.includes(keyword.toLowerCase())) {
        score += keyword.length; // Plus le mot-clé est long, plus le score est élevé
      }
    }
    
    // Bonus pour les correspondances multiples
    const matchingKeywords = item.keywords.filter(keyword => 
      lowerQuery.includes(keyword.toLowerCase())
    );
    if (matchingKeywords.length > 1) {
      score += matchingKeywords.length * 2;
    }
    
    return { item, score };
  });
  
  // Trouver la meilleure correspondance
  const bestMatch = scoredItems.reduce((best, current) => 
    current.score > best.score ? current : best
  );
  
  // Si on a trouvé une correspondance décente, la retourner
  if (bestMatch.score > 0) {
    return bestMatch.item.response;
  }
  
  // Réponses contextuelles pour les questions communes sans correspondance exacte
  if (lowerQuery.includes("comment") || lowerQuery.includes("que faire")) {
    return "Je peux vous aider avec des informations sur la prévention des maladies cardiaques, les symptômes, l'alimentation, l'exercice, et bien plus. Posez-moi une question spécifique sur la santé cardiaque !";
  }
  
  if (lowerQuery.includes("docteur") || lowerQuery.includes("médecin")) {
    return "Je peux vous donner des informations générales sur la santé cardiaque, mais pour un diagnostic ou un traitement spécifique, il est important de consulter un médecin. Vous pouvez prendre rendez-vous avec nos cardiologues partenaires via l'onglet 'Médecins'.";
  }
  
  // Réponse par défaut améliorée
  return "Je suis spécialisé dans la santé cardiaque. Vous pouvez me poser des questions sur : la prévention des maladies cardiaques, les symptômes à surveiller, l'alimentation, l'exercice, l'hypertension, le diabète, le cholestérol, ou le stress. Comment puis-je vous aider ?";
};
