import { db } from "./db";
import { 
  tours, bookings, profiles, settings,
  type Tour, type InsertTour, type UpdateTourRequest,
  type Booking, type InsertBooking, type UpdateBookingStatusRequest,
  type Profile, type InsertProfile,
  type Setting,
  type DashboardStats
} from "@shared/schema";
import { eq, desc, sql, and } from "drizzle-orm";

export interface IStorage {
  // Tours
  getTours(filters?: { status?: string, region?: string, search?: string }): Promise<Tour[]>;
  getTour(id: number): Promise<Tour | undefined>;
  createTour(tour: InsertTour): Promise<Tour>;
  updateTour(id: number, tour: UpdateTourRequest): Promise<Tour | undefined>;
  deleteTour(id: number): Promise<void>;

  // Bookings
  getBookings(filters?: { tourId?: number, status?: string }): Promise<(Booking & { tour: Tour | null, user: any })[]>; // user is partial/mocked for now or fetched
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;

  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;

  // Settings
  getSettings(): Promise<Setting[]>;
  updateSetting(key: string, value: any): Promise<Setting>;
  
  // Stats
  getDashboardStats(): Promise<DashboardStats & { revenueByMonth: any[] }>;
}

export class DatabaseStorage implements IStorage {
  async getTours(filters?: { status?: string, region?: string, search?: string }): Promise<Tour[]> {
    let query = db.select().from(tours);
    const conditions = [];
    
    if (filters?.status) conditions.push(eq(tours.status, filters.status as any));
    if (filters?.region) conditions.push(eq(tours.region, filters.region));
    if (filters?.search) conditions.push(sql`title ILIKE ${`%${filters.search}%`}`);

    if (conditions.length > 0) {
      return await query.where(and(...conditions)).orderBy(desc(tours.createdAt));
    }
    
    return await query.orderBy(desc(tours.createdAt));
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const [tour] = await db.select().from(tours).where(eq(tours.id, id));
    return tour;
  }

  async createTour(tour: InsertTour): Promise<Tour> {
    const [newTour] = await db.insert(tours).values(tour).returning();
    return newTour;
  }

  async updateTour(id: number, updates: UpdateTourRequest): Promise<Tour | undefined> {
    const [updated] = await db.update(tours).set({ ...updates, updatedAt: new Date() }).where(eq(tours.id, id)).returning();
    return updated;
  }

  async deleteTour(id: number): Promise<void> {
    await db.delete(tours).where(eq(tours.id, id));
  }

  async getBookings(filters?: { tourId?: number, status?: string }): Promise<(Booking & { tour: Tour | null, user: any })[]> {
    // Join with tours. User info is in `users` table but we can't join easily across modules if not careful, 
    // but here we imported `users` from schema so we can join.
    // However, the `bookings.userId` is a text FK to `users.id`.
    
    // Let's do a simple join with tours first.
    // Drizzle relation query would be better but I didn't define relations in schema.ts fully.
    // I'll do a manual join or just select and map. 
    // Manual select with left join.
    
    const result = await db.select({
      booking: bookings,
      tour: tours,
      // user: users -- we will fetch user details from auth schema if needed, or just return ID
    })
    .from(bookings)
    .leftJoin(tours, eq(bookings.tourId, tours.id))
    .where(
      and(
        filters?.tourId ? eq(bookings.tourId, filters.tourId) : undefined,
        filters?.status ? eq(bookings.status, filters.status as any) : undefined
      )
    )
    .orderBy(desc(bookings.bookingDate));

    return result.map(row => ({
      ...row.booking,
      tour: row.tour,
      user: { id: row.booking.userId } // Placeholder, frontend can fetch or we join `users`
    }));
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updated] = await db.update(bookings).set({ status: status as any }).where(eq(bookings.id, id)).returning();
    return updated;
  }

  async getProfile(userId: string): Promise<Profile | undefined> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    return profile;
  }

  async createProfile(profile: InsertProfile): Promise<Profile> {
    const [newProfile] = await db.insert(profiles).values(profile).returning();
    return newProfile;
  }

  async getSettings(): Promise<Setting[]> {
    return await db.select().from(settings);
  }

  async updateSetting(key: string, value: any): Promise<Setting> {
    const [updated] = await db.insert(settings)
      .values({ key, value })
      .onConflictDoUpdate({ target: settings.key, set: { value, updatedAt: new Date() } })
      .returning();
    return updated;
  }

  async getDashboardStats(): Promise<DashboardStats & { revenueByMonth: any[] }> {
    const [bookingStats] = await db.select({
      count: sql<number>`count(*)`,
      pending: sql<number>`sum(case when status = 'pending' then 1 else 0 end)`
    }).from(bookings);

    const [revenue] = await db.select({
      total: sql<number>`sum(total_price)`
    }).from(bookings).where(eq(bookings.paymentStatus, 'paid'));

    const [activeTours] = await db.select({
      count: sql<number>`count(*)`
    }).from(tours).where(eq(tours.status, 'published'));

    // Monthly revenue (simplified)
    const revenueByMonth = await db.execute(sql`
      SELECT TO_CHAR(booking_date, 'Mon') as name, SUM(total_price) as total
      FROM bookings
      WHERE payment_status = 'paid'
      GROUP BY TO_CHAR(booking_date, 'Mon'), EXTRACT(MONTH FROM booking_date)
      ORDER BY EXTRACT(MONTH FROM booking_date)
    `);

    return {
      totalBookings: Number(bookingStats?.count || 0),
      monthlyRevenue: Number(revenue?.total || 0),
      activeTours: Number(activeTours?.count || 0),
      pendingBookings: Number(bookingStats?.pending || 0),
      revenueByMonth: revenueByMonth.rows
    };
  }
}

export const storage = new DatabaseStorage();
