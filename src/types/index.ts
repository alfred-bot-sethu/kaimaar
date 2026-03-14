export type Condition = 'like-new' | 'excellent' | 'good' | 'fair';

export type Category = 'fashion' | 'electronics' | 'furniture' | 'baby' | 'books';

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: Category;
  location: string;
  condition: Condition;
  timeAgo: string;
  imageUrl: string;
  hasVideo: boolean;
  createdAt: string;
  userId: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
};

export type CreateListingInput = Omit<
  Listing,
  'id' | 'userId' | 'createdAt'
>;
