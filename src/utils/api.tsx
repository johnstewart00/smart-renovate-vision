
import { EstimationFormData, EstimationResult } from "@/types";
import { toast } from "sonner";

// This function would call a real API in production
export const getEstimation = async (formData: EstimationFormData): Promise<EstimationResult> => {
  try {
    // In a real implementation, this would call the Cerebras AI API
    // For demonstration, we're mocking the API response
    console.log("Submitting data for estimation:", formData);
    
    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Mock response based on the input data
    const mockResult: EstimationResult = {
      estimatedValue: `$${(Math.random() * 50000 + 10000).toFixed(2)}`,
      returnOnInvestment: `${(Math.random() * 30 + 5).toFixed(1)}%`,
      marketTrends: formData.renovationType === "Kitchen" 
        ? "Kitchen renovations are currently showing strong returns in the market."
        : "This type of renovation has shown positive value growth in recent months.",
      recommendations: [
        "Consider energy-efficient appliances for better ROI",
        "High-quality materials tend to yield better returns",
        "Professional installation is recommended for this renovation"
      ],
      confidence: Math.random() * 30 + 70,
    };
    
    return mockResult;
  } catch (error) {
    console.error("Error getting estimation:", error);
    toast.error("Failed to get estimation. Please try again.");
    throw error;
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    // In a real implementation, this would upload to a storage service
    // For now, we'll create a local object URL
    console.log("Uploading image:", file.name);
    return URL.createObjectURL(file);
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to upload image. Please try again.");
    throw error;
  }
};
