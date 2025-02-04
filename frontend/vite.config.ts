import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "");
  return {
    build: {
      outDir: "../backend//wwwroot",
      emptyOutDir: true,
    },
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      allowedHosts: ["solita-front", "proxy"],
      proxy: {
        "/api": {
          target: env.VITE_API_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
