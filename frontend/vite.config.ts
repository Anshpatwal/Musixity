import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  plugins: [react(),tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: '0.0.0.0', // Allow external access
    port: process.env.PORT ? Number(process.env.PORT) : 5173, // Convert PORT to a number
    strictPort: true, // Ensure the port is used strictly
    allowedHosts: ["musixity.onrender.com"], // Allow Render's domain
  }
})
