import type { Project } from "../types"
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
  { name: "Projects", href: "#Projects", id: "Projects" },
  { name: "About", href: "#about", id: "about" },
  { name: "Skills", href: "#Skills", id: "Skills" },
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


export const projectData: Project[] = [{ number: '#01', category: 'WEB DESIGN', title: 'Database Modernization Acceleration Platform (DMAP)', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Architected and developed a comprehensive platform to accelerate database modernization processes, reducing migration timelines by 60% through automated schema conversion and data validation frameworks.', 'Implemented intelligent mapping algorithms that automatically identify and resolve compatibility issues between legacy database systems and modern cloud-native solutions, minimizing manual intervention requirements.', 'Built real-time monitoring and analytics dashboards that provide stakeholders with complete visibility into migration progress, performance metrics, and potential bottlenecks throughout the entire process.', 'Designed modular microservices architecture enabling seamless integration with existing enterprise tools, supporting multiple database engines including Oracle, MySQL, PostgreSQL, and MongoDB simultaneously.', 'Established automated testing and rollback mechanisms ensuring zero-downtime migrations with comprehensive data integrity validation, achieving 99.9% success rate across 150+ enterprise deployments.'] }, { number: '#02', category: 'WEB DESIGN / WEB DEV', title: 'Oracle-to-Oracle Multi-Cloud Migration Suite', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Engineered a sophisticated migration suite facilitating seamless Oracle database transitions across AWS, Azure, and Google Cloud platforms while maintaining complete data consistency and minimizing operational disruption.', 'Developed advanced replication strategies using Oracle GoldenGate and custom ETL pipelines, enabling near-zero downtime migrations for mission-critical enterprise applications handling millions of daily transactions.', 'Implemented comprehensive security frameworks ensuring end-to-end encryption during data transit and at rest, meeting stringent compliance requirements including SOX, HIPAA, and GDPR regulations.', 'Created intelligent workload distribution algorithms that optimize resource allocation across multiple cloud environments, reducing infrastructure costs by 35% while improving overall system performance and reliability.', 'Built automated disaster recovery and backup solutions with cross-cloud redundancy, providing RPO of less than 5 minutes and RTO under 30 minutes for critical business operations.'] }, { number: '#03', category: 'WEB DESIGN', title: 'Microservices Migration to Azure Kubernetes Service.', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Led the decomposition of monolithic applications into scalable microservices architecture, migrating over 25 services to Azure Kubernetes Service with improved fault tolerance and horizontal scaling capabilities.', 'Implemented comprehensive CI/CD pipelines using Azure DevOps and GitLab, enabling automated testing, security scanning, and deployment processes that reduced release cycles from weeks to hours.', 'Designed service mesh architecture using Istio for advanced traffic management, security policies, and observability, providing fine-grained control over inter-service communication and monitoring.', 'Established container orchestration strategies with auto-scaling policies, resource optimization, and health monitoring that improved application availability to 99.95% while reducing infrastructure costs by 40%.', 'Created comprehensive logging and monitoring solutions using Azure Monitor, Prometheus, and Grafana, providing real-time insights into application performance, resource utilization, and business metrics.'] }, { number: '#04', category: 'WEB DEV', title: 'Terraform Multi-Cloud Provisioning', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Developed enterprise-grade Infrastructure as Code (IaC) solutions using Terraform for consistent resource provisioning across AWS, Azure, and Google Cloud platforms, standardizing deployment processes organization-wide.', 'Architected modular Terraform configurations with reusable components, enabling rapid environment provisioning while maintaining security best practices and compliance standards across multiple cloud providers.', 'Implemented advanced state management strategies with remote backends, workspace isolation, and automated backup mechanisms ensuring infrastructure consistency and preventing configuration drift across environments.', 'Created comprehensive governance frameworks including policy-as-code using Sentinel and Open Policy Agent, enforcing security, cost, and compliance requirements automatically during infrastructure deployments.', 'Established GitOps workflows with automated validation, testing, and approval processes that reduced infrastructure provisioning time from days to minutes while maintaining audit trails and change management.'] }, { number: '#05', category: 'WEB DESIGN', title: 'Landing Zone Deployment with Terraform (Client Project)', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Designed and implemented enterprise landing zones for Fortune 500 client using Terraform, establishing secure, scalable, and compliant cloud foundations across multiple AWS accounts and regions.', 'Architected network topology with VPC peering, transit gateways, and hybrid connectivity solutions, enabling seamless integration between on-premises infrastructure and cloud environments with optimized performance.', 'Implemented comprehensive security controls including IAM policies, security groups, NACLs, and encryption standards, achieving SOC 2 Type II compliance and passing rigorous third-party security audits.', 'Established centralized logging, monitoring, and alerting solutions using CloudWatch, CloudTrail, and custom dashboards, providing complete visibility into security events, performance metrics, and cost optimization opportunities.', 'Created automated backup and disaster recovery strategies with cross-region replication, achieving RPO of 1 hour and RTO of 4 hours for critical business systems while reducing operational overhead by 50%.'] }, { number: '#06', category: 'WEB DESIGN', title: 'Wipro Aviation – Oracle to PostgreSQL Migration', short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database', description: ['Orchestrated large-scale database migration from Oracle to PostgreSQL for aviation industry client, handling over 2TB of critical flight operations data while ensuring zero data loss and minimal downtime.', 'Developed custom data transformation tools and migration scripts that automated schema conversion, data type mapping, and stored procedure translation, reducing manual effort by 80% and eliminating human errors.', 'Implemented comprehensive testing strategies including data validation, performance benchmarking, and application compatibility testing, ensuring seamless transition without impacting critical aviation safety systems.', 'Established high-availability PostgreSQL clusters with streaming replication, automatic failover, and connection pooling, improving database performance by 45% while reducing licensing costs by $2M annually.', 'Created detailed migration documentation, training programs, and support procedures for client teams, ensuring smooth knowledge transfer and long-term system maintainability post-migration completion.'] }]
