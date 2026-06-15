import { defineConfig } from 'astro/config';
import { vercel } from '@astrojs/vercel/serverless/entrypoint';

// https://astro.build/config
export default defineConfig({
  // Enable SSR for dynamic content and authentication
  ssr: true,
  adapter: vercel(),
});
