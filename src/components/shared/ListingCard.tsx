'use client';

import { Listing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="group cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={listing.imageUrl}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Video Badge */}
          {listing.hasVideo && (
            <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-md">
              <Video className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-medium text-accent">Video</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          {/* Title */}
          <h3 className="line-clamp-2 font-semibold text-gray-900 group-hover:text-accent transition-colors">
            {listing.title}
          </h3>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-accent">
              {formatPrice(listing.price)}
            </span>
          </div>

          {/* Location and Time */}
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="default" size="sm">
              {listing.location}
            </Badge>
            <span className="text-xs text-gray-500">{listing.timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
