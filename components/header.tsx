"use client"

import { motion } from "framer-motion"
import { StatusIndicator } from "./ui-effects"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between border-b border-border px-6 py-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 border border-foreground/20 rounded-sm flex items-center justify-center">
            <span className="text-[10px] font-medium text-foreground">
              {PORTFOLIO_DATA.developer.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-medium text-foreground leading-none">
              {PORTFOLIO_DATA.developer.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {PORTFOLIO_DATA.developer.title}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <nav className="hidden md:flex items-center gap-4">
          {["Projects", "Stack", "Experience", "Contact"].map((label) => (
            <span
              key={label}
              className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground cursor-default"
            >
              {label}
            </span>
          ))}
        </nav>
        <StatusIndicator active />
      </div>
    </motion.header>
  )
}
