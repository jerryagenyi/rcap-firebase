import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import MetricCard from '@/components/dashboard/metric-card';
import { ClipboardList, CheckCircle, Clock } from 'lucide-react';
import RecentActivities from '@/components/dashboard/recent-activities';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const userProfileMetrics = [
    {
      title: "My Activities",
      value: "42",
      trend: "6 completed",
      icon: ClipboardList,
      accentColor: "bg-primary",
    },
    {
      title: "Approvals Given",
      value: "18",
      trend: "2 this week",
      icon: CheckCircle,
      accentColor: "bg-green-500",
    },
    {
      title: "Pending Tasks",
      value: "5",
      trend: "2 overdue",
      icon: Clock,
      accentColor: "bg-orange-500",
    },
];

export default function ProfilePage() {
  const userAvatar = PlaceHolderImages.find((p) => p.id === 'user1');

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal information, settings, and activity.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your photo and personal details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-20 w-20">
                            <AvatarImage src={userAvatar?.imageUrl} />
                            <AvatarFallback>FA</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                             <Button variant="outline">Change Photo</Button>
                             <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input id="fullName" defaultValue="Federal Admin" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="admin@rcap.gov" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+234 123 456 7890" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input id="jobTitle" defaultValue="National Coordinator" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea id="bio" placeholder="Tell us a little about yourself." className="min-h-[100px]" defaultValue="National Coordinator for the RCAP project, overseeing federal-level activities and ensuring smooth operation across all states." />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button variant="gradient" className="ml-auto">Save Changes</Button>
                </CardFooter>
            </Card>

            <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <Card>
                    <AccordionTrigger className="p-6">
                      <CardHeader className="p-0">
                        <CardTitle>Activity History &amp; Performance</CardTitle>
                        <CardDescription>An overview of your recent activities and key metrics.</CardDescription>
                      </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                      <div className="space-y-8">
                         <div className="grid gap-4 md:grid-cols-3">
                            {userProfileMetrics.map((metric) => (
                                <MetricCard key={metric.title} {...metric} />
                            ))}
                        </div>
                        <RecentActivities />
                      </div>
                    </AccordionContent>
                  </Card>
                </AccordionItem>
            </Accordion>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Role &amp; Permissions</CardTitle>
                    <CardDescription>Your current role within the RCAP system.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <span className="text-sm font-medium">Current Role</span>
                        <Badge variant="destructive">Super Admin</Badge>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <p className="font-medium text-foreground">Key Permissions:</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li>Manage Users & Organisations</li>
                            <li>Approve/Reject any Activity</li>
                            <li>Generate National Reports</li>
                            <li>Full system access</li>
                        </ul>
                    </div>
                     <Button variant="link" className="p-0 h-auto">Request Permission Change</Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label htmlFor="email-notifs" className="text-base">Email Notifications</Label>
                        <Switch id="email-notifs" defaultChecked/>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label htmlFor="push-notifs" className="text-base">Push Notifications</Label>
                        <Switch id="push-notifs" defaultChecked/>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label htmlFor="sms-notifs" className="text-base">SMS Alerts</Label>
                        <Switch id="sms-notifs" />
                    </div>
                </CardContent>
                <CardFooter className="border-t pt-6">
                    <Button variant="outline" className="w-full">Manage Detailed Preferences</Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}