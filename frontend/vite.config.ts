import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

const frontendRoot = fileURLToPath(new URL(".", import.meta.url));
const portfolioDataDirectory = fileURLToPath(
  new URL("../data", import.meta.url),
);

// https://vite.dev/config/
export default defineConfig({
  base: "/hmeclazcke-portfolio/",
  plugins: [react()],
  resolve: {
    alias: {
      "@portfolio-data": portfolioDataDirectory,
    },
  },
  server: {
    fs: {
      allow: [frontendRoot, portfolioDataDirectory],
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
