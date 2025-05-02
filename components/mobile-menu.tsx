"use client"

import type React from "react"

import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-4/5 max-w-sm bg-background border-l border-border z-50 overflow-y-auto"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <ThemeToggle />
                <Button variant="ghost" size="icon" onClick={onClose} className="text-foreground">
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close menu</span>
                </Button>
              </div>

              <nav className="flex-1">
                <ul className="space-y-6">
                  <MobileNavItem href="/" onClick={onClose}>
                    Home
                  </MobileNavItem>
                  <MobileNavItem href="/features" onClick={onClose}>
                    Features
                  </MobileNavItem>
                  <MobileNavItem href="/how-it-works" onClick={onClose}>
                    How it Works
                  </MobileNavItem>
                  <MobileNavItem href="/examples" onClick={onClose}>
                    Examples
                  </MobileNavItem>
                  <MobileNavItem href="/pricing" onClick={onClose}>
                    Pricing
                  </MobileNavItem>
                  <MobileNavItem href="/compare" onClick={onClose}>
                    Compare Papers
                  </MobileNavItem>
                  <MobileNavItem href="/upload" onClick={onClose}>
                    Upload Paper
                  </MobileNavItem>
                </ul>
              </nav>

              <div className="pt-6 mt-6 border-t border-border">
                <div className="flex flex-col gap-4">
                  <Button variant="outline" className="w-full justify-center text-foreground" asChild>
                    <Link href="/auth/login" onClick={onClose}>
                      Sign In
                    </Link>
                  </Button>
                  <Button className="w-full justify-center bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <Link href="/auth/register" onClick={onClose}>
                      Get Started
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

interface MobileNavItemProps {
  href: string
  onClick: () => void
  children: React.ReactNode
}

function MobileNavItem({ href, onClick, children }: MobileNavItemProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block text-xl font-medium text-foreground hover:text-purple-500 transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}
