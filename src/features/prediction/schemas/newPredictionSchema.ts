import { z } from "zod";

export const newPredictionSchema = z.object({
  // Infos personnelles
  age: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 18 && parseInt(val) <= 100, {
    message: "L'âge doit être entre 18 et 100 ans",
  }),
  sexe: z.enum(["M", "F"], {
    required_error: "Veuillez sélectionner votre sexe",
  }),
  poids: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 30 && parseFloat(val) <= 200, {
    message: "Le poids doit être entre 30 et 200 kg",
  }),
  taille: z.string().refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 120 && parseInt(val) <= 220, {
    message: "La taille doit être entre 120 et 220 cm",
  }),
  
  // Localisation
  ville: z.enum(["Douala", "Yaoundé", "Bafoussam", "Bamenda", "Ngaoundéré", "Maroua", "Garoua", "Bertoua"], {
    required_error: "Veuillez sélectionner votre ville",
  }),
  environnement: z.enum(["metropole", "ville moyenne", "petite ville", "rural"], {
    required_error: "Veuillez sélectionner votre environnement",
  }),
  
  // Antécédents
  antecedents_familiaux: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer vos antécédents familiaux",
  }),
  diabete_connu: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous avez un diabète connu",
  }),
  symptomes_diabete: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous avez des symptômes de diabète",
  }),
  
  // Habitudes
  tabac: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre consommation de tabac",
  }),
  alcool: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre consommation d'alcool",
  }),
  activite_physique: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre activité physique",
  }),
  sedentarite: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre niveau de sédentarité",
  }),
  
  // Sommeil & stress
  stress: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre niveau de stress",
  }),
  sommeil_moins_6h: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous dormez moins de 6h",
  }),
  sommeil_mauvaise_qualite: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer la qualité de votre sommeil",
  }),
  
  // Alimentation
  alimentation_grasse: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre consommation d'aliments gras",
  }),
  fruits_legumes: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer votre consommation de fruits et légumes",
  }),
  
  // Symptômes
  maux_tete: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous avez des maux de tête",
  }),
  essoufflement: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous avez des essoufflements",
  }),
  douleurs_poitrine: z.enum(["Non", "Oui", "Je ne sais pas"], {
    required_error: "Veuillez indiquer si vous avez des douleurs de poitrine",
  }),
});

export type NewPredictionFormData = z.infer<typeof newPredictionSchema>;