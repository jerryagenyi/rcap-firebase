"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { generateRiskCommunicationReport } from "@/ai/flows/generate-risk-communication-report";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data as per the flow's requirements
const mockActivitiesData = JSON.stringify([
  { activity: "Social Media Campaign", reach: 50000, engagement: "high" },
  { activity: "Community Meeting", attendees: 150, sentiment: "positive" },
  { activity: "Radio Broadcast", listeners: 200000, feedback: "mixed" },
]);

const mockOutcomesData = JSON.stringify([
  { metric: "Vaccination Intent", change: "+15%", trend: "upward" },
  { metric: "Misinformation Reports", change: "-20%", trend: "downward" },
  { metric: "Health Hotline Calls", change: "+30%", trend: "upward" },
]);


export default function AiReportGenerator() {
  const [report, setReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setReport("");
    try {
      const result = await generateRiskCommunicationReport({
        activitiesData: mockActivitiesData,
        outcomesData: mockOutcomesData,
      });
      setReport(result.report);
    } catch (error) {
      console.error("Failed to generate AI report:", error);
      toast({
        title: "Error",
        description: "Failed to generate AI report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Button onClick={handleGenerateReport} disabled={isLoading} variant="gradient">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate Emerging Trends Report"
          )}
        </Button>
      </div>

      {(isLoading || report) && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Report</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !report ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                 <p className="ml-4 text-muted-foreground">AI is analyzing the data...</p>
              </div>
            ) : (
              <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: report.replace(/\n/g, '<br />') }} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
