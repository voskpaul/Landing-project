"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Presentation, Podcast, BookOpen, Download, Share2 } from "lucide-react"
import PresentationPreview from "@/components/presentation-preview"
import AudioSummary from "@/components/audio-summary"
import InteractiveSummary from "@/components/interactive-summary"

export default function ResultsTabs() {
  return (
    <Tabs defaultValue="presentation" className="w-full">
      <TabsList className="grid grid-cols-3 mb-8">
        <TabsTrigger value="presentation" className="data-[state=active]:bg-purple-500">
          <Presentation className="mr-2 h-4 w-4" />
          Presentation
        </TabsTrigger>
        <TabsTrigger value="audio" className="data-[state=active]:bg-purple-500">
          <Podcast className="mr-2 h-4 w-4" />
          Audio Summary
        </TabsTrigger>
        <TabsTrigger value="summary" className="data-[state=active]:bg-purple-500">
          <BookOpen className="mr-2 h-4 w-4" />
          Interactive Summary
        </TabsTrigger>
      </TabsList>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Quantum Computing: Recent Advances</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="text-gray-300">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="text-gray-300">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
        <div className="flex items-center text-gray-400 text-sm mb-2">
          <FileText className="mr-2 h-4 w-4" />
          <span>Processed on {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <TabsContent value="presentation" className="mt-0">
        <PresentationPreview />
      </TabsContent>

      <TabsContent value="audio" className="mt-0">
        <AudioSummary />
      </TabsContent>

      <TabsContent value="summary" className="mt-0">
        <InteractiveSummary />
      </TabsContent>
    </Tabs>
  )
}
