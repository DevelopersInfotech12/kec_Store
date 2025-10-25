'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext'; // Replace the mock import with your actual cart context path

export default function Header() {
  const { getItemCount, setIsOpen } = useCart();

  return (
    <nav className="shadow-lg sticky top-0 z-50 bg-[#1a2332] border-b border-emerald-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <img 
              src="/images/logo.png" 
              alt="KEC Logo" 
              className="h-12 transition-transform duration-300 group-hover:scale-110" 
            /> 
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-8">
            <Link
              href="/products"
              className="text-slate-300 font-semibold hover:text-emerald-400 transition-all duration-300 text-lg relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative bg-emerald-900/50 hover:bg-emerald-800/50 backdrop-blur-sm p-3 rounded-xl transition-all duration-300 hover:scale-110 border border-emerald-700/30 group"
            >
              <ShoppingCart className="w-6 h-6 text-emerald-400" />
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className="h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"></div>
    </nav>
  );
}