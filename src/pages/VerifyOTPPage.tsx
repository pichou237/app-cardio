
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VerifyOTPForm from "@/features/auth/components/VerifyOTPForm";

const VerifyOTPPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-full flex">
          {/* Left side - Image/Content */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center p-12">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop" 
                  alt="Vérification de sécurité" 
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Vérification sécurisée
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Saisissez le code de vérification que nous avons envoyé à votre adresse email 
                pour confirmer votre identité et réinitialiser votre mot de passe.
              </p>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <div className="w-full max-w-md">
              <VerifyOTPForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyOTPPage;
