import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import EstimationForm from "../components/EstimationForm";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[url('/images/muffins.jpg')] bg-cover bg-center bg-no-repeat">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center">
        <EstimationForm />
      </main>
      <footer className="w-full py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} RenovateValue. All rights reserved.</p>
      </footer>
      {/* Temporary test image */}
      {/* <img src="/images/your-background.jpeg" alt="test" className="w-20 h-20" /> */}
    </div>
  );
};

export default Index;
