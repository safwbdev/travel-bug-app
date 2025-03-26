import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_API_URL ?? 'http://localhost:8800'}`;
  const PORT = `${env.VITE_PORT ?? '5173'}`;

  return {
    plugins: [react()],
    server: {
      port: PORT,
      proxy: {
        "/api": {
          target: API_URL,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, "/api"),
        }
      }
    }
  }
})
