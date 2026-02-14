import { motion } from "framer-motion";
import { ArrowRight, Music, Utensils, GlassWater } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/Section";
import { useMenu } from "@/hooks/use-menu";
import { useEvents } from "@/hooks/use-events";

export default function Home() {
  const { data: menuItems } = useMenu();
  const { data: events } = useEvents();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {/* Nightlife party crowd */}
          <img
            src="https://pixabay.com/get/g4c9ab6b91b4bf9aa542fb175a4f6607857b1681da12fc0b2e7b9faeb1625ad0ea8b2d299b102485742c8ec2191d64d9b0a6b958e55027e5bd38ef39d23dacd01_1280.jpg"
            alt="Nightlife atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-medium tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
              Welcome to Café CO2
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-[1.1]">
              Where Every Bite <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                Meets the Beat
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              From sunset shores in Goa to lakeside nights in Pune. Experience the ultimate fusion of culinary excellence and high-energy nightlife.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact?location=Goa">
                <Button size="lg" className="min-w-[180px] h-14 rounded-full bg-primary hover:bg-primary/90 text-lg font-semibold shadow-xl shadow-primary/20">
                  Book in Goa
                </Button>
              </Link>
              <Link href="/contact?location=Pune">
                <Button size="lg" variant="outline" className="min-w-[180px] h-14 rounded-full border-white/20 hover:bg-white/10 text-white text-lg font-semibold backdrop-blur-sm">
                  Book in Pune
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experiences Section */}
      <Section className="bg-muted/10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Crafting Experiences</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            More than just a restaurant, we curate moments that stay with you forever.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Utensils,
              title: "Culinary Art",
              desc: "Global cuisines crafted with passion and fresh ingredients.",
              img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
            },
            {
              icon: GlassWater,
              title: "Signature Cocktails",
              desc: "Mixology that pushes boundaries with every sip.",
              img: "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
            },
            {
              icon: Music,
              title: "Electric Vibe",
              desc: "World-class DJs and live performances every weekend.",
              img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="group relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-8">
                <div className="w-12 h-12 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center mb-4 text-primary">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Menu Preview */}
      <Section dark>
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Taste the Extraordinary</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">Signature Selections</h2>
          </div>
          <Link href="/menu">
            <Button variant="ghost" className="group text-primary hover:text-primary hover:bg-primary/10">
              View Full Menu <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuItems?.slice(0, 4).map((item) => (
            <div key={item.id} className="bg-muted/30 rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-colors group">
              <div className="h-48 overflow-hidden relative">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                    <Utensils className="w-8 h-8 opacity-20" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-full font-medium">
                  {item.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{item.name}</h3>
                  <span className="text-primary font-bold">₹{item.price}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-20 text-muted-foreground">Loading menu highlights...</div>
          )}
        </div>
      </Section>

      {/* Events Highlight */}
      <Section className="bg-gradient-to-b from-background to-[#151a24]">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold tracking-wider uppercase text-sm">Don't Miss Out</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">Upcoming Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events?.slice(0, 3).map((event) => (
            <div key={event.id} className="relative group rounded-2xl overflow-hidden aspect-[4/5]">
              {event.imageUrl ? (
                <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />
              
              <div className="absolute top-4 left-4 bg-primary text-white text-center p-2 rounded-lg min-w-[60px]">
                <div className="text-xs uppercase font-bold">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                <div className="text-xl font-bold">{new Date(event.date).getDate()}</div>
              </div>

              <div className="absolute bottom-0 p-6 w-full">
                <div className="text-secondary text-sm font-medium mb-1 uppercase tracking-wide">{event.type}</div>
                <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>
                <div className="flex items-center text-sm text-gray-400 gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {event.location}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/events">
            <Button size="lg" className="rounded-full px-8 bg-white text-background hover:bg-gray-200 font-semibold">
              View All Events
            </Button>
          </Link>
        </div>
      </Section>

      {/* Big CTA */}
      <section className="py-32 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute inset-0 bg-primary/10">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/20 blur-[150px] rounded-full" />
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-secondary/10 blur-[150px] rounded-full" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-8">
            Ready for an <br/>
            <span className="text-gradient">Unforgettable Night?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Book your table now and secure the best spot in the house. Whether it's a romantic dinner or a wild party, we've got you covered.
          </p>
          <Link href="/contact">
            <Button className="h-16 px-10 rounded-full text-xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 animate-pulse hover:animate-none">
              Reserve Your Table
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
