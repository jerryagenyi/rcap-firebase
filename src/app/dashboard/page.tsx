import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Users } from 'lucide-react';
import MetricCard from '@/components/dashboard/metric-card';
import { federalDashboardMetrics } from '@/lib/data';
import PerformanceCharts from '@/components/dashboard/performance-charts';
import MapCard from '@/components/dashboard/map-card';
import EmergencyCenter from '@/components/dashboard/emergency-center';
import RecentActivities from '@/components/dashboard/recent-activities';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            National Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back, here&apos;s a look at the nation&apos;s health
            activities.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="gradient">
            <PlusCircle />
            Create Activity
          </Button>
          <Button variant="outline">
            <FileText />
            View Reports
          </Button>
           <Button variant="outline">
            <Users />
            Manage Teams
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {federalDashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformanceCharts />
        </div>
        <div className="lg:col-span-1">
          <MapCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
         <EmergencyCenter />
         <RecentActivities />
      </div>
    </div>
  );
}
