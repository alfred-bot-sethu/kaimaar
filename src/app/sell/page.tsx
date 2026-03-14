import { Metadata } from 'next';
import { CreateListingForm } from '@/components/shared/CreateListingForm';

export const metadata: Metadata = {
  title: 'Sell on Kaimaar - Create a Listing',
  description: 'Create a listing to sell your pre-loved items on Kaimaar.',
};

export default function SellPage() {
  return (
    <div className="container-max py-8 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sell Your Item</h1>
        <p className="mt-2 text-gray-600">
          List your pre-loved item in just a few minutes.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <CreateListingForm />
      </div>
    </div>
  );
}
