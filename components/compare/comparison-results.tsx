"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import OverviewTab from "@/components/compare/tabs/overview-tab"
import MethodologyTab from "@/components/compare/tabs/methodology-tab"
import FindingsTab from "@/components/compare/tabs/findings-tab"
import ConclusionsTab from "@/components/compare/tabs/conclusions-tab"

export default function ComparisonResults({
  paperIds,
  activeView,
  compareAction,
}: {
  paperIds: string[]
  activeView: string
  compareAction: (paperIds: string[]) => Promise<any>
}) {
  const [comparisonData, setComparisonData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchComparisonData() {
      setIsLoading(true)
      try {
        const data = await compareAction(paperIds)
        setComparisonData(data)
      } catch (error) {
        console.error("Error fetching comparison data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchComparisonData()
  }, [paperIds, compareAction])

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set("view", value)
    router.push(`${pathname}?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="mt-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
            </div>
            <p className="mt-4 text-foreground">Analyzing papers...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!comparisonData) {
    return (
      <div className="mt-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
        <div className="text-center py-8">
          <h3 className="text-lg font-medium text-foreground mb-2">Comparison Failed</h3>
          <p className="text-muted-foreground">Unable to generate comparison data. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-8 bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
      <Tabs defaultValue={activeView} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500">
            Overview
          </TabsTrigger>
          <TabsTrigger value="methodology" className="data-[state=active]:bg-purple-500">
            Methodology
          </TabsTrigger>
          <TabsTrigger value="findings" className="data-[state=active]:bg-purple-500">
            Findings
          </TabsTrigger>
          <TabsTrigger value="conclusions" className="data-[state=active]:bg-purple-500">
            Conclusions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab data={comparisonData.overview} />
        </TabsContent>

        <TabsContent value="methodology">
          <MethodologyTab data={comparisonData.methodology} />
        </TabsContent>

        <TabsContent value="findings">
          <FindingsTab data={comparisonData.findings} />
        </TabsContent>

        <TabsContent value="conclusions">
          <ConclusionsTab data={comparisonData.conclusions} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
