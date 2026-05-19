// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Custom domain (root deployment)
  site: "https://astrobot.design",

  // Static output (prerenderes at build time)
  output: "static",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    server: {
      middlewareMode: false,
    },
    build: {
      sourcemap: false,
      minify: "esbuild",
    },
  },

  // Image optimization settings
  image: {
    // Allow remote images from WordPress API
    remotePatterns: [{ protocol: "http" }, { protocol: "https" }],
  },
});
