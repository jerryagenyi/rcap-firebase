'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Bell, Palette, Database, HelpCircle } from 'lucide-react';

// Placeholder content for each tab
const AccountSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Account Settings</CardTitle>
      <CardDescription>
        Manage your profile, password, and account settings.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Account settings content will go here.</p>
    </CardContent>
  </Card>
);

const NotificationsSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Notification Preferences</CardTitle>
      <CardDescription>
        Choose how you want to be notified.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Notification preferences content will go here.</p>
    </CardContent>
  </Card>
);

const AppearanceSettings = () => (
  <Card>
    <CardHeader>
      <CardTitle>Appearance</CardTitle>
      <CardDescription>
        Customize the look and feel of the application.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p>Appearance settings content will go here.</p>
    </CardContent>
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
