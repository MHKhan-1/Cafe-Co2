import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

// Menu Items
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // Stored in cents/paise or smallest unit
  category: text("category").notNull(), // e.g., "Starters", "Main Course", "Cocktails"
  location: text("location").notNull(), // "Goa" or "Pune" or "Both"
  imageUrl: text("image_url"),
  isVegetarian: boolean("is_vegetarian").default(false),
  isSpicy: boolean("is_spicy").default(false),
  available: boolean("available").default(true),
});

// Events
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  location: text("location").notNull(), // "Goa" or "Pune"
  imageUrl: text("image_url"),
  type: text("type").notNull(), // "DJ Night", "Live Music", "Sunset Session"
});

// Reservations
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  date: timestamp("date").notNull(),
  guests: integer("guests").notNull(),
  location: text("location").notNull(), // "Goa" or "Pune"
  specialRequests: text("special_requests"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact Messages
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Locations (Static data, but good to have a schema if we want to make it dynamic later)
export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // "Goa - Vagator", "Pune - Bhugaon"
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  mapUrl: text("map_url").notNull(),
  features: jsonb("features").notNull(), // ["Sunset Beach", "Party Vibe"]
  timings: text("timings").notNull(),
  imageUrl: text("image_url"),
});


// === SCHEMAS ===

export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export const insertReservationSchema = createInsertSchema(reservations).omit({ id: true, createdAt: true });
export const insertMessageSchema = createInsertSchema(messages).omit({ id: true, createdAt: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });

// === EXPLICIT API TYPES ===

export type MenuItem = typeof menuItems.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Reservation = typeof reservations.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Location = typeof locations.$inferSelect;

export type CreateReservationRequest = z.infer<typeof insertReservationSchema>;
export type CreateMessageRequest = z.infer<typeof insertMessageSchema>;
