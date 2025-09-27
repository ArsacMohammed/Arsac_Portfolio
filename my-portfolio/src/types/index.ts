// export interface Project {
//   id: string
//   title: string
//   description: string
//   longDescription?: string
//   image: string
//   images?: string[]
//   technologies: string[]
//   liveUrl?: string
//   githubUrl?: string
//   category: 'Web App' | 'Mobile' | 'UI/UX' | 'Backend'
//   featured?: boolean
//   status: 'completed' | 'in-progress' | 'planned'
//   date: string
// }

export interface Project {
  number: string
  category: string
  title: string
  short: string
  description: string[]
}

export interface Skill {
  name: string
  level: number // 1-100
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design'
  icon?: string
  color?: string
  experience?: string // e.g., "2 years"
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate?: string
  description: string[]
  technologies: string[]
  current?: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject?: string
  message: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
  color?: string
}

export interface SEO {
  title: string
  description: string
  image?: string
  url?: string
}

// Animation types
export interface AnimationConfig {
  initial: object
  animate: object
  exit?: object
  transition?: object
}

// Theme types
export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextType {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  resolvedTheme: 'light' | 'dark'
}



// What this does:
// Provides type safety for all your data structures
// Makes your code more maintainable and catches errors early
// Defines the shape of projects, skills, experience, and forms
// Includes animation and theme types for consistency