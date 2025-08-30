import React from 'react'

export default function FormField({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error,
  className = "",
  rows,
  ...props 
}) {
  const inputClassName = `
    block w-full px-4 py-3 border rounded-xl leading-5 bg-white 
    placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a92d23] 
    focus:border-transparent transition-all duration-300
    ${error ? 'border-red-300' : 'border-gray-200'}
  `

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {type === 'textarea' ? (
        <textarea
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows || 4}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={inputClassName}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export function FormSubmitButton({ 
  children, 
  loading = false, 
  disabled = false,
  className = "" 
}) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={`
        w-full bg-gradient-to-r from-[#a92d23] to-[#7a1f1a] text-white 
        hover:from-[#7a1f1a] hover:to-[#a92d23] disabled:opacity-50 
        disabled:cursor-not-allowed shadow-lg hover:shadow-xl 
        transition-all duration-300 transform hover:scale-105 
        px-6 py-3 rounded-xl font-medium
        ${className}
      `}
    >
      {loading ? 'Memproses...' : children}
    </button>
  )
}
