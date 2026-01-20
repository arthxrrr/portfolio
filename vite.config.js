import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/', // 👈 ESSENCIAL para GitHub Pages
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith('Tres') && tag !== 'TresCanvas',
        },
      },
    }),
  ],
})
