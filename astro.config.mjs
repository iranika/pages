// @ts-check

import vue from '@astrojs/vue';
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
    // Enable Vue to support Vue components.
    integrations: [vue({ appEntrypoint: './src/pages/_app.ts' }), mdx()],
});