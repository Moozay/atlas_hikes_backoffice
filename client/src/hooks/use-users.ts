import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

// ── Users ──────────────────────────────────────────────────────────────────

async function fetchJson(url: string) {
  const r = await fetch(url, { credentials: "include" });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

export function useUsers() {
  return useQuery({ queryKey: ["/api/users"], queryFn: () => fetchJson("/api/users") });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; password: string; firstName: string; lastName: string; identityType: string }) =>
      apiRequest("POST", "/api/users", data).then(r => r.json()),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/users"] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; firstName?: string; lastName?: string; email?: string; status?: string }) =>
      apiRequest("PUT", `/api/users/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/users"] }),
  });
}

export function useDeactivateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/users/${id}/deactivate`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/users"] }),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: ({ id, password }: { id: string; password: string }) =>
      apiRequest("POST", `/api/users/${id}/reset-password`, { password }),
  });
}

export function useAssignRoles() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, roleIds }: { userId: string; roleIds: number[] }) =>
      apiRequest("PUT", `/api/users/${userId}/roles`, { roleIds }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/users"] }),
  });
}

// ── Roles ──────────────────────────────────────────────────────────────────

export function useRoles() {
  return useQuery({ queryKey: ["/api/roles"], queryFn: () => fetchJson("/api/roles") });
}

export function useCreateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      apiRequest("POST", "/api/roles", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/roles"] }),
  });
}

export function useUpdateRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; name?: string; description?: string }) =>
      apiRequest("PUT", `/api/roles/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/roles"] }),
  });
}

export function useDeleteRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiRequest("DELETE", `/api/roles/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/roles"] }),
  });
}

export function useAssignPermissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ roleId, permissionIds }: { roleId: number; permissionIds: number[] }) =>
      apiRequest("PUT", `/api/roles/${roleId}/permissions`, { permissionIds }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/roles"] }),
  });
}

// ── Permissions ────────────────────────────────────────────────────────────

export function usePermissions() {
  return useQuery({ queryKey: ["/api/permissions"], queryFn: () => fetchJson("/api/permissions") });
}

export function useSeedPermissions() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => apiRequest("POST", "/api/permissions/seed"),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["/api/permissions"] }),
  });
}
