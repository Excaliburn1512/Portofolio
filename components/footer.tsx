"use client"

import { motion } from "framer-motion"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="flex items-center justify-between border-t border-border px-6 py-2"
    >
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
        AI Portfolio v2.0
      </span>
      <span className="text-[10px] text-muted-foreground/50">
        {year}
      </span>
      <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">
        Next.js + Framer Motion
      </span>
    </motion.footer>
  )
}
