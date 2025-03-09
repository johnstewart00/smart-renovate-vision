
export interface EstimationFormData {
  description: string;
  image: File | null;
  location: string;
  renovationType: string;
  budget: string;
}

export interface EstimationResult {
  estimatedValue: string;
  returnOnInvestment: string;
  marketTrends: string;
  recommendations: string[];
  confidence: number;
}
