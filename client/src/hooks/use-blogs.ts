import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

const BLOGS_KEY = api.blogs.list.path;

export function useBlogs(filters?: { published?: boolean; featured?: boolean; category?: string; search?: string }) {
  return useQuery({
    queryKey: [BLOGS_KEY, filters],
    queryFn: async () => {
      const url = new URL(window.location.origin + api.blogs.list.path);
      if (filters?.published !== undefined) url.searchParams.set("published", String(filters.published));
      if (filters?.featured !== undefined) url.searchParams.set("featured", String(filters.featured));
      if (filters?.category) url.searchParams.set("category", filters.category);
      if (filters?.search) url.searchParams.set("search", filters.search);
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      return res.json() as Promise<{ posts: any[]; total: number }>;
    },
  });
}

export function useBlog(id: number) {
  return useQuery({
    queryKey: [api.blogs.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.blogs.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch blog post");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(api.blogs.create.path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Failed to create blog post");
      }
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: number } & Record<string, any>) => {
      const url = buildUrl(api.blogs.update.path, { id });
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to update blog post");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.blogs.delete.path, { id });
      const res = await fetch(url, { method: "DELETE", credentials: "include" });
      if (!res.ok) throw new Error("Failed to delete blog post");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}

export function useBulkImportBlogs() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch(api.blogs.bulkImport.path, {
        method: "POST",
        body: form,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Import failed");
      }
      return res.json() as Promise<{ imported: number; skipped: number; failed: number }>;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BLOGS_KEY] }),
  });
}
