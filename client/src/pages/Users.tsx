import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import {
  useUsers, useCreateUser, useUpdateUser, useDeactivateUser, useResetPassword, useAssignRoles,
  useRoles, useCreateRole, useUpdateRole, useDeleteRole, useAssignPermissions,
  usePermissions,
} from "@/hooks/use-users";
import { UserPlus, MoreHorizontal, Shield, KeyRound, UserX, Pencil, Trash2, Plus } from "lucide-react";

type UserRow = {
  id: string; email: string; firstName: string | null; lastName: string | null;
  status: string; createdAt: string;
  profile: { role: string } | null;
  roles: { id: number; name: string }[];
};

type RoleRow = { id: number; name: string; description: string | null; permissions: { id: number; name: string; resource: string; action: string }[] };
type PermRow = { id: number; name: string; description: string | null; resource: string; action: string };

const IDENTITY_TYPES = ["admin", "staff", "guide", "client"] as const;

// ── Create / Edit User Sheet ───────────────────────────────────────────────
function UserDialog({ open, onClose, user, roles }: { open: boolean; onClose: () => void; user?: UserRow; roles: RoleRow[] }) {
  const { toast } = useToast();
  const createUser = useCreateUser();
  const updateUser = useUpdateUser();
  const assignRoles = useAssignRoles();
  const isEdit = !!user;

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
    password: "",
    identityType: user?.profile?.role ?? "staff",
  });

  const [selectedRoles, setSelectedRoles] = useState<number[]>(
    user?.roles.map(r => r.id) ?? []
  );

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function toggleRole(id: number) {
    setSelectedRoles(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  async function handleSubmit() {
    try {
      if (isEdit) {
        await updateUser.mutateAsync({ id: user.id, firstName: form.firstName, lastName: form.lastName, email: form.email });
        await assignRoles.mutateAsync({ userId: user.id, roleIds: selectedRoles });
      } else {
        const newUser: any = await createUser.mutateAsync({ ...form, identityType: form.identityType });
        if (selectedRoles.length > 0) {
          await assignRoles.mutateAsync({ userId: newUser.id, roleIds: selectedRoles });
        }
      }
      toast({ title: isEdit ? "User updated" : "User created" });
      onClose();
    } catch (err: any) {
      toast({ title: "Error", description: err?.message ?? "Something went wrong", variant: "destructive" });
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full max-w-md sm:max-w-md p-0 flex flex-col">
        <SheetHeader className="px-6 pt-6 pb-4 border-b shrink-0">
          <SheetTitle>{isEdit ? "Edit User" : "New User"}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="px-6 py-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1"><Label>First Name</Label><Input value={form.firstName} onChange={e => set("firstName", e.target.value)} /></div>
              <div className="space-y-1"><Label>Last Name</Label><Input value={form.lastName} onChange={e => set("lastName", e.target.value)} /></div>
            </div>

            <div className="space-y-1">
              <Label>Email</Label>
              <Input type="email" value={form.email} onChange={e => set("email", e.target.value)} />
            </div>

            {!isEdit && (
              <div className="space-y-1">
                <Label>Password</Label>
                <Input type="password" value={form.password} onChange={e => set("password", e.target.value)} placeholder="Min 8 characters" />
              </div>
            )}

            <div className="space-y-1">
              <Label>Identity Type</Label>
              <Select value={form.identityType} onValueChange={v => set("identityType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {IDENTITY_TYPES.map(t => <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Roles</Label>
              {roles.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">No roles available yet.</p>
              ) : (
                <div className="space-y-1 rounded-lg border p-3">
                  {roles.map(role => (
                    <label key={role.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer">
                      <Checkbox
                        checked={selectedRoles.includes(role.id)}
                        onCheckedChange={() => toggleRole(role.id)}
                      />
                      <div>
                        <div className="font-medium text-sm">{role.name}</div>
                        {role.description && <div className="text-xs text-muted-foreground">{role.description}</div>}
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t shrink-0 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={createUser.isPending || updateUser.isPending || assignRoles.isPending}>
            {isEdit ? "Save Changes" : "Create User"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// ── Assign Roles Dialog ────────────────────────────────────────────────────
function AssignRolesDialog({ open, onClose, user, roles }: { open: boolean; onClose: () => void; user: UserRow; roles: RoleRow[] }) {
  const { toast } = useToast();
  const assignRoles = useAssignRoles();
  const [selected, setSelected] = useState<number[]>(user.roles.map(r => r.id));

  function toggle(id: number) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  async function handleSave() {
    try {
      await assignRoles.mutateAsync({ userId: user.id, roleIds: selected });
      toast({ title: "Roles assigned" });
      onClose();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Assign Roles — {user.firstName} {user.lastName}</DialogTitle></DialogHeader>
        <div className="space-y-2 py-2 max-h-64 overflow-y-auto">
          {roles.map(role => (
            <label key={role.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer">
              <Checkbox checked={selected.includes(role.id)} onCheckedChange={() => toggle(role.id)} />
              <div>
                <div className="font-medium text-sm">{role.name}</div>
                {role.description && <div className="text-xs text-muted-foreground">{role.description}</div>}
              </div>
            </label>
          ))}
          {roles.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No roles created yet.</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={assignRoles.isPending}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Reset Password Dialog ──────────────────────────────────────────────────
function ResetPasswordDialog({ open, onClose, userId }: { open: boolean; onClose: () => void; userId: string }) {
  const { toast } = useToast();
  const resetPassword = useResetPassword();
  const [password, setPassword] = useState("");

  async function handleSave() {
    if (password.length < 8) { toast({ title: "Password must be at least 8 characters", variant: "destructive" }); return; }
    try {
      await resetPassword.mutateAsync({ id: userId, password });
      toast({ title: "Password reset successfully" });
      onClose();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>Reset Password</DialogTitle></DialogHeader>
        <div className="space-y-1 py-2">
          <Label>New Password</Label>
          <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 8 characters" />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={resetPassword.isPending}>Reset</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Role Dialog ────────────────────────────────────────────────────────────
function RoleDialog({ open, onClose, role }: { open: boolean; onClose: () => void; role?: RoleRow }) {
  const { toast } = useToast();
  const createRole = useCreateRole();
  const updateRole = useUpdateRole();
  const [name, setName] = useState(role?.name ?? "");
  const [description, setDescription] = useState(role?.description ?? "");

  async function handleSave() {
    try {
      if (role) await updateRole.mutateAsync({ id: role.id, name, description });
      else await createRole.mutateAsync({ name, description });
      toast({ title: role ? "Role updated" : "Role created" });
      onClose();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader><DialogTitle>{role ? "Edit Role" : "New Role"}</DialogTitle></DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1"><Label>Role Name</Label><Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Content Editor" /></div>
          <div className="space-y-1"><Label>Description</Label><Input value={description} onChange={e => setDescription(e.target.value)} placeholder="What this role can do" /></div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={createRole.isPending || updateRole.isPending}>{role ? "Save" : "Create"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Assign Permissions Dialog ──────────────────────────────────────────────
function AssignPermissionsDialog({ open, onClose, role, allPermissions }: { open: boolean; onClose: () => void; role: RoleRow; allPermissions: PermRow[] }) {
  const { toast } = useToast();
  const assign = useAssignPermissions();
  const [selected, setSelected] = useState<number[]>(role.permissions.map(p => p.id));

  function toggle(id: number) {
    setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  }

  const grouped = allPermissions.reduce<Record<string, PermRow[]>>((acc, p) => {
    (acc[p.resource] = acc[p.resource] || []).push(p);
    return acc;
  }, {});

  async function handleSave() {
    try {
      await assign.mutateAsync({ roleId: role.id, permissionIds: selected });
      toast({ title: "Permissions saved" });
      onClose();
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Permissions — {role.name}</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2 max-h-96 overflow-y-auto">
          {Object.entries(grouped).map(([resource, perms]) => (
            <div key={resource}>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{resource}</p>
              <div className="space-y-1">
                {perms.map(p => (
                  <label key={p.id} className="flex items-center gap-3 p-1.5 rounded-md hover:bg-muted cursor-pointer">
                    <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} />
                    <span className="text-sm">{p.description || p.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {allPermissions.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No permissions found. Seed them first.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={assign.isPending}>Save Permissions</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function Users() {
  const { toast } = useToast();
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const { data: roles = [] } = useRoles();
  const { data: allPermissions = [] } = usePermissions();
  const deactivateUser = useDeactivateUser();
  const deleteRole = useDeleteRole();

  const [userDialog, setUserDialog] = useState<{ open: boolean; user?: UserRow }>({ open: false });
  const [assignRolesDialog, setAssignRolesDialog] = useState<{ open: boolean; user?: UserRow }>({ open: false });
  const [resetPwDialog, setResetPwDialog] = useState<{ open: boolean; userId?: string }>({ open: false });
  const [roleDialog, setRoleDialog] = useState<{ open: boolean; role?: RoleRow }>({ open: false });
  const [assignPermsDialog, setAssignPermsDialog] = useState<{ open: boolean; role?: RoleRow }>({ open: false });

  async function handleDeactivate(user: UserRow) {
    try {
      await deactivateUser.mutateAsync(user.id);
      toast({ title: `${user.firstName} deactivated` });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  async function handleDeleteRole(role: RoleRow) {
    try {
      await deleteRole.mutateAsync(role.id);
      toast({ title: `Role "${role.name}" deleted` });
    } catch {
      toast({ title: "Error", variant: "destructive" });
    }
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Users & Access</h1>
        <p className="text-muted-foreground mt-1">Manage identities, roles, and permissions.</p>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-card border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Users</TabsTrigger>
          <TabsTrigger value="roles" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Roles & Permissions</TabsTrigger>
        </TabsList>

        {/* ── Users Tab ── */}
        <TabsContent value="users">
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg">All Users</CardTitle>
              <Button size="sm" onClick={() => setUserDialog({ open: true })}>
                <UserPlus className="w-4 h-4 mr-2" /> New User
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Identity</TableHead>
                    <TableHead>Roles</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersLoading && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Loading…</TableCell></TableRow>
                  )}
                  {!usersLoading && users.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No users yet.</TableCell></TableRow>
                  )}
                  {users.map((user: UserRow) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.firstName} {user.lastName}</TableCell>
                      <TableCell className="text-muted-foreground">{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">{user.profile?.role ?? "—"}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length === 0
                            ? <span className="text-xs text-muted-foreground">No roles</span>
                            : user.roles.map(r => <Badge key={r.id} className="text-xs">{r.name}</Badge>)
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "default" : "secondary"} className={user.status === "active" ? "bg-green-500/10 text-green-600 border-green-200" : ""}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setUserDialog({ open: true, user })}>
                              <Pencil className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssignRolesDialog({ open: true, user })}>
                              <Shield className="w-4 h-4 mr-2" /> Assign Roles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setResetPwDialog({ open: true, userId: user.id })}>
                              <KeyRound className="w-4 h-4 mr-2" /> Reset Password
                            </DropdownMenuItem>
                            {user.status === "active" && (
                              <DropdownMenuItem className="text-destructive" onClick={() => handleDeactivate(user)}>
                                <UserX className="w-4 h-4 mr-2" /> Deactivate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Roles Tab ── */}
        <TabsContent value="roles">
          <div className="flex items-center justify-between mb-4">
            <Button size="sm" onClick={() => setRoleDialog({ open: true })}>
              <Plus className="w-4 h-4 mr-2" /> New Role
            </Button>
            <span className="text-sm text-muted-foreground">{allPermissions.length} permissions available</span>
          </div>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.length === 0 && (
                    <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No roles yet. Create one to get started.</TableCell></TableRow>
                  )}
                  {roles.map((role: RoleRow) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell className="text-muted-foreground">{role.description ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.length === 0
                            ? <span className="text-xs text-muted-foreground">None assigned</span>
                            : role.permissions.slice(0, 4).map(p => <Badge key={p.id} variant="secondary" className="text-xs">{p.name}</Badge>)
                          }
                          {role.permissions.length > 4 && (
                            <Badge variant="outline" className="text-xs">+{role.permissions.length - 4} more</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setRoleDialog({ open: true, role })}>
                              <Pencil className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setAssignPermsDialog({ open: true, role })}>
                              <Shield className="w-4 h-4 mr-2" /> Assign Permissions
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRole(role)}>
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {userDialog.open && (
        <UserDialog open={userDialog.open} onClose={() => setUserDialog({ open: false })} user={userDialog.user} roles={roles} />
      )}
      {assignRolesDialog.open && assignRolesDialog.user && (
        <AssignRolesDialog open={assignRolesDialog.open} onClose={() => setAssignRolesDialog({ open: false })} user={assignRolesDialog.user} roles={roles} />
      )}
      {resetPwDialog.open && resetPwDialog.userId && (
        <ResetPasswordDialog open={resetPwDialog.open} onClose={() => setResetPwDialog({ open: false })} userId={resetPwDialog.userId} />
      )}
      {roleDialog.open && (
        <RoleDialog open={roleDialog.open} onClose={() => setRoleDialog({ open: false })} role={roleDialog.role} />
      )}
      {assignPermsDialog.open && assignPermsDialog.role && (
        <AssignPermissionsDialog open={assignPermsDialog.open} onClose={() => setAssignPermsDialog({ open: false })} role={assignPermsDialog.role} allPermissions={allPermissions} />
      )}
    </Layout>
  );
}
