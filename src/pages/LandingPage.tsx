
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/features/landing/components/Hero";
import Features from "@/features/landing/components/Features";
import PatientJourney from "@/features/landing/components/PatientJourney";
import PricingCards from "@/features/pricing/PricingCard";


const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <PatientJourney />
        <Features />
        <PricingCards />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
