"use client"

import { motion } from "framer-motion"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

export function AboutPanel() {
  const { developer } = PORTFOLIO_DATA
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          About
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <div className="border border-border bg-card rounded-sm p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-sm border border-border bg-secondary flex items-center justify-center">
            <span className="text-lg font-medium text-foreground">
              {developer.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          <div>
            <h3 className="text-foreground text-base font-medium">
              {developer.name}
            </h3>
            <p className="text-muted-foreground text-xs">
              {developer.title}
            </p>
          </div>
          {developer.available && (
            <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse-glow" />
              Available
            </span>
          )}
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          {developer.bio}
        </p>

        <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60">
          <span className="uppercase tracking-wider">Location:</span>
          <span className="text-muted-foreground">{developer.location}</span>
        </div>
      </div>

      <div className="border border-border bg-card rounded-sm p-5">
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          {'"'}{developer.tagline}{'"'}
        </p>
      </div>
    </motion.div>
  )
}
