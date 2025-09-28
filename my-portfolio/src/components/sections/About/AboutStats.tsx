import React from 'react'

interface Stat {
  value: string
  label: string
}

interface AboutStatsProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { value: '25+', label: 'Projects Completed' },
  { value: '4+', label: 'Years Experience' },
  { value: '10+', label: 'Clients Served' },
  { value: '7+', label: 'Technologies Mastered' }
]

export const AboutStats: React.FC<AboutStatsProps> = ({ stats = defaultStats }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-token-8 mb-token-8">
        {stats.slice(0, 2).map((stat, index) => (
          <div key={index} className="stat-button">
            <div className="stat-circle"></div>
            <div className="stat-content">
              <h3 className="text-token-4xl font-token-bold text-[#222222] mb-token-1">{stat.value}</h3>
              <p className="text-gray-500 text-token-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-token-8">
        {stats.slice(2, 4).map((stat, index) => (
          <div key={index + 2} className="stat-button">
            <div className="stat-circle"></div>
            <div className="stat-content">
              <h3 className="text-token-4xl font-token-bold text-[#222222] mb-token-1">{stat.value}</h3>
              <p className="text-gray-500 text-token-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}