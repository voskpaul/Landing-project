"use client"

import { motion } from "framer-motion"

export default function FindingsTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Key Findings Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.keyFindings.map((paper: any, index: number) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background/50 border border-border rounded-lg p-6"
            >
              <h4 className="font-medium text-foreground mb-3">{paper.title}</h4>
              <ul className="space-y-2">
                {paper.findings.map((finding: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-start"
                  >
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    </div>
                    <span className="text-muted-foreground">{finding}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Common Themes Across Papers</h3>
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.commonThemes.map((theme: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border border-purple-500/30 bg-purple-500/5 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                  </div>
                  <span className="text-foreground">{theme}</span>
                </div>
              </motion.div>
            ))}
          </div>
          {data.commonThemes.length === 0 && (
            <p className="text-muted-foreground">No common themes identified across the selected papers.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Findings Visualization</h3>
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <div className="aspect-video bg-background/30 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <h4 className="text-foreground font-medium mb-2">Comparative Findings Analysis</h4>
              <div className="flex justify-center items-end h-64 space-x-8 mt-4">
                {data.keyFindings.map((paper: any, index: number) => {
                  const height = 40 + paper.findings.length * 10
                  return (
                    <motion.div
                      key={paper.id}
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                      className="w-16 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md relative"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-foreground text-sm whitespace-nowrap">
                        Paper {index + 1}
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-foreground text-sm">
                        {paper.findings.length} findings
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <p className="text-muted-foreground mt-12">Number of key findings per paper</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
