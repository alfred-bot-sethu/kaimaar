'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Search, Plus, User } from 'lucide-react';

const tabs = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/sell', label: null, icon: Plus, isPrimary: true },
  { href: '/account', label: 'Account', icon: User },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around px-0">
        {tabs.map(({ href, label, icon: Icon, isPrimary }) => {
          const isActive = pathname === href;

          if (isPrimary) {
            return (
              <Link
                key={href}
                href={href}
                className="flex flex-col items-center justify-center py-3 transition-colors"
                aria-label="Sell"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: '#E8593C',
                  }}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center gap-1 py-2 transition-colors"
            >
              <Icon
                className="h-6 w-6"
                style={{
                  color: isActive ? '#E8593C' : '#9CA3AF',
                }}
              />
              <span
                className="text-xs font-medium"
                style={{
                  color: isActive ? '#E8593C' : '#9CA3AF',
                }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
