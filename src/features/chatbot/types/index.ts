
// export interface Message {
//   id: string;
//   content: string;
//   role: "user" | "assistant";
//   timestamp: Date;
// }

// export const healthKnowledgeBase = [
//   {
//     keywords: ["alimentation", "manger", "nourriture", "repas", "régime"],
//     response: "Pour une bonne santé cardiaque, privilégiez une alimentation riche en fruits, légumes, grains entiers et poissons. Limitez les graisses saturées, le sel et les sucres raffinés."
//   },
//   {
//     keywords: ["exercice", "sport", "activité", "physique", "bouger", "marcher"],
//     response: "L'activité physique est essentielle pour la santé cardiaque. Visez au moins 150 minutes d'activité modérée par semaine. Même de courtes marches quotidiennes peuvent faire une différence significative."
//   },
//   {
//     keywords: ["stress", "anxiété", "tension", "détendre", "relaxation"],
//     response: "Le stress chronique peut nuire à votre santé cardiovasculaire. Essayez des techniques de relaxation comme la méditation, la respiration profonde ou le yoga pour réduire votre niveau de stress."
//   },
//   {
//     keywords: ["sommeil", "dormir", "repos", "nuit", "coucher"],
//     response: "Un bon sommeil est crucial pour votre santé cardiaque. Visez 7-8 heures de sommeil par nuit et maintenez un horaire de sommeil régulier."
//   },
//   {
//     keywords: ["tabac", "cigarette", "fumer", "nicotine"],
//     response: "Le tabagisme est l'un des facteurs de risque les plus importants pour les maladies cardiovasculaires. Arrêter de fumer est l'une des meilleures choses que vous puissiez faire pour votre cœur."
//   },
//   {
//     keywords: ["alcool", "boire", "vin", "bière"],
//     response: "La consommation excessive d'alcool peut augmenter votre pression artérielle et ajouter des calories inutiles. Si vous buvez, faites-le avec modération."
//   },
//   {
//     keywords: ["pression", "tension", "artérielle", "hypertension"],
//     response: "Une pression artérielle élevée peut endommager votre cœur silencieusement. Faites-la vérifier régulièrement et suivez les recommandations de votre médecin pour la maintenir dans des limites normales."
//   },
//   {
//     keywords: ["cholestérol", "lipides", "triglycérides", "gras", "hdl", "ldl"],
//     response: "Un taux de cholestérol élevé peut boucher vos artères. Adoptez une alimentation saine, faites de l'exercice régulièrement et prenez les médicaments prescrits par votre médecin si nécessaire."
//   },
//   {
//     keywords: ["diabète", "sucre", "glycémie"],
//     response: "Le diabète augmente significativement votre risque de maladie cardiaque. Maintenir une glycémie équilibrée est crucial pour votre santé cardiovasculaire."
//   },
//   {
//     keywords: ["poids", "obésité", "maigrir", "régime", "mincir"],
//     response: "Maintenir un poids santé réduit la charge sur votre cœur. Même une perte de poids modeste peut améliorer votre santé cardiovasculaire si vous êtes en surpoids."
//   }
// ];


export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
  metadata?: {
    source?: string;
    confidence?: number;
    suggestedActions?: string[];
    relatedTopics?: string[];
  };
}

export interface HealthKnowledgeEntry {
  keywords: string[];
  response: string;
  category: "nutrition" | "activity" | "mental" | "habits" | "biometrics";
  priority: number;
  sources?: string[];
  followUpQuestions?: string[];
}

