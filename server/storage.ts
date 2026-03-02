import { db } from "./db";
import {
  tours, bookings, profiles, settings, transactions,
  roles, permissions, rolePermissions, userRolesTable,
  users,
  type Tour, type InsertTour, type UpdateTourRequest,
  type Booking, type InsertBooking,
  type Transaction, type InsertTransaction,
  type Profile, type InsertProfile,
  type Setting,
  type Role, type Permission, type InsertRole, type InsertPermission,
  type DashboardStats
} from "@shared/schema";
import { eq, desc, sql, and, inArray, isNull } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { cloudinary } from "./lib/cloudinary";

function extractCloudinaryPublicId(url: string): string | null {
  const uploadIdx = url.indexOf("/upload/");
  if (uploadIdx === -1) return null;
  const afterUpload = url.slice(uploadIdx + 8);
  const parts = afterUpload.split("/");
  // Skip transformation segments (e.g. "q_auto,f_auto,w_1600") and version segments (e.g. "v1772383206")
  const isTransform = (s: string) => /^v\d+$/.test(s) || s.split(",").every((p) => /^[a-z]_/.test(p));
  const pathParts = parts.filter((p) => !isTransform(p));
  return pathParts.join("/").replace(/\.[^/.]+$/, "");
}

export interface IStorage {
  // Tours
  getTours(filters?: { status?: string, region?: string, search?: string, difficulty?: string, featured?: boolean, category?: string }): Promise<Tour[]>;
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

  // Users (RBAC)
  getUsers(): Promise<any[]>;
  getUserById(id: string): Promise<any | undefined>;
  createUserWithProfile(data: { email: string; password: string; firstName: string; lastName: string; identityType: string }): Promise<any>;
  updateUser(id: string, data: Partial<{ firstName: string; lastName: string; email: string; status: string }>): Promise<any>;
  deactivateUser(id: string): Promise<void>;
  resetUserPassword(id: string, newPassword: string): Promise<void>;
  changePassword(id: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }>;
  assignRolesToUser(userId: string, roleIds: number[]): Promise<void>;

  // Roles (RBAC)
  getRoles(): Promise<(Role & { permissions: Permission[] })[]>;
  createRole(data: InsertRole): Promise<Role>;
  updateRole(id: number, data: Partial<InsertRole>): Promise<Role | undefined>;
  deleteRole(id: number): Promise<void>;
  assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void>;

  // Permissions (RBAC)
  getPermissions(): Promise<Permission[]>;
  seedPermissions(perms: InsertPermission[]): Promise<void>;
  seedRoles(roleDefs: { name: string; description: string; permissionNames: string[] }[]): Promise<void>;
  checkUserPermission(userId: string, permissionName: string): Promise<boolean>;
  getUserPermissions(userId: string): Promise<string[]>;
  bootstrapAdmin(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getTours(filters?: { status?: string, region?: string, search?: string, difficulty?: string, featured?: boolean, category?: string }): Promise<Tour[]> {
    let query = db.select().from(tours);
    const conditions: any[] = [isNull(tours.deletedAt)];
    if (filters?.status) conditions.push(eq(tours.status, filters.status as any));
    if (filters?.region) conditions.push(sql`region ILIKE ${`%${filters.region}%`}`);
    if (filters?.search) conditions.push(sql`title ILIKE ${`%${filters.search}%`}`);
    if (filters?.difficulty) conditions.push(eq(tours.difficulty, filters.difficulty as any));
    if (filters?.featured === true) conditions.push(eq(tours.featured, true));
    if (filters?.category) conditions.push(sql`category ILIKE ${`%${filters.category}%`}`);
    return await query.where(and(...conditions)).orderBy(desc(tours.createdAt));
  }

  async getTour(id: number): Promise<Tour | undefined> {
    const [tour] = await db.select().from(tours).where(and(eq(tours.id, id), isNull(tours.deletedAt)));
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
    const [tour] = await db.select().from(tours).where(eq(tours.id, id));
    if (tour?.images?.length) {
      const publicIds = tour.images
        .map(extractCloudinaryPublicId)
        .filter((pid: string | null): pid is string => pid !== null);
      if (publicIds.length > 0) {
        await cloudinary.api.delete_resources(publicIds);
      }
    }
    await db.update(tours)
      .set({ deletedAt: new Date(), images: [] })
      .where(eq(tours.id, id));
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

  // === RBAC: Users ===

  async getUsers(): Promise<any[]> {
    const result = await db
      .select({
        user: users,
        profile: profiles,
      })
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.userId))
      .orderBy(desc(users.createdAt));

    const userIds = result.map(r => r.user.id);
    if (userIds.length === 0) return [];

    const userRoleRows = await db
      .select({ userId: userRolesTable.userId, role: roles })
      .from(userRolesTable)
      .innerJoin(roles, eq(userRolesTable.roleId, roles.id))
      .where(inArray(userRolesTable.userId, userIds));

    const rolesByUser: Record<string, Role[]> = {};
    for (const row of userRoleRows) {
      if (!rolesByUser[row.userId]) rolesByUser[row.userId] = [];
      rolesByUser[row.userId].push(row.role);
    }

    return result.map(r => ({
      ...r.user,
      profile: r.profile,
      roles: rolesByUser[r.user.id] || [],
    }));
  }

