import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation, easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDown } from 'lucide-react'


const luxeMetaColors = [
  "#EFE9E1", // light beige
  "#D9D9D9",
  "#D1C7BD",
  "#AC9C8D",
  "#72383D",
  "#322D29"
];
const luxeAccent = "#72383D";

const exposureData = [
  {
    number: '#01',
    category: 'WEB DESIGN',
    title: 'Database Modernization Acceleration Platform (DMAP)',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',

    description: [
      'Architected and developed a comprehensive platform to accelerate database modernization processes, reducing migration timelines by 60% through automated schema conversion and data validation frameworks.',
      'Implemented intelligent mapping algorithms that automatically identify and resolve compatibility issues between legacy database systems and modern cloud-native solutions, minimizing manual intervention requirements.',
      'Built real-time monitoring and analytics dashboards that provide stakeholders with complete visibility into migration progress, performance metrics, and potential bottlenecks throughout the entire process.',
      'Designed modular microservices architecture enabling seamless integration with existing enterprise tools, supporting multiple database engines including Oracle, MySQL, PostgreSQL, and MongoDB simultaneously.',
      'Established automated testing and rollback mechanisms ensuring zero-downtime migrations with comprehensive data integrity validation, achieving 99.9% success rate across 150+ enterprise deployments.'
    ]
  },
  {
    number: '#02',
    category: 'WEB DESIGN / WEB DEV',
    title: 'Oracle-to-Oracle Multi-Cloud Migration Suite',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',
    description: [
      'Engineered a sophisticated migration suite facilitating seamless Oracle database transitions across AWS, Azure, and Google Cloud platforms while maintaining complete data consistency and minimizing operational disruption.',
      'Developed advanced replication strategies using Oracle GoldenGate and custom ETL pipelines, enabling near-zero downtime migrations for mission-critical enterprise applications handling millions of daily transactions.',
      'Implemented comprehensive security frameworks ensuring end-to-end encryption during data transit and at rest, meeting stringent compliance requirements including SOX, HIPAA, and GDPR regulations.',
      'Created intelligent workload distribution algorithms that optimize resource allocation across multiple cloud environments, reducing infrastructure costs by 35% while improving overall system performance and reliability.',
      'Built automated disaster recovery and backup solutions with cross-cloud redundancy, providing RPO of less than 5 minutes and RTO under 30 minutes for critical business operations.'
    ]
  },
  {
    number: '#03',
    category: 'WEB DESIGN',
    title: 'Microservices Migration to Azure Kubernetes Service.',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',

    description: [
      'Led the decomposition of monolithic applications into scalable microservices architecture, migrating over 25 services to Azure Kubernetes Service with improved fault tolerance and horizontal scaling capabilities.',
      'Implemented comprehensive CI/CD pipelines using Azure DevOps and GitLab, enabling automated testing, security scanning, and deployment processes that reduced release cycles from weeks to hours.',
      'Designed service mesh architecture using Istio for advanced traffic management, security policies, and observability, providing fine-grained control over inter-service communication and monitoring.',
      'Established container orchestration strategies with auto-scaling policies, resource optimization, and health monitoring that improved application availability to 99.95% while reducing infrastructure costs by 40%.',
      'Created comprehensive logging and monitoring solutions using Azure Monitor, Prometheus, and Grafana, providing real-time insights into application performance, resource utilization, and business metrics.'
    ]
  },
  {
    number: '#04',
    category: 'WEB DEV',
    title: 'Terraform Multi-Cloud Provisioning',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',

    description: [
      'Developed enterprise-grade Infrastructure as Code (IaC) solutions using Terraform for consistent resource provisioning across AWS, Azure, and Google Cloud platforms, standardizing deployment processes organization-wide.',
      'Architected modular Terraform configurations with reusable components, enabling rapid environment provisioning while maintaining security best practices and compliance standards across multiple cloud providers.',
      'Implemented advanced state management strategies with remote backends, workspace isolation, and automated backup mechanisms ensuring infrastructure consistency and preventing configuration drift across environments.',
      'Created comprehensive governance frameworks including policy-as-code using Sentinel and Open Policy Agent, enforcing security, cost, and compliance requirements automatically during infrastructure deployments.',
      'Established GitOps workflows with automated validation, testing, and approval processes that reduced infrastructure provisioning time from days to minutes while maintaining audit trails and change management.'
    ]
  },
  {
    number: '#05',
    category: 'WEB DESIGN',
    title: 'Landing Zone Deployment with Terraform (Client Project)',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',

    description: [
      'Designed and implemented enterprise landing zones for Fortune 500 client using Terraform, establishing secure, scalable, and compliant cloud foundations across multiple AWS accounts and regions.',
      'Architected network topology with VPC peering, transit gateways, and hybrid connectivity solutions, enabling seamless integration between on-premises infrastructure and cloud environments with optimized performance.',
      'Implemented comprehensive security controls including IAM policies, security groups, NACLs, and encryption standards, achieving SOC 2 Type II compliance and passing rigorous third-party security audits.',
      'Established centralized logging, monitoring, and alerting solutions using CloudWatch, CloudTrail, and custom dashboards, providing complete visibility into security events, performance metrics, and cost optimization opportunities.',
      'Created automated backup and disaster recovery strategies with cross-region replication, achieving RPO of 1 hour and RTO of 4 hours for critical business systems while reducing operational overhead by 50%.'
    ]
  },
  {
    number: '#06',
    category: 'WEB DESIGN',
    title: 'Wipro Aviation – Oracle to PostgreSQL Migration',
    short: 'Engineered a sophisticated migration suite facilitating seamless Oracle database',

    description: [
      'Orchestrated large-scale database migration from Oracle to PostgreSQL for aviation industry client, handling over 2TB of critical flight operations data while ensuring zero data loss and minimal downtime.',
      'Developed custom data transformation tools and migration scripts that automated schema conversion, data type mapping, and stored procedure translation, reducing manual effort by 80% and eliminating human errors.',
      'Implemented comprehensive testing strategies including data validation, performance benchmarking, and application compatibility testing, ensuring seamless transition without impacting critical aviation safety systems.',
      'Established high-availability PostgreSQL clusters with streaming replication, automatic failover, and connection pooling, improving database performance by 45% while reducing licensing costs by $2M annually.',
      'Created detailed migration documentation, training programs, and support procedures for client teams, ensuring smooth knowledge transfer and long-term system maintainability post-migration completion.'
    ]
  }
]

