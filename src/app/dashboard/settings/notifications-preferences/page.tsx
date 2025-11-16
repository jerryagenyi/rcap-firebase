
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Mail, Smartphone, Bell } from 'lucide-react';

const NotificationCategory = ({ title, description }: { title: string; description: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-6">
      <div>
        <h4 className="mb-4 text-base font-medium text-foreground">Channels</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor={`${title.toLowerCase()}-email`} className="text-base">
                Email
              </Label>
            </div>
            <Switch id={`${title.toLowerCase()}-email`} defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor={`${title.toLowerCase()}-sms`} className="text-base">
                SMS
              </Label>
            </div>
            <Switch id={`${title.toLowerCase()}-sms`} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <Label htmlFor={`${title.toLowerCase()}-push`} className="text-base">
                Push Notification
              </Label>
            </div>
            <Switch id={`${title.toLowerCase()}-push`} defaultChecked />
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="mb-4 text-base font-medium text-foreground">Frequency</h4>
        <RadioGroup defaultValue="immediate" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Label htmlFor={`${title.toLowerCase()}-immediate`} className="flex flex-col items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary has-[input:checked]:bg-primary/10">
            <RadioGroupItem value="immediate" id={`${title.toLowerCase()}-immediate`} className="sr-only" />
            <span className="font-semibold">Immediate</span>
            <span className="text-sm text-muted-foreground">Receive notifications as soon as they happen.</span>
          </Label>
          <Label htmlFor={`${title.toLowerCase()}-daily`} className="flex flex-col items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary has-[input:checked]:bg-primary/10">
            <RadioGroupItem value="daily" id={`${title.toLowerCase()}-daily`} className="sr-only" />
            <span className="font-semibold">Daily Digest</span>
            <span className="text-sm text-muted-foreground">Get a summary of all notifications once a day.</span>
          </Label>
          <Label htmlFor={`${title.toLowerCase()}-weekly`} className="flex flex-col items-start gap-3 rounded-lg border p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground has-[input:checked]:border-primary has-[input:checked]:bg-primary/10">
            <RadioGroupItem value="weekly" id={`${title.toLowerCase()}-weekly`} className="sr-only" />
             <span className="font-semibold">Weekly Digest</span>
            <span className="text-sm text-muted-foreground">A weekly summary of all notifications.</span>
          </Label>
        </RadioGroup>
      </div>
    </CardContent>
  </Card>
);

export default function DetailedNotificationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Detailed Notification Preferences
        </h1>
        <p className="text-muted-foreground">
          Fine-tune how you receive notifications for different types of events.
        </p>
      </div>

      <div className="space-y-8">
        <NotificationCategory
          title="Approvals"
          description="Notifications related to activity approvals, rejections, and comments."
        />
        <NotificationCategory
          title="Assignments"
          description="Notifications for when you are assigned to new tasks or activities."
        />
        <NotificationCategory
          title="Alerts"
          description="Urgent notifications about public health alerts and emergencies."
        />
        <NotificationCategory
          title="System Updates"
          description="Notifications about system maintenance, new features, and updates."
        />
      </div>
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" size="lg">Cancel</Button>
        <Button variant="gradient" size="lg">Save Preferences</Button>
      </div>
    </div>
  );
}
