import { useState } from "react";
import { Section } from "@/components/ui/Section";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const galleryImages = [
  "https://images.unsplash.com/photo-1514362545857-3bc16549766b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1570574041180-87a2754641d4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80&w=800",
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <div className="bg-muted/10 py-24 px-4 text-center">
        <h1 className="text-5xl font-display font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground">Captured moments from our best nights.</p>
      </div>

      <Section>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((src, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-zoom-in"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`Gallery ${idx}`} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          ))}
        </div>
      </Section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none shadow-none">
          <div className="relative">
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute -top-12 right-0 p-2 text-white hover:text-primary"
            >
              <X className="w-8 h-8" />
            </button>
            {selectedImage && (
              <img 
                src={selectedImage} 
                alt="Full View" 
                className="w-full h-auto rounded-lg shadow-2xl" 
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
