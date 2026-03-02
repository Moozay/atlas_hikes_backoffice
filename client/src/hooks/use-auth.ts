import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";

interface AuthUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status?: string;
  profile?: { role?: string } | null;
  permissions: string[];
}

async function fetchMe(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "include",
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  const { data: user, isLoading } = useQuery<AuthUser | null>({
    queryKey: ["/api/auth/me"],
    queryFn: fetchMe,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/logout"),
    onSuccess: () => {
      queryClient.setQueryData(["/api/auth/me"], null);
      queryClient.clear();
      navigate("/login");
    },
  });

  const isAdmin = user?.profile?.role === "admin";
  const permissions = user?.permissions ?? [];

  function hasPermission(perm: string): boolean {
    if (isAdmin) return true;
    return permissions.includes(perm);
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    isAdmin,
    permissions,
    hasPermission,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
}
