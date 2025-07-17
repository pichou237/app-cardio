
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
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import SocialLogin from "./SocialLogin";

import { AuthService, AuthCredentials } from "@/services/auth-service";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";


const loginSchema = z.object({
  email: z.string().min(1, { message: "Votre email est requis." }),
  password: z.string().min(6, { message: "Le mot de passe doit contenir au moins 6 caractères." }),
  username: z.string().default(""),
  role: z.string().default("")
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEFAULT_CREDENTIALS = [
  { email: "admin@admin.com", password: "admin123", role: "admin" },
  { email: "utilisateur.test@offline.com", password: "test123", role: "user" },
];

const LoginForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Cast to AuthCredentials to ensure type safety
      const credentials: AuthCredentials = {
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role
      };
      
      try {
        // We know the login method returns a string (the API key)
        const apiKey = await AuthService.login(credentials);
        console.log(apiKey)
        
        if (apiKey) {
          // Authentification réussie via l'API
          localStorage.setItem("api_key" ,apiKey);
          localStorage.setItem("username" ,data.username);
          localStorage.setItem("userRole", "user"); // Par défaut utilisateur normal
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("isOfflineMode", "false");
          console.log("user:",data);
          toast.success("Connexion réussie!");
          if(data.role == 'admin'){
            toast.success("Connexion réussie! : bienvenue admin:"+ data.email);
            navigate('/admin')
          }else{
            toast.success("Connexion réussie! : bienvenue user:"+ data.email);
            navigate("/dashboard");
          }
          return;
        }
      } catch (apiError: any) {
        console.error("API Error:", apiError);
        
        // Si l'erreur indique que l'utilisateur n'existe pas
        if (apiError.message && apiError.message.includes("utilisateur non trouvé")) {
          setLoginError("Utilisateur non trouvé. Veuillez vérifier vos identifiants ou créer un compte.");
          toast.warning("Utilisateur non trouvé. Veuillez vérifier vos identifiants ou créer un compte.");
          setIsLoading(false);
          return;
        }
        
        // Sinon, activer le mode hors ligne
        setIsOfflineMode(true);
        toast.warning("Utilisateur non trouvé. Veuillez vérifier vos identifiants ou créer un compte.");
        // toast.warning("Mode hors ligne activé: API inaccessible");
      }
      
      // Vérifier les identifiants par défaut (pour démo et mode hors ligne)
      const matchedUser = DEFAULT_CREDENTIALS.find(
        user => user.email === data.email && user.password === data.password
      );
      
      if (matchedUser) {
        // Stocker les infos utilisateur dans localStorage
        localStorage.setItem("userRole", matchedUser.role);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", matchedUser.username);
        localStorage.setItem("isOfflineMode", isOfflineMode ? "true" : "false");
        
        if (matchedUser.role === "admin") {
          toast.success("Connexion administrateur réussie!");
          navigate("/admin");
        } else {
          toast.success("Connexion réussie!");
          navigate("/dashboard");
        }
      } else {
        // Aucune correspondance avec les identifiants par défaut
        setLoginError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (error) {
      toast.error(error);
      console.error("Erreur de connexion:", error);
      setLoginError(error instanceof Error ? error.message : "Échec de la connexion. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfflineLogin = () => {
    setIsLoading(true);
    try {
      // Définir l'utilisateur hors ligne
      localStorage.setItem("userRole", "user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", "utilisateur.test@offline.com");
      localStorage.setItem("isOfflineMode", "true");
      
      toast.success("Connexion en mode hors ligne réussie!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur de connexion offline:", error);
      toast.error("Erreur lors de la connexion en mode hors ligne");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Se connecter</h2>
        <p className="mt-2 text-muted-foreground">
          Accédez à votre espace CardioPredict
        </p>
      </div>

      {/* Social Login */}
      <SocialLogin />
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou continuez avec
          </span>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center justify-end">
            <Link 
              to="/forgot-password" 
              className="text-sm text-primary hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </Form>


      {isOfflineMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
          <h3 className="font-medium text-amber-800">Problème de connexion au serveur</h3>
          <p className="text-sm text-amber-700 mt-1">Le serveur semble indisponible. Vous pouvez continuer en mode hors ligne avec un accès limité.</p>
          <Button 
            variant="outline" 
            className="w-full mt-2 border-amber-500 text-amber-700 hover:bg-amber-100"
            onClick={handleOfflineLogin}
            disabled={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Continuer en mode hors ligne"}
          </Button>
        </div>
      )}
      
      <div className="text-center text-sm">
        <p>
          Pas encore de compte?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            S'inscrire
          </Link>
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Accès admin:
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
