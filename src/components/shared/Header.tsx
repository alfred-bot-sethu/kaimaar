import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-accent">Kaimaar</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Browse
            </Link>
            <Link
              href="/sell"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sell
            </Link>
          </nav>

          {/* CTA */}
          <Button size="sm" asChild>
            <Link href="/sell">Sell Item</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
