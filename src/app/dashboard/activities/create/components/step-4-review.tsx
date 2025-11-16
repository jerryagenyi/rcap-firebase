
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Send, FileText, MapPin, Calendar, Paperclip, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

type Step4Props = {
  onSubmit: (data: any) => void;
  onBack: () => void;
  formData: any;
};

const ReviewItem = ({ label, value }: { label: string; value: string | React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-4">
    <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
    <dd className="text-sm col-span-2">{value}</dd>
  </div>
);

export function Step4Review({ onSubmit, onBack, formData }: Step4Props) {
  const { title, type, description, location, state, lga, startDate, endDate, attachments } = formData;

  const handleSubmit = () => {
    onSubmit({});
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-none border-none">
        <CardHeader className="p-1">
          <CardTitle>Review and Submit</CardTitle>
          <CardDescription>
            Please review all the information carefully before submitting the activity for approval.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-1 mt-6">
          
          {/* Section 1: Activity Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold">Activity Details</h4>
            </div>
            <dl className="space-y-3 pl-7">
              <ReviewItem label="Title" value={title || 'Not provided'} />
              <ReviewItem label="Type" value={type || 'Not provided'} />
              <ReviewItem label="Description" value={<p className="whitespace-pre-wrap">{description || 'Not provided'}</p>} />
            </dl>
          </div>
          
          <Separator />

          {/* Section 2: Logistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold">Logistics</h4>
            </div>
            <dl className="space-y-3 pl-7">
              <ReviewItem label="State" value={state || 'Not provided'} />
              <ReviewItem label="LGA" value={lga || 'Not provided'} />
              <ReviewItem label="Location" value={location || 'Not provided'} />
              <ReviewItem label="Start Date" value={startDate ? format(new Date(startDate), 'PPP') : 'Not provided'} />
              <ReviewItem label="End Date" value={endDate ? format(new Date(endDate), 'PPP') : 'Not provided'} />
            </dl>
          </div>

          <Separator />
          
          {/* Section 3: Attachments */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-primary" />
                <h4 className="text-lg font-semibold">Attachments</h4>
            </div>
            <div className="pl-7">
              {attachments && attachments.length > 0 ? (
                <ul className="space-y-2">
                  {attachments.map((file: File, index: number) => (
                    <li key={index} className="text-sm flex items-center gap-2">
                      <File className="h-4 w-4 text-muted-foreground" />
                      {file.name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No attachments were uploaded.</p>
              )}
            </div>
          </div>

        </CardContent>
      </Card>
      
      <CardFooter className="flex justify-between p-0">
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <Button type="button" variant="gradient" onClick={handleSubmit}>
          Submit for Approval <Send className="ml-2" />
        </Button>
      </CardFooter>
    </div>
  );
}
