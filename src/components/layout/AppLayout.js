import React from 'react'
import AppHeader from './AppHeader'
import AppFooter from './AppFooter'

export default function AppLayout({ children, showFooter = true }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-yellow-200/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      <AppHeader />
      
      <main className="relative z-10">
        {children}
      </main>
      
      {showFooter && <AppFooter />}
    </div>
  )
}
