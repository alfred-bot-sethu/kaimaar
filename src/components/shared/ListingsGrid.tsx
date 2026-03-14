'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useListings } from '@/hooks/use-listings';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Search, MoreHorizontal, Video } from 'lucide-react';
import { Listing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { getAvatarColor, getInitial } from '@/lib/avatar';
import Image from 'next/image';
import Link from 'next/link';

const PAGE_SIZE = 6;

// Mock seller names per listing id (deterministic)
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

function sellerFor(listing: Listing): string {
  return MOCK_SELLERS[listing.id] ?? 'Kaimaar User';
}

interface FeedCardProps {
  listing: Listing;
}

function FeedCard({ listing }: FeedCardProps) {
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
          <Badge variant="default" size="sm">{listing.location}</Badge>
          <span className="text-xs text-gray-500">{listing.timeAgo}</span>
        </div>
      </div>
    </article>
  );
}

export function ListingsGrid() {
  const { data: allListings, isLoading: queryLoading, error } = useListings();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Filter listings based on search term
  const filteredListings = useMemo(() => {
    if (!allListings) return [];
    const query = searchTerm.toLowerCase().trim();
    if (!query) return allListings;
    return allListings.filter((l) => {
      return (
        l.title.toLowerCase().includes(query) ||
        l.category.toLowerCase().includes(query) ||
        l.location.toLowerCase().includes(query)
      );
    });
  }, [allListings, searchTerm]);

  // Cycle through filtered listings if visibleCount exceeds length
  const visibleListings = useMemo(() => {
    if (filteredListings.length === 0) return [];
    return Array.from({ length: Math.min(visibleCount, filteredListings.length * 3) }, (_, i) => ({
      ...filteredListings[i % filteredListings.length],
      // Make key unique for cycled items
      _key: `${filteredListings[i % filteredListings.length].id}-${Math.floor(i / filteredListings.length)}`,
    }));
  }, [filteredListings, visibleCount]);

  // Reset visibleCount when search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchTerm]);

  // IntersectionObserver for infinite scroll
  const loadMore = useCallback(async () => {
    if (isFetching || filteredListings.length === 0) return;
    setIsFetching(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setVisibleCount((prev) => prev + PAGE_SIZE);
    setIsFetching(false);
  }, [isFetching, filteredListings.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '300px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  if (queryLoading) {
    return (
      <div className="mx-auto w-full max-w-[480px]">
        <div className="mb-4 px-3">
          <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="mb-4 border-b border-gray-200">
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
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-[480px] px-3">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          Failed to load listings. Please try again.
        </div>
      </div>
    );
  }

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
            className="pl-10"
          />
        </div>
      </div>

      {/* Heading */}
      <div className="px-3 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
        <p className="mt-1 text-sm text-gray-500">Discover pre-loved items from verified sellers.</p>
      </div>

      {/* Empty state */}
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-base font-semibold text-gray-900">
            No listings found for &quot;{searchTerm}&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">Try a different keyword</p>
        </div>
      ) : (
        <>
          {/* Feed */}
          <div>
            {visibleListings.map((listing) => (
              <FeedCard key={listing._key} listing={listing} />
            ))}
          </div>

          {/* Sentinel + loading indicator */}
          <div ref={sentinelRef} className="flex items-center justify-center py-6">
            {isFetching && (
              <div
                className="h-3 w-3 animate-pulse rounded-full"
                style={{ backgroundColor: '#E8593C' }}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
