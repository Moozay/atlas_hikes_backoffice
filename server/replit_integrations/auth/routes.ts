import type { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authStorage } from "./storage";
import { isAuthenticated } from "./replitAuth";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export function registerAuthRoutes(app: Express): void {
  // POST /api/register
  app.post("/api/register", async (req: Request, res: Response) => {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.errors[0].message });
    }
    const { email, password, firstName, lastName } = parsed.data;

    const existing = await authStorage.getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await authStorage.createUser({ email, passwordHash, firstName, lastName });
    const { passwordHash: _ph, ...safeUser } = user as any;

    req.login(user, (err) => {
      if (err) return res.status(500).json({ message: "Login after register failed" });
      res.status(201).json(safeUser);
    });
  });

  // POST /api/login
  app.post("/api/login", (req: Request, res: Response, next: NextFunction) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message ?? "Invalid credentials" });

      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        const { passwordHash: _ph, ...safeUser } = user as any;
        res.json(safeUser);
      });
    })(req, res, next);
  });

  // POST /api/logout
  app.post("/api/logout", (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ message: "Logged out" });
      });
    });
  });

  // GET /api/auth/user
  app.get("/api/auth/user", isAuthenticated, (req: Request, res: Response) => {
    const { passwordHash: _ph, ...safeUser } = req.user as any;
    res.json(safeUser);
  });
}