export const healthKnowledgeBase: HealthKnowledgeEntry[] = [
  {
    keywords: ["alimentation", "manger", "nourriture", "repas", "régime", "nutrition", "aliments"],
    response: "Pour une bonne santé cardiaque, privilégiez une alimentation riche en fruits, légumes, grains entiers et poissons. Limitez les graisses saturées, le sel et les sucres raffinés. Le régime méditerranéen est particulièrement recommandé pour la santé cardiovasculaire.",
    category: "nutrition",
    priority: 1,
    sources: ["OMS", "American Heart Association"],
    followUpQuestions: [
      "Quels sont les aliments les plus bénéfiques pour le cœur?",
      "Comment préparer des repas équilibrés?"
    ]
  },
  {
    keywords: ["exercice", "sport", "activité", "physique", "bouger", "marcher", "entraînement", "cardio"],
    response: "L'activité physique est essentielle pour la santé cardiaque. Visez au moins 150 minutes d'activité modérée (comme la marche rapide) ou 75 minutes d'activité intense par semaine. Les exercices d'aérobic comme la natation ou le vélo sont particulièrement bénéfiques.",
    category: "activity",
    priority: 1,
    sources: ["WHO Guidelines on Physical Activity"],
    followUpQuestions: [
      "Quels exercices sont recommandés pour les débutants?",
      "Comment intégrer plus d'activité dans ma journée?"
    ]
  },
  {
    keywords: ["stress", "anxiété", "tension", "détendre", "relaxation", "émotions", "anxieux"],
    response: "Le stress chronique peut augmenter votre pression artérielle et nuire à votre santé cardiovasculaire. Techniques recommandées : méditation (10-15 min/jour), respiration 4-7-8 (inspirer 4s, retenir 7s, expirer 8s), journaling ou activités créatives. Consultez un professionnel si le stress persiste.",
    category: "mental",
    priority: 2,
    followUpQuestions: [
      "Pouvez-vous expliquer la technique de respiration 4-7-8?",
      "Comment savoir si mon niveau de stress est problématique?"
    ]
  },
  {
    keywords: ["sommeil", "dormir", "repos", "nuit", "coucher", "insomnie", "fatigue"],
    response: "Un sommeil de qualité (7-9h/nuit pour les adultes) permet la régénération cardiovasculaire. Conseils : routine régulière, chambre à 18-20°C, pas d'écrans 1h avant, éviter caféine après 14h. L'apnée du sommeil non traitée augmente les risques cardiaques.",
    category: "habits",
    priority: 2,
    sources: ["National Sleep Foundation"],
    followUpQuestions: [
      "Que faire si je me réveille souvent la nuit?",
      "Les siestes sont-elles bénéfiques?"
    ]
  },
  {
    keywords: ["tabac", "cigarette", "fumer", "nicotine", "vapoter", "arrêter"],
    response: "Le tabagisme endommage les vaisseaux sanguins, réduit l'oxygénation et double le risque d'AVC. Après l'arrêt : 20 min = tension normalisée, 1 an = risque cardiaque divisé par 2. Solutions : substituts nicotiniques, thérapies comportementales, applications d'aide.",
    category: "habits",
    priority: 1,
    sources: ["CDC Smoking Cessation Guidelines"],
    followUpQuestions: [
      "Quelles sont les méthodes les plus efficaces pour arrêter?",
      "Comment gérer les envies de fumer?"
    ]
  },
  {
    keywords: ["alcool", "boire", "vin", "bière", "spiritueux", "consommation"],
    response: "Recommandations : max 2 verres/jour pour les hommes, 1 pour les femmes (1 verre = 10g d'alcool). L'excès augmente pression artérielle, triglycérides et risque d'arythmie. Les bienfaits du vin rouge sont controversés - préférez les raisins pour les polyphénols.",
    category: "habits",
    priority: 2,
    followUpQuestions: [
      "Y a-t-il des alcools moins nocifs que d'autres?",
      "Comment réduire ma consommation?"
    ]
  },
  {
    keywords: ["pression", "tension", "artérielle", "hypertension", "hypotension", "mmHg"],
    response: "Cible : <120/80 mmHg. Préhypertension : 120-139/80-89. Hypertension : ≥140/90. Mesurez régulièrement à domicile (matin et soir après 5 min de repos). Réduisez le sel (<5g/jour), augmentez potassium (bananes, épinards) et magnésium (noix, légumineuses).",
    category: "biometrics",
    priority: 1,
    sources: ["ESC Hypertension Guidelines"],
    followUpQuestions: [
      "Comment prendre correctement ma tension?",
      "Quels aliments aident à faire baisser la tension?"
    ]
  },
  {
    keywords: ["cholestérol", "lipides", "triglycérides", "gras", "hdl", "ldl", "lipidique"],
    response: "Valeurs idéales : LDL <100 mg/dL, HDL >40 (hommes) ou >50 (femmes), triglycérides <150. Les acides gras oméga-3 (poissons gras) augmentent le HDL. Les fibres solubles (avoine, légumineuses) réduisent le LDL. Un bilan lipidique annuel est recommandé après 40 ans.",
    category: "biometrics",
    priority: 1,
    followUpQuestions: [
      "Quelle différence entre bon et mauvais cholestérol?",
      "Mon médecin m'a dit que j'avais un taux élevé, que faire?"
    ]
  },
  {
    keywords: ["diabète", "sucre", "glycémie", "hba1c", "insuline", "glucose"],
    response: "Le diabète double le risque cardiovasculaire. Cibles : glycémie à jeun <126 mg/dL, HbA1c <7%. Surveillez les glucides (index glycémique), privilégiez les fibres, combinez aliments (glucides + protéines + gras) pour modérer la glycémie. L'exercice améliore la sensibilité à l'insuline.",
    category: "biometrics",
    priority: 1,
    followUpQuestions: [
      "Quels sont les symptômes du diabète?",
      "Comment prévenir le diabète de type 2?"
    ]
  },
  {
    keywords: ["poids", "obésité", "maigrir", "régime", "mincir", "IMC", "surpoids", "perte"],
    response: "L'IMC idéal se situe entre 18.5 et 24.9. Le tour de taille (<94cm hommes, <80cm femmes) est aussi important. Perdre 5-10% du poids améliore déjà les marqueurs cardiovasculaires. Évitez les régimes draconiens - visez 0.5-1kg/semaine via alimentation équilibrée + activité physique.",
    category: "nutrition",
    priority: 2,
    sources: ["WHO Obesity Guidelines"],
    followUpQuestions: [
      "Comment calculer mon IMC?",
      "Quelles sont les erreurs à éviter quand on veut maigrir?"
    ]
  },
  {
    keywords: ["cœur", "cardiaque", "cardiovasculaire", "AVC", "infarctus", "arythmie"],
    response: "Les maladies cardiovasculaires sont la 1ère cause de mortalité mondiale. Facteurs modifiables : tabac, alimentation, activité physique, stress. Signes d'alerte : douleur thoracique, essoufflement inhabituel, palpitations, vertiges soudains - consultez immédiatement en cas de symptômes.",
    category: "general",
    priority: 1,
    sources: ["World Heart Federation"],
    followUpQuestions: [
      "Quelle est la différence entre crise cardiaque et AVC?",
      "Comment savoir si je dois consulter un cardiologue?"
    ]
  }
];

// Fonction utilitaire pour trouver la réponse la plus pertinente
export function findBestResponse(userMessage: string): HealthKnowledgeEntry | null {
  const lowerMessage = userMessage.toLowerCase();
  let bestMatch: HealthKnowledgeEntry | null = null;
  let highestScore = 0;

  for (const entry of healthKnowledgeBase) {
    const score = entry.keywords.reduce((sum, keyword) => {
      return sum + (lowerMessage.includes(keyword) ? 1 : 0);
    }, 0);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Seuil minimal de correspondance
  return highestScore >= 2 ? bestMatch : null;
}

// Fonction pour obtenir des suggestions de questions
export function getSuggestedQuestions(category?: string): string[] {
  if (category) {
    const entries = healthKnowledgeBase.filter(entry => entry.category === category);
    return entries.flatMap(entry => entry.followUpQuestions || []);
  }
  return healthKnowledgeBase.flatMap(entry => entry.followUpQuestions || []);
}