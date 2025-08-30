import React from 'react'
import { Trophy } from 'lucide-react'

export default function LoadingState({ message = "Memuat data..." }) {
  return (
    <div className="p-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export function EmptyState({ 
  icon: Icon = Trophy, 
  title = "Belum Ada Data", 
  message = "Data akan muncul setelah ada aktivitas." 
}) {
  return (
    <div className="p-12 text-center">
      <Icon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-600 mb-2">{title}</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  )
}
