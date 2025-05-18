import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    {
      name: "glsl",
      resolveId(id, importer) {
        if (
          id.endsWith(".glsl") ||
          id.endsWith(".vert") ||
          id.endsWith(".frag")
        ) {
          return resolve(importer ? resolve(importer, "..", id) : resolve(id));
        }
      },
      load(id) {
        if (
          id.endsWith(".glsl") ||
          id.endsWith(".vert") ||
          id.endsWith(".frag")
        ) {
          try {
            const shader = readFileSync(id, "utf-8");
            return `export default ${JSON.stringify(shader)};`;
          } catch (error) {
            this.error(`Failed to load shader: ${id}`);
          }
        }
      },
    },
  ],
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        manualChunks: {
          p5: ["p5"],
        },
      },
    },
  },
});
