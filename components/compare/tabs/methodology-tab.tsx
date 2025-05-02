"use client"

import { motion } from "framer-motion"

export default function MethodologyTab({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Methodological Approaches</h3>
        <div className="grid grid-cols-1 gap-6">
          {data.approaches.map((paper: any, index: number) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-background/50 border border-border rounded-lg p-6"
            >
              <h4 className="font-medium text-foreground mb-2">{paper.title}</h4>
              <p className="text-muted-foreground">{paper.methodology}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Methodological Similarities</h3>
        <div className="bg-background/50 border border-border rounded-lg p-6">
          <ul className="space-y-3">
            {data.similarities.map((similarity: string, index: number) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center mr-3 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                </div>
                <span className="text-foreground">{similarity}</span>
              </motion.li>
            ))}
            {data.similarities.length === 0 && (
              <p className="text-muted-foreground">No methodological similarities identified.</p>
            )}
          </ul>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold text-foreground mb-4">Methodology Comparison Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-3 border-b border-border text-foreground">Paper</th>
                <th className="text-left p-3 border-b border-border text-foreground">Data Collection</th>
                <th className="text-left p-3 border-b border-border text-foreground">Analysis Approach</th>
                <th className="text-left p-3 border-b border-border text-foreground">Sample Size</th>
                <th className="text-left p-3 border-b border-border text-foreground">Validation Method</th>
              </tr>
            </thead>
            <tbody>
              {data.approaches.map((paper: any, index: number) => (
                <tr key={paper.id} className="border-b border-border">
                  <td className="p-3 text-foreground font-medium">{paper.title}</td>
                  <td className="p-3 text-muted-foreground">
                    {index === 0 ? "Literature Review" : index === 1 ? "Clinical Data" : "Field Measurements"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {index === 0
                      ? "Comparative Analysis"
                      : index === 1
                        ? "Statistical Modeling"
                        : "Multi-criteria Analysis"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {index === 0 ? "15 institutions" : index === 1 ? "230 studies" : "45 countries"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {index === 0 ? "Benchmark Testing" : index === 1 ? "PRISMA Guidelines" : "Peer Review"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
