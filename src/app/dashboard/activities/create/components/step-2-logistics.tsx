
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  location: z.string().min(3, 'Location must be at least 3 characters.'),
  state: z.string().nonempty('State is required.'),
  lga: z.string().nonempty('LGA is required.'),
  startDate: z.date({ required_error: 'A start date is required.' }),
  endDate: z.date({ required_error: 'An end date is required.' }),
}).refine(data => data.endDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["endDate"],
});


type Step2Props = {
  onNext: (data: z.infer<typeof formSchema>) => void;
  onBack: () => void;
  formData: any;
};

// Mock data, in a real app this would come from an API
const statesAndLgas: Record<string, string[]> = {
    "Abuja FCT": ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
    "Lagos": ["Agege", "Alimosho", "Ifako-Ijaiye", "Ikeja", "Kosofe", "Mushin", "Oshodi-Isolo", "Shomolu", "Apapa", "Eti-Osa", "Lagos Island", "Lagos Mainland", "Surulere", "Ojo", "Ajeromi-Ifelodun", "Amuwo-Odofin", "Badagry", "Ikorodu", "Ibeju-Lekki", "Epe"],
    "Kano": ["Dala", "Fagge", "Gwale", "Kano Municipal", "Tarauni", "Nassarawa", "Kumbotso", "Ungogo", "Dawakin Tofa", "Tofa", "Rimin Gado", "Bagwai", "Gezawa", "Gabasawa", "Minjibir", "Dambatta", "Makoda", "Kunchi", "Bichi", "Tsanyawa", "Shanono", "Gwarzo", "Karaye", "Rogo", "Kabo", "Bunkure", "Kibiya", "Rano", "Tudun Wada", "Doguwa", "Madobi", "Kura", "Garun Mallam", "Bebeji", "Kiru", "Sumaila", "Garko", "Takai", "Albasu", "Gaya", "Wudil", "Warawa", "Ajingi"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Okrika", "Ogu/Bolo", "Eleme", "Tai", "Gokana", "Khana", "Oyigbo", "Opobo/Nkoro", "Andoni", "Bonny", "Degema", "Asari-Toru", "Akuku-Toru", "Abua/Odual", "Ahoada West", "Ahoada East", "Ogba/Egbema/Ndoni", "Emuoha", "Ikwerre", "Etche", "Omuma"],
    "Oyo": ["Ibadan North", "Ibadan North-East", "Ibadan North-West", "Ibadan South-East", "Ibadan South-West", "Akinyele", "Egbeda", "Lagelu", "Ona Ara", "Oluyole", "Ido"],
};
const states = Object.keys(statesAndLgas);

export function Step2Logistics({ onNext, onBack, formData }: Step2Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: formData.location || '',
      state: formData.state || undefined,
      lga: formData.lga || undefined,
      startDate: formData.startDate ? new Date(formData.startDate) : undefined,
      endDate: formData.endDate ? new Date(formData.endDate) : undefined,
    },
  });

  const selectedState = form.watch('state');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-8">
        <div className="space-y-6 p-1">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LGA / Area Council</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedState}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedState ? "Select LGA" : "Select a state first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedState && statesAndLgas[selectedState].map(lga => (
                        <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Specific Location / Venue</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., National Hospital Abuja, Conference Room A" {...field} />
                </FormControl>
                <FormDescription>Provide the specific address or venue for the activity.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-12",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                           className={cn(
                            "w-full pl-3 text-left font-normal h-12",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < form.getValues('startDate')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <CardFooter className="flex justify-between p-0">
          <Button type="button" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2" /> Back
          </Button>
          <Button type="submit" variant="gradient">
            Next: Attachments <ArrowRight className="ml-2" />
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
