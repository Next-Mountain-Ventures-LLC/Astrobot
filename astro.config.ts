// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Custom domain (root deployment)
  site: "https://astrobot.design",

  // Required for GitHub Pages
  output: "static",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },

  // Image optimization settings
  image: {
    // Allow remote images from WordPress API
    remotePatterns: [{ protocol: "http" }, { protocol: "https" }],
  },
});
