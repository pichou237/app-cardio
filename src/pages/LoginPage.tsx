
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
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhbxVqEW96EgbMjY1gJ_SV05v0YB4g0eEt6pBLtgXZxxG4ATGI3Gp7CcX3WvKJ1NAaReRsyvtIMZ9I6Swq6KwHdegpvTx7CZXv3yWxjq4dmBGLxnevKp6V1fubrjE2oK2QkM1EI34-O84LUEmy0dzowS3YFIqy2v4wKLZjr1WzXNzPFAm2ft6YxLxwcjcc/s16000-rw/%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%A8%E0%A6%9C%E0%A6%BE%E0%A6%87%E0%A6%A8%E0%A6%BE%20(Angina)%20%E0%A6%AC%E0%A6%BE%20%E0%A6%B9%E0%A7%83%E0%A6%A6%E0%A6%B6%E0%A7%82%E0%A6%B2%20%E0%A6%93%20%E0%A6%B9%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%9F%20%E0%A6%85%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%9F%E0%A6%BE%E0%A6%95%20(Heart%20Attack%20or%20Myocardial%20Infarction)%20%E0%A6%8F%E0%A6%B0%20%E0%A6%AC%E0%A6%B0%E0%A7%8D%E0%A6%A3%E0%A6%A8%E0%A6%BE%201.png" 
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
