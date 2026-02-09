import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth"; // Re-export auth models

export * from "./models/auth"; // Ensure all auth models are exported

// === ENUMS ===
export const userRoles = ["admin", "staff", "guide", "client"] as const;
export const tourStatus = ["draft", "published", "archived"] as const;
export const tourDifficulty = ["easy", "moderate", "difficult", "extreme"] as const;
export const bookingStatus = ["pending", "confirmed", "cancelled", "completed", "refunded"] as const;
export const paymentStatus = ["unpaid", "paid", "refunded", "partially_refunded"] as const;

// === TABLE DEFINITIONS ===

// Extend users table with roles (since we can't modify the auth module directly, we use a profile table or just rely on the JSONB metadata, but spec says "Identity -> Role". Let's create a UserProfile linked to auth users)
// Actually, for Replit Auth, we can extend the users table in models/auth.ts if we could edit it, but we should probably add a separate table for app-specific user data or just use a separate table "user_roles".
// Let's create a profiles table that links to users.id

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(), // Foreign key to users.id (which is varchar)
  role: text("role", { enum: userRoles }).default("client").notNull(),
  phoneNumber: text("phone_number"),
  bio: text("bio"),
});

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  region: text("region").notNull(),
  description: text("description").notNull(),
  durationDays: integer("duration_days").notNull(),
  difficulty: text("difficulty", { enum: tourDifficulty }).notNull(),
  price: integer("price").notNull(), // In cents
  status: text("status", { enum: tourStatus }).default("draft").notNull(),
  images: text("images").array().default([]),
  featured: boolean("featured").default(false),
  discountPercentage: integer("discount_percentage").default(0),
  discountEndDate: timestamp("discount_end_date"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").notNull(), // FK to tours.id
  userId: text("user_id").notNull(), // FK to users.id
  bookingDate: timestamp("booking_date").defaultNow(),
  travelDate: timestamp("travel_date").notNull(),
  participants: integer("participants").notNull(),
  totalPrice: integer("total_price").notNull(), // Final price after discounts
  status: text("status", { enum: bookingStatus }).default("pending").notNull(),
  paymentStatus: text("payment_status", { enum: paymentStatus }).default("unpaid").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  notes: text("notes"),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(), // FK to bookings.id
  invoiceNumber: text("invoice_number").notNull().unique(),
  url: text("url"), // URL to PDF
  issuedDate: timestamp("issued_date").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  stripeChargeId: text("stripe_charge_id"),
  amount: integer("amount").notNull(),
  status: text("status").notNull(), // stripe status
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").unique().notNull(),
  value: jsonb("value").notNull(), // Flexible value storage
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === RELATIONS ===
// (Defined in backend if needed for Drizzle query builder, but often skipped for simple apps unless using query.tours.findMany({ with: ... }))

// === SCHEMAS ===

export const insertProfileSchema = createInsertSchema(profiles);
export const insertTourSchema = createInsertSchema(tours).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true, status: true, paymentStatus: true, stripePaymentIntentId: true });
export const insertSettingsSchema = createInsertSchema(settings).omit({ id: true, updatedAt: true });

// === TYPES ===

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Setting = typeof settings.$inferSelect;

// Request/Response Types
export type CreateTourRequest = InsertTour;
export type UpdateTourRequest = Partial<InsertTour>;

export type CreateBookingRequest = InsertBooking;
export type UpdateBookingStatusRequest = { status: typeof bookingStatus[number] };

export type DashboardStats = {
  totalBookings: number;
  monthlyRevenue: number;
  activeTours: number;
  pendingBookings: number;
};
