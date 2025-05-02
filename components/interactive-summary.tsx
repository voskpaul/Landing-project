"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function InteractiveSummary() {
  const [expandedSections, setExpandedSections] = useState<string[]>(["abstract"])
  const [searchQuery, setSearchQuery] = useState("")

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const sections = [
    {
      id: "abstract",
      title: "Abstract",
      content:
        "This paper presents recent advances in quantum computing from 2020-2023, focusing on hardware improvements, error correction techniques, and algorithm development. Key findings include a demonstration of quantum supremacy with a 54-qubit processor and a 40% improvement in error correction methodologies.",
    },
    {
      id: "introduction",
      title: "Introduction",
      content:
        "Quantum computing represents a paradigm shift in computational capabilities, leveraging quantum mechanical phenomena such as superposition and entanglement. This paper reviews the most significant advancements in the field over the past three years, highlighting breakthroughs that bring practical quantum computing closer to reality.",
    },
    {
      id: "methodology",
      title: "Methodology",
      content:
        "The research utilized a comparative analysis of quantum computing architectures across 15 leading research institutions. Performance was benchmarked using standardized tests for speed, error rates, and algorithm efficiency. Both superconducting and ion trap qubits were evaluated under identical experimental conditions.",
    },
    {
      id: "results",
      title: "Results",
      content:
        "Our analysis revealed several key findings: (1) Quantum supremacy was demonstrated with a 54-qubit processor completing a specific task in 200 seconds that would take a classical supercomputer approximately 10,000 years. (2) Error correction techniques improved by 40%, primarily through the implementation of surface codes and topological protection methods. (3) New quantum algorithms showed particular promise in optimization problems, with applications in logistics and financial modeling.",
    },
    {
      id: "discussion",
      title: "Discussion",
      content:
        "The advancements documented in this paper suggest that quantum computing is approaching a critical inflection point. While fully fault-tolerant quantum computers remain years away, the NISQ (Noisy Intermediate-Scale Quantum) era is already enabling valuable applications. Hybrid quantum-classical approaches appear to be the most practical near-term solution for industry adoption.",
    },
    {
      id: "conclusion",
      title: "Conclusion",
      content:
        "Quantum computing is advancing rapidly with practical applications expected within 5-7 years. Key challenges remain in scaling qubits while maintaining coherence and developing industry-specific algorithms. Future research should focus on error mitigation techniques and identifying quantum advantage use cases that provide clear benefits over classical computing approaches.",
    },
  ]

  const filteredSections = sections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search within summary..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-4">
        {filteredSections.map((section) => (
          <div key={section.id} className="border border-white/10 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between bg-white/5 p-4 text-left"
            >
              <h3 className="text-lg font-medium text-white">{section.title}</h3>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>

            <AnimatePresence>
              {expandedSections.includes(section.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-4 text-gray-300">
                    {searchQuery ? <HighlightText text={section.content} query={searchQuery} /> : section.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>

  const parts = text.split(new RegExp(`(${query})`, "gi"))

  return (
    <>
      {parts.map((part, index) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-purple-500/30 text-white font-medium px-1 rounded">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}
