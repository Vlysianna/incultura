import React from 'react'
import { Trophy, Star, Sparkles } from 'lucide-react'

export default function FloatingElements() {
  return (
    <>
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Trophy className="w-8 h-8 text-yellow-500" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Star className="w-6 h-6 text-indigo-400" />
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-pulse">
        <Sparkles className="w-5 h-5 text-[#a92d23]" />
      </div>
    </>
  )
}
