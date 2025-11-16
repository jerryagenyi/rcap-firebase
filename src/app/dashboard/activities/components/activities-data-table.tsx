"use client";

import type { Activity, ActivityStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Tag, Calendar, Eye, Pencil, Trash2 } from "lucide-react";

const statusStyles: Record<ActivityStatus, string> = {
  Approved: "bg-green-500 text-white",
  Submitted: "bg-blue-500 text-white",
  Draft: "bg-gray-500 text-white",
  Rejected: "bg-red-500 text-white",
  Completed: "bg-primary text-white",
};

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="flex items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Checkbox className="h-6 w-6 mt-1" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-bold text-foreground">{activity.title}</h3>
          <Badge className={`${statusStyles[activity.status]} rounded-lg px-3 py-1`}>{activity.status}</Badge>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4" />
            <span>{activity.organization}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{activity.location}</span>
          </div>
          <div className="flex items-center gap-2">
             <Tag className="h-4 w-4 text-primary" />
             <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md">{activity.type}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {new Date(activity.dateCreated).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Modified: {new Date(activity.lastModified).toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <Eye className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <Pencil className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/70 hover:bg-red-500/10 hover:text-red-500">
                <Trash2 className="h-5 w-5" />
            </Button>
        </div>

      </div>
    </Card>
  );
}

export default function ActivitiesList({ data }: { data: Activity[] }) {
  return (
    <div className="grid gap-4">
      {data.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
