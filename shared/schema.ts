import { pgTable, text, serial, integer, boolean, timestamp, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "./models/auth"; // Re-export auth models

export * from "./models/auth"; // Ensure all auth models are exported

// === ENUMS ===
export const userRoles = ["admin", "staff", "guide", "client"] as const;
export const tourStatus = ["draft", "published", "archived"] as const;
export const tourDifficulty = ["easy", "moderate", "difficult", "extreme"] as const;
export const bookingStatus = ["pending", "confirmed", "cancelled", "completed", "refunded"] as const;
export const paymentStatus = ["unpaid", "partially_paid", "paid", "refunded"] as const;

// === TABLE DEFINITIONS ===

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(), 
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
  // Rich content fields
  highlights:           jsonb("highlights").$type<string[]>().default([]),
  itinerary:            jsonb("itinerary").$type<{ day: string; title: string; description: string; duration: string; elevation: string; accommodation?: string; meals?: string }[]>().default([]),
  included:             jsonb("included").$type<string[]>().default([]),
  excluded:             jsonb("excluded").$type<string[]>().default([]),
  whatToBring:          jsonb("what_to_bring").$type<string[]>().default([]),
  bestTime:             text("best_time"),
  physicalRequirements: text("physical_requirements"),
  culturalNotes:        text("cultural_notes"),
  groupSize:            integer("group_size"),
  category:             text("category"),
  reviews:              jsonb("reviews").$type<{ id: number; name: string; avatar?: string; rating: number; date: string; comment: string }[]>().default([]),
  routeGeoJson:         text("route_geo_json"),
  deletedAt:            timestamp("deleted_at"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  tourId: integer("tour_id").notNull(), 
  userId: text("user_id").notNull(), 
  bookingDate: timestamp("booking_date").defaultNow(),
  travelDate: timestamp("travel_date").notNull(),
  participants: integer("participants").notNull(),
  totalPrice: integer("total_price").notNull(), // Final price after discounts
  amountPaid: integer("amount_paid").default(0).notNull(), // Amount paid so far in cents
  status: text("status", { enum: bookingStatus }).default("pending").notNull(),
  paymentStatus: text("payment_status", { enum: paymentStatus }).default("unpaid").notNull(),
  notes: text("notes"),
});

export const invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(), 
  invoiceNumber: text("invoice_number").notNull().unique(),
  url: text("url"), 
  issuedDate: timestamp("issued_date").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id").notNull(),
  amount: integer("amount").notNull(),
  type: text("type").default("payment").notNull(), // payment, refund
  method: text("method").default("manual").notNull(), // manual, bank_transfer
  reference: text("reference"), // Transaction reference
  createdAt: timestamp("created_at").defaultNow(),
});

export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: text("key").unique().notNull(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === RBAC TABLES ===

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(), // e.g. "tours:create"
  description: text("description"),
  resource: text("resource").notNull(),  // e.g. "tours"
  action: text("action").notNull(),      // e.g. "create"
});

export const rolePermissions = pgTable("role_permissions", {
  roleId: integer("role_id").notNull(),
  permissionId: integer("permission_id").notNull(),
}, (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })]);

export const userRolesTable = pgTable("user_roles", {
  userId: text("user_id").notNull(),
  roleId: integer("role_id").notNull(),
}, (t) => [primaryKey({ columns: [t.userId, t.roleId] })]);

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  title: text("title").notNull(),
  primaryKeyword: text("primary_keyword").notNull().default(""),
  excerpt: text("excerpt").notNull(),
  contentMarkdown: text("content_markdown").notNull(),
  contentHtml: text("content_html").notNull(),
  image: text("image").notNull().default(""),
  imageAlt: text("image_alt").notNull().default(""),
  readTime: integer("read_time").notNull().default(5),
  category: text("category").notNull().default("Guides"),
  tags: text("tags").array().notNull().default([]),
  author: text("author").notNull().default("Atlas Hikes"),
  authorRole: text("author_role").notNull().default("Mountain Guide"),
  authorAvatar: text("author_avatar").notNull().default("/svg/hiker.svg"),
  published: boolean("published").notNull().default(true),
  featured: boolean("featured").notNull().default(false),
  views: integer("views").notNull().default(0),
  metaTitle: text("meta_title"),
  metaDescription: text("meta_description"),
  canonicalUrl: text("canonical_url"),
  publishedAt: timestamp("published_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// === SCHEMAS ===

export const insertProfileSchema = createInsertSchema(profiles);
export const insertTourSchema = createInsertSchema(tours).omit({ id: true, createdAt: true, updatedAt: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, bookingDate: true, status: true, paymentStatus: true, amountPaid: true });
export const insertTransactionSchema = createInsertSchema(transactions).omit({ id: true, createdAt: true });
export const insertSettingsSchema = createInsertSchema(settings).omit({ id: true, updatedAt: true });

// === TYPES ===

export type Tour = typeof tours.$inferSelect;
export type InsertTour = z.infer<typeof insertTourSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Profile = typeof profiles.$inferSelect;
export type InsertProfile = typeof profiles.$inferInsert;
export type Setting = typeof settings.$inferSelect;
export type Role = typeof roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type InsertRole = typeof roles.$inferInsert;
export type InsertPermission = typeof permissions.$inferInsert;

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, createdAt: true, updatedAt: true, views: true });
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// Request/Response Types
export type CreateTourRequest = InsertTour;
export type UpdateTourRequest = Partial<InsertTour>;

export type CreateBookingRequest = InsertBooking;
export type UpdateBookingStatusRequest = { status: typeof bookingStatus[number] };
export type AddTransactionRequest = { amount: number; method: string; reference?: string };

export type DashboardStats = {
  totalBookings: number;
  monthlyRevenue: number;
  activeTours: number;
  pendingBookings: number;
};
