"use client";
import React, { useState } from "react";
import Button from "./Button";

export default function LoginModal({ open, onClose }) {
  const [formData, setFormData] = useState({ email: '', password: '' });

  if (!open) return null;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl border border-sogan-200/20 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-sogan-500 to-sogan-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-sogan-900 to-sogan-700 bg-clip-text text-transparent">
            Selamat Datang
          </h3>
          <p className="text-sogan-600 mt-2">
            Masuk untuk mulai petualangan budaya Anda
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-sogan-700 mb-2">Email</label>
              <input 
                name="email" 
                type="email" 
                placeholder="nama@email.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border-2 border-sogan-200 rounded-xl focus:border-sogan-500 focus:ring-0 focus:outline-none transition-colors text-sogan-900 placeholder-sogan-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-sogan-700 mb-2">Password</label>
              <input 
                name="password" 
                type="password" 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/80 border-2 border-sogan-200 rounded-xl focus:border-sogan-500 focus:ring-0 focus:outline-none transition-colors text-sogan-900 placeholder-sogan-400"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Button 
              type="button" 
              className="w-full" 
              size="lg"
              variant="primary"
            >
              Masuk Sekarang
            </Button>
            
            <div className="flex items-center justify-between text-sm">
              <button 
                type="button" 
                className="text-sogan-600 hover:text-sogan-800 transition-colors"
              >
                Lupa password?
              </button>
              <button 
                type="button" 
                className="text-sogan-600 hover:text-sogan-800 transition-colors" 
                onClick={onClose}
              >
                Batal
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-sogan-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-sogan-500">atau</span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sogan-600">
              Belum punya akun?{' '}
              <button 
                type="button" 
                className="font-semibold text-sogan-700 hover:text-sogan-900 transition-colors"
                onClick={onClose}
              >
                Daftar sekarang
              </button>
            </p>
          </div>
        </form>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-sogan-100 hover:bg-sogan-200 text-sogan-600 hover:text-sogan-800 transition-colors"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
