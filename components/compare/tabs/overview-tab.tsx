"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export default function OverviewTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Publication Timeline</h3>
        <div className="relative h-20 mb-6">
          {/* Timeline */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border"></div>

          {/* Year markers */}
          {Array.from(new Set(data.publicationYears.map((p: any) => p.year))).map((year) => (
            <div
              key={year as number}
              className="absolute top-1/2 transform -translate-y-1/2"
              style={{
                left: `${((year as number) - 2020) * 20}%`,
              }}
            >
              <div className="h-3 w-3 rounded-full bg-purple-500 mb-2"></div>
              <span className="text-sm text-foreground">{year}</span>
            </div>
          ))}

          {/* Paper markers */}
          {data.publicationYears.map((paper: any, index: number) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="absolute top-0 transform -translate-x-1/2"
              style={{
                left: `${(paper.year - 2020) * 20}%`,
              }}
            >
              <div className="h-4 w-4 rounded-full bg-purple-500 mb-1 mx-auto"></div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{`Paper ${index + 1}`}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Citation Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.citationCounts.map((paper: any, index: number) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background/50 border border-border rounded-lg p-4 text-center"
            >
              <div className="text-3xl font-bold text-purple-500 mb-2">{paper.citations}</div>
              <div className="text-sm text-muted-foreground">Citations</div>
              <div className="mt-2 text-sm text-foreground line-clamp-2">{paper.title}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Keyword Overlap</h3>
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <div className="flex flex-wrap gap-3">
            {data.keywordOverlap.map((item: any) => (
              <div
                key={item.keyword}
                className={`border ${
                  item.count === data.citationCounts.length
                    ? "border-green-500 bg-green-500/10"
                    : "border-purple-500 bg-purple-500/10"
                } rounded-lg px-3 py-2`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-foreground">{item.keyword}</span>
                  <Badge variant="outline" className="text-xs">
                    {item.count} papers
                  </Badge>
                </div>
              </div>
            ))}
            {data.keywordOverlap.length === 0 && (
              <p className="text-muted-foreground">No keyword overlap found between the selected papers.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
