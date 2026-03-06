"use client"

import { AnimatePresence, motion } from "framer-motion"
import { X, Layout } from "lucide-react"
import type { PanelType } from "@/lib/ai-engine"
import { ProjectsPanel } from "./panels/projects-panel"
import { TechStackPanel } from "./panels/techstack-panel"
import { ExperiencePanel } from "./panels/experience-panel"
import { AboutPanel } from "./panels/about-panel"
import { ContactPanel } from "./panels/contact-panel"

interface ContentPanelProps {
  activePanel: PanelType
  onClose: () => void
}

const PANEL_TITLES: Record<string, string> = {
  projects: "Project Modules",
  techstack: "Tech Stack",
  experience: "Timeline",
  about: "About",
  contact: "Channels",
}

function PanelContent({ panel }: { panel: PanelType }) {
  switch (panel) {
    case "projects":
      return <ProjectsPanel />
    case "techstack":
      return <TechStackPanel />
    case "experience":
      return <ExperiencePanel />
    case "about":
      return <AboutPanel />
    case "contact":
      return <ContactPanel />
    default:
      return null
  }
}

export function ContentPanel({ activePanel, onClose }: ContentPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {activePanel && (
        <motion.div
          key={activePanel}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex h-full flex-col border-l border-border bg-background"
        >
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <Layout className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {PANEL_TITLES[activePanel] ?? activePanel}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            <PanelContent panel={activePanel} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
