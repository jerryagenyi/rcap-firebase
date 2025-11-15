import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { mockActivities } from "@/lib/data";
import ActivitiesDataTable from "./components/activities-data-table";

export default function ActivitiesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Activity Management
          </h1>
          <p className="text-muted-foreground">
            Track, manage, and report all risk communication activities.
          </p>
        </div>
        <Button variant="gradient">
          <PlusCircle />
          Create New Activity
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Activities</CardTitle>
          <CardDescription>Filter, search, and manage activities across all regions.</CardDescription>
        </CardHeader>
        <CardContent>
            <ActivitiesDataTable data={mockActivities} />
        </CardContent>
      </Card>
    </div>
  );
}
