import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-center">
          {/* Logo (centered) */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <span className="text-accent">Kaimaar</span>
          </Link>

          {/* CTA (right-aligned, absolute) */}
          <div className="absolute right-0">
            <Button size="sm" asChild>
              <Link href="/sell">Sell Item</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
