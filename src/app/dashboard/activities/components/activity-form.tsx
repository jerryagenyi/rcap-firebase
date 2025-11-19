
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Send, FileText, MapPin, Paperclip, CheckCircle, CalendarIcon, UploadCloud, File, X, Loader2 } from 'lucide-react';
import { mockActivities } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Activity } from '@/lib/types';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  type: z.string().nonempty('Activity type is required.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  location: z.string().min(3, 'Location must be at least 3 characters.'),
  state: z.string().nonempty('State is required.'),
  lga: z.string().nonempty('LGA is required.'),
  startDate: z.date({ required_error: 'A start date is required.' }),
  endDate: z.date({ required_error: 'An end date is required.' }),
  attachments: z.array(z.instanceof(File)).optional(),
}).refine(data => data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"],
});

type FileUpload = {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
};

type ActivityFormProps = {
  mode: 'create' | 'edit';
  activity?: Activity;
};

// Mock data
const statesAndLgas: Record<string, string[]> = {
    "Abuja FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
    "Lagos": ["Agege", "Alimosho", "Ifako-Ijaiye", "Ikeja", "Kosofe", "Mushin", "Oshodi-Isolo", "Shomolu", "Apapa", "Eti-Osa", "Lagos Island", "Lagos Mainland", "Surulere", "Ojo", "Ajeromi-Ifelodun", "Amuwo-Odofin", "Badagry", "Ikorodu", "Ibeju-Lekki", "Epe"],
    "Kano": ["Dala", "Fagge", "Gwale", "Kano Municipal", "Tarauni", "Nassarawa", "Kumbotso", "Ungogo", "Dawakin Tofa", "Tofa", "Rimin Gado", "Bagwai", "Gezawa", "Gabasawa", "Minjibir", "Dambatta", "Makoda", "Kunchi", "Bichi", "Tsanyawa", "Shanono", "Gwarzo", "Karaye", "Rogo", "Kabo", "Bunkure", "Kibiya", "Rano", "Tudun Wada", "Doguwa", "Madobi", "Kura", "Garun Mallam", "Bebeji", "Kiru", "Sumaila", "Garko", "Takai", "Albasu", "Gaya", "Wudil", "Warawa", "Ajingi"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Okrika", "Ogu/Bolo", "Eleme", "Tai", "Gokana", "Khana", "Oyigbo", "Opobo/Nkoro", "Andoni", "Bonny", "Degema", "Asari-Toru", "Akuku-Toru", "Abua/Odual", "Ahoada West", "Ahoada East", "Ogba/Egbema/Ndoni", "Emuoha", "Ikwerre", "Etche", "Omuma"],
    "Oyo": ["Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Akinyele", "Egbeda", "Lagelu", "Ona Ara", "Oluyole", "Ido"],
};
const states = Object.keys(statesAndLgas);
const activityTypes = [...new Set(mockActivities.map(a => a.type))];


export function ActivityForm({ mode, activity }: ActivityFormProps) {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: activity?.title || '',
      type: activity?.type || '',
      description: activity?.description || '',
      location: activity?.location.split(',')[0] || '', // Assuming location is "City, LGA"
      state: states.find(s => activity?.location.includes(s)) || undefined,
      lga: activity?.location.split(', ')[1] || undefined,
      startDate: activity?.dateCreated ? new Date(activity.dateCreated) : undefined,
      endDate: activity?.lastModified ? new Date(activity.lastModified) : undefined,
      attachments: [],
    },
  });

  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const selectedState = form.watch('state');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newUploads: FileUpload[] = files.map(file => ({
      id: `${file.name}-${Date.now()}`, file, progress: 0, status: 'uploading',
    }));

    setUploadedFiles(prev => [...prev, ...newUploads]);
    
    newUploads.forEach(upload => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(u => u.id === upload.id ? { ...u, progress: Math.min(u.progress + 20, 100) } : u));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(u => u.id === upload.id ? { ...u, status: 'completed', progress: 100 } : u));
      }, 1100);
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(a => a.id !== id));
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Submitting form data:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold">Activity {mode === 'create' ? 'Submitted' : 'Updated'}!</h2>
            <p className="text-muted-foreground mt-2">
              The activity has been successfully {mode === 'create' ? 'created and submitted' : 'updated'}.
            </p>
            <div className="mt-8 flex gap-4">
              <Button variant="outline" onClick={() => router.push('/dashboard/activities/create')}>Create Another Activity</Button>
              <Button variant="gradient" onClick={() => router.push('/dashboard/activities')}>View All Activities</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Activity Details</CardTitle>
            </div>
            <CardDescription>Provide the core information about the activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem>
                  <FormLabel>Activity Title</FormLabel>
                  <FormControl><Input placeholder="e.g., Statewide Vaccination Drive" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
            )} />
            <FormField control={form.control} name="type" render={({ field }) => (
              <FormItem>
                <FormLabel>Activity Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select an activity type" /></SelectTrigger></FormControl>
                  <SelectContent>{activityTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}</SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea placeholder="Detailed description of goals and scope." className="min-h-[120px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <CardTitle>Logistics</CardTitle>
            </div>
            <CardDescription>Specify the location and duration of the activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="state" render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger></FormControl>
                    <SelectContent>{states.map(state => <SelectItem key={state} value={state}>{state}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="lga" render={({ field }) => (
                <FormItem>
                  <FormLabel>LGA / Area Council</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedState}>
                    <FormControl><SelectTrigger><SelectValue placeholder={selectedState ? "Select LGA" : "Select a state first"} /></SelectTrigger></FormControl>
                    <SelectContent>{selectedState && statesAndLgas[selectedState].map(lga => <SelectItem key={lga} value={lga}>{lga}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="location" render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Location / Venue</FormLabel>
                <FormControl><Input placeholder="e.g., National Hospital Abuja, Conference Room A" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="startDate" render={({ field }) => (
                <FormItem className="flex flex-col"><FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><FormControl>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal h-12", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                  </Popover><FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="endDate" render={({ field }) => (
                <FormItem className="flex flex-col"><FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild><FormControl>
                      <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal h-12", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl></PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < form.getValues('startDate')} initialFocus /></PopoverContent>
                  </Popover><FormMessage />
                </FormItem>
              )} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-primary" />
                <CardTitle>Attachments</CardTitle>
            </div>
            <CardDescription>Upload supporting documents like proposals or budgets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                  <p className="mb-2 text-base text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PDF, DOCX, XLSX, or PNG (MAX. 5MB each)</p>
                </div>
                <Input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileChange} />
              </label>
            </div>
            {uploadedFiles.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Uploaded Files</h4>
                <AnimatePresence>
                  {uploadedFiles.map(attachment => (
                    <motion.div key={attachment.id} layout initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-4 rounded-lg border p-3">
                      <File className="h-6 w-6 text-primary" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold truncate max-w-xs">{attachment.file.name}</p>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-muted rounded-full h-1.5"><div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${attachment.progress}%` }}></div></div>
                          {attachment.status === 'uploading' && <Loader2 className="h-4 w-4 animate-spin" />}
                          {attachment.status === 'completed' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(attachment.id)}><X className="h-4 w-4" /></Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="button" variant="secondary">Save as Draft</Button>
            <Button type="submit" variant="gradient">
              {mode === 'create' ? 'Submit for Approval' : 'Save Changes'} <Send className="ml-2" />
            </Button>
        </div>
      </form>
    </Form>
  );
}
