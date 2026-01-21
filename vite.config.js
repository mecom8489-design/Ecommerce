import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Production build configuration for security
  build: {
    // Disable source maps in production to prevent source code exposure
    sourcemap: false,

    // Minify code for production
    minify: "terser",

    // Optimize chunk size
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        // Proper code splitting
        manualChunks: {
          "react-vendor": ["react", "react-dom", "react-router-dom"],
        },
      },
    },
  },

  // Server configuration
  server: {
    // Only for development - never use in production
    host: "0.0.0.0",
    port: 5173,

    // Add security headers for development
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },

  // Preview server configuration (for testing production build)
  preview: {
    port: 4173,
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
    },
  },
});
