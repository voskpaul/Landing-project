"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function PresentationPreview() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Quantum Computing: Recent Advances",
      content: "An overview of breakthroughs in quantum computing research from 2020-2023",
      type: "title",
    },
    {
      title: "Key Findings",
      content: [
        "Quantum supremacy demonstrated with 54-qubit processor",
        "Error correction techniques improved by 40%",
        "New quantum algorithms for optimization problems",
        "Hybrid quantum-classical systems showing promise",
      ],
      type: "bullets",
    },
    {
      title: "Methodology",
      content:
        "The research utilized a comparative analysis of quantum computing architectures across 15 leading research institutions, with performance benchmarks for speed, error rates, and algorithm efficiency.",
      type: "text",
    },
    {
      title: "Results Visualization",
      content: "graph",
      type: "chart",
    },
    {
      title: "Conclusions",
      content:
        "Quantum computing is advancing rapidly with practical applications expected within 5-7 years. Key challenges remain in scaling qubits while maintaining coherence and developing industry-specific algorithms.",
      type: "text",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1))
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-black rounded-lg overflow-hidden relative mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center"
          >
            {slides[currentSlide].type === "title" ? (
              <>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{slides[currentSlide].title}</h2>
                <p className="text-xl text-gray-300">{slides[currentSlide].content}</p>
              </>
            ) : slides[currentSlide].type === "bullets" ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{slides[currentSlide].title}</h2>
                <ul className="text-left space-y-4 text-lg">
                  {(slides[currentSlide].content as string[]).map((bullet, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start"
                    >
                      <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 mr-3"></span>
                      <span className="text-gray-200">{bullet}</span>
                    </motion.li>
                  ))}
                </ul>
              </>
            ) : slides[currentSlide].type === "chart" ? (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{slides[currentSlide].title}</h2>
                <div className="w-full max-w-md h-64 bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="flex h-40 items-end space-x-6">
                    {[65, 40, 85, 30, 70].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ delay: i * 0.1, duration: 0.8, ease: "backOut" }}
                        className="w-12 bg-gradient-to-t from-purple-600 to-pink-500 rounded-t-md relative"
                      >
                        <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
                          {height}%
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-gray-400">Performance comparison across quantum architectures</p>
              </>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{slides[currentSlide].title}</h2>
                <p className="text-lg text-gray-300">{slides[currentSlide].content}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <div className="flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-purple-500" : "bg-gray-600"}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="text-white disabled:opacity-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <span className="text-gray-400">
          Slide {currentSlide + 1} of {slides.length}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="text-white disabled:opacity-50"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
