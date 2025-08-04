/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";
import { Link ,useNavigate} from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";
import { AuthService,AuthCredentials } from "@/services/auth-service";

const registerSchema = z.object({
  username: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez saisir un email valide." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas.",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // const onSubmit = async (data: RegisterFormData) => {
  //   setIsLoading(true);
  //   try {
  //     const { username, password , email } = data;
  //     console.log("data:",data)
  //     try {
  //       await AuthService.register({
  //         username, password, email,
  //         role: "utilisateur"
  //       });
  //     } catch (apiError) {
  //       console.error("API Error:", apiError);
  //       toast.warning(apiError.message)
  //       // Activate offline mode if API is unreachable
  //       setIsOfflineMode(true);
  //       toast.warning("Mode hors ligne activé: API inaccessible");
  //       // Early return to show the offline mode message
  //       setIsLoading(false);
  //       return;
  //     }
      
  //     toast.success("Inscription réussie! Vous êtes maintenant connecté.");
      
  //     // Enregistrer les informations d'authentification
  //     localStorage.setItem("userRole", "user");
  //     localStorage.setItem("isAuthenticated", "true");
  //     localStorage.setItem("username", username);
  //     localStorage.setItem("email", email);
  //     localStorage.setItem("isOfflineMode", "false");
      
  //     // Redirection après inscription
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Erreur d'inscription:", error);
  //     toast.error(error instanceof Error ? error.message : "Échec de l'inscription. Veuillez réessayer.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // const handleOfflineRegister = () => {
  //   setIsLoading(true);
  //   try {
  //     const username = form.getValues("username") || "utilisateur.test";
      
  //     // Set offline user
  //     localStorage.setItem("userRole", "user");
  //     localStorage.setItem("isAuthenticated", "true");
  //     localStorage.setItem("username", username);
  //     localStorage.setItem("isOfflineMode", "true");
      
  //     toast.success("Inscription en mode hors ligne réussie!");
  //     navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Erreur d'inscription offline:", error);
  //     toast.error("Erreur lors de l'inscription en mode hors ligne");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const onSubmit = async (data: RegisterFormData) => {
  // setIsLoading(true);
  // try {
  //   const { username, password, email } = data;
  //   console.log("data:", data);

  //   try {
  //     await AuthService.register({
  //       username,
  //       password,
  //       email,
  //       role: "utilisateur"
  //     });
  //   } catch (apiError: any) {
  //     console.error("API Error:", apiError);
  //     toast.warning(apiError.message);
  //     // Activate offline mode if API is unreachable
  //     setIsOfflineMode(true);
  //     toast.warning("Mode hors ligne activé: API inaccessible");
  //     setIsLoading(false);
  //     return;
  //   }

  //   toast.success("Inscription réussie! Vous êtes maintenant connecté.");

  //   // Enregistrer les informations d'authentification de base
  //   localStorage.setItem("userRole", "user");
  //   localStorage.setItem("isAuthenticated", "true");
  //   localStorage.setItem("username", username);
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("isOfflineMode", "false");

  //   // 🆕 Récupérer le profil complet et stocker les infos utiles
  //   try {
  //     const credentials: AuthCredentials = {
  //       username: data.username,
  //       email: data.email,
  //       password: data.password,
  //     };

  //     const apiKey = await AuthService.login(credentials);
  //     console.log(apiKey);     
  //     const profile = await AuthService.getProfile(apiKey);
  //     console.log("Profil récupéré :", profile);

  //     localStorage.setItem("profile_id", profile.id);
  //     localStorage.setItem("profile_username", profile.username);
  //     localStorage.setItem("profile_role", profile.role);
  //     localStorage.setItem("profile_created_at", profile.created_at);
  //     localStorage.setItem("profile_total_predictions", profile.stats.total_predictions.toString());
  //     localStorage.setItem("profile_average_risk", profile.stats.average_risk.toString());
  //     localStorage.setItem("profile_last_prediction", profile.stats.last_prediction ?? "");
  //   } catch (profileError: any) {
  //     console.error("Erreur lors de la récupération du profil :", profileError);
  //     toast.error("Impossible de récupérer le profil utilisateur.");
  //   }

  //   // // Redirection selon rôle (ici role utilisateur par défaut)
  //   // if (data.role === "admin") {
  //   //   toast.success("Connexion réussie! : bienvenue admin: " + data.email);
  //   //   navigate("/admin");
  //   // } else {
  //     toast.success("Connexion réussie! : bienvenue user: " + data.email);
  //     navigate("/dashboard");
    
    
  //   } catch (error) {
  //     console.error("Erreur d'inscription:", error);
  //     toast.error(error instanceof Error ? error.message : "Échec de l'inscription. Veuillez réessayer.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const onSubmit = async (data: RegisterFormData) => {
  setIsLoading(true);

  try {
    const { username, password, email } = data;
    console.log("data:", data);

    // Étape 1 : inscription
    try {
      await AuthService.register({
        username,
        password,
        email,
        role: "utilisateur"
      });
    } catch (apiError: any) {
      console.error("API Error:", apiError);
      toast.warning(apiError.message);
      setIsOfflineMode(true);
      toast.warning("Mode hors ligne activé : API inaccessible");
      setIsLoading(false);
      return;
    }

    toast.success("Inscription réussie ! Vous êtes maintenant connecté.");

    // Enregistrer les informations d'authentification de base
    localStorage.setItem("userRole", "user");
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("isOfflineMode", "false");

    // Étape 2 : récupération de l'API key + profil
    try {
      const credentials: AuthCredentials = {
        username,
        email,
        password,
      };

      const apiKey = await AuthService.login(credentials);
      console.log("API key :", apiKey);

      const profile = await AuthService.getProfile(apiKey);
      console.log("Profil récupéré :", profile);

      localStorage.setItem("profile_id", profile.id);
      localStorage.setItem("profile_username", profile.username);
      localStorage.setItem("profile_role", profile.role);
      localStorage.setItem("profile_created_at", profile.created_at);
      localStorage.setItem("profile_total_predictions", profile.stats.total_predictions.toString());
      localStorage.setItem("profile_average_risk", profile.stats.average_risk.toString());
      localStorage.setItem("profile_last_prediction", profile.stats.last_prediction ?? "");
    } catch (profileError: any) {
      console.error("Erreur lors de la récupération du profil :", profileError);
      toast.error("Impossible de récupérer le profil utilisateur.");
    }

    // Redirection vers le dashboard
    toast.success("Connexion réussie ! Bienvenue " + email);
    navigate("/dashboard");

  } catch (error) {
    console.error("Erreur d'inscription :", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Échec de l'inscription. Veuillez réessayer."
    );
  } finally {
    setIsLoading(false);
  }
};

function handleOfflineRegister(event: React.MouseEvent<HTMLButtonElement>): void {
  // ton code ici
  console.log("Enregistrement hors ligne déclenché !");
}


  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Créer un compte</h2>
        <p className="mt-2 text-muted-foreground">
          Rejoignez CardioPredict dès aujourd'hui
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin isRegister={true} />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou créez un compte avec
          </span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="steph prad" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="exemple@email.com" 
                      className="pl-10"
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      className="pl-10 pr-10"
                      {...field} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmer le mot de passe</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      className="pl-10 pr-10"
                      {...field} 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Inscription en cours..." : "S'inscrire"}
          </Button>
        </form>
      </Form>
      

       {isOfflineMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
          <h3 className="font-medium text-amber-800">Problème de connexion au serveur</h3>
          <p className="text-sm text-amber-700 mt-1">Le serveur semble indisponible. Vous pouvez créer un compte en mode hors ligne avec un accès limité.</p>
          <Button 
            variant="outline" 
            className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-100"
            onClick={handleOfflineRegister}
            disabled={isLoading}
          >
            {isLoading ? "Inscription en cours..." : "Créer un compte hors ligne"}
          </Button>
        </div>
      )}


      <div className="text-center text-sm">
        <p>
          Déjà un compte?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
