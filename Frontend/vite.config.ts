import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Crée un fichier javascript séparé dédié uniquement à MapLibre
          if (id.includes("maplibre-gl")) {
            return "maplibre";
          }
          // Isole le reste des dépendances (React, Lucide, etc.)
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
})
