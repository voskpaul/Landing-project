"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Upload, X } from "lucide-react"
import { uploadPaper } from "@/app/actions"
import { useRouter } from "next/navigation"
import UploadProgress from "@/components/upload-progress"

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [processingStep, setProcessingStep] = useState<string | null>(null)
  const router = useRouter()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 5
      })
    }, 200)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)

      // Simulate processing steps
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setProcessingStep("Extracting text from PDF")

      await new Promise((resolve) => setTimeout(resolve, 1500))
      setProcessingStep("Analyzing research content")

      await new Promise((resolve) => setTimeout(resolve, 2000))
      setProcessingStep("Generating transformations")

      // Call the server action
      await uploadPaper(formData)

      // Navigate to results page
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/results")
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      clearInterval(progressInterval)
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setFile(null)
  }

  if (isUploading) {
    return <UploadProgress progress={uploadProgress} step={processingStep} />
  }

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`border-2 border-dashed rounded-xl p-8 mb-6 transition-colors ${
          isDragging
            ? "border-purple-500 bg-purple-500/10"
            : file
              ? "border-green-500 bg-green-500/5"
              : "border-gray-700 hover:border-purple-500/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!file ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Upload className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Drag & drop your research paper</h3>
            <p className="text-gray-400 mb-4 text-center">or click to browse (PDF format only)</p>

            <input type="file" id="file-upload" className="hidden" accept=".pdf" onChange={handleFileChange} />
            <label htmlFor="file-upload">
              <Button type="button" variant="outline" className="text-white border-purple-500 hover:bg-purple-500/20">
                <FileText className="mr-2 h-5 w-5" />
                Browse Files
              </Button>
            </label>
          </div>
        ) : (
          <div className="flex items-center justify-between bg-white/5 p-4 rounded-lg">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white"
              onClick={removeFile}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          disabled={!file || isUploading}
        >
          {isUploading ? "Processing..." : "Process Paper"}
        </Button>
      </div>
    </form>
  )
}
