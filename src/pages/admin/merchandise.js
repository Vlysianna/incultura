import { FooterSection } from '../../components/sections';

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  ShoppingBag, 
  Shield, 
  Plus,
  Edit3,
  Trash2,
  ArrowLeft,
  Search,
  Package,
  DollarSign,
  Eye,
  EyeOff,
  Star,
  Save,
  X,
  Upload,
  Crown,
  Sparkles
} from 'lucide-react'

export default function AdminMerchandise(){
  const { data: session } = useSession()
  const [merchandise, setMerchandise] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [showNewItemForm, setShowNewItemForm] = useState(false)
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // will hold the image file name after upload
    category: '',
    inStock: true
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  
  useEffect(() => { 
    if (session?.user) {
      fetchMerchandise()
    } else {
      setLoading(false)
    }
  }, [session])

  const fetchMerchandise = () => {
    fetch('/api/admin/merchandise')
      .then(r => r.ok ? r.json() : [])
      .then(setMerchandise)
      .finally(() => setLoading(false))
  }

  const handleSaveItem = async (item) => {
    try {
      let imagePath = item.image
      // If a new image file is selected, upload it first
      if (imageFile) {
        const formData = new FormData()
        formData.append('file', imageFile)
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })
        const uploadData = await uploadRes.json()
        if (uploadRes.ok && uploadData.path) {
          imagePath = uploadData.path
        } else {
          alert('Image upload failed')
          return
        }
      }
      const response = await fetch('/api/admin/merchandise', {
        method: item.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...item,
          image: imagePath,
          price: parseFloat(item.price)
        })
      })
      if (response.ok) {
        fetchMerchandise()
        setEditingItem(null)
        setShowNewItemForm(false)
        setNewItem({ name: '', description: '', price: '', image: '', category: '', inStock: true })
        setImageFile(null)
        setImagePreview('')
      } else {
        const error = await response.json()
        alert(error.error || 'Error saving item')
      }
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Error saving item')
    }
  }

  const handleDeleteItem = async (id) => {
    if (!confirm('Are you sure you want to delete this merchandise item?')) return
    
    try {
      const response = await fetch('/api/admin/merchandise', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      if (response.ok) {
        fetchMerchandise()
      } else {
        alert('Error deleting item')
      }
    } catch (error) {
      console.error('Error deleting item:', error)
      alert('Error deleting item')
    }
  }

  const toggleStockStatus = async (id, currentStatus) => {
    try {
      const response = await fetch('/api/admin/merchandise', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          inStock: !currentStatus 
        })
      })
      
      if (response.ok) {
        fetchMerchandise()
      } else {
        alert('Error updating stock status')
      }
    } catch (error) {
      console.error('Error updating stock status:', error)
      alert('Error updating stock status')
    }
  }

  const filteredMerchandise = merchandise.filter(item => 
    item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const categories = ['Batik', 'Kerajinan', 'Aksesoris', 'Pakaian', 'Makanan', 'Lainnya']

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
          <p className="text-gray-600">Loading merchandise...</p>
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
                <p className="text-xs text-[#a92d23] font-medium">Merchandise Management</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { href: "/admin", label: "Dashboard" },
                { href: "/admin/users", label: "Users" },
                { href: "/admin/articles", label: "Articles" },
                { href: "/admin/quiz", label: "Quiz" },
                { href: "/admin/merchandise", label: "Merchandise", active: true },
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
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Merchandise Management</h1>
                <p className="text-gray-600">Manage cultural merchandise and products</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewItemForm(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 font-medium"
              >
                <Plus className="w-5 h-5" />
                Add New Item
              </button>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#a92d23]">{merchandise.length}</div>
                <div className="text-sm text-gray-500">Total Items</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search & Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Search */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search merchandise items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-600">{merchandise.filter(item => item.inStock).length}</div>
                <div className="text-xs text-gray-500">In Stock</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-red-600">{merchandise.filter(item => !item.inStock).length}</div>
                <div className="text-xs text-gray-500">Out of Stock</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Merchandise Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredMerchandise.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">No Merchandise Found</h3>
              <p className="text-gray-500">Start by adding your first merchandise item.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMerchandise.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-48 bg-gradient-to-br from-[#f3d099]/20 to-[#a92d23]/20">
                    {item.image ? (
                      <Image
                        src={item.image.startsWith('data:') ? item.image : encodeURI(item.image.startsWith('/') ? item.image : `/${item.image}`)}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-16 h-16 text-gray-300" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleStockStatus(item.id, item.inStock)}
                        className={`p-2 rounded-lg transition-colors ${
                          item.inStock 
                            ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                            : 'bg-red-100 text-red-600 hover:bg-red-200'
                        }`}
                      >
                        {item.inStock ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800 flex-1">{item.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.inStock 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xs bg-[#f3d099]/20 text-[#a92d23] px-2 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-3 h-3" />
                        <span className="text-xs">4.5</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#a92d23]" />
                        <span className="text-lg font-bold text-[#a92d23]">
                          {new Intl.NumberFormat('id-ID').format(item.price)}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingItem(item)}
                          className="p-2 text-[#a92d23] hover:bg-[#f3d099]/20 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Edit Item Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Merchandise</h2>
                  <button
                    onClick={() => setEditingItem(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <MerchandiseForm 
                  item={editingItem} 
                  onChange={setEditingItem}
                  onSave={() => handleSaveItem(editingItem)}
                  onCancel={() => {
                    setEditingItem(null)
                    setImageFile(null)
                    setImagePreview('')
                  }}
                  categories={categories}
                  setImageFile={setImageFile}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                />
              </div>
            </motion.div>
          </div>
        )}

        {/* New Item Form Modal */}
        {showNewItemForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Add New Merchandise</h2>
                  <button
                    onClick={() => setShowNewItemForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <MerchandiseForm 
                  item={newItem} 
                  onChange={setNewItem}
                  onSave={() => handleSaveItem(newItem)}
                  onCancel={() => {
                    setShowNewItemForm(false)
                    setImageFile(null)
                    setImagePreview('')
                  }}
                  categories={categories}
                  setImageFile={setImageFile}
                  setImagePreview={setImagePreview}
                  imagePreview={imagePreview}
                />
              </div>
            </motion.div>
          </div>
        )}
      </main>

  {/* Footer */}
  <FooterSection />
    </div>
  )
}

// Merchandise Form Component
function MerchandiseForm({ item, onChange, onSave, onCancel, categories, setImageFile, setImagePreview, imagePreview }) {
  const [localImageFile, setLocalImageFile] = useState(null)
  const [localImagePreview, setLocalImagePreview] = useState(item.image ? item.image : '')

  // Update preview when image changes
  useEffect(() => {
    if (localImageFile) {
      const reader = new FileReader()
      reader.onload = e => {
        setLocalImagePreview(e.target.result)
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(localImageFile)
      setImageFile(localImageFile)
    } else if (item.image) {
      setLocalImagePreview(item.image)
    } else {
      setLocalImagePreview('')
    }
  }, [localImageFile, item.image, setImageFile, setImagePreview])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setLocalImageFile(file)
    if (file) {
      onChange({ ...item, image: file.name }) // will be replaced with path after upload
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
          <input
            type="text"
            value={item.name}
            onChange={(e) => onChange({...item, name: e.target.value})}
            placeholder="Enter product name..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={item.category}
            onChange={(e) => onChange({...item, category: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none"
          >
            <option value="">Select category...</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={item.description}
          onChange={(e) => onChange({...item, description: e.target.value})}
          placeholder="Enter product description..."
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none resize-none"
          rows={4}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price (IDR)</label>
          <input
            type="number"
            value={item.price}
            onChange={(e) => onChange({...item, price: e.target.value})}
            placeholder="Enter price..."
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#a92d23] focus:border-transparent outline-none"
          />
          {localImagePreview && (
            <div className="mt-2">
              {localImagePreview.startsWith('data:') ? (
                <Image src={localImagePreview} alt="Preview" width={128} height={128} className="w-32 h-32 object-cover rounded-xl border mt-2" />
              ) : (
                <Image
                  src={typeof localImagePreview === 'string' ? encodeURI(localImagePreview.startsWith('/') ? localImagePreview : `/${localImagePreview}`) : localImagePreview}
                  alt="Preview"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded-xl border mt-2"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="inStock"
          checked={item.inStock}
          onChange={(e) => onChange({...item, inStock: e.target.checked})}
          className="w-4 h-4 text-[#a92d23] bg-gray-100 border-gray-300 rounded focus:ring-[#a92d23]"
        />
        <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
          Item is in stock
        </label>
      </div>

      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={!item.name || !item.price || !item.category}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#a92d23] to-[#f3d099] text-white rounded-xl hover:scale-105 transition-all duration-300 font-medium disabled:opacity-50 disabled:hover:scale-100"
        >
          <Save className="w-4 h-4" />
          Save Item
        </button>
      </div>
    </div>
  )
}
