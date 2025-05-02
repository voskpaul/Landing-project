import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> Works</span>
            </h1>
            <p className="text-gray-400 text-xl mb-8">
              Our AI-powered research assistant transforms your academic papers into engaging, accessible formats
              through a simple process.
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Coming Soon</h2>
              <p className="text-gray-400">
                We're currently working on a detailed explanation of our research processing workflow. Check back soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
