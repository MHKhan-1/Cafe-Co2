import { Section } from "@/components/ui/Section";
import { useEvents } from "@/hooks/use-events";
import { Calendar, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Events() {
  const { data: events, isLoading } = useEvents();

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-gradient-to-b from-primary/10 to-background py-24 px-4 text-center">
        <h1 className="text-5xl font-display font-bold mb-4">Upcoming Events</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join us for unforgettable nights featuring top DJs, live bands, and special themed parties.
        </p>
      </div>

      <Section>
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : (
          <div className="grid gap-8">
            {events?.map((event) => (
              <div key={event.id} className="group grid grid-cols-1 md:grid-cols-3 bg-muted/20 rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all">
                {/* Date Block (Mobile) */}
                <div className="md:hidden bg-primary p-4 text-center text-white">
                  <span className="block text-sm uppercase font-bold">{new Date(event.date).toLocaleString('default', { weekday: 'long' })}</span>
                  <span className="block text-3xl font-bold">{new Date(event.date).getDate()}</span>
                  <span className="block text-sm">{new Date(event.date).toLocaleString('default', { month: 'long' })}</span>
                </div>

                {/* Image */}
                <div className="relative h-48 md:h-auto overflow-hidden">
                  <img 
                    src={event.imageUrl || "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800"} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase border border-white/20">
                    {event.type}
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-2 p-8 flex flex-col justify-center">
                  <div className="hidden md:flex items-center gap-4 text-primary font-bold mb-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-white/80 bg-white/5 px-4 py-2 rounded-full">
                      <MapPin className="w-4 h-4 text-secondary" />
                      {event.location}
                    </div>
                    <Link href={`/contact?event=${encodeURIComponent(event.title)}`}>
                      <Button className="rounded-full px-8 bg-white hover:bg-gray-200 text-black">Book Table</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>
    </div>
  );
}
