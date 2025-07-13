
export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export interface HealthKnowledgeItem {
  keywords: string[];
  response: string;
  category: string;
}

export const healthKnowledgeBase: HealthKnowledgeItem[] = [
  // Prévention et facteurs de risque
  {
    keywords: ["prévention", "prévenir", "éviter", "facteurs de risque", "comment éviter"],
    response: "Pour prévenir les maladies cardiaques : 1) Adoptez une alimentation équilibrée pauvre en sel et en graisses saturées 2) Pratiquez une activité physique régulière (30 min/jour) 3) Arrêtez le tabac 4) Limitez l'alcool 5) Gérez votre stress 6) Surveillez votre tension artérielle, cholestérol et glycémie.",
    category: "prévention"
  },
  
  // Symptômes
  {
    keywords: ["symptômes", "signes", "douleur poitrine", "essoufflement", "fatigue", "palpitations"],
    response: "Les symptômes d'alerte cardiaque incluent : douleur thoracique, essoufflement inhabituel, fatigue extrême, palpitations, nausées, sueurs froides, douleur irradiant vers le bras gauche, la mâchoire ou le dos. En cas de symptômes aigus, consultez immédiatement les urgences.",
    category: "symptômes"
  },
  
  // Hypertension
  {
    keywords: ["hypertension", "tension artérielle", "tension élevée", "hta"],
    response: "L'hypertension artérielle est un facteur majeur de risque cardiovasculaire au Cameroun. Elle est souvent silencieuse. Valeurs normales : <120/80 mmHg. Surveillance régulière recommandée, surtout après 40 ans. Traitement par modification du mode de vie et/ou médicaments.",
    category: "conditions"
  },
  
  // Diabète
  {
    keywords: ["diabète", "glycémie", "sucre", "insuline"],
    response: "Le diabète augmente considérablement le risque de maladies cardiaques. Contrôlez votre glycémie, suivez votre traitement, adoptez une alimentation adaptée et pratiquez une activité physique régulière. Objectif : HbA1c < 7%.",
    category: "conditions"
  },
  
  // Cholestérol
  {
    keywords: ["cholestérol", "lipides", "graisse", "hdl", "ldl"],
    response: "Un taux de cholestérol élevé augmente le risque cardiovasculaire. Privilégiez les graisses insaturées (poisson, huile d'olive, noix), limitez les graisses saturées et trans. Activité physique et parfois médicaments nécessaires.",
    category: "conditions"
  },
  
  // Alimentation
  {
    keywords: ["alimentation", "régime", "nutrition", "manger", "aliments"],
    response: "Régime cardio-protecteur : fruits et légumes (5 portions/jour), poissons gras 2x/semaine, céréales complètes, légumineuses, huile d'olive. Limitez : sel (<5g/jour), sucres ajoutés, viandes transformées, fritures.",
    category: "lifestyle"
  },
  
  // Activité physique
  {
    keywords: ["sport", "exercice", "activité physique", "marche", "course"],
    response: "L'activité physique renforce le cœur : 150 min d'activité modérée/semaine ou 75 min d'activité intense. Commencez progressivement : marche rapide, natation, vélo. Consultez avant de commencer si vous avez des problèmes cardiaques.",
    category: "lifestyle"
  },
  
  // Tabac
  {
    keywords: ["tabac", "cigarette", "fumer", "arrêter fumer"],
    response: "Le tabac multiplie par 2-3 le risque cardiovasculaire. Arrêter réduit immédiatement ce risque. Bénéfices : amélioration de la circulation en 2-12 semaines, risque d'infarctus divisé par 2 en 1 an. Aide disponible : substituts nicotiniques, accompagnement médical.",
    category: "lifestyle"
  },
  
  // Stress
  {
    keywords: ["stress", "anxiété", "tension", "nervosité", "relaxation"],
    response: "Le stress chronique augmente le risque cardiovasculaire. Techniques de gestion : relaxation, méditation, yoga, activité physique, sommeil suffisant (7-8h), organisation du temps, soutien social. N'hésitez pas à consulter si nécessaire.",
    category: "lifestyle"
  },
  
  // Urgences
  {
    keywords: ["urgence", "infarctus", "crise cardiaque", "appeler", "secours"],
    response: "URGENCE CARDIAQUE - Appelez immédiatement le 115 (SAMU) si : douleur thoracique intense persistante, essoufflement sévère, perte de connaissance, sueurs froides avec malaise. En attendant : position demi-assise, desserrer vêtements, rassurer la personne.",
    category: "urgence"
  },
  
  // Examens
  {
    keywords: ["examens", "tests", "électrocardiogramme", "ecg", "échographie", "bilan"],
    response: "Examens cardiaques courants : ECG (activité électrique), échocardiographie (structure et fonction), test d'effort, holter ECG (24h), bilan sanguin (cholestérol, glycémie, troponines). Fréquence selon âge et facteurs de risque.",
    category: "examens"
  },
  
  // Médicaments
  {
    keywords: ["médicaments", "traitement", "pilules", "aspirine", "statines"],
    response: "Médicaments cardiaques courants : antihypertenseurs, statines (cholestérol), antiplaquettaires (aspirine), bêta-bloquants. Respectez les prescriptions, ne jamais arrêter brutalement, signalez les effets secondaires à votre médecin.",
    category: "traitement"
  },
  
  // Âge et genre
  {
    keywords: ["âge", "femme", "homme", "ménopause", "vieillissement"],
    response: "Risque cardiovasculaire augmente avec l'âge. Hommes : risque plus précoce (45 ans). Femmes : protection hormonale jusqu'à la ménopause, puis rattrapage rapide. Surveillance renforcée après 50 ans pour tous.",
    category: "démographie"
  },
  
  // Hérédité
  {
    keywords: ["hérédité", "famille", "génétique", "antécédents familiaux"],
    response: "Antécédents familiaux importants : infarctus ou mort subite chez parent du 1er degré avant 55 ans (homme) ou 65 ans (femme). Surveillance précoce recommandée, dépistage génétique parfois utile.",
    category: "hérédité"
  },
  
  // Sommeil
  {
    keywords: ["sommeil", "dormir", "insomnie", "apnée"],
    response: "Un bon sommeil (7-8h) protège le cœur. L'apnée du sommeil augmente le risque cardiovasculaire. Signes : ronflements, pauses respiratoires, fatigue matinale. Consultez si suspicion d'apnée du sommeil.",
    category: "lifestyle"
  },
  
  // Cameroun spécifique
  {
    keywords: ["cameroun", "afrique", "tropical", "paludisme", "climat"],
    response: "Au Cameroun, vigilance particulière pour : hypertension (très fréquente), diabète en augmentation, infections qui peuvent affecter le cœur. Adaptation aux conditions climatiques, hydratation importante, protection contre le paludisme.",
    category: "contexte local"
  },
  
  // Salutations et politesse
  {
    keywords: ["bonjour", "salut", "bonsoir", "hello", "hey"],
    response: "Bonjour ! Je suis votre assistant santé cardiaque. Je peux vous aider avec des informations sur la prévention des maladies cardiaques, les symptômes à surveiller, et les bonnes habitudes à adopter. Comment puis-je vous aider aujourd'hui ?",
    category: "salutation"
  },
  
  {
    keywords: ["merci", "thanks", "au revoir", "bye"],
    response: "Je vous en prie ! N'hésitez pas à revenir si vous avez d'autres questions sur la santé cardiaque. Prenez soin de votre cœur ! 💝",
    category: "politesse"
  },
  
  // Questions sur l'outil
  {
    keywords: ["cardiopredict", "outil", "intelligence artificielle", "ai", "prédiction"],
    response: "CardioPredict est un outil d'aide à l'évaluation du risque cardiovasculaire utilisant l'intelligence artificielle. Il analyse vos données de santé pour estimer votre risque et propose des recommandations personnalisées. Cet outil complète mais ne remplace pas l'avis médical.",
    category: "outil"
  }
];
