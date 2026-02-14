import { useLocations } from "@/hooks/use-locations";
import { Section } from "@/components/ui/Section";
import { Loader2, MapPin, Clock, Phone, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Locations() {
  const { data: locations, isLoading } = useLocations();

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-muted/10 py-24 px-4 text-center border-b border-white/5">
        <h1 className="text-5xl font-display font-bold mb-4">Our Locations</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find us at these premium destinations.
        </p>
      </div>

      <Section>
        {isLoading ? (
           <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-12">
            {locations?.map((loc) => (
              <div key={loc.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-muted/10 rounded-2xl overflow-hidden border border-white/5">
                <div className="h-[400px] bg-muted relative group">
                  <img 
                    src={loc.imageUrl || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1600"} 
                    alt={loc.name}
                    className="w-full h-full object-cover"
                  />
                  <a 
                    href={loc.mapUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <div className="flex items-center gap-2 text-white font-bold text-lg border-2 border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors">
                      <Map className="w-5 h-5" /> View on Google Maps
                    </div>
                  </a>
                </div>
                
                <div className="p-8 flex flex-col justify-center">
                  <h2 className="text-3xl font-bold mb-2">{loc.name}</h2>
                  <p className="text-lg text-primary mb-6">{loc.address}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-4">
                      <Clock className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-semibold text-white">Timings</div>
                        <div className="text-muted-foreground">{loc.timings}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-semibold text-white">Contact</div>
                        <div className="text-muted-foreground">{loc.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                      <div>
                        <div className="font-semibold text-white">Features</div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(loc.features as string[]).map((feature, idx) => (
                            <span key={idx} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded text-white/80">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full sm:w-auto self-start bg-primary text-white">
                    Get Directions
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
