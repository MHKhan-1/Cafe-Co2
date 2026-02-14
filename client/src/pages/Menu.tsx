import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMenu } from "@/hooks/use-menu";
import { Loader2, AlertCircle } from "lucide-react";

export default function Menu() {
  const [location, setLocation] = useState("Goa");
  const [activeCategory, setActiveCategory] = useState("All");
  
  const { data: menuItems, isLoading, isError } = useMenu(location === "All" ? undefined : location);

  const categories = ["All", ...Array.from(new Set(menuItems?.map(i => i.category) || []))];
  
  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems?.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-muted/30 border-b border-white/5 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-display font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            A symphony of flavors curated by our master chefs.
          </p>
          
          <Tabs defaultValue="Goa" onValueChange={setLocation} className="justify-center">
            <TabsList className="bg-black/40 border border-white/10 p-1">
              <TabsTrigger value="Goa" className="data-[state=active]:bg-primary data-[state=active]:text-white">Goa Menu</TabsTrigger>
              <TabsTrigger value="Pune" className="data-[state=active]:bg-primary data-[state=active]:text-white">Pune Menu</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? "bg-white text-background shadow-lg scale-105" 
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>
        ) : isError ? (
          <div className="flex justify-center py-20 text-destructive"><AlertCircle className="w-6 h-6 mr-2" /> Failed to load menu</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems?.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-muted/10 border border-white/5 rounded-xl p-4 flex gap-4 hover:border-primary/30 transition-colors"
                >
                  <div className="w-24 h-24 shrink-0 bg-muted/50 rounded-lg overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No Img</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <span className="text-primary font-bold">₹{item.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                    <div className="flex gap-2">
                      {item.isVegetarian && <span className="text-[10px] px-2 py-0.5 rounded border border-green-500/30 text-green-500">VEG</span>}
                      {item.isSpicy && <span className="text-[10px] px-2 py-0.5 rounded border border-red-500/30 text-red-500">SPICY</span>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
