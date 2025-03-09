
import React from "react";
import { EstimationResult } from "@/types";

interface ResultCardProps {
  result: EstimationResult;
  onReset: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-8">
      <div className="glass dark:glass-dark rounded-2xl overflow-hidden shadow-soft p-8">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-medium">Your Renovation Estimate</h2>
          <div className="bg-primary/10 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-primary">
              {result.confidence.toFixed(0)}% Confidence
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm text-muted-foreground mb-1">Estimated Value</h3>
              <p className="text-4xl font-medium">{result.estimatedValue}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-muted-foreground mb-1">Expected ROI</h3>
              <p className="text-2xl font-medium">{result.returnOnInvestment}</p>
            </div>
            
            <div>
              <h3 className="text-sm text-muted-foreground mb-1">Market Analysis</h3>
              <p className="text-sm">{result.marketTrends}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm text-muted-foreground mb-3">Recommendations</h3>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <p className="text-sm">{recommendation}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={onReset}
          className="px-6 py-2.5 border border-border hover:border-primary/50 text-foreground rounded-full transition-all duration-200"
        >
          Start New Estimate
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
