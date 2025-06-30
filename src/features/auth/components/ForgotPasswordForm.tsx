
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Veuillez saisir un email valide." }),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      console.log("Demande de réinitialisation pour:", data.email);
      
      // Simulation d'envoi d'email
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
      toast.success("Email de récupération envoyé!");
      
      // Redirection vers la page OTP après 3 secondes
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: data.email } });
      }, 3000);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="w-full space-y-6 text-center">
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Email envoyé!</h2>
          <p className="mt-2 text-muted-foreground">
            Vérifiez votre boîte mail pour les instructions de récupération
          </p>
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p>Vous serez redirigé vers la page de vérification dans quelques secondes...</p>
        </div>
        
        <Button 
          variant="outline" 
          onClick={() => navigate("/verify-otp", { state: { email: form.getValues("email") } })}
        >
          Aller à la vérification
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Mot de passe oublié?</h2>
        <p className="mt-2 text-muted-foreground">
          Entrez votre email pour recevoir un code de récupération
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse email</FormLabel>
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
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer le code"}
          </Button>
        </form>
      </Form>
      
      <div className="text-center">
        <Link 
          to="/login" 
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à la connexion
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
