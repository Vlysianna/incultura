// Example of refactoring the articles page using the new component structure
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { FileText, Plus, Eye, Calendar, User, MapPin } from 'lucide-react'

// New structured imports
import { AppLayout } from '../../components/layout/AppLayout'
import { 
  PageHeader, 
  SearchBar, 
  Card, 
  CardHeader, 
  CardBody,
  Modal,
  FormField,
  FormSubmitButton,
  FloatingElements 
} from '../../components/common'

export default function ArticlesRefactored() {
  const { data: session } = useSession()
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    region: ''
  })

  // Load articles
  useEffect(() => {
    fetch('/api/articles')
      .then(r => r.json())
      .then(setArticles)
  }, [])

  // Filter articles
  const filteredArticles = articles.filter(article => 
    article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.region?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Submit new article
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) return alert('Silakan login terlebih dahulu!')
    
    const res = await fetch('/api/articles', { 
      method: 'POST', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify(formData) 
    })
    
    if (res.ok) {
      setFormData({ title: '', content: '', region: '' })
      setShowForm(false)
      // Refresh articles
      fetch('/api/articles').then(r => r.json()).then(setArticles)
    }
  }

  // Page configuration
  const pageHeader = {
    title: '📖 Artikel Budaya',
    subtitle: 'Bagikan dan baca artikel tentang kekayaan budaya Indonesia dari berbagai daerah.',
    badge: {
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      text: 'Koleksi Artikel'
    }
  }

  return (
    <AppLayout>
      <FloatingElements />
      
      <div className="pb-16 px-6 max-w-6xl mx-auto relative z-10">
        <PageHeader {...pageHeader} />
        
        {/* Search and Add Button */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar 
              placeholder="Cari artikel atau daerah..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          
          {session && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Tambah Artikel
            </button>
          )}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} hover className="h-full flex flex-col">
              <CardHeader>
                <h3 className="font-bold text-lg text-gray-800 line-clamp-2">
                  {article.title}
                </h3>
              </CardHeader>
              
              <CardBody className="flex-1">
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {article.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {article.region}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {article.author?.name || 'Anonymous'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(article.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Add Article Modal */}
        <Modal 
          isOpen={showForm} 
          onClose={() => setShowForm(false)}
          title="Tambah Artikel Baru"
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Judul Artikel"
              placeholder="Masukkan judul artikel..."
              value={formData.title}
              onChange={(value) => setFormData({...formData, title: value})}
              required
            />
            
            <FormField
              label="Daerah/Budaya"
              placeholder="Contoh: Jawa Tengah, Bali, Sumatera..."
              value={formData.region}
              onChange={(value) => setFormData({...formData, region: value})}
              required
            />
            
            <FormField
              label="Konten Artikel"
              type="textarea"
              placeholder="Tulis artikel Anda di sini..."
              value={formData.content}
              onChange={(value) => setFormData({...formData, content: value})}
              rows={8}
              required
            />
            
            <div className="flex gap-3">
              <FormSubmitButton>
                Publikasikan Artikel
              </FormSubmitButton>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AppLayout>
  )
}
