import { Inter } from 'next/font/google';
import '../globals.css';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';
import Header from '@/components/Header';
import { NextIntlClientProvider } from 'next-intl';
import { getFound } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Store - Buy Premium Products',
  description: 'Shop our premium products with secure payment',
};

export default async function RootLayout({ children, params }) {

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <CartProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <CartSidebar />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
