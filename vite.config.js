import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        VitePWA({
            strategies: "generateSW", // default, vite-plugin-pwa generates sw.js
            registerType: "prompt", // default, will prompt user before reloading page
            workbox: {
                globPatterns: ["**/*.{js,css,html,ico,png,svg}"], // works globally, not only on /public
            },
            devOptions: {
                enabled: false, // enables service worker in dev mode (only sw, no installation)
            },
            manifest: {
                name: "Database Modeling Tool",
                short_name: "DB Modeling Tool",
                description: "Web application for creating relational and entity-relationship database models",
                theme_color: "rgb(185, 185, 185)",
                background_color: "rgb(185, 185, 185)",
                display: "standalone",
                icons: [
                    {
                        src: "/icons/pwa-64x64.png",
                        sizes: "64x64",
                        type: "image/png",
                    },
                    {
                        src: "/icons/pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "/icons/pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/icons/maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
