import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { ThemeProvider } from '../../../hooks'
import SmoothScroll from '../../../components/common/SmoothScroll/SmoothScroll'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] transition-colors">
          <Header />
          {/* Remove padding-top, let sections handle their own spacing */}
          <main className="w-full">
            {children}
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </ThemeProvider>
  )
}

export default Layout
