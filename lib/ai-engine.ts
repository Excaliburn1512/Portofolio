export type PanelType = "projects" | "techstack" | "experience" | "about" | "contact" | null
import { v4 as uuidv4 } from 'uuid';
export interface ChatMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  panel?: PanelType
  timestamp: Date
}

interface AIResponse {
  content: string
  panel: PanelType
}

const RESPONSES: Record<string, AIResponse> = {
  projects: {
    content:
      "Rendering project modules. Here are the key systems I've architected and deployed. Each one pushed boundaries in its own way.",
    panel: "projects",
  },
  techstack: {
    content:
      "Loading tech stack visualization. These are the tools and technologies I work with daily, organized by domain.",
    panel: "techstack",
  },
  experience: {
    content:
      "Compiling experience timeline. Here's a chronological record of my professional journey and key milestones.",
    panel: "experience",
  },
  about: {
    content:
      "I'm a full-stack developer who thrives at the intersection of design and engineering. I build performant, accessible web applications with modern technologies. I believe in clean code, thoughtful architecture, and pixel-perfect execution. Currently open to collaborations on ambitious projects.",
    panel: "about",
  },
  contact: {
    content:
      "Opening communication channels. You can reach me through the following interfaces.",
    panel: "contact",
  },
}

const KEYWORDS: Record<string, string[]> = {
  projects: ["project", "projects", "work", "portfolio", "built", "build", "show me", "show projects", "apps", "websites"],
  techstack: ["tech", "technology", "technologies", "stack", "tools", "languages", "framework", "tech stack", "open tech"],
  experience: ["experience", "career", "job", "jobs", "history", "timeline", "worked", "employment", "resume", "cv", "view experience"],
  about: ["about", "who", "yourself", "introduce", "hello", "hi", "hey", "tell me about", "what do you do"],
  contact: ["contact", "email", "reach", "hire", "connect", "message", "social", "github", "linkedin"],
}

function findIntent(input: string): string | null {
  const lower = input.toLowerCase().trim()
  
  // Check for exact commands first
  const commands: Record<string, string> = {
    "show projects": "projects",
    "open tech stack": "techstack",
    "view experience": "experience",
    "show about": "about",
    "open contact": "contact",
  }
  
  for (const [cmd, intent] of Object.entries(commands)) {
    if (lower === cmd || lower === cmd.replace(" ", "_")) return intent
  }

  // Score-based matching
  let bestMatch: string | null = null
  let bestScore = 0

  for (const [intent, keywords] of Object.entries(KEYWORDS)) {
    let score = 0
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        score += keyword.length
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = intent
    }
  }

  return bestScore > 0 ? bestMatch : null
}

const FALLBACK_RESPONSES: AIResponse[] = [
  {
    content:
      "I understand queries about my projects, tech stack, experience, and contact info. Try asking about one of those, or use a command like SHOW PROJECTS.",
    panel: null,
  },
  {
    content:
      "I'm optimized for portfolio-related queries. Ask me about my projects, the technologies I use, my career timeline, or how to reach me.",
    panel: null,
  },
  {
    content:
      "That's outside my current parameters. I can tell you about my projects, tech stack, professional experience, or open communication channels.",
    panel: null,
  },
]

let fallbackIndex = 0

export function generateResponse(input: string): AIResponse {
  const intent = findIntent(input)

  if (intent && RESPONSES[intent]) {
    return RESPONSES[intent]
  }

  const response = FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length]
  fallbackIndex++
  return response
}

export function createMessage(
  role: "user" | "assistant" | "system",
  content: string,
  panel?: PanelType
): ChatMessage {
  return {
    id: uuidv4(), 
    role,
    content,
    panel,
    timestamp: new Date(),
  }
}

export const INITIAL_MESSAGES: ChatMessage[] = [
  createMessage(
    "system",
    "SYSTEM INITIALIZED // AI PORTFOLIO v2.0"
  ),
  createMessage(
    "assistant",
    "Welcome. I'm the digital representation of this developer. Ask me anything about their work, or use commands like SHOW PROJECTS, OPEN TECH STACK, or VIEW EXPERIENCE."
  ),
]

export const SUGGESTED_QUERIES = [
  "Show me your projects",
  "What technologies do you use?",
  "Tell me about your experience",
  "Who are you?",
  "How can I contact you?",
]
