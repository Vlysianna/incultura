import { FooterSection } from '../../components/sections';

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Calendar,
  Shield,
  ArrowLeft,
  Eye,
  Edit,
  Trash2
} from 'lucide-react'

export default function AdminArticles(){
  const { data: session } = useSession()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('PENDING')
  

  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setList(data)
        } else {
          console.error('API /api/articles did not return array:', data)
          setList([])
        }
      })
      .catch(err => {
        console.error('API /api/articles fetch error:', err)
        setList([])
      })
      .finally(() => setLoading(false))
  }, [])

  async function takeAction(id, action){
    if (!session) return alert('Admin sign in required')
    const res = await fetch('/api/articles/approve', { 
      method:'POST', 
      headers: {'content-type':'application/json'}, 
      body: JSON.stringify({ articleId: id, action }) 
    })
    // Read response as text first to avoid JSON.parse errors when server returns HTML/error pages
    const txt = await res.text()
    let j = null
    try {
      j = JSON.parse(txt)
    } catch (err) {
      j = { error: txt }
    }

    if (res.ok) {
      fetch('/api/articles').then(r => r.json()).then(setList)
    } else {
      const message = j?.error || j?.message || txt || 'Failed to update article'
      alert('Error: ' + message)
      console.error('approve response error', res.status, message)
    }
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-[#f3d099]/60 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</h1>
          <p className="text-gray-600 mb-4">Please sign in as admin to access this page</p>
          <Link 
            href="/login"
            className="bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-medium"
          >
            Login as Admin
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-white/95 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92d23] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      </div>
    )
  }

  const filteredArticles = Array.isArray(list) ? list.filter(a => a.status === filter) : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-white/95 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-96 bg-gradient-to-bl from-[#f3d099]/20 to-transparent rounded-bl-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-64 bg-gradient-to-tr from-[#a92d23]/10 to-transparent rounded-tr-[80px] pointer-events-none"></div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-[#f3d099]/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3 group">
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
                <p className="text-xs text-[#a92d23] font-medium">Article Management</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/users", label: "Users" },
                { href: "/admin/articles", label: "Articles", active: true },
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
        
        {/* Page Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/admin"
                className="p-2 hover:bg-[#f3d099]/20 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#a92d23]" />
              </Link>
              <div className="p-3 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Article Management</h1>
                <p className="text-gray-600">Moderate and manage articles</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#a92d23]">{list.filter(a => a.status === 'PENDING').length}</div>
                <div className="text-sm text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#f3d099]">{list.filter(a => a.status === 'APPROVED').length}</div>
                <div className="text-sm text-gray-500">Approved</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8"
        >
          <div className="flex gap-4">
            {[
              { value: 'PENDING', label: 'Pending Review', icon: Clock, count: list.filter(a => a.status === 'PENDING').length },
              { value: 'APPROVED', label: 'Approved', icon: CheckCircle, count: list.filter(a => a.status === 'APPROVED').length },
              { value: 'REJECTED', label: 'Rejected', icon: XCircle, count: list.filter(a => a.status === 'REJECTED').length }
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilter(tab.value)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filter === tab.value
                    ? 'bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white shadow-lg'
                    : 'bg-white/50 text-[#a92d23] hover:bg-[#f3d099]/20'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                <span className={`px-2 py-1 rounded-full text-xs ${
                  filter === tab.value ? 'bg-white/20' : 'bg-[#a92d23]/10'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          {filteredArticles.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Articles Found</h3>
              <p className="text-gray-500">No articles with status &quot;{filter.toLowerCase()}&quot; found.</p>
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex gap-6">
                  {/* Article Image */}
                  {article.image && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <Image 
                        src={typeof article.image === 'string' && article.image.startsWith('data:') ? article.image : (typeof article.image === 'string' ? encodeURI(article.image) : article.image)} 
                        alt={article.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                  )}

                  {/* Article Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{article.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author?.name || article.author?.email || 'Unknown Author'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(article.createdAt).toLocaleDateString('id-ID')}
                          </div>
                          <span className="px-2 py-1 bg-[#f3d099]/20 text-[#a92d23] rounded-full text-xs font-medium">
                            {article.region}
                          </span>
                        </div>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        article.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        article.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {article.status}
                      </div>
                    </div>

                    <div 
                      className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: article.content.slice(0, 300) + '...' }} 
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      {article.status === 'PENDING' && (
                        <>
                          <button 
                            onClick={() => takeAction(article.id, 'APPROVED')} 
                            className="flex items-center gap-2 px-4 py-2 bg-[#a92d23] text-white rounded-lg hover:bg-[#7a1f1a] transition-colors font-medium"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </button>
                          <button 
                            onClick={() => takeAction(article.id, 'REJECTED')} 
                            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </button>
                          <Link
                            href={`/articles/preview/${article.id}?from=admin`}
                            className="flex items-center gap-2 px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                            target="_blank"
                          >
                            <Eye className="w-4 h-4" />
                            Preview
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </main>

  {/* Footer */}
  <FooterSection />
    </div>
  )
}
