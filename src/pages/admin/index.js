import { FooterSection } from '../../components/sections';

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Users, 
  FileText, 
  Brain, 
  ShoppingBag, 
  TrendingUp, 
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  Shield,
  Sparkles,
  Crown,
  Coins,
  CoinsIcon
} from 'lucide-react'

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState([])

  useEffect(() => {
    if (session?.user) {
      // Fetch admin dashboard stats
      Promise.all([
        fetch('/api/admin/stats').then(r => r.ok ? r.json() : null),
        fetch('/api/admin/activities').then(r => r.ok ? r.json() : [])
      ]).then(([statsData, activitiesData]) => {
        setStats(statsData)
        setRecentActivities(activitiesData || [])
        setLoading(false)
      }).catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [session])

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
        
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse-slow"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                    <Image src="/InculturaTeks.svg" alt="logo" width={100} height={20} />
                  </h1>
                  <p className="text-xs text-[#a92d23] font-medium">Admin Dashboard</p>
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Access Denied Content */}
        <main className="pt-28 pb-16 px-6 max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Shield className="w-24 h-24 text-[#f3d099]/60 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Akses Admin Diperlukan</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Halaman ini hanya dapat diakses oleh administrator sistem. Silakan login dengan akun admin.
            </p>
            <Link 
              href="/login"
              className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              Login sebagai Admin
            </Link>
          </motion.div>
        </main>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard admin...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white/95 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-32 left-10 animate-float">
        <Crown className="w-8 h-8 text-[#f3d099]" />
      </div>
      <div className="absolute top-1/3 right-20 animate-bounce">
        <Sparkles className="w-6 h-6 text-[#a92d23]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Image src="/InculturaLogo.svg" alt="logo" width={24} height={24} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-[#f3d099] to-[#a92d23] rounded-full animate-pulse-slow"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-[#a92d23] to-[#f3d099] bg-clip-text text-transparent">
                  <Image src="/InculturaTeks.svg" alt="logo" width={100} height={20} />
                </h1>
                <p className="text-xs text-[#a92d23] font-medium">Admin Dashboard</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/admin", label: "Dashboard", active: true },
                { href: "/admin/users", label: "Users" },
                { href: "/admin/articles", label: "Articles" },
                { href: "/admin/quiz", label: "Quiz" },
                { href: "/admin/merchandise", label: "Merchandise" },
              ].map((item) => (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`text-sm font-medium transition-colors relative group ${
                    item.active 
                      ? 'text-[#a92d23] font-semibold' 
                      : 'text-[#a92d23] hover:text-[#7a1f1a]'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[#a92d23] to-[#f3d099] transition-all duration-300 ${
                    item.active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#a92d23] font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin: {session.user?.name || session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="ml-4 px-4 py-2 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white rounded-lg font-medium hover:scale-105 transition-transform shadow"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28 pb-16 px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard Admin</h1>
              <p className="text-gray-600">Kelola platform Incultura dengan mudah</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Users className="w-5 h-5 text-[#a92d23]" />
                <span className="text-2xl font-bold text-[#a92d23]">{stats?.totalUsers || 0}</span>
              </div>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-[#f3d099]" />
                <span className="text-2xl font-bold text-[#f3d099]">{stats?.totalArticles || 0}</span>
              </div>
              <p className="text-sm text-gray-500">Total Articles</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Brain className="w-5 h-5 text-[#a92d23]" />
                <span className="text-2xl font-bold text-[#a92d23]">{stats?.totalQuiz || 0}</span>
              </div>
              <p className="text-sm text-gray-500">Total Quiz</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Activity className="w-5 h-5 text-[#f3d099]" />
                <span className="text-2xl font-bold text-[#f3d099]">{stats?.totalActivities || 0}</span>
              </div>
              <p className="text-sm text-gray-500">Total Activities</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* User Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link href="/admin/users" className="block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#a92d23]/20 rounded-full group-hover:bg-[#a92d23]/30 transition-colors">
                  <Users className="w-6 h-6 text-[#a92d23]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">User Management</h3>
                  <p className="text-sm text-gray-600">Kelola pengguna</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Active Users</span>
                  <span className="font-medium text-[#a92d23]">{stats?.activeUsers || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>New This Month</span>
                  <span className="font-medium text-[#f3d099]">{stats?.newUsersThisMonth || 0}</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Article Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/admin/articles" className="block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#f3d099]/20 rounded-full group-hover:bg-[#f3d099]/30 transition-colors">
                  <FileText className="w-6 h-6 text-[#a92d23]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Article Management</h3>
                  <p className="text-sm text-gray-600">Moderasi artikel</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pending Approval</span>
                  <span className="font-medium text-[#a92d23]">{stats?.pendingArticles || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published</span>
                  <span className="font-medium text-[#f3d099]">{stats?.approvedArticles || 0}</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Quiz Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/admin/quiz" className="block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#a92d23]/20 rounded-full group-hover:bg-[#a92d23]/30 transition-colors">
                  <Brain className="w-6 h-6 text-[#a92d23]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Quiz Management</h3>
                  <p className="text-sm text-gray-600">Kelola kuis</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Questions</span>
                  <span className="font-medium text-[#a92d23]">{stats?.totalQuiz || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Accuracy</span>
                  <span className="font-medium text-[#f3d099]">{stats?.avgQuizAccuracy || 0}%</span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Merchandise Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/admin/merchandise" className="block bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#f3d099]/20 rounded-full group-hover:bg-[#f3d099]/30 transition-colors">
                  <ShoppingBag className="w-6 h-6 text-[#a92d23]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Merchandise</h3>
                  <p className="text-sm text-gray-600">Kelola marketplace</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Items</span>
                  <span className="font-medium text-[#a92d23]">{stats?.totalMerchandise || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Sales</span>
                  <span className="font-medium text-[#f3d099]">{stats?.totalSales || 0}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Recent Activities */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-[#a92d23]" />
              <h2 className="text-2xl font-bold text-gray-800">Recent Activities</h2>
            </div>

            {recentActivities.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {recentActivities.slice(0, 10).map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.type.includes('quiz') ? 'bg-[#f3d099]/20' :
                      activity.type.includes('article') ? 'bg-[#a92d23]/20' :
                      'bg-[#f3d099]/20'
                    }`}>
                      {activity.type.includes('quiz') && <Brain className="w-4 h-4 text-[#a92d23]" />}
                      {activity.type.includes('article') && <FileText className="w-4 h-4 text-[#a92d23]" />}
                      {activity.type.includes('redeem') && <ShoppingBag className="w-4 h-4 text-[#a92d23]" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {activity.user?.name || activity.user?.email || 'User'}
                        {activity.type === 'article_view' && activity.articleTitle ? (
                          <>
                            {' '}melihat artikel <span className="font-semibold text-[#a92d23]">{activity.articleTitle}</span>
                          </>
                        ) : (
                          <> - {activity.type}</>
                        )}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.createdAt).toLocaleString('id-ID')}
                      </p>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      activity.coins > 0 ? 'bg-[#f3d099]/20 text-[#a92d23]' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <CoinsIcon className="w-3 h-3" />
                      {activity.coins > 0 ? `+${activity.coins}` : activity.coins}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No recent activities</p>
              </div>
            )}
          </motion.div>

          {/* System Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-[#a92d23]" />
              <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
            </div>

            <div className="space-y-6">
              {/* Articles Status */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Articles Status</span>
                  <span className="text-sm text-gray-500">{stats?.totalArticles || 0} total</span>
                </div>
                <div className="flex gap-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#a92d23] h-full"
                    style={{ width: `${stats?.totalArticles ? (stats.approvedArticles / stats.totalArticles) * 100 : 0}%` }}
                  ></div>
                  <div 
                    className="bg-[#f3d099] h-full"
                    style={{ width: `${stats?.totalArticles ? (stats.pendingArticles / stats.totalArticles) * 100 : 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Approved: {stats?.approvedArticles || 0}</span>
                  <span>Pending: {stats?.pendingArticles || 0}</span>
                </div>
              </div>

              {/* User Engagement */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">User Engagement</span>
                  <span className="text-sm text-gray-500">This month</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#a92d23]/10 rounded-lg">
                    <div className="text-lg font-bold text-[#a92d23]">{stats?.activeUsers || 0}</div>
                    <div className="text-xs text-gray-600">Active Users</div>
                  </div>
                  <div className="text-center p-3 bg-[#f3d099]/10 rounded-lg">
                    <div className="text-lg font-bold text-[#a92d23]">{stats?.totalActivities || 0}</div>
                    <div className="text-xs text-gray-600">Activities</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link 
                    href="/admin/articles"
                    className="flex items-center gap-2 p-2 text-xs bg-[#a92d23]/10 hover:bg-[#a92d23]/20 rounded-lg transition-colors"
                  >
                    <Clock className="w-3 h-3 text-[#a92d23]" />
                    Review Articles
                  </Link>
                  <Link 
                    href="/admin/users"
                    className="flex items-center gap-2 p-2 text-xs bg-[#f3d099]/10 hover:bg-[#f3d099]/20 rounded-lg transition-colors"
                  >
                    <Users className="w-3 h-3 text-[#a92d23]" />
                    Manage Users
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

  {/* Footer */}
  <FooterSection />
    </div>
  )
}