  async getUserById(id: string): Promise<any | undefined> {
    const [row] = await db
      .select({ user: users, profile: profiles })
      .from(users)
      .leftJoin(profiles, eq(users.id, profiles.userId))
      .where(eq(users.id, id));

    if (!row) return undefined;

    const userRoleRows = await db
      .select({ role: roles })
      .from(userRolesTable)
      .innerJoin(roles, eq(userRolesTable.roleId, roles.id))
      .where(eq(userRolesTable.userId, id));

    return { ...row.user, profile: row.profile, roles: userRoleRows.map(r => r.role) };
  }

  async createUserWithProfile(data: { email: string; password: string; firstName: string; lastName: string; identityType: string }): Promise<any> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    const [newUser] = await db
      .insert(users)
      .values({ email: data.email, firstName: data.firstName, lastName: data.lastName, passwordHash, status: "active" })
      .returning();
    const [profile] = await db
      .insert(profiles)
      .values({ userId: newUser.id, role: data.identityType as any })
      .returning();
    return { ...newUser, profile, roles: [] };
  }

  async updateUser(id: string, data: Partial<{ firstName: string; lastName: string; email: string; status: string }>): Promise<any> {
    const [updated] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  async deactivateUser(id: string): Promise<void> {
    await db.update(users).set({ status: "inactive", updatedAt: new Date() }).where(eq(users.id, id));
  }

  async resetUserPassword(id: string, newPassword: string): Promise<void> {
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
  }

  async changePassword(id: string, currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user?.passwordHash) return { success: false, error: "User not found" };
    const valid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!valid) return { success: false, error: "Current password is incorrect" };
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
    return { success: true };
  }

  async assignRolesToUser(userId: string, roleIds: number[]): Promise<void> {
    await db.delete(userRolesTable).where(eq(userRolesTable.userId, userId));
    if (roleIds.length > 0) {
      await db.insert(userRolesTable).values(roleIds.map(roleId => ({ userId, roleId })));
    }
  }

  // === RBAC: Roles ===

  async getRoles(): Promise<(Role & { permissions: Permission[] })[]> {
    const allRoles = await db.select().from(roles).orderBy(roles.name);

    const rolePerms = await db
      .select({ roleId: rolePermissions.roleId, permission: permissions })
      .from(rolePermissions)
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id));

    const permsByRole: Record<number, Permission[]> = {};
    for (const row of rolePerms) {
      if (!permsByRole[row.roleId]) permsByRole[row.roleId] = [];
      permsByRole[row.roleId].push(row.permission);
    }

    return allRoles.map(role => ({ ...role, permissions: permsByRole[role.id] || [] }));
  }

  async createRole(data: InsertRole): Promise<Role> {
    const [role] = await db.insert(roles).values(data).returning();
    return role;
  }

  async updateRole(id: number, data: Partial<InsertRole>): Promise<Role | undefined> {
    const [updated] = await db.update(roles).set(data).where(eq(roles.id, id)).returning();
    return updated;
  }

  async deleteRole(id: number): Promise<void> {
    await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
    await db.delete(userRolesTable).where(eq(userRolesTable.roleId, id));
    await db.delete(roles).where(eq(roles.id, id));
  }

  async assignPermissionsToRole(roleId: number, permissionIds: number[]): Promise<void> {
    await db.delete(rolePermissions).where(eq(rolePermissions.roleId, roleId));
    if (permissionIds.length > 0) {
      await db.insert(rolePermissions).values(permissionIds.map(permissionId => ({ roleId, permissionId })));
    }
  }

  // === RBAC: Permissions ===

  async getPermissions(): Promise<Permission[]> {
    return await db.select().from(permissions).orderBy(permissions.resource, permissions.action);
  }

  async seedPermissions(perms: InsertPermission[]): Promise<void> {
    for (const perm of perms) {
      await db.insert(permissions).values(perm).onConflictDoNothing();
    }
  }

  async seedRoles(roleDefs: { name: string; description: string; permissionNames: string[] }[]): Promise<void> {
    const allPerms = await db.select().from(permissions);
    const permByName = Object.fromEntries(allPerms.map(p => [p.name, p]));

    for (const def of roleDefs) {
      // Upsert role (insert if not exists)
      let [role] = await db.select().from(roles).where(eq(roles.name, def.name));
      if (!role) {
        [role] = await db.insert(roles).values({ name: def.name, description: def.description }).returning();
      }

      // Assign permissions (only if none are assigned yet — don't overwrite manual changes)
      const existing = await db.select().from(rolePermissions).where(eq(rolePermissions.roleId, role.id));
      if (existing.length === 0) {
        const permIds = def.permissionNames.flatMap(n => permByName[n] ? [permByName[n].id] : []);
        if (permIds.length > 0) {
          await db.insert(rolePermissions).values(permIds.map(permissionId => ({ roleId: role.id, permissionId }))).onConflictDoNothing();
        }
      }
    }
  }

  async checkUserPermission(userId: string, permissionName: string): Promise<boolean> {
    const result = await db
      .select({ id: permissions.id })
      .from(userRolesTable)
      .innerJoin(rolePermissions, eq(userRolesTable.roleId, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(and(eq(userRolesTable.userId, userId), eq(permissions.name, permissionName)))
      .limit(1);

    return result.length > 0;
  }

  async getUserPermissions(userId: string): Promise<string[]> {
    const [profile] = await db.select().from(profiles).where(eq(profiles.userId, userId));
    if (profile?.role === "admin") {
      const allPerms = await db.select().from(permissions);
      return allPerms.map((p: Permission) => p.name);
    }
    const rows = await db
      .select({ name: permissions.name })
      .from(userRolesTable)
      .innerJoin(rolePermissions, eq(userRolesTable.roleId, rolePermissions.roleId))
      .innerJoin(permissions, eq(rolePermissions.permissionId, permissions.id))
      .where(eq(userRolesTable.userId, userId));
    const names = rows.map((r: { name: string }) => r.name);
    return names.filter((n: string, i: number) => names.indexOf(n) === i);
  }

  async bootstrapAdmin(): Promise<void> {
    // If an admin profile already exists, nothing to do
    const existing = await db.select().from(profiles).where(eq(profiles.role, "admin")).limit(1);
    if (existing.length > 0) return;

    // No admin profile — promote the oldest registered user
    const [oldestUser] = await db.select().from(users).orderBy(users.createdAt).limit(1);
    if (!oldestUser) return;

    await db
      .insert(profiles)
      .values({ userId: oldestUser.id, role: "admin" })
      .onConflictDoUpdate({ target: profiles.userId, set: { role: "admin" } });
  }
}

export const storage = new DatabaseStorage();
