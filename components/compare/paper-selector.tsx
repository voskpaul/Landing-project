"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, FileText, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

// Mock paper data - in a real app, this would come from an API
const availablePapers = [
  {
    id: "paper1",
    title: "Quantum Computing: Recent Advances",
    authors: "John Smith, Maria Garcia",
    year: 2023,
  },
  {
    id: "paper2",
    title: "Machine Learning in Healthcare: A Systematic Review",
    authors: "Emily Johnson, David Chen",
    year: 2022,
  },
  {
    id: "paper3",
    title: "Climate Change Mitigation Strategies: A Comparative Analysis",
    authors: "Robert Brown, Sarah Lee",
    year: 2023,
  },
  {
    id: "paper4",
    title: "Neural Networks for Natural Language Processing: State of the Art",
    authors: "Michael Wong, Jennifer Taylor",
    year: 2022,
  },
]

export default function PaperSelector({ selectedPaperIds }: { selectedPaperIds: string[] }) {
  const [isSelectingPapers, setIsSelectingPapers] = useState(false)
  const [selected, setSelected] = useState<string[]>(selectedPaperIds)
  const router = useRouter()

  const togglePaperSelection = (paperId: string) => {
    if (selected.includes(paperId)) {
      setSelected(selected.filter((id) => id !== paperId))
    } else {
      setSelected([...selected, paperId])
    }
  }

  const confirmSelection = () => {
    setIsSelectingPapers(false)
    if (selected.length >= 2) {
      router.push(`/compare?papers=${selected.join(",")}`)
    }
  }

  const cancelSelection = () => {
    setIsSelectingPapers(false)
    setSelected(selectedPaperIds)
  }

  return (
    <div className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Selected Papers for Comparison</h2>
          <p className="text-muted-foreground">Select at least 2 papers to compare their content and findings</p>
        </div>
        {!isSelectingPapers && (
          <Button onClick={() => setIsSelectingPapers(true)} className="mt-4 md:mt-0 bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Select Papers
          </Button>
        )}
      </div>

      {isSelectingPapers ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePapers.map((paper) => (
              <div
                key={paper.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selected.includes(paper.id)
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-border hover:border-purple-500/50"
                }`}
                onClick={() => togglePaperSelection(paper.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{paper.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {paper.authors} ({paper.year})
                    </p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      selected.includes(paper.id) ? "bg-purple-500" : "border border-muted-foreground"
                    }`}
                  >
                    {selected.includes(paper.id) && <Check className="h-4 w-4 text-white" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={cancelSelection}>
              Cancel
            </Button>
            <Button
              onClick={confirmSelection}
              disabled={selected.length < 2}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50"
            >
              Compare {selected.length} Papers
            </Button>
          </div>
        </div>
      ) : (
        <div>
          {selectedPaperIds.length > 0 ? (
            <div className="space-y-3">
              {selectedPaperIds.map((paperId) => {
                const paper = availablePapers.find((p) => p.id === paperId)
                if (!paper) return null

                return (
                  <motion.div
                    key={paper.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between bg-background/50 border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-purple-500 mr-3" />
                      <div>
                        <h3 className="font-medium text-foreground">{paper.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {paper.authors} ({paper.year})
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newSelected = selectedPaperIds.filter((id) => id !== paper.id)
                        router.push(newSelected.length >= 2 ? `/compare?papers=${newSelected.join(",")}` : "/compare")
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Papers Selected</h3>
              <p className="text-muted-foreground mb-4">Select at least 2 papers to start comparison</p>
              <Button onClick={() => setIsSelectingPapers(true)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                Select Papers
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
