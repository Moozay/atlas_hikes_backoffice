import type { Express, Request, Response } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { requirePermission } from "./middleware/permission";
import { z } from "zod";
import { isAuthenticated } from "./replit_integrations/auth/replitAuth";
import { cloudinary, cloudName, apiKey, apiSecret } from "./lib/cloudinary";
import multer from "multer";
import * as XLSX from "xlsx";
import { marked } from "marked";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function extractExcerpt(markdown: string, maxLen = 200): string {
  const text = markdown.replace(/#+\s/g, "").replace(/[*_`[\]()>]/g, "").replace(/\n+/g, " ").trim();
  return text.length > maxLen ? text.slice(0, maxLen).replace(/\s+\S*$/, "") + "..." : text;
}

function getReadingTime(markdown: string): number {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function guessCategory(title: string, keyword: string): string {
  const text = (title + " " + keyword).toLowerCase();
  if (text.includes("gear") || text.includes("equipment") || text.includes("pack")) return "Gear";
  if (text.includes("food") || text.includes("nutrition") || text.includes("diet")) return "Nutrition";
  if (text.includes("safety") || text.includes("risk") || text.includes("first aid")) return "Safety";
  if (text.includes("culture") || text.includes("berber") || text.includes("morocco")) return "Culture";
  if (text.includes("photo") || text.includes("camera")) return "Photography";
  return "Guides";
}

const DEFAULT_PERMISSIONS = [
  { name: "blogs:view",              description: "View blog posts",               resource: "blogs",    action: "view" },
  { name: "blogs:create",            description: "Create blog posts",             resource: "blogs",    action: "create" },
  { name: "blogs:edit",              description: "Edit blog posts",               resource: "blogs",    action: "edit" },
  { name: "blogs:delete",            description: "Delete blog posts",             resource: "blogs",    action: "delete" },
  { name: "tours:view",              description: "View tours",                    resource: "tours",    action: "view" },
  { name: "tours:create",            description: "Create tours",                  resource: "tours",    action: "create" },
  { name: "tours:edit",              description: "Edit tours",                    resource: "tours",    action: "edit" },
  { name: "tours:publish",           description: "Publish/unpublish tours",       resource: "tours",    action: "publish" },
  { name: "tours:delete",            description: "Delete tours",                  resource: "tours",    action: "delete" },
  { name: "bookings:view",           description: "View bookings",                 resource: "bookings", action: "view" },
  { name: "bookings:create",         description: "Create bookings",               resource: "bookings", action: "create" },
  { name: "bookings:update_status",  description: "Update booking status",         resource: "bookings", action: "update_status" },
  { name: "finance:view",            description: "View financial data",           resource: "finance",  action: "view" },
  { name: "settings:edit",           description: "Edit general settings",         resource: "settings", action: "edit" },
  { name: "settings:payment_gateway",description: "Configure payment gateway",    resource: "settings", action: "payment_gateway" },
  { name: "users:view",              description: "View users and roles",          resource: "users",    action: "view" },
  { name: "users:create",            description: "Create users",                  resource: "users",    action: "create" },
  { name: "users:edit",              description: "Edit users",                    resource: "users",    action: "edit" },
  { name: "users:deactivate",        description: "Deactivate users",              resource: "users",    action: "deactivate" },
  { name: "users:reset_password",    description: "Reset user passwords",          resource: "users",    action: "reset_password" },
];

const DEFAULT_ROLES = [
  {
    name: "System Administrator",
    description: "Full access to all features",
    permissionNames: [
      "blogs:view","blogs:create","blogs:edit","blogs:delete",
      "tours:view","tours:create","tours:edit","tours:publish","tours:delete",
      "bookings:view","bookings:create","bookings:update_status",
      "finance:view",
      "settings:edit","settings:payment_gateway",
      "users:view","users:create","users:edit","users:deactivate","users:reset_password",
    ],
  },
  {
    name: "Content Manager",
    description: "Full control over tours and blogs (including publish/delete)",
    permissionNames: ["blogs:view","blogs:create","blogs:edit","blogs:delete","tours:view","tours:create","tours:edit","tours:publish","tours:delete"],
  },
  {
    name: "Content Editor",
    description: "Can create and edit tours and blogs but cannot delete",
    permissionNames: ["blogs:view","blogs:create","blogs:edit","tours:view","tours:create","tours:edit"],
  },
  {
    name: "Booking Manager",
    description: "Manage bookings and update their status",
    permissionNames: ["bookings:view","bookings:create","bookings:update_status","tours:view"],
  },
  {
    name: "Finance Manager",
    description: "View financial reports and booking data",
    permissionNames: ["finance:view","bookings:view"],
  },
];

// Extracts the Cloudinary public_id from a secure_url (with or without transformation params)
function extractCloudinaryPublicId(url: string): string | null {
  const uploadIdx = url.indexOf("/upload/");
  if (uploadIdx === -1) return null;
  const afterUpload = url.slice(uploadIdx + 8);
  const parts = afterUpload.split("/");
  // Skip transformation segments (they contain commas, e.g. "q_auto,f_auto,w_1600")
  const start = parts.findIndex((p) => !p.includes(",") && !/^v\d+$/.test(p));
  if (start === -1) return null;
  const pathParts = parts.slice(start);
  // Remove file extension from the last segment
  pathParts[pathParts.length - 1] = pathParts[pathParts.length - 1].replace(/\.[^.]+$/, "");
  return pathParts.join("/");
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth
  await setupAuth(app);
  registerAuthRoutes(app);

  // Auto-seed permissions and roles on startup (idempotent)
  await storage.seedPermissions(DEFAULT_PERMISSIONS);
  await storage.seedRoles(DEFAULT_ROLES);

  // Bootstrap: ensure at least one admin profile exists.
  // Users who registered via /api/register never get a profile row.
  // If no admin profile exists, promote the oldest registered user to admin.
  await storage.bootstrapAdmin();

  // === API ROUTES ===

  // /api/auth/me — enriched session endpoint with profile + permissions
  app.get("/api/auth/me", isAuthenticated, async (req: Request, res: Response) => {
    const userId = (req.user as any).id;
    const { passwordHash: _ph, ...safeUser } = req.user as any;
    const profile = await storage.getProfile(userId);
    const permissionsList = await storage.getUserPermissions(userId);
    res.json({ ...safeUser, profile, permissions: permissionsList });
  });

  // Tours
  app.get(api.tours.list.path, isAuthenticated, requirePermission("tours:view"), async (req: Request, res: Response) => {
    const q = req.query as any;
    const items = await storage.getTours({
      status: q.status,
      difficulty: q.difficulty,
      region: q.region,
      category: q.category,
      search: q.search,
      featured: q.featured === "true" ? true : undefined,
    });
    res.json(items);
  });

  app.get(api.tours.get.path, isAuthenticated, requirePermission("tours:view"), async (req: Request, res: Response) => {
    const item = await storage.getTour(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Tour not found" });
    res.json(item);
  });

  app.post(api.tours.create.path, isAuthenticated, requirePermission("tours:create"), async (req: Request, res: Response) => {
    try {
      const input = api.tours.create.input.parse(req.body);
      const item = await storage.createTour(input);
      res.status(201).json(item);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.put(api.tours.update.path, isAuthenticated, requirePermission("tours:edit"), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const existing = await storage.getTour(id);
    if (!existing) return res.status(404).json({ message: "Tour not found" });

    // Delete Cloudinary images that were removed
    const oldImages: string[] = (existing.images as string[]) ?? [];
    const newImages: string[] = Array.isArray(req.body.images) ? req.body.images : oldImages;
    const removed = oldImages.filter((url) => !newImages.includes(url));
    if (removed.length > 0) {
      await Promise.allSettled(
        removed.map((url) => {
          const publicId = extractCloudinaryPublicId(url);
          return publicId ? cloudinary.uploader.destroy(publicId) : Promise.resolve();
        })
      );
    }

    const item = await storage.updateTour(id, req.body);
    res.json(item);
  });

  app.delete(api.tours.delete.path, isAuthenticated, requirePermission("tours:delete"), async (req: Request, res: Response) => {
    try {
      const existing = await storage.getTour(Number(req.params.id));
      if (existing) {
        const images: string[] = (existing.images as string[]) ?? [];
        if (images.length > 0) {
          await Promise.allSettled(
            images.map((url) => {
              const publicId = extractCloudinaryPublicId(url);
              return publicId ? cloudinary.uploader.destroy(publicId) : Promise.resolve();
            })
          );
        }
      }
      await storage.deleteTour(Number(req.params.id));
      res.status(204).send();
    } catch (err: any) {
      console.error("Tour delete error:", err);
      res.status(500).json({ message: "Failed to delete tour. Please try again." });
    }
  });

  // Bookings
  app.get(api.bookings.list.path, isAuthenticated, requirePermission("bookings:view"), async (req: Request, res: Response) => {
    const items = await storage.getBookings(req.query as any);
    res.json(items);
  });

  app.get(api.bookings.get.path, isAuthenticated, requirePermission("bookings:view"), async (req: Request, res: Response) => {
    const item = await storage.getBooking(Number(req.params.id));
    if (!item) return res.status(404).json({ message: "Booking not found" });
    res.json(item);
  });

  app.post(api.bookings.create.path, isAuthenticated, requirePermission("bookings:create"), async (req: Request, res: Response) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const item = await storage.createBooking(input);
      res.status(201).json(item);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.patch(api.bookings.updateStatus.path, isAuthenticated, requirePermission("bookings:update_status"), async (req: Request, res: Response) => {
    const item = await storage.updateBookingStatus(Number(req.params.id), req.body.status);
    if (!item) return res.status(404).json({ message: "Booking not found" });
    res.json(item);
  });

  app.post(api.bookings.addPayment.path, isAuthenticated, requirePermission("bookings:update_status"), async (req: Request, res: Response) => {
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
  app.get(api.finance.stats.path, isAuthenticated, requirePermission("finance:view"), async (_req: Request, res: Response) => {
    const stats = await storage.getFinanceStats();
    res.json(stats);
  });

  // Stats (accessible to all authenticated users — shown on dashboard)
  app.get(api.stats.dashboard.path, isAuthenticated, async (_req: Request, res: Response) => {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  });

  // Settings
  app.get(api.settings.list.path, isAuthenticated, requirePermission("settings:edit"), async (_req: Request, res: Response) => {
    const items = await storage.getSettings();
    res.json(items);
  });

  app.put(api.settings.update.path, isAuthenticated, requirePermission("settings:edit"), async (req: Request, res: Response) => {
    const item = await storage.updateSetting(req.params.key, req.body.value);
    res.json(item);
  });

  // === UPLOAD ===

  app.post("/api/upload/sign", isAuthenticated, async (_req: Request, res: Response) => {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "atlas-hikes/tours";
    const signature = cloudinary.utils.api_sign_request({ timestamp, folder }, apiSecret);
    res.json({ timestamp, signature, apiKey, cloudName, folder });
  });

  // === PROFILE ===

  app.post("/api/auth/change-password", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8),
      }).parse(req.body);
      const result = await storage.changePassword((req.user as any).id, currentPassword, newPassword);
      if (!result.success) return res.status(400).json({ message: result.error });
      res.json({ message: "Password changed successfully" });
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  // === USERS ===

  app.get("/api/users", isAuthenticated, requirePermission("users:view"), async (_req: Request, res: Response) => {
    const users = await storage.getUsers();
    res.json(users);
  });

  app.get("/api/users/:id", isAuthenticated, requirePermission("users:view"), async (req: Request, res: Response) => {
    const user = await storage.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  });

  app.post("/api/users", isAuthenticated, requirePermission("users:create"), async (req: Request, res: Response) => {
    try {
      const schema = z.object({
        email: z.string().email(),
        password: z.string().min(8),
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        identityType: z.enum(["admin", "staff", "guide", "client"]),
      });
      const data = schema.parse(req.body);
      const user = await storage.createUserWithProfile(data);
      res.status(201).json(user);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.put("/api/users/:id", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    const schema = z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      status: z.enum(["active", "inactive"]).optional(),
    });
    try {
      const data = schema.parse(req.body);
      const user = await storage.updateUser(req.params.id, data);
      res.json(user);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.post("/api/users/:id/deactivate", isAuthenticated, requirePermission("users:deactivate"), async (req: Request, res: Response) => {
    await storage.deactivateUser(req.params.id);
    res.json({ message: "User deactivated" });
  });

  app.post("/api/users/:id/reset-password", isAuthenticated, requirePermission("users:reset_password"), async (req: Request, res: Response) => {
    try {
      const { password } = z.object({ password: z.string().min(8) }).parse(req.body);
      await storage.resetUserPassword(req.params.id, password);
      res.json({ message: "Password reset successfully" });
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.put("/api/users/:id/roles", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    const { roleIds } = z.object({ roleIds: z.array(z.number()) }).parse(req.body);
    await storage.assignRolesToUser(req.params.id, roleIds);
    res.json({ message: "Roles assigned" });
  });

  // === ROLES ===

  app.get("/api/roles", isAuthenticated, requirePermission("users:view"), async (_req: Request, res: Response) => {
    const items = await storage.getRoles();
    res.json(items);
  });

  app.post("/api/roles", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    try {
      const schema = z.object({ name: z.string().min(1), description: z.string().optional() });
      const data = schema.parse(req.body);
      const role = await storage.createRole(data);
      res.status(201).json(role);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.put("/api/roles/:id", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    try {
      const schema = z.object({ name: z.string().optional(), description: z.string().optional() });
      const data = schema.parse(req.body);
      const role = await storage.updateRole(Number(req.params.id), data);
      if (!role) return res.status(404).json({ message: "Role not found" });
      res.json(role);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json(e.errors);
      throw e;
    }
  });

  app.delete("/api/roles/:id", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    await storage.deleteRole(Number(req.params.id));
    res.status(204).send();
  });

  app.put("/api/roles/:id/permissions", isAuthenticated, requirePermission("users:edit"), async (req: Request, res: Response) => {
    const { permissionIds } = z.object({ permissionIds: z.array(z.number()) }).parse(req.body);
    await storage.assignPermissionsToRole(Number(req.params.id), permissionIds);
    res.json({ message: "Permissions assigned" });
  });

  // === PERMISSIONS ===

  app.get("/api/permissions", isAuthenticated, requirePermission("users:view"), async (_req: Request, res: Response) => {
    const items = await storage.getPermissions();
    res.json(items);
  });

  // Seed default permissions (idempotent — safe to call multiple times)
  app.post("/api/permissions/seed", isAuthenticated, async (req: Request, res: Response) => {
    const profile = await storage.getProfile((req.user as any).id);
    if (profile?.role !== "admin") return res.status(403).json({ message: "Forbidden" });
    await storage.seedPermissions(DEFAULT_PERMISSIONS);
    res.json({ message: "Permissions seeded", count: DEFAULT_PERMISSIONS.length });
  });

  // === BLOGS ===

  app.get(api.blogs.list.path, isAuthenticated, requirePermission("blogs:view"), async (req: Request, res: Response) => {
    const q = req.query as any;
    const result = await storage.getBlogs({
      published: q.published !== undefined ? q.published === "true" : undefined,
      featured: q.featured !== undefined ? q.featured === "true" : undefined,
      category: q.category,
      search: q.search,
    });
    res.json(result);
  });

  app.get(api.blogs.get.path, isAuthenticated, requirePermission("blogs:view"), async (req: Request, res: Response) => {
    const post = await storage.getBlog(Number(req.params.id));
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.json(post);
  });

  app.post(api.blogs.create.path, isAuthenticated, requirePermission("blogs:create"), async (req: Request, res: Response) => {
    try {
      const input = api.blogs.create.input.parse(req.body);
      const post = await storage.createBlog(input);
      res.status(201).json(post);
    } catch (e) {
      if (e instanceof z.ZodError) return res.status(400).json({ message: e.errors[0]?.message ?? "Validation error" });
      throw e;
    }
  });

  app.put(api.blogs.update.path, isAuthenticated, requirePermission("blogs:edit"), async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const existing = await storage.getBlog(id);
    if (!existing) return res.status(404).json({ message: "Blog post not found" });
    const post = await storage.updateBlog(id, req.body);
    res.json(post);
  });

  app.delete(api.blogs.delete.path, isAuthenticated, requirePermission("blogs:delete"), async (req: Request, res: Response) => {
    const existing = await storage.getBlog(Number(req.params.id));
    if (!existing) return res.status(404).json({ message: "Blog post not found" });
    await storage.deleteBlog(Number(req.params.id));
    res.status(204).send();
  });

  // Bulk import from Excel (.xlsx)
  app.post(api.blogs.bulkImport.path, isAuthenticated, requirePermission("blogs:create"), upload.single("file"), async (req: Request, res: Response) => {
    try {
      if (!req.file) return res.status(400).json({ message: "No file uploaded" });

      const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet) as any[];

      const posts = await Promise.all(rows.map(async (row, i) => {
        const title = row.BLOG_TITLE || row.title || row.Title || "";
        const content = row.Content || row.content || row.CONTENT || "";
        const primaryKeyword = row.PRIMARY_KEYWORD || row.primary_keyword || row.keyword || "";
        if (!title || !content) return null;

        const slug = generateSlug(title);
        const excerpt = extractExcerpt(content);
        const contentHtml = await marked(content);
        const readTime = getReadingTime(content);
        const category = guessCategory(title, primaryKeyword);
        const metaTitle = title.length <= 46 ? `${title} | Atlas Hikes` : title.slice(0, 60);
        const metaDescription = excerpt.length > 155 ? excerpt.slice(0, 152) + "..." : excerpt;

        return {
          slug,
          title,
          primaryKeyword,
          excerpt,
          contentMarkdown: content,
          contentHtml,
          image: "",
          imageAlt: `${title} - Atlas Mountains hiking`,
          readTime,
          category,
          tags: [] as string[],
          author: "Atlas Hikes",
          authorRole: "Mountain Guide",
          authorAvatar: "/svg/hiker.svg",
          published: true,
          featured: i < 8,
          metaTitle,
          metaDescription,
          canonicalUrl: `https://atlashikes.com/blogs/${slug}`,
          publishedAt: row.Created ? new Date(row.Created) : new Date(),
        };
      }));

      const validPosts = posts.filter(Boolean) as any[];
      const result = await storage.bulkCreateBlogs(validPosts);
      res.json(result);
    } catch (err: any) {
      console.error("Bulk import error:", err);
      res.status(500).json({ message: "Import failed: " + err.message });
    }
  });

  return httpServer;
}
