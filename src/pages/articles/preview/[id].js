import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, MapPin, XCircle } from 'lucide-react'

export default function ArticlePreview() {
  const router = useRouter()
  const { id } = router.query
  const { data: session } = useSession()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    setLoading(true)
    fetch(`/api/articles/${id}`)
      .then(r => r.json())
      .then(data => {
        if (data && data.id) setArticle(data)
        else setError(data.error || 'Artikel tidak ditemukan')
      })
      .catch(() => setError('Gagal memuat artikel'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>
  if (!article) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-amber-50/30 px-4 py-12">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8 relative">
        {article.status === 'PENDING' && (
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold">
            <XCircle className="w-4 h-4" />
            Pending Review
          </div>
        )}
        <h1 className="text-3xl font-bold mb-4 text-[#a92d23]">{article.title}</h1>
        <div className="flex items-center gap-4 mb-6 text-gray-500 text-sm">
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{article.region}</span>
          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{new Date(article.createdAt).toLocaleDateString('id-ID')}</span>
          <span className="flex items-center gap-1"><User className="w-4 h-4" />{article.user?.name || article.user?.email || 'Unknown'}</span>
        </div>
        {article.image && (
          <div className="mb-6">
            <Image src={article.image} alt={article.title} width={600} height={300} className="rounded-xl object-cover w-full h-64" />
          </div>
        )}
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className="mt-8">
          <Link href="/articles" className="text-[#a92d23] hover:underline">&larr; Kembali ke Daftar Artikel</Link>
        </div>
      </div>
    </div>
  )
}
