
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoginForm from "@/features/auth/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow h-full">
        <div className="h-full flex flex-1">
          {/* Left side - Image/Content */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/10 to-accent/10 items-center justify-center p-12">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop" 
                  alt="Santé cardiovasculaire" 
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Bienvenue sur CardioPredict
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Votre outil de prédiction des risques cardiovasculaires développé par les étudiants 
                de l'IUT de Douala. Connectez-vous pour accéder à vos analyses personnalisées.
              </p>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
