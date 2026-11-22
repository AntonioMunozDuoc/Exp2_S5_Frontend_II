import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base` debe coincidir con el nombre del repositorio para que gh-pages cargue los recursos.
export default defineConfig({ plugins: [react()], base: "/Exp2_S5_Frontend_II/" });
