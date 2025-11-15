import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const alerts = [
    {
        title: "High Alert: Lassa Fever Outbreak",
        location: "Edo State",
        severity: "Critical",
        icon: AlertTriangle,
        color: "text-red-500",
    },
    {
        title: "Cholera Cases Reported",
        location: "Borno State",
        severity: "High",
        icon: ShieldAlert,
        color: "text-orange-500",
    },
    {
        title: "Vaccine Supply Chain Update",
        location: "National",
        severity: "Info",
        icon: CheckCircle2,
        color: "text-blue-500",
    },
]

export default function EmergencyCenter() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Alert Center</CardTitle>
        <CardDescription>Priority notifications and active emergencies.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
            {alerts.map((alert, index) => (
                <li key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary">
                    <alert.icon className={`mt-1 h-5 w-5 flex-shrink-0 ${alert.color}`} />
                    <div className="flex-1">
                        <p className="font-semibold">{alert.title}</p>
                        <p className="text-sm text-muted-foreground">{alert.location}</p>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
}
