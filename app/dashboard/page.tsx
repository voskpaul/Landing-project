import type React from "react"
import { getCurrentUser, logoutUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Settings, LogOut } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const user = await getCurrentUser()

  // If user is not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.firstName} {user.lastName}
          </p>
        </div>
        <form action={logoutUser}>
          <Button variant="outline" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardCard
          title="Upload Paper"
          description="Transform your research papers into engaging formats"
          icon={<Upload className="h-8 w-8 text-purple-500" />}
          href="/upload"
        />
        <DashboardCard
          title="My Papers"
          description="View and manage your uploaded research papers"
          icon={<FileText className="h-8 w-8 text-purple-500" />}
          href="/dashboard/papers"
        />
        <DashboardCard
          title="Account Settings"
          description="Manage your account preferences and details"
          icon={<Settings className="h-8 w-8 text-purple-500" />}
          href="/dashboard/settings"
        />
      </div>

      <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
        <p className="text-muted-foreground">You haven&apos;t uploaded any papers yet.</p>
        <Button asChild className="mt-4 bg-purple-600 hover:bg-purple-700">
          <Link href="/upload">Upload Your First Paper</Link>
        </Button>
      </div>
    </DashboardLayout>
  )
}

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Link
      href={href}
      className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:bg-background/90 transition-colors"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Link>
  )
}
