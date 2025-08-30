"use client";
import React from 'react';
import Image from 'next/image';

export default function MarketplaceCard({ item }) {
  return (
    <div className="group bg-gradient-to-br from-[#fef8f0] to-[#f9ecd9] rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-500 border border-[#a92e23]/20 hover:border-[#a92e23]/40 relative overflow-hidden">
      {/* Javanese Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
        <svg width="100%" height="100%" className="text-[#a92e23]">
          <pattern id="javanese-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M0 25L25 0L50 25L25 50L0 25Z" fill="currentColor" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#javanese-pattern)" />
        </svg>
      </div>
      
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-br from-[#f3d099] to-[#e4b87b] rounded-xl mb-5 overflow-hidden border border-[#a92e23]/20">
        {item.image ? (
          <Image 
            src={item.image} 
            alt={item.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#a92e23] to-[#8a251c] rounded-full flex items-center justify-center shadow-md">
              <svg className="w-8 h-8 text-[#f3d099]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Featured Badge */}
        {item.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#a92e23] to-[#8a251c] text-[#f9ecd9] px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Unggulan
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-[#f9ecd9]/95 backdrop-blur-sm border border-[#a92e23]/30 text-[#a92e23] px-3 py-1 rounded-full text-sm font-bold shadow-sm">
          {item.price || 100} Koin
        </div>
      </div>

      {/* Content */}
      <div className="relative space-y-4">
        <div>
          <h3 className="font-bold text-lg text-[#3a1714] group-hover:text-[#a92e23] transition-colors line-clamp-2 mb-1">
            {item.title || "Produk Budaya"}
          </h3>
          <p className="text-sm text-[#6e4c41] leading-relaxed line-clamp-3">
            {item.description || "Merchandise budaya Indonesia eksklusif yang dapat ditukar dengan koin yang Anda kumpulkan."}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-[#6e4c41]">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#a92e23]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{item.rating || "4.8"}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#a92e23]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{item.stock || "Tersedia"}</span>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full bg-gradient-to-r from-[#a92e23] to-[#8a251c] hover:from-[#8a251c] hover:to-[#6d1d16] text-[#f9ecd9] py-2.5 px-4 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Tukar Sekarang
        </button>
      </div>
    </div>
  );
}