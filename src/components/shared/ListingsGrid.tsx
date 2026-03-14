'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useListings } from '@/hooks/use-listings';
import { Badge } from '@/components/ui/Badge';
import { MoreHorizontal, Video } from 'lucide-react';
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
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Cycle through all listings if visibleCount exceeds length
  const visibleListings = useMemo(() => {
    if (!allListings || allListings.length === 0) return [];
    return Array.from({ length: Math.min(visibleCount, allListings.length * 3) }, (_, i) => ({
      ...allListings[i % allListings.length],
      // Make key unique for cycled items
      _key: `${allListings[i % allListings.length].id}-${Math.floor(i / allListings.length)}`,
    }));
  }, [allListings, visibleCount]);

  // IntersectionObserver for infinite scroll
  const loadMore = useCallback(async () => {
    if (isFetching || !allListings || allListings.length === 0) return;
    setIsFetching(true);
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    setVisibleCount((prev) => prev + PAGE_SIZE);
    setIsFetching(false);
  }, [isFetching, allListings]);

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
      {/* Empty state */}
      {!allListings || allListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-base font-semibold text-gray-900">No listings available</p>
          <p className="mt-2 text-sm text-gray-500">Check back soon</p>
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
