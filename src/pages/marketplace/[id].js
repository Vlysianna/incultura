"use client";
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Header from '../../components/Header'
import { FooterSection } from '../../components/sections'
import { Star, MapPin, ShoppingCart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useNotification } from '../../context/NotificationContext'

export default function MarketplaceDetailPage() {
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [redeeming, setRedeeming] = useState(false)
  const [error, setError] = useState(null)
  const { data: session } = useSession()
  const { addNotification } = useNotification()

  useEffect(() => {
    if (!id) return
    const fetchItem = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/marketplace?id=${encodeURIComponent(id)}`)
        if (!res.ok) throw new Error('Gagal memuat produk')
        const data = await res.json()
        setItem(data)
      } catch (e) {
        console.error(e)
        setError(e.message || 'Terjadi kesalahan')
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  const handleRedeem = async () => {
    if (!session?.user) {
      addNotification('Silakan login terlebih dahulu untuk menukar item.', 'warning')
      return
    }
    if (!item?.id) return
    setRedeeming(true)
    try {
      const res = await fetch('/api/marketplace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id })
      })
      const data = await res.json()
      if (res.ok) {
        addNotification('Penukaran berhasil!', 'success')
        // navigate back to marketplace or refresh
        setTimeout(() => router.push('/marketplace'), 1000)
      } else {
        addNotification(data.error || 'Penukaran gagal', 'error')
      }
    } catch (e) {
      console.error(e)
      addNotification('Terjadi kesalahan saat menukar item', 'error')
    } finally {
      setRedeeming(false)
    }
  }

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 min-h-screen bg-gradient-to-br from-[#f3d099] via-[#f9e6c9] to-[#f3d099]">
        <div className="max-w-6xl mx-auto px-4">
          {loading ? (
            <div className="py-24 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a92e23] mx-auto mb-4"></div>
              <p className="text-gray-700">Memuat produk...</p>
            </div>
          ) : error ? (
            <div className="py-24 text-center">
              <p className="text-red-600 font-semibold mb-2">{error}</p>
              <button onClick={() => router.push('/marketplace')} className="px-4 py-2 bg-[#a92e23] text-white rounded">Kembali</button>
            </div>
          ) : !item ? (
            <div className="py-24 text-center">
              <p className="text-gray-700">Produk tidak ditemukan.</p>
              <button onClick={() => router.push('/marketplace')} className="px-4 py-2 bg-[#a92e23] text-white rounded">Kembali</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
              <div className="md:col-span-2 bg-white rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-96 bg-gray-100">
                  {item.image ? (
                    <Image
                      src={typeof item.image === 'string' ? item.image : (item.image || '/default-product.png')}
                      alt={item.name || 'Product image'}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-300">No image</div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h1>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl font-bold text-[#a92e23]">{(typeof item.price === 'number' ? item.price : Number(item.price || 0))} Koin</div>
                    <div className="flex items-center gap-1 text-yellow-500"><Star className="w-4 h-4" /> <span className="text-sm">{item.rating || '4.8'}</span></div>
                  </div>

                  <p className="text-gray-700 mb-6 whitespace-pre-line">{item.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Penjual</p>
                      <p className="text-sm text-gray-500">{item.seller || 'Toko Budaya'}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2"><MapPin className="w-3 h-3" /> {item.location || 'Indonesia'}</div>
                    </div>

                    <div className="w-48">
                      <button onClick={handleRedeem} disabled={redeeming} className="w-full bg-gradient-to-r from-[#a92e23] to-[#a92e23]/80 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50">
                        {redeeming ? 'Memproses...' : (<><ShoppingCart className="w-4 h-4 inline-block mr-2" /> Tukar dengan Koin</>)}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <aside className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="font-semibold mb-2">Detail Produk</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><strong>Stok:</strong> {item.inStock ? 'Tersedia' : 'Habis'}</li>
                  <li><strong>Kategori:</strong> {item.category || '—'}</li>
                  <li><strong>ID:</strong> {item.id}</li>
                </ul>

                <div className="mt-6">
                  <button onClick={() => router.push('/marketplace')} className="w-full px-4 py-2 border rounded text-sm">Kembali ke Pasar</button>
                </div>
              </aside>
            </div>
          )}
        </div>
  </main>
  <FooterSection />
    </>
  )
}
