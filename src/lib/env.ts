const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  NEXT_PUBLIC_TYPESENSE_HOST: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
  NEXT_PUBLIC_TYPESENSE_API_KEY:
    process.env.NEXT_PUBLIC_TYPESENSE_API_KEY,
  NEXT_PUBLIC_MUX_TOKEN_ID: process.env.NEXT_PUBLIC_MUX_TOKEN_ID,
  MUX_TOKEN_SECRET: process.env.MUX_TOKEN_SECRET,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
};

export const env = {
  supabaseUrl: requiredEnvVars.NEXT_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: requiredEnvVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  clerkPublishableKey: requiredEnvVars.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
  clerkSecretKey: requiredEnvVars.CLERK_SECRET_KEY || '',
  typesenseHost: requiredEnvVars.NEXT_PUBLIC_TYPESENSE_HOST || '',
  typesenseApiKey: requiredEnvVars.NEXT_PUBLIC_TYPESENSE_API_KEY || '',
  muxTokenId: requiredEnvVars.NEXT_PUBLIC_MUX_TOKEN_ID || '',
  muxTokenSecret: requiredEnvVars.MUX_TOKEN_SECRET || '',
  appUrl: requiredEnvVars.NEXT_PUBLIC_APP_URL,
};

/**
 * Validate that required environment variables are set
 * Call this in your layout or entry point
 */
export function validateEnv() {
  const missing = Object.entries(requiredEnvVars).filter(
    ([_, value]) => !value
  );

  if (missing.length > 0) {
    console.warn(
      'Missing environment variables:',
      missing.map(([key]) => key).join(', ')
    );
  }
}
