import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

type VitestConfig = import("vitest/config").UserConfig;
type ViteConfig = import("vite").UserConfig;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        manifesto: path.resolve(__dirname, "manifesto/index.html"),
      },
    },
  },
} as ViteConfig & { test?: VitestConfig["test"] });