const Exposure: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  // Close on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    if (openIndex !== null) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [openIndex])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: easeInOut, staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeInOut } }
  }

  return (
    <section id="exposure" className="min-h-[150vh] relative overflow-visible" ref={ref}>
      <div
        className="h-[150vh] w-screen flex relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        {/* Header */}
        <motion.div
          className="absolute top-0 left-170 right-0 z-20 px-4 pt-40 pb-16"
          initial="hidden"
          animate={controls}
          variants={itemVariants}
        >
          <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight ml-10">
            <span className="text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1.5px_black]">
              Exposure
            </span>
          </h1>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          className="w-full h-full flex items-start justify-center pt-80 pb-16 overflow-visible"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-50" ref={containerRef}>
            <div className="relative overflow-visible">
              <AnimatePresence>
                {exposureData.map((item, index) => {
                  const isOpen = openIndex === index
                  const shouldShow = openIndex === null || isOpen
                  if (!shouldShow) return null

                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative overflow-visible"
                      layout
                      initial={{ opacity: 1, scale: 1, y: 0 }}
                      animate={{
                        y: 0, // Always 0
                        opacity: 1,
                        scale: isOpen ? 1.02 : 1,
                        zIndex: isOpen ? 1000 : 10 - index
                      }}
                      exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } }}
                      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], layout: { duration: 0.6 } }}
                      style={{
                        position: openIndex === null ? 'relative' : 'absolute',
                        top: openIndex === null ? 'auto' : 0,
                        left: 0,
                        right: 0
                      }}
                    >
                      <motion.button
                        className={`
                                  w-full
                                  flex
                                  items-center
                                  rounded-2xl
                                  border
                                  border-gray-200
                                  shadow-md
                                  transition
                                  px-0
                                  py-0
                                  mb-6
                                  focus:outline-none
                                  bg-[#F9F8F7]  /* Soft neutral base for card background */
                                `}
                        style={{
                          borderColor: isOpen ? '#72383D' : '#EEE',  /* Luxe accent border when open */
                          boxShadow: isOpen ? `0 6px 32px -6px #72383D22` : undefined   /* Soft burgundy shadow when open */
                        }}
                        whileHover={{ scale: 1.01, y: -2, boxShadow: "0 12px 32px -6px #322D2920" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                      >
                        {/* Meta Box */}
                        <div
                          className="flex flex-col items-center w-40 min-w-[8rem] h-full rounded-l-2xl border-r py-10 px-4 justify-center"
                          style={{
                            background: luxeMetaColors[index % luxeMetaColors.length], /* Luxe palette for meta block */
                            borderColor: '#72383D',
                            color: ['#D9D9D9', '#EFE9E1'].includes(luxeMetaColors[index % luxeMetaColors.length]) ? '#322D29' : '#FFF' // text contrast
                          }}
                        >
                          <div className="text-3xl font-semibold mb-2">{item.number}</div>
                          {/* <div className="text-xs font-medium">{item.category}</div> */}
                        </div>

                        {/* Title & Actions */}
                        <div className="flex-1 flex flex-row items-center px-7 py-7 justify-between">
                          <div>
                            <h3 className="text-3xl font-semibold leading-tight text-[#322D29] mb-2">
                              {item.title}
                            </h3>
                            {/* {item.short && (
        <p className="text-base text-gray-500 font-normal">{item.short}</p>
      )} */}
                          </div>
                          <div className="flex gap-3 items-center">
                            <span className="px-4 py-1 border border-[#D1C7BD] rounded-full text-xs font-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
                              VIEW CASE
                            </span>
                            <span className="px-4 py-1 border border-[#D1C7BD] rounded-full text-xs font-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
                              LIVE WEBSITE
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.34, ease: 'easeInOut' }}
                              className="ml-2 text-[#72383D]"
                            >
                              <ChevronDown size={28} />
                            </motion.div>
                          </div>
                        </div>
                      </motion.button>



                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, scaleY: 0 }}
                            animate={{
                              opacity: 1,
                              height: 'auto',
                              scaleY: 1,
                              transition: {
                                height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                                opacity: { duration: 0.3, delay: 0.1 },
                                scaleY: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
                              }
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              scaleY: 0,
                              transition: {
                                opacity: { duration: 0.2 },
                                height: { duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
                                scaleY: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
                              }
                            }}
                            className="overflow-hidden origin-top"
                            style={{ transformOrigin: 'top' }}
                          >
                            <div className="px-4 pb-6 pt-2">
                              <ul className="space-y-4">
                                {item.description.map((point, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                                    className="flex items-start space-x-3 text-gray-700 leading-relaxed"
                                  >
                                    <div className="w-2 h-2 bg-gradient-to-r from-[#560F13] to-black rounded-full mt-2 flex-shrink-0" />
                                    <p className="text-base lg:text-lg">{point}</p>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Frame - positioned at the very bottom of the section */}
      <motion.div
        className="absolute bottom-0 left-0 z-20"
        initial="hidden"
        animate={controls}
        variants={itemVariants}
      >
        <div className="relative" style={{ width: 200, height: 200 }}>
          <div className="absolute bottom-0 left-0 h-27 w-165 bg-gradient-to-r from-[#560F13] via-[#560F13] to-black rounded" />
          <div className="absolute bottom-0 left-0 w-27 h-100 bg-gradient-to-t from-[#560F13] via-[#560F13] to-black rounded" />
        </div>
      </motion.div>
    </section>
  )
}

export default Exposure
