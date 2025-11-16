import { Button } from "@/components/ui/button";
import { PlusCircle, ListFilter, Search } from "lucide-react";
import { mockActivities } from "@/lib/data";
import ActivitiesList from "./components/activities-data-table";
import { Input } from "@/components/ui/input";

export default function ActivitiesPage() {
  const activityCount = mockActivities.length;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Activity Management
          </h1>
          <p className="text-muted-foreground">
            {activityCount} activities
          </p>
        </div>
        <Button variant="gradient">
          <PlusCircle />
          Create
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search activities, organizations, locations..."
            className="h-12 pl-12 w-full"
          />
        </div>
        <Button variant="outline" className="h-12">
          <ListFilter className="mr-2 h-5 w-5" />
          Filters
        </Button>
      </div>

      <ActivitiesList data={mockActivities} />

       <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1-{activityCount} of {activityCount} activities
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-10" disabled>Previous</Button>
          <Button variant="outline" className="h-10 w-10 p-0 bg-primary/10">1</Button>
          <Button variant="outline" className="h-10" disabled>Next</Button>
        </div>
      </div>
    </div>
  );
}
