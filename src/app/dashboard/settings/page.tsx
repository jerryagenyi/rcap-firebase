

'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Palette, Database, HelpCircle, ShieldCheck, KeyRound, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

const AccountSettings = () => {
    const userAvatar = PlaceHolderImages.find((p) => p.id === 'user1');
    
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
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
                            <Input id-="newPassword" type="password" />
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
        </div>
    )
};

const NotificationsSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notification Preferences</CardTitle>
      <CardDescription>
        Choose how and when you want to be notified.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">
      
      {/* Email Notifications */}
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
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="email-alerts" className="text-base">Urgent Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive immediate emails for critical outbreak alerts.
              </p>
            </div>
            <Switch id="email-alerts" defaultChecked />
          </div>
        </div>
      </div>
      
      <Separator />

      {/* Push Notifications */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="push-everything" className="text-base">Everything</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications for all activities.
              </p>
            </div>
            <Switch id="push-everything" />
          </div>
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="push-mentions" className="text-base">Direct Mentions</Label>
              <p className="text-sm text-muted-foreground">
                Get notified only when someone @mentions you.
              </p>
            </div>
            <Switch id="push-mentions" defaultChecked />
          </div>
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="push-none" className="text-base">Nothing</Label>
              <p className="text-sm text-muted-foreground">
                No push notifications will be sent.
              </p>
            </div>
            <Switch id="push-none" />
          </div>
        </div>
      </div>

    </CardContent>
     <CardFooter className="border-t pt-6">
        <Button variant="gradient" className="ml-auto">Save Preferences</Button>
    </CardFooter>
  </Card>
);

const AppearanceSettings = () => (
  <Card>
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
        <h3 className="text-lg font-medium text-foreground">Font Size</h3>
        <div className="rounded-lg border p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="font-size" className="text-base">Application Font Size</Label>
            <span className="text-sm text-muted-foreground">16px</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Adjust the overall font size of the application for better readability.
          </p>
          <Slider defaultValue={[16]} max={20} min={12} step={1} id="font-size" />
        </div>
      </div>

      <Separator />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Accessibility</h3>
        <div className="space-y-4">
          <div className="flex items-start justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="high-contrast" className="text-base">High Contrast Mode</Label>
              <p className="text-sm text-muted-foreground">
                Increase contrast throughout the application.
              </p>
            </div>
            <Switch id="high-contrast" />
          </div>
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
      </div>
    </CardContent>
    <CardFooter className="border-t pt-6">
      <Button variant="gradient" className="ml-auto">Save Appearance Settings</Button>
    </CardFooter>
  </Card>
);

const DataSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Data & Sync</CardTitle>
      <CardDescription>
        Manage your data and synchronization settings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Data settings content will go here.</p>
    </CardContent>
  </Card>
);

const HelpSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Help & Support</CardTitle>
      <CardDescription>
        Find answers to your questions and get support.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Help & Support content will go here.</p>
    </CardContent>
  </Card>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
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

      <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <TabsList className="flex-col h-auto items-start bg-transparent p-0 border-r">
            <TabsTrigger value="account" className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
              <User size={20} />
              Account
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
              <Bell size={20} />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="appearance" className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
              <Palette size={20} />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="data" className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
              <Database size={20} />
              Data & Sync
            </TabsTrigger>
            <TabsTrigger value="help" className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
              <HelpCircle size={20} />
              Help
            </TabsTrigger>
          </TabsList>

          <div className="md:col-span-3">
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationsSettings />
            </TabsContent>
            <TabsContent value="appearance">
              <AppearanceSettings />
            </TabsContent>
            <TabsContent value="data">
              <DataSettings />
            </TabsContent>
            <TabsContent value="help">
              <HelpSettings />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}

    