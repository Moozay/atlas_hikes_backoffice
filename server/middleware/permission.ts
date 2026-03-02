import type { RequestHandler } from "express";
import { storage } from "../storage";

export function requirePermission(permission: string): RequestHandler {
  return async (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = (req.user as any).id;

    // Admin identity type bypasses all permission checks
    const profile = await storage.getProfile(userId);
    if (profile?.role === "admin") return next();

    // Check if user's roles grant the required permission
    const hasPermission = await storage.checkUserPermission(userId, permission);
    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden: insufficient permissions" });
    }

    next();
  };
}
