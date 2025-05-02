"use client"

import { motion } from "framer-motion"

export default function ConclusionsTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Conclusion Statements</h3>
        <div className="grid grid-cols-1 gap-6">
          {data.statements.map((paper: any, index: number) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background/50 border border-border rounded-lg p-6"
            >
              <h4 className="font-medium text-foreground mb-2">{paper.title}</h4>
              <p className="text-muted-foreground italic">"{paper.conclusions}"</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Research Gaps Identified</h3>
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <ul className="space-y-4">
            {data.researchGaps.map((gap: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="h-6 w-6 rounded-full bg-pink-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                </div>
                <div>
                  <span className="text-foreground font-medium">Research Gap {index + 1}:</span>{" "}
                  <span className="text-muted-foreground">{gap}</span>
                </div>
              </motion.li>
            ))}
            {data.researchGaps.length === 0 && (
              <p className="text-muted-foreground">No research gaps identified across the selected papers.</p>
            )}
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Future Research Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6"
          >
            <h4 className="font-medium text-foreground mb-3">Interdisciplinary Research</h4>
            <p className="text-muted-foreground">
              Combining methodologies from different papers could yield novel insights. Consider exploring the
              intersection of quantum computing and machine learning techniques.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6"
          >
            <h4 className="font-medium text-foreground mb-3">Long-term Impact Studies</h4>
            <p className="text-muted-foreground">
              Most papers focus on short-term results. A longitudinal study examining the long-term effects and
              sustainability of the proposed solutions would be valuable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6"
          >
            <h4 className="font-medium text-foreground mb-3">Policy Implications</h4>
            <p className="text-muted-foreground">
              There's an opportunity to explore how these research findings could inform policy decisions and regulatory
              frameworks across different sectors.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6"
          >
            <h4 className="font-medium text-foreground mb-3">Economic Analysis</h4>
            <p className="text-muted-foreground">
              A comprehensive cost-benefit analysis of implementing the proposed solutions at scale would provide
              valuable insights for industry adoption.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
