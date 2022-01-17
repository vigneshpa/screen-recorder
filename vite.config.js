import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { VitePWA } from 'vite-plugin-pwa';
import getManifest from './webmanifest.js';

const base = '/screen-recorder/';

export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      manifest: getManifest(base),
      registerType: 'autoUpdate',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      includeManifestIcons: false,
    }),
  ],
  build: { sourcemap: true, outDir: './docs' },
  base,
});
