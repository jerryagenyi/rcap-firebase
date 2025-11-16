
'use client';

import { useParams, notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ActivityCreationWizard } from "@/app/dashboard/activities/create/components/activity-creation-wizard";
import { mockActivities } from '@/lib/data';

export default function EditActivityPage() {
    const params = useParams();
    const { id } = params;
    const activity = mockActivities.find(a => a.id === id);

    if (!activity) {
        notFound();
    }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Edit Activity
        </h1>
        <p className="text-muted-foreground">
          Update the details for activity: {activity.title}
        </p>
      </div>
      <ActivityCreationWizard />
    </div>
  );
}
