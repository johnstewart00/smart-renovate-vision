
import React, { useState } from "react";
import { EstimationFormData, EstimationResult } from "@/types";
import ImageUpload from "./ImageUpload";
import { getEstimation } from "@/utils/api";
import ResultCard from "./ResultCard";
import { toast } from "sonner";

const renovationTypes = [
  "Kitchen",
  "Bathroom",
  "Outdoor/Landscaping",
  "Living Room",
  "Bedroom",
  "Basement",
  "Attic/Loft",
  "Whole Home",
];

const EstimationForm: React.FC = () => {
  const [formData, setFormData] = useState<EstimationFormData>({
    description: "",
    image: null,
    location: "",
    renovationType: "",
    budget: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<EstimationResult | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleReset = () => {
    setFormData({
      description: "",
      image: null,
      location: "",
      renovationType: "",
      budget: "",
    });
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.description.trim()) {
      toast.error("Please provide a description of your renovation");
      return;
    }
    
    if (!formData.renovationType) {
      toast.error("Please select a renovation type");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const estimationResult = await getEstimation(formData);
      setResult(estimationResult);
      toast.success("Estimation completed successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to get estimation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="estimate-form" className="w-full max-w-3xl mx-auto px-4 py-12">
      {result ? (
        <div className="animate-fade-in">
          <ResultCard result={result} onReset={handleReset} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-up">
          <div className="glass dark:glass-dark rounded-2xl overflow-hidden shadow-soft p-8">
            <h2 className="text-2xl font-medium mb-6">Estimate Your Renovation Value</h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="renovationType" className="text-sm font-medium mb-2 text-foreground/80 block">
                  Renovation Type
                </label>
                <select
                  id="renovationType"
                  name="renovationType"
                  value={formData.renovationType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus-ring"
                >
                  <option value="">Select renovation type</option>
                  {renovationTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="text-sm font-medium mb-2 text-foreground/80 block">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your renovation project in detail..."
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg focus-ring resize-none"
                />
              </div>
              
              <ImageUpload onChange={handleImageChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="location" className="text-sm font-medium mb-2 text-foreground/80 block">
                    Location (optional)
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, State"
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus-ring"
                  />
                </div>
                
                <div>
                  <label htmlFor="budget" className="text-sm font-medium mb-2 text-foreground/80 block">
                    Budget (optional)
                  </label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Estimated budget"
                    className="w-full px-4 py-3 bg-background border border-input rounded-lg focus-ring"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-200 shadow-soft flex items-center justify-center disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </>
              ) : (
                "Get AI Estimate"
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EstimationForm;
