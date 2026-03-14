import { Suspense } from 'react';
import { ListingsGrid } from '@/components/shared/ListingsGrid';

export const revalidate = 60; // ISR: revalidate every 60 seconds

export default function HomePage() {
  return (
    <div className="container-max py-8 sm:py-12">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ListingsGrid />
      </Suspense>
    </div>
  );
}
