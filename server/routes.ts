import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

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
    const items = await storage.getTours(req.query as any);
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

  app.get(api.bookings.get.path, async (req, res) => {
    const item = await storage.getBooking(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Booking not found" });
    res.json(item);
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

  app.post(api.bookings.addPayment.path, async (req, res) => {
    const bookingId = Number(req.params.id);
    const booking = await storage.getBooking(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    try {
      const input = api.bookings.addPayment.input.parse(req.body);
      
      const newAmountPaid = booking.amountPaid + input.amount;
      let paymentStatus = "partially_paid";
      if (newAmountPaid >= booking.totalPrice) {
        paymentStatus = "paid";
      }

      const tx = await storage.createTransaction({
        bookingId,
        amount: input.amount,
        method: input.method,
        reference: input.reference || null,
        type: "payment"
      });

      await storage.updateBookingPayment(bookingId, newAmountPaid, paymentStatus);
      
      res.status(201).json(tx);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  // Finance
  app.get(api.finance.stats.path, async (req, res) => {
    const stats = await storage.getFinanceStats();
    res.json(stats);
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
    const t1 = await storage.createTour({
      title: "Atlas Mountain Trek",
      slug: "atlas-mountain-trek",
      region: "High Atlas",
      description: "A challenging 5-day trek through the High Atlas mountains.",
      durationDays: 5,
      difficulty: "difficult",
      price: 45000, 
      status: "published",
      featured: true,
      images: ["https://images.unsplash.com/photo-1545562083-c583d014b216"],
    });
    
    const t2 = await storage.createTour({
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

    // Create some sample bookings
    const b1 = await storage.createBooking({
      tourId: t1.id,
      userId: "system-admin",
      travelDate: new Date(Date.now() + 86400000 * 30),
      participants: 2,
      totalPrice: 90000,
      notes: "First time traveler",
    });

    const b2 = await storage.createBooking({
      tourId: t2.id,
      userId: "system-admin",
      travelDate: new Date(Date.now() + 86400000 * 45),
      participants: 1,
      totalPrice: 35000,
      notes: "Needs desert gear",
    });

    // Add some payments
    await storage.createTransaction({
      bookingId: b1.id,
      amount: 45000,
      type: "payment",
      method: "bank_transfer",
      reference: "TR-123",
    });
    await storage.updateBookingPayment(b1.id, 45000, "partially_paid");

    await storage.createTransaction({
      bookingId: b2.id,
      amount: 35000,
      type: "payment",
      method: "manual",
      reference: "CASH-99",
    });
    await storage.updateBookingPayment(b2.id, 35000, "paid");
  }
}
