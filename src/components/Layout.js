// Legacy Layout wrapper - consider migrating to new AppLayout
import React from 'react'
import Header from './Header'
import { AppFooter } from './layout/AppFooter'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <AppFooter />
    </div>
  )
}
