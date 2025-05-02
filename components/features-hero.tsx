"use client"

import { motion } from "framer-motion"

export default function FeaturesHero() {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful AI Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              Research Excellence
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto"
        >
          Discover how our AI-powered tools can transform your research papers into engaging, accessible content
          formats.
        </motion.p>
      </div>
    </div>
  )
}
