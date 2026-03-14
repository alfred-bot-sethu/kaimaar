import { create } from 'zustand';
import { Category, Condition } from '@/types';

interface ListingFilters {
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: Condition;
  searchQuery?: string;
}

interface ListingStore {
  filters: ListingFilters;
  setFilters: (filters: ListingFilters) => void;
  resetFilters: () => void;
  setCategory: (category: Category | undefined) => void;
  setSearchQuery: (query: string | undefined) => void;
  setLocation: (location: string | undefined) => void;
}

const initialFilters: ListingFilters = {};

export const useListingStore = create<ListingStore>((set) => ({
  filters: initialFilters,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: initialFilters }),
  setCategory: (category) =>
    set((state) => ({
      filters: { ...state.filters, category },
    })),
  setSearchQuery: (searchQuery) =>
    set((state) => ({
      filters: { ...state.filters, searchQuery },
    })),
  setLocation: (location) =>
    set((state) => ({
      filters: { ...state.filters, location },
    })),
}));
