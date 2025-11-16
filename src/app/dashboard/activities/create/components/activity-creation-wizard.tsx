
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Send, FileText, MapPin, Paperclip, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Step1Details } from "./step-1-details";
import { Step2Logistics } from "./step-2-logistics";
import { Step3Attachments } from "./step-3-attachments";
import { Step4Review } from "./step-4-review";

const steps = [
  { id: 1, title: "Activity Details", icon: FileText },
  { id: 2, title: "Logistics", icon: MapPin },
  { id: 3, title: "Attachments", icon: Paperclip },
  { id: 4, title: "Review & Submit", icon: CheckCircle },
];

export function ActivityCreationWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (data: any) => {
    const finalData = { ...formData, ...data };
    console.log("Submitting form data:", finalData);
    // Here you would typically handle the form submission, e.g., API call
    setCurrentStep(5); // Move to a confirmation screen
  };

  const progress = (currentStep / steps.length) * 100;
  const MotionDiv = motion.div;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Details onNext={handleNext} formData={formData} />;
      case 2:
        return <Step2Logistics onNext={handleNext} onBack={handleBack} formData={formData} />;
      case 3:
        return <Step3Attachments onNext={handleNext} onBack={handleBack} formData={formData} />;
      case 4:
        return <Step4Review onSubmit={handleSubmit} onBack={handleBack} formData={formData} />;
      default:
        return null;
    }
  };

  if (currentStep > steps.length) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold">Activity Submitted!</h2>
            <p className="text-muted-foreground mt-2">
              Your new activity has been successfully created and submitted for approval.
            </p>
            <div className="mt-8 flex gap-4">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>Create Another Activity</Button>
              <Button variant="gradient" asChild>
                <a href="/dashboard/activities">View All Activities</a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Creation Wizard</CardTitle>
        <CardDescription>
          Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
        </CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
            <MotionDiv
                key={currentStep}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -30, opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {renderStepContent()}
            </MotionDiv>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
