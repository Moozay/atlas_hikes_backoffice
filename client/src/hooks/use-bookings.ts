import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateBookingRequest, type UpdateBookingStatusRequest } from "@shared/routes";

export function useBookings(filters?: { status?: string; tourId?: number }) {
  const queryKey = filters ? [api.bookings.list.path, filters] : [api.bookings.list.path];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = new URL(window.location.origin + api.bookings.list.path);
      if (filters?.status) url.searchParams.set("status", filters.status);
      if (filters?.tourId) url.searchParams.set("tourId", String(filters.tourId));

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch bookings");
      return api.bookings.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBookingRequest) => {
      const validated = api.bookings.create.input.parse(data);
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.bookings.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create booking");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] }),
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: number } & UpdateBookingStatusRequest) => {
      const validated = api.bookings.updateStatus.input.parse({ status });
      const url = buildUrl(api.bookings.updateStatus.path, { id });
      const res = await fetch(url, {
        method: api.bookings.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update booking status");
      return api.bookings.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] }),
  });
}

export function useAddPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, amount, method, reference }: { id: number; amount: number; method: string; reference?: string }) => {
      const url = buildUrl(api.bookings.addPayment.path, { id });
      const res = await fetch(url, {
        method: api.bookings.addPayment.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, method, reference }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to add payment");
      return api.bookings.addPayment.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.bookings.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.finance.stats.path] });
    },
  });
}
