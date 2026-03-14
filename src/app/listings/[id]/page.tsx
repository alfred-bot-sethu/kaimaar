import { Suspense } from 'react';
import { ListingDetail } from '@/components/shared/ListingDetail';
import { Metadata } from 'next';

interface ListingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Listing #${id} - Kaimaar`,
    description: 'View listing details on Kaimaar',
  };
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;

  return (
    <div className="container-max py-8 sm:py-12">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <ListingDetail listingId={id} />
      </Suspense>
    </div>
  );
}
