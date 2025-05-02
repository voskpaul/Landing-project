"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react"
import { motion } from "framer-motion"

export default function AudioSummary() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(180) // 3 minutes in seconds
  const [volume, setVolume] = useState(0.8)

  // Simulate audio playback
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return duration
          }
          return prev + 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, duration])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number.parseInt(e.target.value)
    setCurrentTime(newTime)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number.parseFloat(e.target.value))
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const skipForward = () => {
    setCurrentTime((prev) => Math.min(prev + 10, duration))
  }

  const skipBackward = () => {
    setCurrentTime((prev) => Math.max(prev - 10, 0))
  }

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="w-full md:w-48 aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
          <motion.div
            animate={{
              scale: isPlaying ? [1, 1.05, 1] : 1,
              transition: {
                repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                duration: 2,
              },
            }}
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 3.75V20.25M8.25 6.75V17.25M15.75 6.75V17.25M3.75 8.25V15.75M20.25 8.25V15.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">Quantum Computing: Audio Summary</h3>
          <p className="text-gray-400 mb-4">
            A concise 3-minute overview of the key findings, methodology, and conclusions from the research paper.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">{formatTime(currentTime)}</span>
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
                />
              </div>
              <span className="text-gray-400 text-sm">{formatTime(duration)}</span>
            </div>

            <div className="flex justify-center items-center gap-4">
              <Button variant="ghost" size="icon" onClick={skipBackward} className="text-gray-300 hover:text-white">
                <SkipBack className="h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full border-2 border-purple-500 text-white hover:bg-purple-500/20"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
              </Button>

              <Button variant="ghost" size="icon" onClick={skipForward} className="text-gray-300 hover:text-white">
                <SkipForward className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-gray-400" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-medium mb-2">Transcript</h4>
        <div className="text-gray-400 text-sm h-40 overflow-y-auto pr-2 space-y-2">
          <p>
            In this paper on quantum computing advances, researchers have demonstrated significant progress in qubit
            stability and error correction techniques.
          </p>
          <p>
            The key finding shows a 40% improvement in error correction, allowing for longer coherence times and more
            complex quantum algorithms to be executed successfully.
          </p>
          <p>
            The methodology involved comparative analysis across 15 research institutions, benchmarking performance
            metrics including speed, error rates, and algorithm efficiency.
          </p>
          <p>
            Results indicate that hybrid quantum-classical systems are showing the most promise for near-term practical
            applications, particularly in optimization problems and materials science.
          </p>
          <p>
            The researchers conclude that while quantum computing is advancing rapidly, key challenges remain in scaling
            qubits while maintaining coherence. They project practical industry applications within 5-7 years.
          </p>
        </div>
      </div>
    </div>
  )
}
