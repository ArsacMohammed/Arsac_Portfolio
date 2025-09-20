import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Modern e-commerce solution with React, Node.js, and Stripe integration',
    longDescription: 'A full-stack e-commerce platform featuring user authentication, product catalog, shopping cart, and secure payment processing.',
    image: '/api/placeholder/600/400',
    images: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce',
    category: 'Web App',
    featured: true,
    status: 'completed',
    date: '2024-12-01'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'Collaborative task management with real-time updates and team features',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'Firebase', 'Material-UI', 'PWA'],
    liveUrl: 'https://tasks.example.com',
    githubUrl: 'https://github.com/yourusername/task-app',
    category: 'Web App',
    featured: true,
    status: 'completed',
    date: '2024-10-15'
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with modern animations and dark mode',
    image: '/api/placeholder/600/400',
    technologies: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://portfolio.example.com',
    githubUrl: 'https://github.com/yourusername/portfolio',
    category: 'UI/UX',
    featured: false,
    status: 'completed',
    date: '2024-09-20'
  },
  {
    id: '4',
    title: 'Mobile Weather App',
    description: 'Cross-platform weather app with location-based forecasts',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Expo', 'OpenWeather API'],
    githubUrl: 'https://github.com/yourusername/weather-app',
    category: 'Mobile',
    featured: false,
    status: 'completed',
    date: '2024-08-10'
  },
  {
    id: '5',
    title: 'Analytics Dashboard',
    description: 'Real-time analytics dashboard with interactive charts and data visualization',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'D3.js', 'Node.js', 'PostgreSQL'],
    liveUrl: 'https://analytics.example.com',
    category: 'Web App',
    featured: false,
    status: 'in-progress',
    date: '2025-01-15'
  },
  {
    id: '6',
    title: 'API Gateway Service',
    description: 'Microservices API gateway with authentication and rate limiting',
    image: '/api/placeholder/600/400',
    technologies: ['Express.js', 'Redis', 'Docker', 'AWS'],
    githubUrl: 'https://github.com/yourusername/api-gateway',
    category: 'Backend',
    featured: false,
    status: 'completed',
    date: '2024-07-05'
  }
]

export const featuredProjects = projects.filter(project => project.featured)
export const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))]
