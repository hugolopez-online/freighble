import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // set up a proxy to serve vendors' API
    server: {
        proxy: {
            "/api": "http://localhost:8080",
        },
    },
    resolve: {
        alias: {
            data: path.resolve(__dirname, "./data"),
        },
    },
});
