'use client';

import { useState, useMemo } from 'react';
import { useListings } from '@/hooks/use-listings';
import { ListingCard } from './ListingCard';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

export function ListingsGrid() {
  const { data: listings, isLoading, error } = useListings();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter listings based on search term
  const filteredListings = useMemo(() => {
    if (!listings) return [];

    const query = searchTerm.toLowerCase().trim();
    if (!query) return listings;

    return listings.filter((listing) => {
      const title = listing.title.toLowerCase();
      const category = listing.category.toLowerCase();
      const location = listing.location.toLowerCase();

      return (
        title.includes(query) ||
        category.includes(query) ||
        location.includes(query)
      );
    });
  }, [listings, searchTerm]);

  if (isLoading) {
    return (
      <div>
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-md">
            <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
          </div>
        </div>
        <div className="mb-8" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square animate-pulse rounded-lg bg-gray-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        Failed to load listings. Please try again.
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar (above heading) */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-full max-w-md">
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Browse Listings
        </h1>
        <p className="mt-2 text-gray-600">
          Discover amazing pre-loved items from verified sellers.
        </p>
      </div>

      {/* Empty State */}
      {filteredListings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <p className="text-lg font-semibold text-gray-900">
            No listings found for &quot;{searchTerm}&quot;
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Try a different keyword
          </p>
        </div>
      ) : (
        /* Listings Grid */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
