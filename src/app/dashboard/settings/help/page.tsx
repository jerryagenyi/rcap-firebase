
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Send } from 'lucide-react';


const HelpSettings = () => (
    <div id="help" className="space-y-8">
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions.</CardDescription>
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
                     <AccordionItem value="item-3">
                        <AccordionTrigger>Where can I find generated reports?</AccordionTrigger>
                        <AccordionContent>
                           All generated and custom reports are available under the "Reports" section in the main navigation.
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


export default function HelpSettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Help & Support
        </h1>
        <p className="text-muted-foreground">
          Find answers to your questions or contact our support team.
        </p>
      </div>

      <div className="space-y-8">
        <HelpSettings />
      </div>
    </div>
  );
}
