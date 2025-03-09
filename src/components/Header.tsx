
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-8 flex justify-between items-center animate-fade-down">
      <div className="flex items-center">
        <h1 className="text-xl font-medium tracking-tight">RenovateValue</h1>
      </div>
      <nav className="hidden md:flex space-x-6">
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
        >
          How It Works
        </a>
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
        >
          Inspiration
        </a>
        <a 
          href="#" 
          className="text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
        >
          About
        </a>
      </nav>
    </header>
  );
};

export default Header;
