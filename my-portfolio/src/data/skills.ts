import type { Skill } from '../types'

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'Frontend', icon: '⚛️', color: '#61DAFB', experience: '3 years' },
  { name: 'TypeScript', level: 90, category: 'Frontend', icon: '🔷', color: '#3178C6', experience: '2.5 years' },
  { name: 'Next.js', level: 85, category: 'Frontend', icon: '▲', color: '#000000', experience: '2 years' },
  { name: 'Vue.js', level: 80, category: 'Frontend', icon: '💚', color: '#4FC08D', experience: '1.5 years' },
  { name: 'Tailwind CSS', level: 95, category: 'Frontend', icon: '💨', color: '#06B6D4', experience: '2 years' },
  { name: 'GSAP', level: 85, category: 'Frontend', icon: '✨', color: '#88CE02', experience: '1 year' },

  // Backend
  { name: 'Node.js', level: 88, category: 'Backend', icon: '🟢', color: '#339933', experience: '2.5 years' },
  { name: 'Express.js', level: 85, category: 'Backend', icon: '⚡', color: '#000000', experience: '2 years' },
  { name: 'MongoDB', level: 80, category: 'Backend', icon: '🍃', color: '#47A248', experience: '2 years' },
  { name: 'PostgreSQL', level: 75, category: 'Backend', icon: '🐘', color: '#336791', experience: '1.5 years' },
  { name: 'GraphQL', level: 70, category: 'Backend', icon: '🔗', color: '#E10098', experience: '1 year' },
  { name: 'Firebase', level: 85, category: 'Backend', icon: '🔥', color: '#FFCA28', experience: '2 years' },

  // Tools
  { name: 'Git', level: 90, category: 'Tools', icon: '📂', color: '#F05032', experience: '3 years' },
  { name: 'Docker', level: 75, category: 'Tools', icon: '🐳', color: '#2496ED', experience: '1 year' },
  { name: 'AWS', level: 70, category: 'Tools', icon: '☁️', color: '#FF9900', experience: '1 year' },
  { name: 'Vite', level: 90, category: 'Tools', icon: '⚡', color: '#646CFF', experience: '1.5 years' },
  { name: 'Webpack', level: 80, category: 'Tools', icon: '📦', color: '#8DD6F9', experience: '2 years' },

  // Design
  { name: 'Figma', level: 85, category: 'Design', icon: '🎨', color: '#F24E1E', experience: '2 years' },
  { name: 'Adobe XD', level: 75, category: 'Design', icon: '💜', color: '#FF61F6', experience: '1.5 years' },
  { name: 'UI/UX Design', level: 80, category: 'Design', icon: '✏️', color: '#FF6B6B', experience: '2.5 years' },
  { name: 'Responsive Design', level: 95, category: 'Design', icon: '📱', color: '#4ECDC4', experience: '3 years' }
]

export const skillsByCategory = skills.reduce((acc, skill) => {
  if (!acc[skill.category]) {
    acc[skill.category] = []
  }
  acc[skill.category].push(skill)
  return acc
}, {} as Record<string, Skill[]>)
