import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

// Remove 'use client' from this file and use metadata export
export const metadata = {
  title: 'Store - Buy Premium Products',
  description: 'Shop our premium products with secure payment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}   