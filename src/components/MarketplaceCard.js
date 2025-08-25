"use client";
import React from 'react';
import Image from 'next/image';
import Button from './ui/Button';

export default function MarketplaceCard({ item }) {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-sogan-200/50 hover:scale-105 hover:border-sogan-300/50">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-sogan-100 to-sogan-200 rounded-2xl mb-6 overflow-hidden">
        {item.image ? (
          <Image 
            src={item.image} 
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-sogan-500 to-batik-gold rounded-xl flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Badge */}
        {item.featured && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-batik-gold to-sogan-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Unggulan
          </div>
        )}
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm border border-sogan-200 text-sogan-800 px-3 py-1 rounded-full text-sm font-bold">
          {item.price || 100} Koin
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-sogan-900 group-hover:text-sogan-700 transition-colors line-clamp-2">
            {item.title || "Produk Budaya"}
          </h3>
          <p className="text-sm text-sogan-600 leading-relaxed line-clamp-3 mt-2">
            {item.description || "Merchandise budaya Indonesia eksklusif yang dapat ditukar dengan koin yang Anda kumpulkan."}
          </p>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-sogan-500">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{item.rating || "4.8"}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{item.stock || "Tersedia"}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button 
          variant="primary" 
          size="md"
          className="w-full group-hover:scale-105"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
          Tukar Sekarang
        </Button>
      </div>
    </div>
  );
}
