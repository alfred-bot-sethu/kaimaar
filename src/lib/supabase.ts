import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Supabase client for browser/client-side queries
 * For server-side, use createServerClient with service_role key
 */
export const supabase = createClient(
  env.supabaseUrl,
  env.supabaseAnonKey
);

export type Database = {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          price: number;
          category: string;
          location: string;
          condition: string;
          image_url: string;
          has_video: boolean;
          created_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['listings']['Row'],
          'id' | 'created_at'
        >;
      };
    };
  };
};
