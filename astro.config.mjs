// @ts-check
import { defineConfig } from 'astro/config';

// Static output only: no adapter, no server routes, no client framework.
export default defineConfig({
  site: 'https://robolang.dev',
  output: 'static',
  trailingSlash: 'always',
});
