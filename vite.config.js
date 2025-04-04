import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  base: "./", 
  server: {
    allowedHosts:true,
    host: '0.0.0.0', // Listen on all addresses
    port: 3000,      // Optional: specify a port
  }
  
})
