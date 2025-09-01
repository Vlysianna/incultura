"use client"
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  error: <XCircle className="w-6 h-6 text-red-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
};

const Notification = ({ message, type = 'info', onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-5 right-5 z-[100] w-full max-w-sm p-4 rounded-xl shadow-2xl border-l-4 ${
          type === 'success' ? 'bg-green-50 border-green-500' :
          type === 'error' ? 'bg-red-50 border-red-500' :
          type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
          'bg-blue-50 border-blue-500'
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            {icons[type]}
          </div>
          <div className="flex-1">
            <p className={`text-sm font-semibold ${
              type === 'success' ? 'text-green-800' :
              type === 'error' ? 'text-red-800' :
              type === 'warning' ? 'text-yellow-800' :
              'text-blue-800'
            }`}>
              {
                type === 'success' ? 'Berhasil!' :
                type === 'error' ? 'Gagal!' :
                type === 'warning' ? 'Peringatan!' :
                'Informasi'
              }
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {message}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification;
