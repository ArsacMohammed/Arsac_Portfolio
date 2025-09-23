export const SITE_CONFIG = {
  name: "Mohammed-Arsac",
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
  { name: "Projects", href: "#about", id: "about" },
  { name: "About", href: "#projects", id: "projects" },
  { name: "Insights", href: "#skills", id: "skills" },
  { name: "New Arrivals", href: "#contact", id: "contact" }
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


export const ABOUT_SECTION = {
  title: "Cloud, AI & Full Stack Software Developer",
  shortDescription: "Crafting modern digital solutions leveraging cloud technologies, AI, and full stack development.",
  longDescription: `
    I specialize in designing and building scalable, efficient, and innovative software solutions.
    With hands-on experience in cloud platforms, AI integration, and full stack development,
    I help businesses transform ideas into high-quality applications. My work spans from conceptualization 
    to deployment, ensuring robust, maintainable, and user-friendly solutions.
  `,
  stats: {
    projectsCompleted: 25,
    technologiesUsed: ["React", "Node.js", "TypeScript", "Python", "AWS", "Docker", "AI/ML"],
    clientsServed: 10, // Can be companies or teams
    yearsExperience: 4
  },
  highlights: [
    "Cloud architecture design and deployment",
    "AI/ML-based intelligent solutions",
    "End-to-end full stack application development",
    "Scalable, maintainable, and robust software solutions",
    "Strong focus on UX/UI and modern technologies"
  ]
} as const;




// What this does:
// Centralizes all your personal information and site metadata
// Makes it easy to update your details in one place
// Provides consistent navigation structure
// Defines animation and responsive breakpoints