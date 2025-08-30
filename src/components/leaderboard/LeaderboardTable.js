import React from 'react'
import { motion } from 'framer-motion'
import { LoadingState, EmptyState } from '../common/LoadingStates'
import LeaderboardPodium from './LeaderboardPodium'
import LeaderboardList from './LeaderboardList'

export default function LeaderboardTable({ 
  users = [], 
  loading = false, 
  currentUserId = null 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
    >
      {loading ? (
        <LoadingState message="Memuat papan peringkat..." />
      ) : users.length === 0 ? (
        <EmptyState 
          title="Belum Ada Data"
          message="Papan peringkat akan muncul setelah ada aktivitas pengguna."
        />
      ) : (
        <div className="divide-y divide-gray-200">
          {/* Top 3 Podium */}
          <LeaderboardPodium users={users} />

          {/* Rest of the leaderboard */}
          {users.length > 3 && (
            <LeaderboardList 
              users={users.slice(3)} 
              currentUserId={currentUserId}
              startRank={4}
            />
          )}
        </div>
      )}
    </motion.div>
  )
}
