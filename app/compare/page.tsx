import { getCurrentUser } from "@/app/actions/auth"
import { redirect } from "next/navigation"
import PageLayout from "@/components/page-layout"
import PaperSelector from "@/components/compare/paper-selector"
import ComparisonResults from "@/components/compare/comparison-results"
import { Suspense } from "react"
import { compareAction } from "@/app/actions/compare"

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { papers?: string; view?: string }
}) {
  const user = await getCurrentUser()

  // If user is not authenticated, redirect to login
  if (!user) {
    redirect("/auth/login?redirect=/compare")
  }

  // Get selected paper IDs from URL params
  const selectedPaperIds = searchParams.papers ? searchParams.papers.split(",") : []
  const activeView = searchParams.view || "overview"

  return (
    <PageLayout>
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Research
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              Comparison
            </span>
          </h1>
          <p className="text-muted-foreground text-xl">
            Compare multiple research papers to identify similarities, differences, and research gaps.
          </p>
        </div>

        <PaperSelector selectedPaperIds={selectedPaperIds} />

        {selectedPaperIds.length >= 2 && (
          <Suspense fallback={<ComparisonLoadingSkeleton />}>
            <ComparisonResults paperIds={selectedPaperIds} activeView={activeView} compareAction={compareAction} />
          </Suspense>
        )}
      </div>
    </PageLayout>
  )
}

function ComparisonLoadingSkeleton() {
  return (
    <div className="mt-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 animate-pulse">
      <div className="h-8 w-64 bg-foreground/10 rounded mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-40 bg-foreground/10 rounded"></div>
        <div className="h-40 bg-foreground/10 rounded"></div>
        <div className="h-40 bg-foreground/10 rounded"></div>
        <div className="h-40 bg-foreground/10 rounded"></div>
      </div>
    </div>
  )
}
