import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  integrations: [],
  // Optimize all images automatically
  image: {
    domains: [],
    service: {
      entrypoint: '@astrojs/image/sharp',
    },
  },
  // Disable SSR since this is a static site
  ssr: false,
});