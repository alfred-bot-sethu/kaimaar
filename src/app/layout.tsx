import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Header } from '@/components/shared/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kaimaar - Pre-loved Marketplace',
  description:
    'Buy and sell pre-loved items in Singapore. Fashion, electronics, furniture, and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Header />
          <main className="bg-gray-50 min-h-screen">
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
