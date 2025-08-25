// Layout wrapper used across pages
import React from 'react'
import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      {/* Footer could be added here */}
    </div>
  )
}
