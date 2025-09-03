import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Heart, ShoppingCart, Eye, MapPin } from 'lucide-react'
import { useNotification } from '../context/NotificationContext';

export default function MarketPlaceCard({ item, index, onRedeem }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [redeeming, setRedeeming] = useState(false)
  const { addNotification } = useNotification();
  const { data: session } = useSession();

  const handleRedeem = async () => {
    if (!session?.user) {
      addNotification('Silakan login terlebih dahulu untuk menukar item.', 'warning')
      return
    }
    setRedeeming(true);
    try {
      const response = await fetch('/api/marketplace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: item.id }),
      });

      if (response.ok) {
        addNotification('Penukaran berhasil!', 'success');
        if (onRedeem) onRedeem();
      } else {
        const error = await response.json();
        addNotification(`Penukaran gagal: ${error.error}`, 'error');
      }
    } catch (error) {
      addNotification('Terjadi kesalahan saat menukar item', 'error');
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container dengan efek shadow dan border yang unik */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#a92e23]/20">

        {/* Ornament corner - Motif Jawa */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#a92e23] to-[#f3d099] transform rotate-45 translate-x-2 -translate-y-2"></div>
          <svg className="absolute top-1 right-1 w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9L16.5 14.74L18.18 22L12 18.27L5.82 22L7.5 14.74L2 9L8.91 8.26L12 2Z" />
          </svg>
        </div>

        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image || "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay dengan motif batik */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-[#a92e23]/90 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
              {item.category?.toUpperCase() || "BUDAYA"}
            </span>
          </div>

          {/* Like button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`}
            />
          </motion.button>

          {/* Quick actions overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
              >
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#f3d099] transition-colors"
                >
                  <Eye className="w-5 h-5 text-[#a92e23]" />
                </motion.button>
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={handleRedeem}
                  disabled={redeeming}
                  className="w-10 h-10 bg-[#a92e23] rounded-full flex items-center justify-center hover:bg-[#a92e23]/80 transition-colors disabled:opacity-50"
                >
                  <ShoppingCart className="w-5 h-5 text-white" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title and Price */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">
              {item.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#a92e23]">
                {(typeof item.price === 'number' && item.price > 0 ? item.price : 100)} Koin
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">{item.rating || "4.8"}</span>
                <span className="text-xs text-gray-500">({item.reviews || 10})</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description || "Merchandise budaya Indonesia eksklusif yang dapat ditukar dengan koin yang Anda kumpulkan."}
          </p>

          {/* Seller Info */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-800">{item.seller || "Toko Budaya"}</p>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">{item.location || "Indonesia"}</span>
              </div>
            </div>
          </div>

          {/* Ornamental divider */}
          <div className="flex items-center mb-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#a92e23]/30 to-transparent"></div>
            <div className="w-2 h-2 bg-[#a92e23] rounded-full mx-2"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#a92e23]/30 to-transparent"></div>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRedeem}
            disabled={redeeming}
            className="w-full bg-gradient-to-r from-[#a92e23] to-[#a92e23]/80 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {redeeming ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Tukar dengan Koin
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}