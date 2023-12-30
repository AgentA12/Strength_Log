import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
      },
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],

  test: {
    global: true,
    environment: "jsdom",
  },
});
