"use client"

import { motion } from "framer-motion"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
}

export function TechStackPanel() {
  const { techStack } = PORTFOLIO_DATA

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Tech Stack
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {Object.values(techStack).map((category) => (
        <motion.div key={category.label} variants={item} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.2em] text-foreground">
              {category.label}
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-2.5">
            {category.items.map((tech) => (
              <div key={tech.name} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {tech.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground/60 font-mono">
                    {tech.level}%
                  </span>
                </div>
                <div className="h-px w-full bg-border overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-foreground/40"
                    initial={{ width: 0 }}
                    animate={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
