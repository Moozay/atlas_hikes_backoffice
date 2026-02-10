import { db } from "./db";
import { 
  tours, bookings, profiles, settings, transactions,
  type Tour, type InsertTour, type UpdateTourRequest,
  type Booking, type InsertBooking,
  type Transaction, type InsertTransaction,
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
  getBookings(filters?: { tourId?: number, status?: string }): Promise<(Booking & { tour: Tour | null, user: any })[]>;
  getBooking(id: number): Promise<(Booking & { tour: Tour | null, user: any }) | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  updateBookingPayment(id: number, amountPaid: number, status: string): Promise<Booking | undefined>;

  // Transactions
  getTransactions(bookingId?: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;

  // Profiles
  getProfile(userId: string): Promise<Profile | undefined>;
  createProfile(profile: InsertProfile): Promise<Profile>;

  // Settings
  getSettings(): Promise<Setting[]>;
  updateSetting(key: string, value: any): Promise<Setting>;
  
  // Stats
  getDashboardStats(): Promise<DashboardStats & { revenueByMonth: any[] }>;
  getFinanceStats(): Promise<{
    totalRevenue: number;
    pendingRevenue: number;
    collectedRevenue: number;
    transactions: Transaction[];
  }>;
}

export class DatabaseStorage implements IStorage {
  async getTours(filters?: { status?: string, region?: string, search?: string }): Promise<Tour[]> {
    let query = db.select().from(tours);
    const conditions = [];
    if (filters?.status) conditions.push(eq(tours.status, filters.status as any));
    if (filters?.region) conditions.push(eq(tours.region, filters.region));
    if (filters?.search) conditions.push(sql`title ILIKE ${`%${filters.search}%`}`);
    if (conditions.length > 0) return await query.where(and(...conditions)).orderBy(desc(tours.createdAt));
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
    const result = await db.select({
      booking: bookings,
      tour: tours,
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
      user: { id: row.booking.userId }
    }));
  }

  async getBooking(id: number): Promise<(Booking & { tour: Tour | null, user: any }) | undefined> {
    const [row] = await db.select({
      booking: bookings,
      tour: tours,
    })
    .from(bookings)
    .leftJoin(tours, eq(bookings.tourId, tours.id))
    .where(eq(bookings.id, id));

    if (!row) return undefined;
    return {
      ...row.booking,
      tour: row.tour,
      user: { id: row.booking.userId }
    };
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db.insert(bookings).values(booking).returning();
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updated] = await db.update(bookings).set({ status: status as any }).where(eq(bookings.id, id)).returning();
    return updated;
  }

  async updateBookingPayment(id: number, amountPaid: number, paymentStatus: string): Promise<Booking | undefined> {
    const [updated] = await db.update(bookings)
      .set({ amountPaid, paymentStatus: paymentStatus as any })
      .where(eq(bookings.id, id))
      .returning();
    return updated;
  }

  async getTransactions(bookingId?: number): Promise<Transaction[]> {
    if (bookingId) return await db.select().from(transactions).where(eq(transactions.bookingId, bookingId)).orderBy(desc(transactions.createdAt));
    return await db.select().from(transactions).orderBy(desc(transactions.createdAt));
  }

  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTx] = await db.insert(transactions).values(transaction).returning();
    return newTx;
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
      total: sql<number>`sum(amount_paid)`
    }).from(bookings);

    const [activeTours] = await db.select({
      count: sql<number>`count(*)`
    }).from(tours).where(eq(tours.status, 'published'));

    const revenueByMonth = await db.execute(sql`
      SELECT TO_CHAR(created_at, 'Mon') as name, SUM(amount) as total
      FROM transactions
      WHERE type = 'payment'
      GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at)
      ORDER BY EXTRACT(MONTH FROM created_at)
    `);

    return {
      totalBookings: Number(bookingStats?.count || 0),
      monthlyRevenue: Number(revenue?.total || 0),
      activeTours: Number(activeTours?.count || 0),
      pendingBookings: Number(bookingStats?.pending || 0),
      revenueByMonth: revenueByMonth.rows
    };
  }

  async getFinanceStats(): Promise<{
    totalRevenue: number;
    pendingRevenue: number;
    collectedRevenue: number;
    transactions: Transaction[];
  }> {
    const [stats] = await db.select({
      total: sql<number>`sum(total_price)`,
      collected: sql<number>`sum(amount_paid)`
    }).from(bookings);

    const txs = await this.getTransactions();

    return {
      totalRevenue: Number(stats?.total || 0),
      collectedRevenue: Number(stats?.collected || 0),
      pendingRevenue: Number(stats?.total || 0) - Number(stats?.collected || 0),
      transactions: txs
    };
  }
}

export const storage = new DatabaseStorage();
