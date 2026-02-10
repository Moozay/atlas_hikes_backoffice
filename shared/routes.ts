import { z } from 'zod';
import { insertTourSchema, insertBookingSchema, tours, bookings, profiles, settings, transactions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    me: {
      method: 'GET' as const,
      path: '/api/auth/me' as const,
      responses: {
        200: z.object({
          user: z.any(),
          profile: z.custom<typeof profiles.$inferSelect>().nullable(),
        }),
        401: errorSchemas.notFound,
      },
    }
  },
  tours: {
    list: {
      method: 'GET' as const,
      path: '/api/tours' as const,
      input: z.object({
        status: z.enum(['draft', 'published', 'archived']).optional(),
        region: z.string().optional(),
        search: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof tours.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/tours/:id' as const,
      responses: {
        200: z.custom<typeof tours.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/tours' as const,
      input: insertTourSchema,
      responses: {
        201: z.custom<typeof tours.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/tours/:id' as const,
      input: insertTourSchema.partial(),
      responses: {
        200: z.custom<typeof tours.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/tours/:id' as const,
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    }
  },
  bookings: {
    list: {
      method: 'GET' as const,
      path: '/api/bookings' as const,
      input: z.object({
        tourId: z.coerce.number().optional(),
        status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'refunded']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof bookings.$inferSelect & { tour: typeof tours.$inferSelect, user: any }>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/bookings/:id' as const,
      responses: {
        200: z.custom<typeof bookings.$inferSelect & { tour: typeof tours.$inferSelect, user: any }>(),
        404: errorSchemas.notFound,
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/bookings/:id/status' as const,
      input: z.object({ status: z.enum(['pending', 'confirmed', 'cancelled', 'completed', 'refunded']) }),
      responses: {
        200: z.custom<typeof bookings.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    addPayment: {
      method: 'POST' as const,
      path: '/api/bookings/:id/payments' as const,
      input: z.object({ 
        amount: z.coerce.number(),
        method: z.string(),
        reference: z.string().optional()
      }),
      responses: {
        201: z.custom<typeof transactions.$inferSelect>(),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
      },
    },
  },
  finance: {
    stats: {
      method: 'GET' as const,
      path: '/api/finance/stats' as const,
      responses: {
        200: z.object({
          totalRevenue: z.number(),
          pendingRevenue: z.number(),
          collectedRevenue: z.number(),
          transactions: z.array(z.custom<typeof transactions.$inferSelect>()),
        }),
      },
    },
  },
  stats: {
    dashboard: {
      method: 'GET' as const,
      path: '/api/stats/dashboard' as const,
      responses: {
        200: z.object({
          totalBookings: z.number(),
          monthlyRevenue: z.number(),
          activeTours: z.number(),
          pendingBookings: z.number(),
          revenueByMonth: z.array(z.object({ name: z.string(), total: z.number() })),
        }),
      },
    },
  },
  settings: {
    list: {
      method: 'GET' as const,
      path: '/api/settings' as const,
      responses: {
        200: z.array(z.custom<typeof settings.$inferSelect>()),
      },
    },
    update: {
      method: 'PUT' as const,
      path: '/api/settings/:key' as const,
      input: z.object({ value: z.any() }),
      responses: {
        200: z.custom<typeof settings.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
