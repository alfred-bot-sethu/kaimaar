import { env } from './env';

/**
 * Typesense client configuration
 * Used for full-text search on listings
 */
export const typesenseConfig = {
  nodes: [
    {
      host: env.typesenseHost,
      port: 8108,
      protocol: 'https',
    },
  ],
  apiKey: env.typesenseApiKey,
  connectionTimeoutSeconds: 5,
};

/**
 * Mock search function - replace with actual Typesense client when ready
 */
export async function searchListings(_query: string) {
  // TODO: Implement actual Typesense search
  return [];
}
