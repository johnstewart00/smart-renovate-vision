import React, { useState } from "react";
import { toast } from "sonner";
import Vapi from "@vapi-ai/web";

const vapi = new Vapi("27243ed2-a510-423f-91df-9c23f5c132cf");

const assistantOptions = {
  name: "Renovation Assistant",
  firstMessage: "Hi there! Tell me about your renovation project.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en-US",
  },
  voice: {
    provider: "playht",
    voiceId: "jennifer",
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a helpful voice assistant for a home renovation estimator. 
        Ask clear questions about the customer's renovation project, such as what type of renovation they need, their budget, and location. 
        Be friendly, clear, and concise throughout the conversation. After gathering the required details, let them know you'll provide an estimated cost.`,
      },
    ],
  },
};

const EstimationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleStartConversation = () => {
    setIsSubmitting(true);
    try {
      vapi.start(assistantOptions).then((conversationResult: string) => {
        setResult(conversationResult);
        toast.success("Estimation completed successfully");
      });
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast.error("Failed to start conversation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <section id="estimate-form" className="w-full max-w-3xl mx-auto px-4 py-12">
      {result ? (
        <div className="animate-fade-in">
          <div className="glass dark:glass-dark rounded-2xl overflow-hidden shadow-soft p-8">
            <h2 className="text-2xl font-medium mb-6">
              Your Renovation Estimate
            </h2>
            <p>{result}</p>
            <button
              onClick={handleReset}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Start Another Estimate
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            onClick={handleStartConversation}
            disabled={isSubmitting}
            className="px-8 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-200 shadow-soft flex items-center justify-center disabled:opacity-70"
          >
            {isSubmitting ? "Starting..." : "Start Voice Conversation"}
          </button>
        </div>
      )}
    </section>
  );
};

export default EstimationForm;
