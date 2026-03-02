import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import type { Express, RequestHandler } from "express";
import connectPg from "connect-pg-simple";
import MemoryStore from "memorystore";
import bcrypt from "bcryptjs";
import { authStorage } from "./storage";

const isReplitEnv = !!process.env.REPL_ID;

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week

  let sessionStore;
  if (isReplitEnv) {
    const pgStore = connectPg(session);
    sessionStore = new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: false,
      ttl: sessionTtl,
      tableName: "sessions",
    });
  } else {
    const MStore = MemoryStore(session);
    sessionStore = new MStore({ checkPeriod: sessionTtl });
  }

  return session({
    secret: process.env.SESSION_SECRET ?? "local-dev-secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isReplitEnv,
      maxAge: sessionTtl,
    },
  });
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Serialize only the user's id into the session
  passport.serializeUser((user: any, cb) => cb(null, user.id));

  // Re-hydrate user from DB on each request
  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await authStorage.getUser(id);
      cb(null, user ?? false);
    } catch (err) {
      cb(err);
    }
  });

  // Local email/password strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await authStorage.getUserByEmail(email);
          if (!user || !user.passwordHash) {
            return done(null, false, { message: "Invalid email or password" });
          }
          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          if ((user as any).status === "inactive") {
            return done(null, false, { message: "Your account has been deactivated. Contact an administrator." });
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};
