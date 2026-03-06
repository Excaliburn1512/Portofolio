"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Terminal, ChevronRight } from "lucide-react"
import type { ChatMessage, PanelType } from "@/lib/ai-engine"
import { generateResponse, createMessage, INITIAL_MESSAGES, SUGGESTED_QUERIES } from "@/lib/ai-engine"
import { TypingText } from "./ui-effects"

interface ChatInterfaceProps {
  onPanelChange: (panel: PanelType) => void
  activePanel: PanelType
}

export function ChatInterface({ onPanelChange, activePanel }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const handleSubmit = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault()
      const trimmed = input.trim()
      if (!trimmed || isTyping) return

      const userMsg = createMessage("user", trimmed)
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setIsTyping(true)

      // Simulate AI thinking
      setTimeout(() => {
        const response = generateResponse(trimmed)
        const assistantMsg = createMessage("assistant", response.content, response.panel)
        setMessages((prev) => [...prev, assistantMsg])
        setIsTyping(false)
        if (response.panel) {
          onPanelChange(response.panel)
        }
      }, 600 + Math.random() * 800)
    },
    [input, isTyping, onPanelChange]
  )

  const handleSuggestion = useCallback(
    (query: string) => {
      if (isTyping) return
      setInput(query)
      // Auto-submit
      const userMsg = createMessage("user", query)
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)

      setTimeout(() => {
        const response = generateResponse(query)
        const assistantMsg = createMessage("assistant", response.content, response.panel)
        setMessages((prev) => [...prev, assistantMsg])
        setIsTyping(false)
        setInput("")
        if (response.panel) {
          onPanelChange(response.panel)
        }
      }, 600 + Math.random() * 800)
    },
    [isTyping, onPanelChange]
  )

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <Terminal className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          AI Interface
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground animate-pulse-glow" />
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Active
          </span>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
      >
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col gap-1 ${
                  msg.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {msg.role === "system" ? (
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    <span className="h-px w-4 bg-border" />
                    {msg.content}
                    <span className="h-px w-4 bg-border" />
                  </div>
                ) : (
                  <>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {msg.role === "user" ? "> You" : "< System"}
                    </span>
                    <div
                      className={`max-w-[90%] rounded-sm px-3 py-2 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-foreground/5 text-foreground border border-border"
                          : "bg-secondary text-secondary-foreground border border-border"
                      }`}
                    >
                      {msg.role === "assistant" ? (
                        <TypingText text={msg.content} speed={15} />
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.panel && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => onPanelChange(msg.panel!)}
                        className={`mt-1 flex items-center gap-1.5 border px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] transition-colors rounded-sm ${
                          activePanel === msg.panel
                            ? "border-foreground/30 bg-foreground/5 text-foreground"
                            : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                        }`}
                      >
                        <ChevronRight className="h-3 w-3" />
                        View {msg.panel}
                      </motion.button>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-1 flex-col"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {"< System"}
              </span>
              <div className="bg-secondary border border-border rounded-sm px-3 py-2">
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-pulse [animation-delay:300ms]" />
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Suggestions - only show when few messages */}
        {messages.length <= 2 && !isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6 flex flex-col gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Suggested queries
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSuggestion(q)}
                  className="border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground rounded-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-border px-4 py-3"
      >
        <span className="text-muted-foreground text-sm">{">"}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          disabled={isTyping}
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none disabled:opacity-50"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
