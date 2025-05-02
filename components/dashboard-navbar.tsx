"use client"

import type React from "react"

import Link from "next/link"
import { Bot, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"
import MobileMenu from "@/components/mobile-menu"

export default function DashboardNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openMobileMenu = () => setIsMobileMenuOpen(true)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-border">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Bot className="w-8 h-8 text-purple-500" />
          <span className="text-foreground font-medium text-xl">ResearchAI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/upload">Upload</NavLink>
          <NavLink href="/dashboard/papers">My Papers</NavLink>
          <NavLink href="/compare">Compare Papers</NavLink>
          <NavLink href="/dashboard/settings">Settings</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={openMobileMenu}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-muted-foreground hover:text-foreground transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
    </Link>
  )
}
