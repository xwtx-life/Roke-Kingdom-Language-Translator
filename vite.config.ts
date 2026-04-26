import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Roke-Kingdom-Language-Translator/',
  plugins: [
    tailwindcss(),
  ],
});
