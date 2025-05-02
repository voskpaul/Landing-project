import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function SettingsPage() {
  const user = await getCurrentUser()

  // If user is not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and details</p>
      </div>

      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-md mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-500">
              Profile
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-purple-500">
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-500">
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" defaultValue={user.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" defaultValue={user.lastName} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user.email} />
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Save Changes</Button>
          </TabsContent>

          <TabsContent value="password" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Update Password</Button>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-medium">Email Notifications</h3>
                  <p className="text-muted-foreground text-sm">Receive email notifications about your papers</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="emailNotifications" className="rounded text-purple-500" defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-medium">Processing Updates</h3>
                  <p className="text-muted-foreground text-sm">Get notified when your paper processing is complete</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="processingUpdates" className="rounded text-purple-500" defaultChecked />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-foreground font-medium">New Features</h3>
                  <p className="text-muted-foreground text-sm">Learn about new features and improvements</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="newFeatures" className="rounded text-purple-500" defaultChecked />
                </div>
              </div>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">Save Preferences</Button>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
