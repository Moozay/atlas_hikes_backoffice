import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { tours } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // === API ROUTES ===

  // Tours
  app.get(api.tours.list.path, async (req, res) => {
    const filters = req.query;
    const items = await storage.getTours(filters as any);
    res.json(items);
  });

  app.get(api.tours.get.path, async (req, res) => {
    const item = await storage.getTour(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Tour not found" });
    res.json(item);
  });

  app.post(api.tours.create.path, async (req, res) => {
    try {
      const input = api.tours.create.input.parse(req.body);
      const item = await storage.createTour(input);
      res.status(201).json(item);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.put(api.tours.update.path, async (req, res) => {
    const item = await storage.updateTour(Number(req.params.id), req.body);
    if (!item) return res.status(404).json({ message: "Tour not found" });
    res.json(item);
  });

  app.delete(api.tours.delete.path, async (req, res) => {
    await storage.deleteTour(Number(req.params.id));
    res.status(204).send();
  });

  // Bookings
  app.get(api.bookings.list.path, async (req, res) => {
    const items = await storage.getBookings(req.query as any);
    res.json(items);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const item = await storage.createBooking(input);
      res.status(201).json(item);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.patch(api.bookings.updateStatus.path, async (req, res) => {
    const item = await storage.updateBookingStatus(Number(req.params.id), req.body.status);
    if (!item) return res.status(404).json({ message: "Booking not found" });
    res.json(item);
  });

  // Stats
  app.get(api.stats.dashboard.path, async (req, res) => {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  });

  // Settings
  app.get(api.settings.list.path, async (req, res) => {
    const items = await storage.getSettings();
    res.json(items);
  });

  app.put(api.settings.update.path, async (req, res) => {
    const item = await storage.updateSetting(req.params.key, req.body.value);
    res.json(item);
  });
  
  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getTours();
  if (existing.length === 0) {
    await storage.createTour({
      title: "Atlas Mountain Trek",
      slug: "atlas-mountain-trek",
      region: "High Atlas",
      description: "A challenging 5-day trek through the High Atlas mountains.",
      durationDays: 5,
      difficulty: "difficult",
      price: 45000, // $450.00
      status: "published",
      featured: true,
      images: ["https://images.unsplash.com/photo-1545562083-c583d014b216"],
    });
    
    await storage.createTour({
      title: "Sahara Desert Experience",
      slug: "sahara-desert",
      region: "Merzouga",
      description: "Experience the magic of the Sahara dunes under the stars.",
      durationDays: 3,
      difficulty: "moderate",
      price: 35000,
      status: "published",
      featured: true,
      images: ["https://images.unsplash.com/photo-1542114387-578d38439169"],
    });

    await storage.createTour({
      title: "Coastal Paradise",
      slug: "coastal-paradise",
      region: "Essaouira",
      description: "Relax by the Atlantic coast in the blue city.",
      durationDays: 2,
      difficulty: "easy",
      price: 20000,
      status: "draft",
      featured: false,
      images: [],
    });
  }
}
