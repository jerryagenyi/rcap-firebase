
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { User, Bell, Palette, Database, HelpCircle, ShieldCheck, KeyRound, Trash2, HardDrive, RefreshCcw, Mail, Send, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const AccountSettings = () => {
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user1');
    
    return (
        <Card id="account">
            <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Update your personal details and manage your password.</CardDescription>
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
                        <Textarea id="bio" placeholder="Tell us a little about yourself." className="min-h-[100px]" />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button variant="gradient" className="ml-auto">Save Changes</Button>
            </CardFooter>
        </Card>
    )
};

const PasswordManagement = () => (
    <Card>
         <CardHeader>
            <CardTitle>Password Management</CardTitle>
            <CardDescription>Change your password here. Ensure it is a strong one.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                </div>
            </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
            <Button variant="gradient" className="ml-auto">Update Password</Button>
        </CardFooter>
    </Card>
);

const DangerZone = () => (
    <Card className="border-destructive/50">
         <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription className="text-destructive/80">These actions are permanent and cannot be undone.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <div>
                <p className="font-semibold">Delete Your Account</p>
                <p className="text-sm text-muted-foreground">Permanently delete all your data from the RCAP platform.</p>
            </div>
            <Button variant="destructive">Delete Account</Button>
        </CardContent>
    </Card>
);

const NotificationsSettings = () => (
  <Card id="notifications">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>
        Choose how and when you want to be notified. For more detailed settings, <Link href="/dashboard/settings/notifications-preferences" className="text-primary underline">go to the advanced notification preferences page</Link>.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="email-approvals" className="text-base">Approval Requests</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails for new approval requests and status updates.
              </p>
            </div>
            <Switch id="email-approvals" defaultChecked />
          </div>
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="email-assignments" className="text-base">Task Assignments</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you are assigned to a new activity or task.
              </p>
            </div>
            <Switch id="email-assignments" defaultChecked />
          </div>
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Push Notifications</h3>
        <div className="flex items-start justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="push-mentions" className="text-base">Direct Mentions</Label>
            <p className="text-sm text-muted-foreground">
              Get notified only when someone @mentions you.
            </p>
          </div>
          <Switch id="push-mentions" defaultChecked />
        </div>
      </div>
    </CardContent>
     <CardFooter className="border-t pt-6">
        <Button variant="gradient" className="ml-auto">Save Preferences</Button>
    </CardFooter>
  </Card>
);

const AppearanceSettings = () => (
  <Card id="appearance">
    <CardHeader>
      <CardTitle>Appearance</CardTitle>
      <CardDescription>
        Customize the look and feel of the application to your preference.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Theme</h3>
        <div className="flex items-start justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
            <p className="text-sm text-muted-foreground">
              Enable dark mode for a different visual experience.
            </p>
          </div>
          <Switch id="dark-mode" />
        </div>
      </div>
      <Separator />
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Accessibility</h3>
        <div className="flex items-start justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="reduced-motion" className="text-base">Reduced Motion</Label>
            <p className="text-sm text-muted-foreground">
              Reduce animations and motion effects.
            </p>
          </div>
          <Switch id="reduced-motion" />
        </div>
      </div>
    </CardContent>
    <CardFooter className="border-t pt-6">
      <Button variant="gradient" className="ml-auto">Save Appearance</Button>
    </CardFooter>
  </Card>
);

const DataSettings = () => (
  <Card id="data">
    <CardHeader>
      <CardTitle>Data & Sync</CardTitle>
      <CardDescription>
        Manage your data synchronization, cache, and usage.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">
      <div className="flex items-start justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label htmlFor="auto-sync" className="text-base">Auto-sync in background</Label>
          <p className="text-sm text-muted-foreground">
            Keep your data up-to-date automatically.
          </p>
        </div>
        <Switch id="auto-sync" defaultChecked />
      </div>
      <Separator />
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="space-y-0.5">
          <Label className="text-base">Clear Local Cache</Label>
          <p className="text-sm text-muted-foreground">
            This can help solve some display issues.
          </p>
        </div>
        <Button variant="outline">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cache
        </Button>
      </div>
    </CardContent>
  </Card>
);

const HelpSettings = () => (
    <div id="help" className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>Find answers or contact support.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent>
                            You can reset your password by going to the login page and clicking the "Forgot Password?" link. You will receive an email with instructions on how to reset it.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>How do I create a new activity?</AccordionTrigger>
                        <AccordionContent>
                           Navigate to the "Activities" page and click the "Create" button.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Still need help? Send us a message.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="e.g., Issue with report generation" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="support-message">Message</Label>
                    <Textarea id="support-message" placeholder="Describe your issue in detail..." className="min-h-[120px]" />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button variant="gradient" className="ml-auto">
                    <Send className="mr-2" />
                    Send Message
                </Button>
            </CardFooter>
        </Card>
    </div>
);


export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Configure your application preferences.
        </p>
      </div>

      <div className="space-y-8">
        <AccountSettings />
        <PasswordManagement />
        <NotificationsSettings />
        <AppearanceSettings />
        <DataSettings />
        <HelpSettings />
        <DangerZone />
      </div>
    </div>
  );
}
