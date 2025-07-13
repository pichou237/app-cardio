
import { knowledgeBase } from '../types';

export const findAnswer = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Recherche par mots-clés dans la base de connaissances
  for (const item of knowledgeBase) {
    const hasKeyword = item.keywords.some(keyword => 
      message.includes(keyword.toLowerCase())
    );
    
    if (hasKeyword) {
      return item.answer;
    }
  }
  
  // Réponses pour les salutations
  if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
    return "Bonjour ! Je suis votre assistant CardioPredict. Je peux répondre à vos questions sur la santé cardiaque, la prévention, les symptômes et plus encore. Comment puis-je vous aider ?";
  }
  
  if (message.includes('merci')) {
    return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions sur la santé cardiovasculaire.";
  }
  
  // Réponse par défaut
  return "Je ne suis pas sûr de comprendre votre question. Pouvez-vous me demander quelque chose sur la santé cardiaque, la prévention, les symptômes, ou l'utilisation de CardioPredict ? Par exemple : 'Comment prévenir les maladies cardiaques ?' ou 'Quels sont les symptômes d'une crise cardiaque ?'";
};
