import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="relative py-24 px-4 bg-muted/20 border-b border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 px-4 py-1">Our Story</Badge>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Born from Passion</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Café CO2 began with a simple vision: to create a space where the rhythm of music matches the flavor of food.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary opacity-20 blur-xl rounded-full" />
            <img 
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1000" 
              alt="Restaurant Interior" 
              className="relative rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">A Tale of Two Cities</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We started our journey on the sun-kissed shores of Vagator, Goa. The idea was to capture the essence of a sunset party and put it on a plate. The overwhelming love we received pushed us to expand to the serene lakesides of Bhugaon, Pune.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, Café CO2 stands as a beacon for those who seek luxury, taste, and a vibe that's unmatched. Whether you're chilling by the beach or lounging by the lake, the CO2 experience remains constant: Premium, Lively, and Unforgettable.
            </p>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <div className="border-y border-white/5 bg-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Years of Excellence", value: "5+" },
            { label: "Locations", value: "2" },
            { label: "Happy Guests", value: "50k+" },
            { label: "Parties Hosted", value: "1000+" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm uppercase tracking-wider text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pune Location Detail */}
      <Section className="bg-muted/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center lg:flex-row-reverse">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-2">Pune - Bhugaon</h2>
            <div className="text-secondary font-medium mb-6">Lakeside Resto Lounge</div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Nestled by the Manas Lake, our Pune outlet offers a tranquil escape from the city chaos. As the sun sets, the venue transforms into a high-energy lounge with live bands and DJ sets.
            </p>
            <ul className="space-y-2 mb-8 text-muted-foreground">
              <li className="flex items-center gap-2">✓ Lakeside Deck Seating</li>
              <li className="flex items-center gap-2">✓ Private VIP Pods</li>
              <li className="flex items-center gap-2">✓ Late Night Kitchen</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
             <img 
              src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=1000" 
              alt="Pune Location" 
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>
      </Section>

      {/* Goa Location Detail */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
             <img 
              src="https://pixabay.com/get/ge504323d7746a2ab638c860f603f163ef82fc803d86f0f8bc83880c215950228c7984de85549c3cf94c725bafcfb59bfe969840ae11ff91795473f98f5351b16_1280.jpg" 
              alt="Goa Location" 
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Goa - Vagator</h2>
            <div className="text-primary font-medium mb-6">Sunset Beach & Party Vibe</div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Located in the heart of Vagator, our Goa outlet is where the party never stops. With stunning sunset views and a rustic-chic ambiance, it's the perfect spot for sundowners that turn into all-nighters.
            </p>
            <ul className="space-y-2 mb-8 text-muted-foreground">
              <li className="flex items-center gap-2">✓ Open Air Dance Floor</li>
              <li className="flex items-center gap-2">✓ Sunset View Deck</li>
              <li className="flex items-center gap-2">✓ Curated Cocktail Bar</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
