
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
import { navItems } from '@/lib/data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

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
      <CardTitle>Data &amp; Sync</CardTitle>
      <CardDescription>
        Manage your data synchronization, cache, and usage.
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-8">

      {/* Auto-Sync Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Synchronization</h3>
        <div className="flex items-start justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label htmlFor="auto-sync" className="text-base">Auto-sync in background</Label>
            <p className="text-sm text-muted-foreground">
              Keep your data up-to-date automatically across devices.
            </p>
          </div>
          <Switch id="auto-sync" defaultChecked />
        </div>
      </div>
      
      <Separator />

      {/* Cache Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Cache Management</h3>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <Label className="text-base">Clear Local Cache</Label>
            <p className="text-sm text-muted-foreground">
              This will clear all locally stored data. It might help solve some issues.
            </p>
          </div>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cache
          </Button>
        </div>
      </div>

      <Separator />

      {/* Data Usage */}
       <div className="space-y-4">
        <h3 className="text-lg font-medium text-foreground">Data Usage</h3>
        <div className="rounded-lg border p-4 space-y-4">
          <div className="flex items-center gap-4">
            <HardDrive className="h-6 w-6 text-muted-foreground" />
            <div className="flex-1">
              <Label className="text-base">Local Storage Usage</Label>
              <p className="text-sm text-muted-foreground">
                Amount of disk space used by the application for offline access.
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <Progress value={25} className="h-2"/>
            <div className="flex justify-between">
                <p className="text-xs text-muted-foreground">250 MB used of 1 GB</p>
                <p className="text-xs text-muted-foreground">Last synced: 5 minutes ago</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
    <CardFooter className="border-t pt-6">
      <Button variant="gradient" className="ml-auto">Save Data Settings</Button>
    </CardFooter>
  </Card>
);

const HelpSettings = () => (
    <div className="space-y-8">
        {/* FAQ Section */}
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find quick answers to common questions.</CardDescription>
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
                            You can create a new activity by clicking the "Create" or "Create Activity" button on the Dashboard or the Activities page. This will start a multi-step form to guide you through the process.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>What do the different activity statuses mean?</AccordionTrigger>
                        <AccordionContent>
                            - **Draft**: The activity is being created and has not been submitted for review. &lt;br /&gt;
                            - **Submitted**: The activity has been submitted and is awaiting approval. &lt;br /&gt;
                            - **Approved**: The activity has been approved and is active. &lt;br /&gt;
                            - **Rejected**: The activity was not approved. &lt;br /&gt;
                            - **Completed**: The activity has finished.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>

        {/* Contact Support Section */}
        <Card>
            <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Still need help? Send us a message.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="support-subject">Subject</Label>
                    <Input id="support-subject" placeholder="Enter the subject of your inquiry" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="support-message">Message</Label>
                    <Textarea id="support-message" placeholder="Describe your issue in detail." className="min-h-[120px]" />
                </div>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Button variant="gradient" className="ml-auto">
                    <Send className="mr-2" />
                    Send Message
                </Button>
            </CardFooter>
        </Card>

        {/* System Status Section */}
        <Card>
            <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Check the current status of our services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <p>Email Services</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-500/10">
                         <CircleCheck className="mr-2 h-4 w-4" />
                        Operational
                    </Badge>
                </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="h-5 w-5 text-muted-foreground" />
                        <p>Database</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-500/10">
                        <CircleCheck className="mr-2 h-4 w-4" />
                        Operational
                    </Badge>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <p>Push Notifications</p>
                    </div>
                     <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-500/10">
                        <CircleCheck className="mr-2 h-4 w-4" />
                        Operational
                    </Badge>
                </div>
                <Separator className="my-2"/>
                 <p className="text-sm text-muted-foreground">RCAP v1.0.0</p>
            </CardContent>
        </Card>
    </div>
);


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  // Find the settings item and its children
  const settingsItem = navItems.find(item => item.title === 'Settings');
  const settingsTabs = settingsItem?.children || [];

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
            {settingsTabs.map(tab => (
              <TabsTrigger 
                key={tab.href.split('#')[1] || 'account'} 
                value={tab.href.split('#')[1] || 'account'} 
                className="w-full justify-start gap-2 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none"
              >
                <tab.icon size={20} />
                {tab.title}
              </TabsTrigger>
            ))}
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

    