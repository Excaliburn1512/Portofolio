"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { PanelType } from "@/lib/ai-engine"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatInterface } from "@/components/chat-interface"
import { ContentPanel } from "@/components/content-panel"
import { ScanlineOverlay, GridBackground } from "@/components/ui-effects"

export default function PortfolioPage() {
  const [activePanel, setActivePanel] = useState<PanelType>(null)

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground relative">
      {/* Background effects */}
      <GridBackground />
      <ScanlineOverlay />

      {/* Main content */}
      <div className="relative z-10 flex h-full flex-col">
        <Header />

        <main className="flex flex-1 overflow-hidden">
          {/* Chat side */}
          <motion.div
            className="flex flex-col border-r border-border"
            animate={{
              width: activePanel ? "50%" : "100%",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Centered intro when no panel is active */}
            <AnimatePresence>
              {!activePanel && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden lg:flex items-center justify-center border-b border-border py-8"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <div className="h-16 w-16 border border-border rounded-sm flex items-center justify-center mb-2">
                      <span className="text-2xl font-light text-foreground">
                        MIM
                      </span>
                    </div>
                    <h1 className="text-lg font-medium text-foreground tracking-tight text-balance">
                      Muhamad Igviloja Mahendra
                    </h1>
                    <p className="text-xs text-muted-foreground max-w-xs leading-relaxed text-pretty">
                      Full-Stack Developer. Interact with the AI assistant below to explore
                      my projects, technologies, and experience.
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      {["Flutter", "Java", "Python", "Deep Learning","Machine Learning","Laravel"].map((t) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex-1 overflow-hidden">
              <ChatInterface
                onPanelChange={setActivePanel}
                activePanel={activePanel}
              />
            </div>
          </motion.div>

          {/* Content panel side */}
          <AnimatePresence mode="wait">
            {activePanel && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "50%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:block overflow-hidden"
              >
                <ContentPanel
                  activePanel={activePanel}
                  onClose={() => setActivePanel(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile panel overlay */}
          <AnimatePresence>
            {activePanel && (
              <motion.div
                initial={{ opacity: 0, y: "100%" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "100%" }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-40 md:hidden bg-background"
              >
                <ContentPanel
                  activePanel={activePanel}
                  onClose={() => setActivePanel(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </div>
  )
}
