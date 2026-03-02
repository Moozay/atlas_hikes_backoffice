import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const handleSave = () => {
    toast({ title: "Settings Saved", description: "Your configuration has been updated." });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure your application preferences.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card border border-border/50 p-1 rounded-xl">
          <TabsTrigger value="general" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">General</TabsTrigger>
          <TabsTrigger value="integrations" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Integrations</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Company Details</CardTitle>
              <CardDescription>Manage your business information visible on invoices.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="Atlas Hikes" />
                </div>
                <div className="space-y-2">
                  <Label>Support Email</Label>
                  <Input defaultValue="support@atlashikes.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input defaultValue="123 Mountain View Rd, Denver, CO 80202" />
              </div>
              <Button onClick={handleSave} className="mt-4">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>API Keys & Connectors</CardTitle>
              <CardDescription>Manage your Stripe and other third-party integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Stripe Public Key</Label>
                <Input type="password" value="pk_test_..." readOnly className="font-mono text-sm bg-muted" />
              </div>
              <div className="space-y-2">
                <Label>Stripe Secret Key</Label>
                <Input type="password" value="sk_test_..." readOnly className="font-mono text-sm bg-muted" />
              </div>
              <Button onClick={handleSave} className="mt-4">
                <Save className="w-4 h-4 mr-2" /> Update Keys
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
