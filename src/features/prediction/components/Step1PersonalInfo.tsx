import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { NewPredictionFormData } from "../schemas/newPredictionSchema";

interface Step1PersonalInfoProps {
  control: Control<NewPredictionFormData>;
}

const Step1PersonalInfo: React.FC<Step1PersonalInfoProps> = ({ control }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Informations personnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Âge</FormLabel>
                <FormControl>
                  <Input placeholder="35" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="sexe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Masculin</SelectItem>
                    <SelectItem value="F">Féminin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="poids"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poids (kg)</FormLabel>
                <FormControl>
                  <Input placeholder="70" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="taille"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taille (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="175" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Localisation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="ville"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre ville" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Douala">Douala</SelectItem>
                    <SelectItem value="Yaoundé">Yaoundé</SelectItem>
                    <SelectItem value="Bafoussam">Bafoussam</SelectItem>
                    <SelectItem value="Bamenda">Bamenda</SelectItem>
                    <SelectItem value="Ngaoundéré">Ngaoundéré</SelectItem>
                    <SelectItem value="Maroua">Maroua</SelectItem>
                    <SelectItem value="Garoua">Garoua</SelectItem>
                    <SelectItem value="Bertoua">Bertoua</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="environnement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Environnement</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner votre environnement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="metropole">Métropole</SelectItem>
                    <SelectItem value="ville moyenne">Ville moyenne</SelectItem>
                    <SelectItem value="petite ville">Petite ville</SelectItem>
                    <SelectItem value="rural">Rural</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-red-600 font-bold">Antécédents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={control}
            name="antecedents_familiaux"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Antécédents familiaux</FormLabel>
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
            name="diabete_connu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diabète connu</FormLabel>
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
            name="symptomes_diabete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Symptômes de diabète</FormLabel>
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

export default Step1PersonalInfo;