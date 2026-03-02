import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest } from "@/lib/queryClient";
import { Loader2, User, KeyRound } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ title: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 8) {
      toast({ title: "New password must be at least 8 characters", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/auth/change-password", { currentPassword, newPassword });
      toast({ title: "Password changed successfully" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      const msg = await err?.response?.json?.().then((r: any) => r.message).catch(() => null);
      toast({ title: msg || "Failed to change password", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  }

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map(n => n![0].toUpperCase())
    .join("") || user?.email?.[0].toUpperCase() || "?";

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your account details.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Identity card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <User className="w-4 h-4" /> Account Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-md shadow-primary/20">
                {initials}
              </div>
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.email}
                </div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
              </div>
            </div>

            <Separator className="mb-4" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Status</span>
                <div className="mt-1">
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">Active</Badge>
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Member since</span>
                <div className="mt-1 font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt as string).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                    : "—"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Change password card */}
        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <KeyRound className="w-4 h-4" /> Change Password
            </CardTitle>
            <CardDescription>
              Enter your current password, then choose a new one (min. 8 characters).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Min 8 characters"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Repeat new password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="pt-2">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
