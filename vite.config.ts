import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {fileURLToPath, URL } from 'url'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // 这里就是需要配置resolve里的别名
      "@": fileURLToPath(new URL("./src", import.meta.url)), // path记得引入
    }
  }
})
