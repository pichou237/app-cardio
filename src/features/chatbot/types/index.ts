export interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface KnowledgeCategory {
  category: string;
  keywords: string[];
  responses: string[];
}

export const knowledgeBase: KnowledgeCategory[] = [
  {
    category: "Hypertension",
    keywords: ["hypertension", "tension artérielle", "pression artérielle"],
    responses: [
      "L'hypertension artérielle est une condition médicale où la pression du sang dans les artères est constamment élevée. Il est important de surveiller régulièrement votre tension et de consulter un médecin si elle est souvent au-dessus de 140/90 mmHg.",
      "Une alimentation saine, faible en sel et riche en fruits et légumes, ainsi qu'une activité physique régulière, peuvent aider à contrôler l'hypertension.",
    ],
  },
  {
    category: "Cholestérol",
    keywords: ["cholestérol", "lipides", "HDL", "LDL"],
    responses: [
      "Le cholestérol est une substance grasse essentielle au corps, mais un excès de mauvais cholestérol (LDL) peut augmenter le risque de maladies cardiaques. Le bon cholestérol (HDL) aide à éliminer le LDL des artères.",
      "Adoptez une alimentation faible en graisses saturées et trans, et riche en fibres. Les exercices physiques peuvent également améliorer votre taux de cholestérol.",
    ],
  },
  {
    category: "Diabète",
    keywords: ["diabète", "glycémie", "insuline", "sucre dans le sang"],
    responses: [
      "Le diabète est une maladie chronique où le corps a du mal à réguler le sucre dans le sang. Il existe principalement deux types : le diabète de type 1 et le diabète de type 2.",
      "Un régime alimentaire contrôlé en glucides, une activité physique régulière et, si nécessaire, des médicaments ou de l'insuline, sont essentiels pour gérer le diabète.",
    ],
  },
  {
    category: "Maladies Cardiaques",
    keywords: [
      "maladies cardiaques",
      "cœur",
      "insuffisance cardiaque",
      "arythmie",
      "cardiopathie",
    ],
    responses: [
      "Les maladies cardiaques regroupent plusieurs affections affectant le cœur, comme l'insuffisance cardiaque, les arythmies et les cardiopathies coronariennes.",
      "Consultez régulièrement un cardiologue, suivez un régime alimentaire sain, faites de l'exercice et évitez le tabac pour prévenir les maladies cardiaques.",
    ],
  },
  {
    category: "Alimentation Saine",
    keywords: ["alimentation", "régime", "nutrition", "sain", "vitamines"],
    responses: [
      "Une alimentation saine est essentielle pour la santé cardiaque. Privilégiez les fruits, légumes, céréales complètes, protéines maigres et graisses insaturées.",
      "Limitez votre consommation de sel, de sucre, de graisses saturées et transformées, et d'aliments ultra-transformés.",
    ],
  },
  {
    category: "Exercice Physique",
    keywords: ["exercice", "sport", "activité physique", "entraînement"],
    responses: [
      "L'exercice physique régulier renforce le cœur, améliore la circulation sanguine et aide à maintenir un poids santé.",
      "Essayez de faire au moins 150 minutes d'activité physique modérée par semaine, comme la marche rapide, la natation ou le vélo.",
    ],
  },
  {
    category: "Tabagisme",
    keywords: ["tabac", "cigarette", "fumer", "tabagisme"],
    responses: [
      "Le tabagisme est un facteur de risque majeur pour les maladies cardiaques. Il endommage les vaisseaux sanguins, augmente la pression artérielle et favorise la formation de caillots.",
      "Arrêter de fumer est l'une des meilleures choses que vous puissiez faire pour votre santé cardiaque. Demandez de l'aide à votre médecin ou utilisez des ressources en ligne pour arrêter de fumer.",
    ],
  },
  {
    category: "Stress",
    keywords: ["stress", "anxiété", "détente", "relaxation"],
    responses: [
      "Le stress chronique peut augmenter le risque de maladies cardiaques. Trouvez des moyens sains de gérer votre stress, comme la méditation, le yoga ou les activités de loisirs.",
      "Parlez à un professionnel de la santé si vous avez du mal à gérer votre stress.",
    ],
  },
  {
    category: "Prévention",
    keywords: ["prévention", "dépistage", "risque", "facteurs de risque"],
    responses: [
      "La prévention est essentielle pour réduire le risque de maladies cardiaques. Faites régulièrement des bilans de santé, surveillez votre tension artérielle et votre taux de cholestérol, et adoptez un mode de vie sain.",
      "Identifiez et gérez vos facteurs de risque, comme l'hypertension, le diabète, le tabagisme et l'obésité.",
    ],
  },
  {
    category: "Médicaments",
    keywords: ["médicaments", "traitement", "statines", "antihypertenseurs"],
    responses: [
      "Si vous avez une maladie cardiaque, votre médecin peut vous prescrire des médicaments pour contrôler votre état. Suivez attentivement les instructions de votre médecin et informez-le de tout effet secondaire.",
      "Ne modifiez jamais votre traitement sans consulter votre médecin.",
    ],
  },
];
