export const SITE_CONFIG = {
  name: "Your Name",
  title: "Creative Developer & Designer", 
  description: "Crafting digital experiences with modern technologies",
  url: "https://yourname.dev",
  keywords: ["React", "TypeScript", "Web Development", "UI/UX"],
  author: {
    name: "Your Name",
    email: "your.email@example.com",
    twitter: "@yourhandle",
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername"
  }
}

export const NAVIGATION_ITEMS = [
  { name: "Home", href: "#home", id: "home" },
  { name: "About", href: "#about", id: "about" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Contact", href: "#contact", id: "contact" }
] as const

export const ANIMATION_DURATION = {
  fast: 0.3,
  medium: 0.6,
  slow: 1.0
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const




// What this does:
// Centralizes all your personal information and site metadata
// Makes it easy to update your details in one place
// Provides consistent navigation structure
// Defines animation and responsive breakpoints