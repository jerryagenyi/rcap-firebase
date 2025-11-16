
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import ReportFilters from "./components/report-filters";
import ActivityTrends from "./components/activity-trends";
import ActivityTypeDistribution from "./components/activity-type-distribution";
import StatusBreakdown from "./components/status-breakdown";
import GeographicDistribution from "./components/geographic-distribution";
import QuickReportTemplates from "./components/quick-report-templates";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Data-driven insights for your activities.
          </p>
        </div>
        <Button variant="gradient">
            <Download className="mr-2" />
            Export
        </Button>
      </div>

      <ReportFilters />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ActivityTrends />
        </div>
        <div className="lg:col-span-2">
            <div className="flex flex-col gap-8">
                <ActivityTypeDistribution />
                <StatusBreakdown />
            </div>
        </div>
      </div>
      
      <GeographicDistribution />
      <QuickReportTemplates />

    </div>
  );
}
