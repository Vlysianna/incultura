import { FooterSection } from '../../components/sections';

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Users, 
  Shield, 
  Calendar, 
  Activity,
  Coins,
  ArrowLeft,
  Search,
  Filter,
  MoreVertical,
  UserCheck,
  UserX,
  Crown,
  Sparkles,
  PlusCircle,
  Edit,
  Trash2
} from 'lucide-react'

function UserModal({ isOpen, onClose, onSubmit, user, setUser }) {
  if (!isOpen) return null

  const isEditMode = !!user?.id

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(user)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input 
              type="text"
              required
              value={user?.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              required
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] outline-none"
            />
          </div>
          {!isEditMode && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password"
                required
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] outline-none"
              />
            </div>
          )}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Coins</label>
              <input 
                type="number"
                value={user?.coins || 0}
                onChange={(e) => setUser({ ...user, coins: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                value={user?.isAdmin ? 'admin' : 'user'}
                onChange={(e) => setUser({ ...user, isAdmin: e.target.value === 'admin' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] outline-none bg-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 text-white bg-gradient-to-r from-[#a92d23] to-[#f3d099] rounded-lg hover:scale-105 transition-transform">
              {isEditMode ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete User</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <span className="font-semibold">{userName}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={onClose} className="px-8 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button onClick={onConfirm} className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminUsers(){
  const { data: session } = useSession()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [deletingUser, setDeletingUser] = useState(null)

  const fetchUsers = () => {
    fetch('/api/admin/users')
      .then(r => r.ok ? r.json() : [])
      .then(setUsers)
      .finally(() => setLoading(false))
  }
  
  useEffect(() => { 
    if (session?.user) {
      fetchUsers()
    } else {
      setLoading(false)
    }
  }, [session])

  const handleOpenModal = (user = null) => {
    setEditingUser(user ? { ...user } : {});
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const handleSubmitUser = async (userData) => {
    const isEditMode = !!userData.id;
    const url = isEditMode ? `/api/admin/users/${userData.id}` : '/api/admin/users/create';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        fetchUsers(); // Refresh user list
        handleCloseModal();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to save user:', error);
      alert('An unexpected error occurred.');
    }
  };

  const openDeleteConfirmation = (user) => {
    setDeletingUser(user);
  };

  const closeDeleteConfirmation = () => {
    setDeletingUser(null);
  };

  const handleDeleteUser = async () => {
    if (!deletingUser) return;

    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchUsers(); // Refresh user list
        closeDeleteConfirmation();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('An unexpected error occurred.');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || 
                       (filterRole === 'admin' && user.isAdmin) ||
                       (filterRole === 'user' && !user.isAdmin)
    return matchesSearch && matchesRole
  })

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
          <p className="text-gray-600">Loading users...</p>
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
                <p className="text-xs text-[#a92d23] font-medium">User Management</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/users", label: "Users", active: true },
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
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-600">Manage platform users and permissions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-medium shadow-lg"
              >
                <PlusCircle className="w-5 h-5" />
                Create User
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#a92d23]">{users.filter(u => !u.isAdmin).length}</div>
                <div className="text-sm text-gray-500">Regular Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#f3d099]">{users.filter(u => u.isAdmin).length}</div>
                <div className="text-sm text-gray-500">Admins</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 mb-8"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none transition-all"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none transition-all appearance-none bg-white"
              >
                <option value="all">All Users</option>
                <option value="user">Regular Users</option>
                <option value="admin">Admins</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden"
        >
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Users Found</h3>
              <p className="text-gray-500">No users match your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f3d099]/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">User</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">Joined</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">Activity</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">Coins</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-[#a92d23] uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="hover:bg-[#f3d099]/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#a92d23] to-[#f3d099] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {(user.name || user.email).charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{user.name || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isAdmin 
                            ? 'bg-[#a92d23]/10 text-[#a92d23]' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.isAdmin ? <Crown className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(user.createdAt).toLocaleDateString('id-ID')}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm text-gray-900">
                          <Activity className="w-4 h-4 text-gray-400" />
                          {user.activityCount || 0} activities
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-sm font-medium text-[#a92d23]">
                          <Coins className="w-4 h-4" />
                          {user.coins || 0}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleOpenModal(user)}
                            className="p-2 text-gray-400 hover:text-[#a92d23] transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteConfirmation(user)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="text-2xl font-bold text-[#a92d23] mb-2">{users.length}</div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="text-2xl font-bold text-[#f3d099] mb-2">
              {users.filter(u => {
                const thirtyDaysAgo = new Date()
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                return new Date(u.createdAt) >= thirtyDaysAgo
              }).length}
            </div>
            <div className="text-sm text-gray-600">New This Month</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="text-2xl font-bold text-[#a92d23] mb-2">
              {users.filter(u => u.activities && u.activities.length > 0).length}
            </div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 text-center">
            <div className="text-2xl font-bold text-[#f3d099] mb-2">
              {users.reduce((total, user) => total + (user.coins || 0), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Coins</div>
          </div>
        </motion.div>
      </main>

      <UserModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitUser}
        user={editingUser}
        setUser={setEditingUser}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingUser}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteUser}
        userName={deletingUser?.name}
      />

  {/* Footer */}
  <FooterSection />
    </div>
  )
}
