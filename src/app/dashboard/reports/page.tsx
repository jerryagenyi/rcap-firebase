import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import PerformanceCharts from "@/components/dashboard/performance-charts";
import AiReportGenerator from "./components/ai-report-generator";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reports & Analytics
        </h1>
        <p className="text-muted-foreground">
          Visualize data, generate reports, and gain insights.
        </p>
      </div>

      <PerformanceCharts />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <CardTitle>AI-Powered Report Generation</CardTitle>
          </div>
          <CardDescription>
            Use AI to generate real-time reports on risk communication activities and outcomes, highlighting emerging trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiReportGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
