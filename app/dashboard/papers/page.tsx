import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Download, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"

export default async function PapersPage() {
  const user = await getCurrentUser()

  // If user is not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login")
  }

  // Mock papers data
  const papers: any[] = []

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Papers</h1>
          <p className="text-muted-foreground">Manage your uploaded research papers</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700">
          <Link href="/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Paper
          </Link>
        </Button>
      </div>

      {papers.length > 0 ? (
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-medium text-foreground">Title</th>
                <th className="text-left p-4 font-medium text-foreground">Uploaded</th>
                <th className="text-left p-4 font-medium text-foreground">Status</th>
                <th className="text-right p-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper) => (
                <tr key={paper.id} className="border-b border-border">
                  <td className="p-4 text-foreground">{paper.title}</td>
                  <td className="p-4 text-muted-foreground">{paper.uploadedAt}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                      {paper.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-12 text-center">
          <div className="flex justify-center mb-4">
            <FileText className="h-16 w-16 text-muted-foreground opacity-50" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No papers yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Upload your first research paper to see it transformed into engaging presentations, podcasts, and visual
            content.
          </p>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link href="/upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload Your First Paper
            </Link>
          </Button>
        </div>
      )}
    </DashboardLayout>
  )
}
