import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// This project came from Create React App: many source files use the `.js`
// extension but contain JSX. `include` tells @vitejs/plugin-react to run the
// React/JSX transform on `.js` files too (Vite's esbuild step ignores `.js`
// by default, so Babel handles them here). `optimizeDeps` covers the rare
// dependency that ships JSX in a `.js` file.
export default defineConfig({
  plugins: [react({ include: /\.(js|jsx)$/, exclude: /node_modules/ })],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    // Match CRA's output directory (already in .gitignore).
    outDir: "build",
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
