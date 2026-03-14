'use client';

import { useState, useMemo } from 'react';
import { useListings } from '@/hooks/use-listings';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, MoreHorizontal, Video } from 'lucide-react';
import { Listing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { getAvatarColor, getInitial } from '@/lib/avatar';
import Image from 'next/image';
import Link from 'next/link';

const MOCK_SELLERS: Record<string, string> = {
  '1': 'Rachel Tan',
  '2': 'Marcus Lim',
  '3': 'Priya Nair',
  '4': 'Jun Wei',
  '5': 'Sophie Koh',
  '6': 'Adrian Ng',
  '7': 'Mei Ling',
  '8': 'Darren Goh',
  '9': 'Sarah Teo',
  '10': 'Kevin Chan',
  '11': 'Fiona Lau',
  '12': 'Bryan Ong',
};

const RECENT_SEARCHES = ['iPhone', 'Vintage jacket', 'IKEA table'];

function sellerFor(listing: Listing): string {
  return MOCK_SELLERS[listing.id] ?? 'Kaimaar User';
}

interface SearchCardProps {
  listing: Listing;
}

function SearchCard({ listing }: SearchCardProps) {
  const seller = sellerFor(listing);
  const avatarColor = getAvatarColor(seller);
  const initial = getInitial(seller);

  return (
    <article className="border-b border-gray-200">
      {/* Seller row */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: avatarColor }}
          >
            {initial}
          </div>
          <span className="text-sm font-semibold text-gray-900">{seller}</span>
        </div>
        <button className="p-1 text-gray-500 hover:text-gray-800" aria-label="More options">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      <Link href={`/listings/${listing.id}`}>
        <div className="relative w-full" style={{ aspectRatio: '4/5' }}>
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover"
            sizes="(max-width: 480px) 100vw, 480px"
          />
          {/* Video badge */}
          {listing.hasVideo && (
            <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-md">
              <Video className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Video</span>
            </div>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="px-3 py-3">
        <p className="font-semibold text-accent">{formatPrice(listing.price)}</p>
        <p className="mt-0.5 text-sm text-gray-900">{listing.title}</p>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="default" size="sm">
            {listing.location}
          </Badge>
          <span className="text-xs text-gray-500">{listing.timeAgo}</span>
        </div>
      </div>
    </article>
  );
}

export default function SearchPage() {
  const { data: allListings, isLoading } = useListings();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter listings based on search term
  const results = useMemo(() => {
    if (!allListings) return [];
    const query = searchTerm.toLowerCase().trim();
    if (!query) return [];

    return allListings.filter((l) => {
      return (
        l.title.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query)
      );
    });
  }, [allListings, searchTerm]);

  return (
    <div className="mx-auto w-full max-w-[480px]" style={{ paddingBottom: '80px' }}>
      {/* Search bar */}
      <div className="px-3 py-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search for items, brands, categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3 px-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border-b border-gray-200">
              <div className="flex items-center gap-2 px-3 py-3">
                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                <div className="h-4 w-28 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="aspect-[4/5] w-full animate-pulse bg-gray-200" />
              <div className="space-y-2 px-3 py-3">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      ) : searchTerm === '' ? (
        // Recent searches
        <div className="px-3 py-6">
          <h2 className="text-sm font-semibold text-gray-900">Recent Searches</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {RECENT_SEARCHES.map((search) => (
              <button
                key={search}
                onClick={() => setSearchTerm(search)}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        // No results
        <div className="flex flex-col items-center justify-center py-16 px-3">
          <p className="text-base font-semibold text-gray-900">
            No results for &quot;{searchTerm}&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">Try a different keyword</p>
        </div>
      ) : (
        // Search results
        <div>
          {results.map((listing) => (
            <SearchCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
