import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const form = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const handleLogin = async (data: LoginForm) => {
    try {
      await apiRequest("POST", "/api/login", data);
      // Full redirect so the app initialises fresh with the new session
      window.location.href = "/";
    } catch (err: any) {
      toast({ title: "Login failed", description: err?.message || "Invalid email or password", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left — Hero panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />

        <div className="relative z-10 flex items-center leading-none">
          <img src="/logo-white.svg" alt="A" className="h-6 w-6 shrink-0" />
          <span className="font-display font-bold text-xl tracking-tight">tlas Hikes</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-display font-bold leading-tight mb-6">
            Your back office, built for the mountains.
          </h1>
          <p className="text-lg text-primary-foreground/75 leading-relaxed">
            Manage tours, bookings, and your team — all from one place. Built for tour operators who move fast.
          </p>

        </div>

        <div className="relative z-10 text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Atlas Hikes. All rights reserved.
        </div>
      </div>

      {/* Right — Login form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile logo */}
          <div className="flex flex-col lg:hidden">
            <div className="flex items-center leading-none">
              <img src="/logo-black.svg" alt="A" className="h-6 w-6 shrink-0" />
              <span className="font-display font-bold text-xl tracking-tight text-primary">tlas Hikes</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1 ml-0.5">Back Office</div>
          </div>

          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1 text-sm">Sign in to your account to continue.</p>
          </div>

          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@atlashikes.com"
                className="h-11"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-11"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-sm font-semibold shadow-md shadow-primary/25 transition-all hover:-translate-y-0.5"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-xs text-muted-foreground">
            Don't have an account? Contact your system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
