import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type CreateTourRequest, type UpdateTourRequest } from "@shared/routes";

export function useTours(filters?: { status?: string; difficulty?: string; region?: string; category?: string; search?: string; featured?: boolean }) {
  const queryKey = filters ? [api.tours.list.path, filters] : [api.tours.list.path];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const url = new URL(window.location.origin + api.tours.list.path);
      if (filters?.status) url.searchParams.set("status", filters.status);
      if (filters?.difficulty) url.searchParams.set("difficulty", filters.difficulty);
      if (filters?.region) url.searchParams.set("region", filters.region);
      if (filters?.category) url.searchParams.set("category", filters.category);
      if (filters?.search) url.searchParams.set("search", filters.search);
      if (filters?.featured) url.searchParams.set("featured", "true");

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch tours");
      return api.tours.list.responses[200].parse(await res.json());
    },
  });
}

export function useTour(id: number) {
  return useQuery({
    queryKey: [api.tours.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.tours.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch tour");
      return api.tours.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateTourRequest) => {
      const validated = api.tours.create.input.parse(data);
      const res = await fetch(api.tours.create.path, {
        method: api.tours.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.tours.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create tour");
      }
      return api.tours.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.tours.list.path] }),
  });
}

export function useUpdateTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & UpdateTourRequest) => {
      const validated = api.tours.update.input.parse(updates);
      const url = buildUrl(api.tours.update.path, { id });
      const res = await fetch(url, {
        method: api.tours.update.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 404) throw new Error("Tour not found");
        throw new Error("Failed to update tour");
      }
      return api.tours.update.responses[200].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.tours.list.path] }),
  });
}

export function useDeleteTour() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.tours.delete.path, { id });
      const res = await fetch(url, { method: api.tours.delete.method, credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete tour");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.tours.list.path] }),
  });
}
