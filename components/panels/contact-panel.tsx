"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Instagram } from "lucide-react"
import { PORTFOLIO_DATA } from "@/lib/portfolio-data"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
}

const contactItems = [
  { icon: Mail, label: "Email", value: PORTFOLIO_DATA.contact.email, href: `mailto:${PORTFOLIO_DATA.contact.email}` },
  { icon: Github, label: "GitHub", value: PORTFOLIO_DATA.contact.github, href: `https://${PORTFOLIO_DATA.contact.github}` },
  { icon: Linkedin, label: "LinkedIn", value: PORTFOLIO_DATA.contact.linkedin, href: `https://${PORTFOLIO_DATA.contact.linkedin}-877120399` },
  { icon: Instagram, label: "Instagram", value: PORTFOLIO_DATA.contact.instagram, href: `https://${PORTFOLIO_DATA.contact.instagram}` },
]

export function ContactPanel() {
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
          Contact
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {contactItems.map((c) => (
        <motion.a
          key={c.label}
          variants={item}
          href={c.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 border border-border bg-card rounded-sm p-4 transition-colors hover:border-foreground/20"
        >
          <c.icon className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {c.label}
            </span>
            <span className="text-sm text-foreground">
              {c.value}
            </span>
          </div>
        </motion.a>
      ))}
    </motion.div>
  )
}
