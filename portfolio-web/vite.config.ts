import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    tailwindcss(),
    svgr({
      svgrOptions: {
        // Convierte fill/stroke a currentColor (monocromo)
        // Si tus SVG son multicolor y quieres conservar colores, desactiva convertColors
        svgo: true,
        svgoConfig: {
          multipass: true,
          plugins: [
            { name: "preset-default" },
            // Conserva viewBox para poder escalar con CSS
            { name: "removeViewBox", active: false },
            // Quita width/height fijos y usa viewBox
            { name: "removeDimensions", active: true },
            // Intenta reemplazar colores fijos por currentColor (monocromo)
            { name: "convertColors", params: { currentColor: true } },
            // Limpia attrs innecesarios
            { name: "removeAttrs", params: { attrs: "(data-name|id|class)" } },
          ],
        },
      },
      include: "**/*.svg",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
