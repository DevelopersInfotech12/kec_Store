'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { getItemCount, setIsOpen } = useCart();

  return (
    <nav className="shadow-md sticky top-0 z-50 bg-[radial-gradient(circle_at_center,_#013d32_0%,_#001a15_60%,_#000d0c_100%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            <img src="/images/logo.png" alt="ShopEase" className="h-12 inline" /> 
          </Link>
          <div className="flex items-center space-x-6">
            <Link
              href="/products"
              className="text-gray-100 hover:text-primary transition"
            >
              Products
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-gray-700 hover:text-primary transition"
            >
              <span className="text-2xl">🛒</span>
              {getItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}