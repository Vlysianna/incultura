import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Upload } from 'lucide-react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function ArticleForm({ onClose = () => {}, onCreated = () => {} }) {
  const { data: session } = useSession()
  const [title, setTitle] = useState('')
  const [region, setRegion] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5_000_000) return alert('Ukuran file terlalu besar. Maks 5MB.')
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!session) return alert('Silakan login terlebih dahulu')
    if (!title || !region || !content) return alert('Isi semua field yang diperlukan')
    setIsSubmitting(true)
    try {
      let imageUrl = null
      if (image) {
        const fd = new FormData()
        fd.append('image', image)
        const up = await fetch('/api/upload', { method: 'POST', body: fd })
        if (up.ok) {
          const jd = await up.json()
          imageUrl = jd.url
        }
      }

      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, region, image: imageUrl })
      })

      if (!res.ok) throw new Error('Gagal menyimpan artikel')
      // success
      setTitle('')
      setRegion('')
      setContent('')
      setImage(null)
      setImagePreview(null)
      onCreated()
    } catch (err) {
      console.error(err)
      alert(err.message || 'Terjadi kesalahan saat menyimpan')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-[#a92d23]">Tulis Artikel Baru</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Judul Artikel</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul artikel yang menarik..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daerah/Wilayah</label>
          <input
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Contoh: Jawa Barat, Bali, Sumatera Utara..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Artikel (Opsional)</label>
          <div className="space-y-4">
            {!imagePreview ? (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="article-image-upload"
                />
                <label
                  htmlFor="article-image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#a92d23] transition-colors cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600 font-medium">Klik untuk upload gambar</span>
                  <span className="text-xs text-gray-400">PNG, JPG, JPEG (Max 5MB)</span>
                </label>
              </div>
            ) : (
              <div className="relative">
                <div className="relative w-full h-48 rounded-xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Gambar terpilih</span>
                  <label htmlFor="article-image-upload" className="text-sm text-[#a92d23] hover:underline cursor-pointer">Ganti gambar</label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Isi Artikel</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Ceritakan tentang budaya yang ingin Anda bagikan..."
            className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#a92d23] focus:border-transparent min-h-[200px] resize-vertical"
            required
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                Menyimpan...
              </div>
            ) : (
              'Publikasikan'
            )}
          </button>
        </div>
      </form>
    </motion.div>
  )
}
