import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// This project was migrated from Create React App. JSX-containing source files
// use the `.jsx` extension so Vite/Rolldown parse them as JSX by extension
// (both the dev oxc transform and the production Rolldown build). Pure-JS files
// (store, slices, utils) keep `.js`.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Match CRA's output directory (already in .gitignore).
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
