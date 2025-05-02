"use client"

import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

interface UploadProgressProps {
  progress: number
  step: string | null
}

export default function UploadProgress({ progress, step }: UploadProgressProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Processing your paper</span>
          <span className="text-purple-400 font-medium">{progress}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="space-y-4">
        <ProcessingStep step="Uploading file" isComplete={progress >= 30} isActive={progress < 30} />
        <ProcessingStep
          step="Extracting text from PDF"
          isComplete={progress >= 60}
          isActive={progress >= 30 && progress < 60}
        />
        <ProcessingStep
          step="Analyzing research content"
          isComplete={progress >= 80}
          isActive={progress >= 60 && progress < 80}
        />
        <ProcessingStep
          step="Generating transformations"
          isComplete={progress >= 100}
          isActive={progress >= 80 && progress < 100}
        />
      </div>

      {step && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center text-gray-400"
        >
          <p>{step}</p>
        </motion.div>
      )}
    </div>
  )
}

interface ProcessingStepProps {
  step: string
  isComplete: boolean
  isActive: boolean
}

function ProcessingStep({ step, isComplete, isActive }: ProcessingStepProps) {
  return (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
          isComplete ? "bg-purple-500" : isActive ? "bg-purple-500/50 animate-pulse" : "bg-gray-700"
        }`}
      >
        {isComplete && <CheckCircle2 className="w-4 h-4 text-white" />}
      </div>
      <span className={`${isComplete ? "text-white" : isActive ? "text-purple-400" : "text-gray-500"}`}>{step}</span>
    </div>
  )
}
