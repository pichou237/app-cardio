
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RegisterForm from "@/features/auth/components/RegisterForm";

const RegisterPage: React.FC = () => {
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
                  src="https://alldoctors.moscow/upload/iblock/e85/1wclp9nv1449x8vd2bpknu2vhal2kywo.webp" 
                  alt="Équipe médicale" 
                  className="rounded-2xl shadow-2xl mx-auto"
                />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Rejoignez CardioPredict
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Créez votre compte pour bénéficier d'analyses cardiovasculaires personnalisées 
                et suivre votre santé cardiaque avec notre outil développé à l'IUT de Douala.
              </p>
            </div>
          </div>
          
          {/* Right side - Form */}
          <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <div className="w-full max-w-md">
              <RegisterForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterPage;
