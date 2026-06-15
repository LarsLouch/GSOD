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
 // Enable SSR for dynamic content and authentication
 ssr: true,
});
