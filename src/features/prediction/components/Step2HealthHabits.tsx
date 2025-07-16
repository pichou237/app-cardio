import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { NewPredictionFormData } from "../schemas/newPredictionSchema";

interface Step2HealthHabitsProps {
  control: Control<NewPredictionFormData>;
}

const Step2HealthHabits: React.FC<Step2HealthHabitsProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Habitudes de vie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="tabac"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consommation de tabac</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="alcool"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consommation d'alcool</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="activite_physique"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activité physique</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="sedentarite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode de vie sédentaire</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Sommeil & Stress</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="stress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niveau de stress</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="sommeil_moins_6h"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sommeil moins de 6h</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="sommeil_mauvaise_qualite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mauvaise qualité de sommeil</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Alimentation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="alimentation_grasse"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alimentation grasse</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="fruits_legumes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Consommation de fruits et légumes</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Symptômes</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="maux_tete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Maux de tête</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="essoufflement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Essoufflement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="douleurs_poitrine"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Douleurs de poitrine</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Non">Non</SelectItem>
                    <SelectItem value="Oui">Oui</SelectItem>
                    <SelectItem value="Je ne sais pas">Je ne sais pas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Step2HealthHabits;