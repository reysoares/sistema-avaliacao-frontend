import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // necessário para usar __dirname e path.resolve

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@styles": path.resolve(__dirname, "src/styles"),
      "@components": path.resolve(__dirname, "src/components"),
      //pode adicionar mais aliases aqui
    },
  },
});
