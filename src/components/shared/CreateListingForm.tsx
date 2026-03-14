'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { CreateListingInput, Category, Condition } from '@/types';

const categories: Category[] = [
  'fashion',
  'electronics',
  'furniture',
  'baby',
  'books',
];
const conditions: Condition[] = [
  'like-new',
  'excellent',
  'good',
  'fair',
];

const singaporeLocations = [
  'Orchard',
  'Marina Bay',
  'Jurong',
  'Tampines',
  'Bukit Merah',
  'CBD',
  'Bugis',
  'Novena',
  'Punggol',
  'Holland',
  'Suntec',
  'Tanglin',
];

export function CreateListingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<CreateListingInput>>({
    title: '',
    description: '',
    price: 0,
    category: 'fashion',
    location: 'Orchard',
    condition: 'good',
    imageUrl: '',
    hasVideo: false,
    timeAgo: 'just now',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock: simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log('Form data:', formData);
    // TODO: Call actual API to create listing
    alert('Listing created! (Mock)');

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Your Listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Title *
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What are you selling?"
              required
              className="mt-1"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your item in detail..."
              required
              rows={4}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Price (SGD) *
            </label>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="0"
              required
              min="0"
              className="mt-1"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Condition *
              </label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                {conditions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond
                      .split('-')
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Location *
            </label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            >
              {singaporeLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Image URL
            </label>
            <Input
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-1"
            />
          </div>

          {/* Has Video */}
          <div className="flex items-center gap-2">
            <input
              name="hasVideo"
              type="checkbox"
              checked={formData.hasVideo}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
            />
            <label className="text-sm font-medium text-gray-900">
              Add video? (Mux integration coming soon)
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Creating...' : 'Create Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
