
import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 flex flex-col items-center text-center px-4">
      <div className="inline-block mb-3 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full animate-fade-in">
        AI-Powered Renovation Estimates
      </div>
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 max-w-3xl animate-fade-up" style={{ animationDelay: "100ms" }}>
        Discover the value of your home improvements
      </h1>
      <p className="text-lg text-foreground/70 max-w-xl mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
        Upload a photo and description of your renovation project, and our AI will provide an instant value estimate.
      </p>
      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <a 
          href="#estimate-form" 
          className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-200 shadow-soft"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
