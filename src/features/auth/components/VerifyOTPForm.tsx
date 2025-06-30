
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, RotateCcw } from "lucide-react";

const otpSchema = z.object({
  otp: z.string().min(6, { message: "Le code doit contenir 6 chiffres." }),
});

type OTPFormData = z.infer<typeof otpSchema>;

const VerifyOTPForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "exemple@email.com";
  
  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const onSubmit = async (data: OTPFormData) => {
    setIsLoading(true);
    try {
      console.log("Vérification OTP:", data.otp);
      
      // Simulation de vérification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Pour la démo, accepter le code "123456"
      if (data.otp === "123456") {
        toast.success("Code vérifié avec succès!");
        navigate("/reset-password", { state: { email, verified: true } });
      } else {
        toast.error("Code incorrect. Veuillez réessayer.");
      }
      
    } catch (error) {
      console.error("Erreur de vérification:", error);
      toast.error("Erreur lors de la vérification. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(300);
      setCanResend(false);
      toast.success("Nouveau code envoyé!");
    } catch (error) {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Vérifiez votre code</h2>
        <p className="mt-2 text-muted-foreground">
          Nous avons envoyé un code à 6 chiffres à
        </p>
        <p className="font-medium text-foreground">{email}</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-center block">Code de vérification</FormLabel>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center text-sm text-muted-foreground">
            {countdown > 0 ? (
              <p>Code expire dans: <span className="font-medium">{formatTime(countdown)}</span></p>
            ) : (
              <p className="text-destructive">Le code a expiré</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading || countdown === 0}>
            {isLoading ? "Vérification..." : "Vérifier le code"}
          </Button>
        </form>
      </Form>

      <div className="text-center space-y-4">
        <p className="text-sm text-muted-foreground">Code de démo: 123456</p>
        
        {canResend ? (
          <Button 
            variant="outline" 
            onClick={handleResendCode}
            className="w-full"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Renvoyer le code
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Vous pourrez demander un nouveau code dans {formatTime(countdown)}
          </p>
        )}
        
        <Link 
          to="/forgot-password" 
          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour
        </Link>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
