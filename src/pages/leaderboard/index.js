import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Trophy, Star, Zap, TrendingUp, Users, Award, Coins } from 'lucide-react'

// Layout and common components
import Header from '../../components/Header'
import { FooterSection } from '../../components/sections'
import { 
  PageHeader, 
  StatsGrid, 
  FilterTabs, 
  CallToAction, 
  FloatingElements 
} from '../../components/common'

// Leaderboard specific components
import { LeaderboardTable } from '../../components/leaderboard'

// Custom hooks
import { useLeaderboard } from '../../hooks/useLeaderboard'

export default function Leaderboard() {
  const { data: session } = useSession()
  const [filter, setFilter] = useState('all')
  
  const { 
    list, 
    loading, 
    getUserRank, 
    filterUsers, 
    getTotalStats 
  } = useLeaderboard()

  const filteredList = filterUsers(filter)
  const userRank = getUserRank(session?.user?.id)
  const stats = getTotalStats()

  // Page configuration
  const pageHeader = {
    title: 'Juara 🏆 Budaya',
    subtitle: 'Lihat siapa yang paling aktif dalam melestarikan budaya Indonesia! Kompetisi sehat untuk pembelajaran yang lebih menyenangkan.',
    badge: {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      text: 'Papan Peringkat'
    },
    userInfo: session && userRank ? {
      icon: <TrendingUp className="w-5 h-5 text-indigo-600" />,
      text: `Peringkat Anda: #${userRank}`
    } : null
  }

  const statsData = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      value: stats.totalUsers,
      label: 'Total Peserta'
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-600" />,
      value: stats.totalCoins,
      label: 'Total Koin'
    },
    {
      icon: <Star className="w-8 h-8 text-purple-600" />,
      value: stats.totalActivities,
      label: 'Total Aktivitas'
    }
  ]

  const filterTabs = [
    { id: 'all', label: 'Semua', icon: Trophy },
    { id: 'quiz', label: 'Kuis', icon: Star },
    { id: 'articles', label: 'Artikel', icon: Award },
    { id: 'marketplace', label: 'Marketplace', icon: Coins },
  ]

  const callToActionData = {
    title: 'Ingin Naik Peringkat?',
    description: 'Ikuti kuis, baca artikel, dan berpartisipasi aktif untuk mengumpulkan koin dan naik peringkat!',
    buttons: [
      { href: '/quiz', label: 'Ikuti Kuis' },
      { href: '/articles', label: 'Baca Artikel' },
      { href: '/marketplace', label: 'Kunjungi Marketplace' }
    ]
  }

  return (
    <>
      <Header />
      <FloatingElements />

      {/* Main Content */}
      <div className="pt-28 pb-16 px-6 max-w-6xl mx-auto relative z-10">
        <PageHeader {...pageHeader} />

        <StatsGrid stats={statsData} />

        <FilterTabs 
          tabs={filterTabs}
          activeFilter={filter}
          onFilterChange={setFilter}
        />

        <LeaderboardTable 
          users={filteredList}
          loading={loading}
          currentUserId={session?.user?.id}
        />

        <CallToAction {...callToActionData} />
      </div>

      <FooterSection />
    </>
  )
}
