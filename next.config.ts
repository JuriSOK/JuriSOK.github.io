import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* GitHub Pages serves static files only: the build writes a complete site to
     `out/`. The repository is JuriSOK.github.io, served at the domain root —
     so no basePath. */
  output: 'export',
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
