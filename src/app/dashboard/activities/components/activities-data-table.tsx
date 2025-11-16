"use client";

import type { Activity, ActivityStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Building, MapPin, Tag, Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

const statusStyles: Record<ActivityStatus, string> = {
  Approved: "bg-green-500 text-white",
  Submitted: "bg-blue-500 text-white",
  Draft: "bg-gray-500 text-white",
  Rejected: "bg-red-500 text-white",
  Completed: "bg-primary text-white",
};

function ActivityCard({ activity }: { activity: Activity }) {
  // Consistently format dates to avoid hydration errors
  const createdDate = format(new Date(activity.dateCreated), "PPP");
  const modifiedDate = format(new Date(activity.lastModified), "PPP");

  return (
    <Card className="flex items-start gap-4 p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Checkbox className="h-6 w-6 mt-1" />
      <div className="flex-1">
        <div className="flex items-start justify-between">
            <Link href={`/dashboard/activities/${activity.id}`}>
              <h3 className="text-lg font-bold text-foreground hover:underline">{activity.title}</h3>
            </Link>
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
            <span>Created: {createdDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Modified: {modifiedDate}</span>
          </div>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary" asChild>
                <Link href={`/dashboard/activities/${activity.id}`}>
                    <Eye className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary" asChild>
                <Link href={`/dashboard/activities/${activity.id}/edit`}>
                    <Pencil className="h-5 w-5" />
                </Link>
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
