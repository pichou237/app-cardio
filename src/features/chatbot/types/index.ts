
export interface Message {
  id: string;
  text: string;
  role: 'user' | 'bot';
  timestamp: Date;
}

export interface KnowledgeItem {
  question: string;
  answer: string;
  keywords: string[];
  category: string;
}

export const knowledgeBase: KnowledgeItem[] = [
  // Prévention des maladies cardiaques
  {
    question: "Comment prévenir les maladies cardiaques ?",
    answer: "Pour prévenir les maladies cardiaques : adoptez une alimentation équilibrée riche en fruits et légumes, pratiquez une activité physique régulière (30 min/jour), évitez le tabac et l'excès d'alcool, gérez votre stress, maintenez un poids santé, et faites des contrôles médicaux réguliers.",
    keywords: ["prévention", "prévenir", "éviter", "protection"],
    category: "prévention"
  },
  {
    question: "Quels aliments sont bons pour le cœur ?",
    answer: "Les aliments bons pour le cœur incluent : les poissons gras (saumon, sardines), les fruits et légumes frais, les noix et graines, l'huile d'olive, les légumineuses, l'avoine, et les fruits rouges. Évitez les aliments transformés, trop salés ou sucrés.",
    keywords: ["alimentation", "nourriture", "manger", "régime", "aliments"],
    category: "nutrition"
  },
  
  // Symptômes et signes d'alerte
  {
    question: "Quels sont les symptômes d'une crise cardiaque ?",
    answer: "Les symptômes d'une crise cardiaque incluent : douleur thoracique intense, essoufflement, nausées, transpiration excessive, douleur irradiant vers le bras gauche, la mâchoire ou le dos. En cas de doute, appelez immédiatement les secours (15 ou 112).",
    keywords: ["symptômes", "crise cardiaque", "infarctus", "douleur", "urgence"],
    category: "urgence"
  },
  {
    question: "Comment reconnaître l'hypertension ?",
    answer: "L'hypertension est souvent silencieuse. Symptômes possibles : maux de tête fréquents, vertiges, fatigue, vision floue, saignements de nez. Une tension normale est inférieure à 140/90 mmHg. Faites-vous contrôler régulièrement.",
    keywords: ["hypertension", "tension", "pression artérielle"],
    category: "diagnostic"
  },

  // Facteurs de risque
  {
    question: "Quels sont les facteurs de risque cardiovasculaire ?",
    answer: "Les principaux facteurs de risque sont : l'âge, le sexe masculin, les antécédents familiaux, le tabagisme, l'hypertension, le diabète, l'obésité, la sédentarité, le stress chronique, et un taux de cholestérol élevé.",
    keywords: ["facteurs de risque", "risque", "cardiovasculaire"],
    category: "risque"
  },

  // Traitements et médicaments
  {
    question: "Comment traiter l'hypertension ?",
    answer: "Le traitement de l'hypertension combine : changements de mode de vie (alimentation, exercice, réduction du sel), médicaments antihypertenseurs si nécessaire, suivi médical régulier, et gestion du stress. Ne jamais arrêter un traitement sans avis médical.",
    keywords: ["traitement", "hypertension", "médicaments"],
    category: "traitement"
  },

  // Activité physique
  {
    question: "Quel sport pratiquer pour le cœur ?",
    answer: "Les meilleurs sports pour le cœur sont : la marche rapide, la course à pied, la natation, le vélo, la danse. Commencez progressivement, 30 minutes d'activité modérée 5 fois par semaine. Consultez votre médecin avant de débuter.",
    keywords: ["sport", "exercice", "activité physique", "cardio"],
    category: "exercice"
  },

  // Stress et santé mentale
  {
    question: "Le stress peut-il causer des problèmes cardiaques ?",
    answer: "Oui, le stress chronique augmente le risque cardiovasculaire en élevant la pression artérielle, en favorisant l'inflammation et les comportements à risque. Techniques de gestion : relaxation, méditation, exercice, sommeil suffisant.",
    keywords: ["stress", "anxiété", "mental", "émotions"],
    category: "bien-être"
  },

  // Questions spécifiques au Cameroun
  {
    question: "Quelles sont les principales causes de maladies cardiaques au Cameroun ?",
    answer: "Au Cameroun, les principales causes sont : l'hypertension artérielle (très fréquente), le changement des habitudes alimentaires vers une alimentation plus riche, la sédentarité croissante en milieu urbain, le diabète en augmentation, et parfois des facteurs génétiques.",
    keywords: ["Cameroun", "Afrique", "causes", "épidémiologie"],
    category: "contexte-local"
  },

  // Informations générales
  {
    question: "Qu'est-ce que CardioPredict ?",
    answer: "CardioPredict est une plateforme d'intelligence artificielle qui évalue votre risque de maladie cardiaque. Elle analyse vos données médicales pour fournir une prédiction personnalisée et des recommandations de prévention adaptées au contexte camerounais.",
    keywords: ["CardioPredict", "plateforme", "IA", "prédiction"],
    category: "plateforme"
  }
];
