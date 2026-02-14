import { db } from "./db";
import {
  menuItems, events, locations, reservations, messages,
  type MenuItem, type Event, type Location, type Reservation, type Message,
  type CreateReservationRequest, type CreateMessageRequest
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getMenuItems(location?: string, category?: string): Promise<MenuItem[]>;
  getEvents(location?: string): Promise<Event[]>;
  getLocations(): Promise<Location[]>;
  createReservation(reservation: CreateReservationRequest): Promise<Reservation>;
  createMessage(message: CreateMessageRequest): Promise<Message>;
  // Seed helpers
  createMenuItem(item: any): Promise<MenuItem>;
  createEvent(event: any): Promise<Event>;
  createLocation(location: any): Promise<Location>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(location?: string, category?: string): Promise<MenuItem[]> {
    let query = db.select().from(menuItems);
    
    // Simple client-side filtering logic for the mock storage or basic query building
    // In a real app with complex filters, we'd build the query dynamically
    const allItems = await query;
    return allItems.filter(item => {
      if (location && item.location !== "Both" && item.location !== location) return false;
      if (category && item.category !== category) return false;
      return true;
    });
  }

  async getEvents(location?: string): Promise<Event[]> {
    const allEvents = await db.select().from(events);
    if (location) {
      return allEvents.filter(e => e.location === location);
    }
    return allEvents;
  }

  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async createReservation(reservation: CreateReservationRequest): Promise<Reservation> {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }

  async createMessage(message: CreateMessageRequest): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async createMenuItem(item: any): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async createEvent(event: any): Promise<Event> {
    const [newEvent] = await db.insert(events).values(event).returning();
    return newEvent;
  }

  async createLocation(location: any): Promise<Location> {
    const [newLocation] = await db.insert(locations).values(location).returning();
    return newLocation;
  }
}

export const storage = new DatabaseStorage();
