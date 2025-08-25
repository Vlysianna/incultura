"use client";
import React from "react";

export default function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-sogan-600 to-sogan-700 hover:from-sogan-700 hover:to-sogan-800 text-white shadow-lg hover:shadow-xl focus:ring-sogan-500",
    secondary: "bg-white/80 backdrop-blur-sm border-2 border-sogan-300 hover:border-sogan-400 text-sogan-700 hover:text-sogan-800 shadow-lg hover:shadow-xl focus:ring-sogan-500",
    outline: "border-2 border-sogan-600 text-sogan-600 hover:bg-sogan-600 hover:text-white focus:ring-sogan-500",
    ghost: "text-sogan-600 hover:bg-sogan-100 focus:ring-sogan-500"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      {...props}
      className={classes}
    >
      {children}
    </button>
  );
}
