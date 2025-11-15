import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function MapCard() {
  const mapImage = PlaceHolderImages.find(p => p.id === 'map');
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Activity Heatmap</CardTitle>
        <CardDescription>State-wise activity distribution.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
          {mapImage && (
            <Image 
              src={mapImage.imageUrl} 
              alt={mapImage.description}
              fill
              className="object-cover"
              data-ai-hint={mapImage.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-accent/30 mix-blend-multiply" />
          <div className="absolute top-4 right-4 flex items-center gap-2 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold">
            <Map className="h-4 w-4 text-primary"/>
            <span>National View</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
