import { Suspense } from 'react';
import { ListingsGrid } from '@/components/shared/ListingsGrid';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default function HomePage() {
  return (
    <div className="container-max py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Browse Listings
        </h1>
        <p className="mt-2 text-gray-600">
          Discover amazing pre-loved items from verified sellers.
        </p>
      </div>

      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ListingsGrid />
      </Suspense>
    </div>
  );
}
