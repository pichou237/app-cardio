
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="min-h-full flex">
          {/* Left side - Image/Content */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent/10 to-primary/10 items-center justify-center p-12">
            <div className="max-w-md text-center">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop" 
                  alt="Sécurité" 
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Récupération sécurisée
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nous vous aiderons à récupérer l'accès à votre compte CardioPredict 
                en toute sécurité grâce à notre système de vérification par email.
              </p>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <div className="w-full max-w-md">
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
