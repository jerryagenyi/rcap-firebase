import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateActivityPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create New Activity
        </h1>
        <p className="text-muted-foreground">
          Follow the steps to create and submit a new activity.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Activity Creation Wizard</CardTitle>
          <CardDescription>
            Content for the multi-step wizard will go here.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Multi-step form coming soon...</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
