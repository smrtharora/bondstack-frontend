import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fix for xlsx module in Vercel builds
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["xlsx"],
  },
});
