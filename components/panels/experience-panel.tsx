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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ExperiencePanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-0 p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Experience
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {PORTFOLIO_DATA.experience.map((exp, i) => (
        <motion.div
          key={exp.id}
          variants={item}
          className="relative flex gap-4"
        >
          {/* Timeline line */}
          <div className="flex flex-col items-center">
            <div className="h-2.5 w-2.5 rounded-full border border-foreground/30 bg-background" />
            {i < PORTFOLIO_DATA.experience.length - 1 && (
              <div className="w-px flex-1 bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                {exp.period}
              </span>
            </div>
            <h3 className="text-foreground text-sm font-medium">
              {exp.role}
            </h3>
            <p className="text-muted-foreground text-xs mb-2">
              {exp.company}
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              {exp.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {exp.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] border border-border px-2 py-0.5 text-muted-foreground rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
