"use client"

import { motion } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

export function ProjectsPanel() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="h-px flex-1 bg-border" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Projects
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {PORTFOLIO_DATA.projects.map((project) => (
        <motion.div
          key={project.id}
          variants={item}
          className="group border border-border bg-card rounded-sm p-4 transition-colors hover:border-foreground/20"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground font-mono">
                {project.id.toUpperCase()}
              </span>
              <span className="h-1 w-1 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground">
                {project.year}
              </span>
            </div>
            <span
              className={`text-[10px] uppercase tracking-widest px-2 py-0.5 border rounded-sm ${
                project.status === "ACTIVE"
                  ? "border-foreground/20 text-foreground"
                  : project.status === "ACQUIRED"
                  ? "border-foreground/10 text-muted-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {project.status}
            </span>
          </div>

          <h3 className="text-foreground text-base font-medium mb-1">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            {project.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[10px] border border-border px-2 py-0.5 text-muted-foreground rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label={`View ${project.title}`}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>
      ))}

      <motion.div variants={item} className="flex justify-center pt-2">
        <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">
          View All Projects <ArrowRight className="h-3 w-3" />
        </button>
      </motion.div>
    </motion.div>
  )
}
