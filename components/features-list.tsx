"use client"
import { FileText, Presentation, Podcast, BookOpen, Zap, Search, Sparkles, BrainCircuit } from "lucide-react"
import FeatureCard from "@/components/feature-card"

export default function FeaturesList() {
  const features = [
    {
      icon: <Presentation className="h-10 w-10 text-purple-500" />,
      title: "Presentation Generation",
      description:
        "Transform research papers into visually engaging slide decks with key points highlighted and visualized data.",
      delay: 0.1,
    },
    {
      icon: <Podcast className="h-10 w-10 text-purple-500" />,
      title: "Audio Summaries",
      description:
        "Convert papers into podcast-style audio summaries with natural-sounding voices and clear explanations.",
      delay: 0.2,
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-500" />,
      title: "Interactive Summaries",
      description:
        "Create interactive summaries with expandable sections, allowing readers to dive deeper into specific areas of interest.",
      delay: 0.3,
    },
    {
      icon: <Zap className="h-10 w-10 text-purple-500" />,
      title: "Quick Insights",
      description:
        "Extract key findings, methodologies, and conclusions from papers in seconds, saving hours of reading time.",
      delay: 0.4,
    },
    {
      icon: <Search className="h-10 w-10 text-purple-500" />,
      title: "Semantic Search",
      description:
        "Ask questions about your research papers and get accurate answers with citations to the original text.",
      delay: 0.5,
    },
    {
      icon: <BrainCircuit className="h-10 w-10 text-purple-500" />,
      title: "Cross-Paper Analysis",
      description: "Compare multiple papers to identify similarities, differences, and potential research gaps.",
      delay: 0.6,
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Citation Generation",
      description: "Automatically generate properly formatted citations in multiple styles (APA, MLA, Chicago, etc.).",
      delay: 0.7,
    },
    {
      icon: <Sparkles className="h-10 w-10 text-purple-500" />,
      title: "Visual Data Extraction",
      description:
        "Extract and enhance charts, graphs, and tables from papers for clearer visualization and understanding.",
      delay: 0.8,
    },
  ]

  return (
    <div className="container mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={feature.delay}
          />
        ))}
      </div>
    </div>
  )
}
