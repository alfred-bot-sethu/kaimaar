'use client';

import { useQuery } from '@tanstack/react-query';
import { Listing } from '@/types';
import { MOCK_LISTINGS } from '@/lib/mock-data';

/**
 * Fetch all listings
 * TODO: Replace with actual API call via TanStack Query
 */
export function useListings() {
  return useQuery({
    queryKey: ['listings'],
    queryFn: async (): Promise<Listing[]> => {
      // Mock: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      return MOCK_LISTINGS;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

/**
 * Fetch a single listing by ID
 */
export function useListing(id: string) {
  return useQuery({
    queryKey: ['listings', id],
    queryFn: async (): Promise<Listing | null> => {
      // Mock: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 200));
      return MOCK_LISTINGS.find((l) => l.id === id) || null;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id,
  });
}

/**
 * Search/filter listings
 */
export function useFilteredListings(filters: {
  category?: string;
  location?: string;
  searchQuery?: string;
}) {
  return useQuery({
    queryKey: ['listings', 'filtered', filters],
    queryFn: async (): Promise<Listing[]> => {
      // Mock: simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      let results = MOCK_LISTINGS;

      if (filters.category) {
        results = results.filter((l) => l.category === filters.category);
      }

      if (filters.location) {
        results = results.filter((l) =>
          l.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        results = results.filter(
          (l) =>
            l.title.toLowerCase().includes(q) ||
            l.description.toLowerCase().includes(q)
        );
      }

      return results;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
