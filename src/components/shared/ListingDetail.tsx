'use client';

import { useListing } from '@/hooks/use-listings';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Heart } from 'lucide-react';

interface ListingDetailProps {
  listingId: string;
}

export function ListingDetail({ listingId }: ListingDetailProps) {
  const { data: listing, isLoading, error } = useListing(listingId);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (error || !listing) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p>Listing not found.</p>
        <Link href="/" className="mt-4 inline-block text-red-600 underline">
          Back to browse
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Image */}
        <div className="lg:col-span-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={listing.imageUrl}
              alt={listing.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Title & Price */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {listing.title}
            </h1>
            <p className="mt-2 text-3xl font-bold text-accent">
              {formatPrice(listing.price)}
            </p>
          </div>

          {/* Meta Info */}
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-medium">{listing.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Condition</p>
              <p className="font-medium capitalize">{listing.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="font-medium capitalize">{listing.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Posted</p>
              <p className="font-medium">{listing.timeAgo}</p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {listing.hasVideo && (
              <Badge variant="accent">📹 Has Video</Badge>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1">Contact Seller</Button>
            <Button variant="ghost" size="default">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Description</h2>
        <p className="mt-4 text-gray-700">{listing.description}</p>
      </div>
    </div>
  );
}
