import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.menu.list.path, async (req, res) => {
    const location = req.query.location as string | undefined;
    const category = req.query.category as string | undefined;
    const items = await storage.getMenuItems(location, category);
    res.json(items);
  });

  app.get(api.events.list.path, async (req, res) => {
    const location = req.query.location as string | undefined;
    const events = await storage.getEvents(location);
    res.json(events);
  });

  app.get(api.locations.list.path, async (req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  app.post(api.reservations.create.path, async (req, res) => {
    try {
      const input = api.reservations.create.input.parse(req.body);
      // In a real app, we would parse the date string to a Date object properly if Zod doesn't handle it automatically from JSON
      // Zod's coerce.date() is useful here, but we defined it as timestamp in schema which expects Date or string
      const reservation = await storage.createReservation({
        ...input,
        date: new Date(input.date)
      });
      res.status(201).json(reservation);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      await storage.createMessage(input);
      res.status(201).json({ success: true, message: "Message sent successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingLocations = await storage.getLocations();
  if (existingLocations.length === 0) {
    console.log("Seeding database...");
    
    await storage.createLocation({
      name: "Goa - Vagator",
      address: "Small Vagator Beach, Ozran Beach Rd, Vagator, Goa 403509",
      phone: "+91 98765 43210",
      mapUrl: "https://maps.google.com/?q=Cafe+CO2+Goa",
      features: ["Sunset Beach View", "Party Vibe", "Live DJ", "Cocktail Bar"],
      timings: "12:00 PM - 3:00 AM",
      imageUrl: "https://images.unsplash.com/photo-1575968580465-243e887e5b63?auto=format&fit=crop&q=80"
    });

    await storage.createLocation({
      name: "Pune - Bhugaon",
      address: "Manas Lake, Bhugaon, Pune, Maharashtra 412115",
      phone: "+91 91234 56789",
      mapUrl: "https://maps.google.com/?q=Cafe+CO2+Pune",
      features: ["Lakeside View", "Resto Lounge", "Live Music", "Fine Dining"],
      timings: "11:00 AM - 1:00 AM",
      imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80"
    });

    // Menu Items - Starters
    await storage.createMenuItem({
      name: "Truffle Mushroom Arancini",
      description: "Crispy risotto balls infused with truffle oil and parmesan.",
      price: 450,
      category: "Starters",
      location: "Both",
      imageUrl: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&q=80",
      isVegetarian: true,
      isSpicy: false
    });

    await storage.createMenuItem({
      name: "Peri Peri Prawns",
      description: "Fresh prawns tossed in spicy house-made peri peri sauce.",
      price: 650,
      category: "Starters",
      location: "Goa",
      imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80",
      isVegetarian: false,
      isSpicy: true
    });

    // Menu Items - Mains
    await storage.createMenuItem({
      name: "Grilled Norwegian Salmon",
      description: "Served with asparagus, mashed potatoes and lemon butter sauce.",
      price: 1200,
      category: "Mains",
      location: "Pune",
      imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a7270028d?auto=format&fit=crop&q=80",
      isVegetarian: false,
      isSpicy: false
    });

    // Events
    await storage.createEvent({
      title: "Sunset Sessions",
      description: "Experience the magical sunset with deep house tunes at our Goa beach club. Featuring international guest DJs.",
      date: new Date("2024-12-31T17:00:00"),
      location: "Goa",
      imageUrl: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?auto=format&fit=crop&q=80",
      type: "Sunset Session"
    });

    await storage.createEvent({
      title: "Saturday Night Live",
      description: "Live band performance featuring the city's best local artists. A night of jazz and soul by the lake.",
      date: new Date("2024-12-28T20:00:00"),
      location: "Pune",
      imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80",
      type: "Live Music"
    });

    await storage.createEvent({
      title: "Techno Tuesday",
      description: "Deep, dark, and industrial. The finest techno beats to keep you moving until the early hours.",
      date: new Date("2024-12-30T22:00:00"),
      location: "Goa",
      imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc37bb0f932?auto=format&fit=crop&q=80",
      type: "DJ Night"
    });

    await storage.createEvent({
      title: "Acoustic Evenings",
      description: "Unplugged sessions with soulful melodies. Perfect for a relaxed lakeside dinner.",
      date: new Date("2024-12-29T19:00:00"),
      location: "Pune",
      imageUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80",
      type: "Live Music"
    });

    await storage.createEvent({
      title: "Moonlight Party",
      description: "Full moon beach party with fire dancers and tribal house music.",
      date: new Date("2025-01-15T21:00:00"),
      location: "Goa",
      imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80",
      type: "DJ Night"
    });

    await storage.createEvent({
      title: "Lakeside Brunch",
      description: "Sunday brunch with bottomless mimosas and chill lounge music.",
      date: new Date("2025-01-12T12:00:00"),
      location: "Pune",
      imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80",
      type: "Sunset Session"
    });
    
    console.log("Database seeded successfully.");
  }
}
