import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// Config desacoplada do Manus.
//
// Removidos em relação ao export original:
//   - `vite-plugin-manus-runtime`: injeção de runtime proprietária da plataforma.
//   - `@builder.io/vite-plugin-jsx-loc`: anotação de origem do JSX usada pelo
//     editor visual do Manus, sem função fora dele.
//   - plugin "manus-debug-collector": middleware que gravava console e rede do
//     navegador em `.manus-logs/`. Junto com ele saiu a injeção do script
//     `/__manus__/debug-collector.js` no HTML.

// `base` permite publicar em subpasta (GitHub Pages de projeto fica em
// https://usuario.github.io/repositorio/). Em dev e no servidor Express fica "/".
// Defina VITE_BASE no build estatico, ex.: VITE_BASE=/cen-2027-prototipo/
export default defineConfig({
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    host: true,
    allowedHosts: ["localhost", "127.0.0.1"],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
