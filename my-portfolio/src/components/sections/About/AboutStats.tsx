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
    <div className="flex flex-col items-center w-full p-8">
      <style>{`
        .stat-button {
          background: #103C3C;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 15px 36px;
          border: 1px solid rgba(16, 60, 60, 0.5);
          box-shadow: 
            0 8px 32px rgba(16, 60, 60, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            inset 0 -1px 0 rgba(16, 60, 60, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
        }

        .stat-button:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(16, 60, 60, 0.95);
          box-shadow: 
            0 16px 48px rgba(16, 60, 60, 0.5),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(16, 60, 60, 0.4);
          border-color: rgba(16, 60, 60, 0.6);
        }

        .stat-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.02) 0%, 
            rgba(255, 255, 255, 0.005) 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
          border-radius: inherit;
          pointer-events: none;
        }

        .stat-button::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.015) 0%,
            rgba(255, 255, 255, 0.003) 100%
          );
          border-radius: 18px;
          pointer-events: none;
        }

        .stat-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.8) 0%,
            rgba(200, 200, 200, 0.6) 100%
          );
          box-shadow: 
            0 4px 12px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            inset 0 -1px 0 rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.4);
          position: relative;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .stat-circle::before {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.6) 0%,
            rgba(240, 240, 240, 0.3) 100%
          );
        }

        .stat-button:hover .stat-circle {
          transform: scale(1.1);
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(220, 220, 220, 0.7) 100%
          );
          box-shadow: 
            0 6px 16px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.15);
        }

        .stat-content {
          position: relative;
          z-index: 2;
          text-align: left;
          flex: 1;
        }

        .stat-button h3 {
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          margin-bottom: 4px;
        }

        .stat-button p {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #e2e8f0;
          opacity: 0.9;
          text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8 w-full max-w-3xl mx-auto">
        {stats.slice(0, 2).map((stat, index) => (
          <div key={index} className="stat-button" style={{ height: '96px' }}>
            <div className="stat-circle"></div>
            <div className="stat-content">
              <h3 className="text-2xl sm:text-3xl md:text-4xl">{stat.value}</h3>
              <p className="text-xs sm:text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-3xl mx-auto">
        {stats.slice(2, 4).map((stat, index) => (
          <div key={index + 2} className="stat-button" style={{ height: '96px' }}>
            <div className="stat-circle"></div>
            <div className="stat-content">
              <h3 className="text-2xl sm:text-3xl md:text-4xl">{stat.value}</h3>
              <p className="text-xs sm:text-sm uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutStats