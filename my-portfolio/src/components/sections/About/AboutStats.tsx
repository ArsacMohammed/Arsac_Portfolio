import React from 'react'

interface Stat {
  value: string
  label: string
}

interface AboutStatsProps {
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  { value: '10+', label: 'Industry Projects Completed' },
  { value: '2+', label: 'Years Experience' },
  { value: '3+', label: 'Clients Served' },
  { value: '15+', label: 'Technologies Mastered' }
]

export const AboutStats: React.FC<AboutStatsProps> = ({ stats = defaultStats }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-token-8 mb-4 sm:mb-6 md:mb-token-8 w-full max-w-3xl mx-auto">
        {stats.slice(0, 2).map((stat, index) => (
          <div key={index} className="stat-button h-24 flex items-center justify-center">
            <div className="stat-circle"></div>
            <div className="stat-content text-center">
              <h3 className="text-2xl sm:text-3xl md:text-token-4xl font-token-bold text-[#0f5132] mb-1 md:mb-token-1">{stat.value}</h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-token-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-token-8 w-full max-w-3xl mx-auto">
        {stats.slice(2, 4).map((stat, index) => (
          <div key={index + 2} className="stat-button h-24 flex items-center justify-center">
            <div className="stat-circle"></div>
            <div className="stat-content text-center">
              <h3 className="text-2xl sm:text-3xl md:text-token-4xl font-token-bold text-[#0f5132] mb-1 md:mb-token-1">{stat.value}</h3>
              <p className="text-gray-500 text-xs sm:text-sm md:text-token-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}